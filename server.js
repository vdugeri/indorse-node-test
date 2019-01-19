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

const DBMigrate = () => {
  models.sequelize.sync().then(() => {
    console.log('database created');
  });
}

app.listen(PORT, () => {
  DBMigrate();
  console.log(`server listening on port ${PORT}`);
});
