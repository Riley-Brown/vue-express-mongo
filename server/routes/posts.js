require('dotenv').config();
const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

/* ===== GET POSTS ===== */
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

/* ===== ADD POSTS ===== */
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    created_at: new Date()
  });
  res.status(201).send();
});

/* ===== DELETE POSTS ===== */
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  });

  return client.db('vue_express').collection('posts');
}

module.exports = router;
