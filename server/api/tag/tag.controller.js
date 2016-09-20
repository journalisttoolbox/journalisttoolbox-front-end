var Tag = require('./tag.model');

// Get list of tags
exports.index = function(req, res) {
  Tag.find({'text': { "$regex": req.query.query, "$options": "i" }}, function (err, tags) {
    if(err) { console.log("ERROR " + err) }
    console.log(JSON.stringify(tags));
    return res.status(200).json(tags);
  });
};
