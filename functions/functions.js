const Sequelize = require('sequelize');
const models = require('../models/index.js');
const Op = Sequelize.Op;
function orQueryConstructor(filterPath, filterParameter) {
  let hhh = [];
  for (var i = 0; i < filterParameter.length; i++) {
    hhh.push({
      [filterPath]: {
        [Op.like]: `%${',' + filterParameter[i] + ','}%`,
      },
    });
  }
  return hhh;
}

module.exports = { orQueryConstructor };
