const express = require('express');

// 1
const hubsRouter = require('./routers/postRouter');

const server = express();

server.use(express.json());

// 2
server.use('/api/post', hubsRouter);

server.listen(7000, () => {
  console.log('\n*** Server Running on http://localhost:7000 ***\n');
});