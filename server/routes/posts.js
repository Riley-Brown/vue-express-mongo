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

/* ===== DELETE POSTS ===== */

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  });

  return client.db('vue_express').collection('posts');
}

module.exports = router;
