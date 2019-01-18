require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const models = require('./src/models');
const routes = require('./src/routes');
const PORT = process.env.PORT;

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

routes(app);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
