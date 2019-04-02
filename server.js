const express = require('express');
//import router

const postsRouter = require('./posts/posts-route')
const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter) 
// Delegates requests to /api/posts to the router.

const Posts = require('./posts/posts-model.js');


server.get('/', (req, res) => {
  res.send(`
    <h2>Hello World</h>
  `);
});





module.exports = server // CommonJS way of exporting out of a module.

// Same as export default server