const Sequelize = require('sequelize');
const models = require('../models/index.js');
const questionCreate = require('./qbpost.exam.admin.controller').store;
const Op = Sequelize.Op;
const dbModel = models.Exam;
const modelName = 'Exam';
/**
 * @route /
 * @method GET
 * @description Fetch all Records, and show them in a View
 * @param {json} req
 * @param {json} res
 */
exports.index = (req, res) => {
  let whereQuery = {};
  // if (req.query.createdBy) {
  whereQuery['__createdBy'] = req.query.__createdBy ? req.query.__createdBy : 1;
  // }
  dbModel
    .findAndCountAll({
      where: { ...whereQuery },
      include: [
        {
          model: models.User,
          attributes: ['uuid'],
        },
      ],
    })
    .then((ret) => {
      let tempResults = [];
      ret.rows.forEach((item) => {
        item._tags = convertCommaStringToArray(item._tags);
        let tempRow = { ...item.dataValues, dummy: 'kkk' };
        tempResults.push(tempRow);
      });

      res.send({
        _temp3: req.user,
        status: '200',
        message: 'Your search fetched the following ' + modelName + '(s)',
        count: ret.count,
        results: tempResults,
      });
    });
};

/**
 * @route /create
 * @method GET
 * @description Show the View to create Record
 * @param {json} req
 * @param {json} res
 */
exports.create = (req, res) => {
  res.send({
    status: '200',
    message: 'Show View to Create ' + modelName,
  });
};

/**
 * @route /
 * @method POST
 * @description Save a Record in database
 * @param {json} req
 * @param {json} res
 */
exports.store = (req, res) => {
  if (!req.body.title || !req.body._grade || !req.body._subject) {
    res.send({
      status: '400',
      message: 'Title, Grade and Subject are required',
    });
    console.log('Validation error', req.body);
    return;
  }
  let reqBody = req.body;
  reqBody.qbposts = JSON.stringify(reqBody.qbposts);
  reqBody._tags = convertArrayToCommaString(reqBody._tags);
  dbModel
    .create(reqBody, {
      include: [
        {
          association: dbModel.belongsToMany(models.QbPost, {
            through: '__QbPost_QbPosts',
          }),
        },
      ],
    })
    .then((ret) => {
      res.send({
        status: '200',
        message: modelName + ' created successfully with ID = ' + ret.id,
        id: ret.id,
      });
    });
};

/**
 * @route /:id
 * @method GET
 * @description Show the Record in a View
 * @param {json} req
 * @param {json} res
 */
exports.show = (req, res) => {
  dbModel
    .findByPk(req.params.id)
    .then((ret) => {
      if (ret === null) {
        res.send({
          status: '404',
          message: 'No ' + modelName + ' with ID = ' + req.params.id + ' found',
        });
      } else {
        ret.qbposts = JSON.parse(ret.qbposts);
        ret._tags = convertCommaStringToArray(ret._tags);
        res.send({
          status: '200',
          message: modelName + ' with ID = ' + ret.id + ' has found',
          result: ret,
        });
      }
    })
    .catch((err) => {
      res.send({
        status: '404',
        message: 'Error Details:' + err,
      });
    });
};

/**
 * @route /:id/edit
 * @method GET
 * @description Show the view to Edit the Record
 * @param {json} req
 * @param {json} res
 */
exports.edit = (req, res) => {
  res.send({
    status: '200',
    message: 'Show View to edit the ' + modelName,
  });
};

/**
 * @route /:id
 * @method PUT
 * @description Update the Record in the database
 * @param {json} req
 * @param {json} res
 */
exports.update = (req, res) => {
  console.log(req.body._tags);
  let reqBody = req.body;
  reqBody.qbposts = JSON.stringify(reqBody.qbposts);
  reqBody._tags = convertArrayToCommaString(reqBody._tags);
  dbModel
    .update(reqBody, {
      where: {
        id: req.params.id,
      },
    })
    .then((id) => {
      res.send({
        status: '200',
        message: modelName + ' updated successfully with ID = ' + id,
      });
    });
};

/**
 * @route /:id
 * @method DELETE
 * @description Delete the record from the database
 * @param {json} req
 * @param {json} res
 */
exports.delete = (req, res) => {
  dbModel
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((id) => {
      res.send({
        status: '200',
        message: modelName + ' deleted successfully with ID = ' + id,
      });
    });
};

// CUSTOM
/**
 * @route /storeWithQuestions
 * @method POST
 * @description Create an Exam in Database with QbPosts
 * @param {json} req
 * @param {json} res
 */

exports.createWithQuestions = (req, res) => {
  console.log('QbPosts to be uploaded', req.body);

  dbModel.create(req.body).then((retExam) => {
    if (!req.body.qbposts) {
      res.send({ message: 'Exam created without qbposts' });
      return;
    }
    req.body.qbposts.forEach(async (item) => {
      retExam.createQuestion(item).then((retQbPost) => {
        console.log('Current QbPost', retQbPost);
        if (!item.qfields) {
          return;
        }
        item.qfields.forEach(async (itemQfield) => {
          await retQbPost.createQfield(itemQfield);
        });
      });
    });
    res.send({ message: 'Exam created successfully' });
  });
};

exports.updateWithQuestions = (req, res) => {
  dbModel
    .findByPk(req.params.id)
    .then((retExam) => {
      if (!retExam) {
        res.send({ message: 'No exam found with id = ' + req.params.id });
        return;
      }
      // update exam fields
      dbModel
        .update(req.body, { where: { id: req.params.id } })
        .then(async (ret) => {
          // delete all qbposts and their qfields
          await models.QbPost.destroy({ where: { examId: req.params.id } });
          console.log('creating qbpost', req.body.qbposts);
          if (!req.body.qbposts) {
            res.send({ message: 'Exam updated without qbposts' });
            return;
          }
          req.body.qbposts.forEach(async (item) => {
            retExam.createQuestion(item).then((retQbPost) => {
              if (!item.qfields) {
                return;
              }
              item.qfields.forEach(async (itemQfield) => {
                await retQbPost.createQfield(itemQfield);
              });
            });
          });
          // create qbposts
          res.send({ message: 'exam updated' });
        });
    })
    .catch((err) => {
      res.send('error', err);
    });
};

function convertCommaStringToArray(mString) {
  let tagArray;
  let tempString = mString;
  if (
    mString.substring(0, 1) == '[' &&
    mString.substring(mString.length - 1) == ']'
  ) {
    tempString = mString.slice(1, -1);
  }
  tagArray = tempString.split(',');
  if (Array.isArray(tagArray))
    tagArray.forEach((item, i) => {
      tagArray[i] = item.trim();
    });
  return tagArray;
}

function convertArrayToCommaString(mArray) {
  let mString = '';
  if (!Array.isArray(mArray)) {
    return '';
  }
  mArray.forEach((item, i) => {
    console.log('i == ', mArray.length + '|' + item + '|');
    item = item.trim();
    if (item != '') {
      mString += item;
      if (i < mArray.length - 1) {
        mString += ',';
      }
    }
  });
  return mString;
}
