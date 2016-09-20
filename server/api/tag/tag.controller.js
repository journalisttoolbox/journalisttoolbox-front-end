var Tag = require('./tag.model');

// Get list of tags
exports.index = function(req, res) {
  Tag.find({'text': { "$regex": req.query.query, "$options": "i" }}, function (err, tags) {
    if(err) { console.log("ERROR " + err) }
    return res.status(200).json(tags);
  });
};

exports.addTags = function(req, res) {
  for(tagIx in req.body){
    console.log(req.body[tagIx]);
    createTagIfMissing(req.body[tagIx]);
  }
};

var createTagIfMissing = function(currentTag){
  var currTag = currentTag;
  Tag.find({'text': currTag}, function(err,tag){
    console.log(currTag);
    if(tag.length == 0){
      var newTag = new Tag({'text': currTag});
      console.log("the new tag is " + currTag);
      newTag.save();
    }
  });
}
