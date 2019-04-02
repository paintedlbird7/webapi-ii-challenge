const express = require('express');
//import router
// const postsRouter = require('./posts/posts-route')
const server = express();

server.use(express.json());
// server.use('/api/posts', postsRouter) // Delegates requests to /api/hubs to the router.

const db = require('./data/db.js');

server.get('/', (req, res) => {
  res.send(`
    <h2>Hello World</h>
  `);
});



server.get('/', async (req, res) => {
    try {
      const hubs = await Hubs.find(req.query);
      res.status(200).json(hubs);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    }
  });
  
  server.get('/:id', async (req, res) => {
    try {
      const hub = await Hubs.findById(req.params.id);
  
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'Hub not found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hub',
      });
    }
  });
  
  server.get('/:id/messages', async (req, res) => {
    try {
      const messages = await Hubs.findHubMessages(req.params.id);
  
      if (messages.length > 0) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({ message: 'No messages for this hub' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the messages for this hub',
      });
    }
  });
  
  server.post('/', async (req, res) => {
    try {
      const hub = await Hubs.add(req.body);
      res.status(201).json(hub);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the hub',
      });
    }
  });
  
  server.delete('/:id', async (req, res) => {
    try {
      const count = await Hubs.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    }
  });
  
  server.put('/:id', async (req, res) => {
    const changes = req.body;
    try {
      const hub = await Hubs.update(req.params.id, req.body);
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
      });
    }
  });
  
  server.post('/:id/messages', async (req, res) => {
      const messageInfo = { ...req.body, hub_id: req.params.id }
      try {
          const message = await Hubs.addMessage(messageInfo)
          res.status(201).json(message)
      } catch(error) {
          console.log(error)
          res.status(500).json({
              message: 'Errrrroorrrrrrrr'
          })
      }
  })


module.exports = server // CommonJS way of exporting out of a module.

// Same as export default server