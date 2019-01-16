require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const models = require('./models');
const routes = require('./routes');
const PORT = process.env.PORT;

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

routes(app);

const migrateDB = () => {
  models.sequelize.sync().then(() => {
    console.log('Database migrations successful');
  });
};

app.listen(PORT, () => {
  migrateDB();
  console.log(`server listening on port ${PORT}`);
});
