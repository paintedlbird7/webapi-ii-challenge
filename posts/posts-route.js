const express = require('express');

const Posts = require('./posts-model.js');

const router = express.Router();




router.get('/', async (req, res) => {
    try {
      const posts = await Posts.find(req.query);
      res.status(200).json(posts);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the posts',
      });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id);
  
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    }
  });
  
  router.get('/:id/posts', async (req, res) => {
    try {
      const posts = await Posts.findPostMessages(req.params.id);
  
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ post: 'No messages for this post' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the messages for this post',
      });
    }
  });
  
  router.post('/', async (req, res) => {
    try {
      const post = await Posts.add(req.body);
      res.status(201).json(post);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the post',
      });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const count = await Posts.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The post has been nuked' });
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the post',
      });
    }
  });
  
  router.put('/:id', async (req, res) => {
    const changes = req.body;
    try {
      const post = await Posts.update(req.params.id, req.body);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the post',
      });
    }
  });
  
  // server.post('/:id/posts', async (req, res) => {
  //     const postInfo = { ...req.body, post_id: req.params.id }
  //     try {
  //         const post = await Posts.addPost(postInfo)
  //         res.status(201).json(message)
  //     } catch(error) {
  //         console.log(error)
  //         res.status(500).json({
  //             message: 'Errrrroorrrrrrrr'
  //         })
  //     }
  // })
        



module.exports = router;
