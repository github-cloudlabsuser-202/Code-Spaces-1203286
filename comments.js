// Create web server with express
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

// Create express app
const app = express();
// Use cors middleware
app.use(cors());
// Use json middleware
app.use(bodyParser.json());

const commentsByPostId = {};

// Get all comments for a post
app.get('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];
  res.send(comments);
});

// Create a comment for a post
app.post('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[postId] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;
  res.status(201).send(comments);
});

// Start server
app.listen(4001, () => {
  console.log('Listening on 4001');
});