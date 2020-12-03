'use strict';

const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');

const mysql2 = require('mysql2');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    ...config,
    dialectModule: mysql2,
    logging: console.log,
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    logging: console.log,
  });
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

db['User'] = require('./user.model')(sequelize, Sequelize.DataTypes);
db['Exam'] = require('./exam.model')(sequelize, Sequelize.DataTypes);
db['QbPost'] = require('./qbpost.model')(sequelize, Sequelize.DataTypes);
db['Tag'] = require('./tag.model')(sequelize, Sequelize.DataTypes);
db['QbValue'] = require('./qbvalue.model')(sequelize, Sequelize.DataTypes);
db['QbSyllabus'] = require('./qb-syllabus.model')(
  sequelize,
  Sequelize.DataTypes
);
db['QbGrade'] = require('./qb-grade.model')(sequelize, Sequelize.DataTypes);
db['QbSubject'] = require('./qb-subject.model')(sequelize, Sequelize.DataTypes);
db['QbBoardyear'] = require('./qb-boardyear.model')(
  sequelize,
  Sequelize.DataTypes
);
db['QbTopic'] = require('./qb-topic.model')(sequelize, Sequelize.DataTypes);
db['QbQuestionType'] = require('./qb-questiontype.model')(
  sequelize,
  Sequelize.DataTypes
);
db['QbTag'] = require('./qb-tag.model')(sequelize, Sequelize.DataTypes);
db['QbQuestion'] = require('./qb-question.model')(
  sequelize,
  Sequelize.DataTypes
);
db['QbPrintable'] = require('./qb-printable.model')(
  sequelize,
  Sequelize.DataTypes
);
// association tables
// db['__Tag_Tags'] = require('./__tag_tags.model')(
//   sequelize,
//   Sequelize.DataTypes
// );
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

var knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: null,
    database: 'questionbank',
  },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.knex = knex;
module.exports = db;
