const app = require('express')();

app.get('/', (req, res) => res.send('Bot Started. Node.js v16. Shard 17. 49 ERRORS'));

module.exports = () => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Express server running on port ${port}`);
  });
}