'use strict';

var User = require('./user.model');
var Tool = require('../tool/tool.model');
var ToolList = require('../toolList/toolList.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var gravatar = require('gravatar');
var transporter = require('./nodemailer.js')

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword -__v', function (err, users) {
    if(err) return res.status(500).send(err);
    res.status(200).json(users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.gravUrl = gravatar.url(req.body.email)+"?d=mm";
  newUser.tools = [];
  newUser.isVerified = false;

  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var mailOptions = {
      from: '"Newsroom Tools" <team@newsroom.tools>', // sender address
      to: req.body.email, // list of receivers
      subject: 'Please verify your email', // Subject line
      text: '', // plaintext body
      html: 'Click <a href=\"http://'+req.headers.host+'/verify/'+newUser.verificationString+'\">here</a> to verify your email address.' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });

    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

// Method for PUT requests
exports.put = function(req, res) {
  User.findOne({ '_id': req.params.id }, function(err, User) {
    if(!User) {
      // If User is not found
      res.statusCode = 404;
      return res.send({ error: 'Not found' });
    }
    if(err) {
      res.send(err.message);
    } else {

      // Update all fields
      for(var field in req.body) {
        User[field] = req.body[field];
      }

      User.save(function(err) {
        if(err) {
            console.log(err);
          res.statusCode = 500;
          res.send({ error: 'Error with put request' });
        } else {
          res.send({ status: 'OK', User: User });
        }
      });
    }
  });
};

// Associates a toolID with a user when they create a tool
exports.addRemoveTool = function(req, res, next) {
  var userId      = req.params.id;
  var toolId      = req.body.toolID;
  var addTool     = req.body.addTool; // req.body.addTool will be falsey if wishing to remove

  Tool.findOne({ '_id': toolId }, function(err, Tool) {
    if(!Tool) { res.statusCode = 404; return res.send({ error: 'Tool not found' }); }
    if(err) {
      res.send(err.message)
    } else {
      User.findOne({ '_id': userId }, function(err, User) {
        if(!User) { res.statusCode = 404; return res.send({ error: 'Not found' }); }
        if(err) {
          res.send(err.message);
        } else {

          if(addTool) {
            // Push the Tool object to the user's tools array
            User.tools.push(Tool);
          } else if (!addTool) {
            var index = User.tools.indexOf(Tool);
            User.tools.splice(index, 1);
          }

          User.save(function(err) {
            if(err) {
              console.log(err);
              res.statusCode = 500;
              res.send({ error: 'Error processing the users tool record' });
            } else {
              res.send({ status: 'OK', User: User.tools });
            }
          });
        }
      });
    }
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};

// Adds/removes a tool from favourites list
exports.addRemoveFavourites = function(req, res) {
  var userId  = req.params.id;
  var toolId  = req.body.toolID;
  var name    = req.body.name;
  var addTool = req.body.addTool; // req.body.addTool will be falsey if wishing to remove

  Tool.findOne({ '_id': toolId }, function(err, Tool) {
    if(!Tool) { res.statusCode = 404; return res.send({ error: 'Tool not found' }); }
    if(err) {
      res.send(err.message)
    } else {
      User.findOne({ '_id': userId }, function(err, User) {
        if(!User) { res.statusCode = 404; return res.send({ error: 'Not found' }); }
        if(err) {
          res.send(err.message);
        } else {

          if(addTool) {
            // If already present, return 409 conflict.
            for (var i = 0; i < User.favourites.length; i++) {
              if (User.favourites[i]._id.toString() === Tool._id.toString()) {
                return res.status(409).send({ error: 'Already present in favourites' });
              }
            }
            User.favourites.push(Tool);
          } else if (!addTool) {
            for (var i= 0; i < User.favourites.length; i++) {
              if (User.favourites[i]._id.toString() === Tool._id.toString()) {
                User.favourites.splice(i, 1);
                break;
              }
            }
          }

          User.save(function(err) {
            if(err) {
              console.log(err);
              res.statusCode = 500;
              res.send({ error: 'Error processing the users favourites record' });
            } else {
              res.send({ status: 'OK', User: User.favourites });
            }
          });
        }
      });
    }
  });

};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.status(200).send('OK');
      });
    } else {
      res.status(403).send('Forbidden');
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user);
  });
};

exports.getUserByString = function(req, res, next){
  User.findOne({verificationString: req.body.uid}, function(err,user){
    if(err) return validationError(res, err);
    if(user == null) return res.status(404).end()
    user.isVerified = true;
    user.save(function(err){
      if (err) return validationError(res,err);
      res.status(200).send('OK');
    });
  });

}

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
