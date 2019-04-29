let Tag = require('../models/Tag');

async function getTags(req, res) {
  let tags = await Tag.find();
  res.send(tags);
}
async function createTag(req, res) {
  let tag = new Tag(req.body);
  await tag.save();
  res.send(tag);
}
async function updateTag(req, res) {
  let { id } = req.params;
  let { body } = req;
  let newTag = await Tag.findByIdAndUpdate(id, body, { new: true });
  res.send(newTag);
}
async function deleteTag(req, res) {
  let { id } = req.params;
  let result = await Tag.findByIdAndRemove(id);
  res.send(result);
}
module.exports = {
  getTags,
  createTag,
  updateTag,
  deleteTag,
};
