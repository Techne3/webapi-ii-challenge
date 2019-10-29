const express = require('express');

// 1
const hubsRouter = require('./routers/hubsRouter');

const server = express();

server.use(express.json());

// 2
server.use('/api/hubs', hubsRouter);

server.listen(6000, () => {
  console.log('\n*** Server Running on http://localhost:6000 ***\n');
});