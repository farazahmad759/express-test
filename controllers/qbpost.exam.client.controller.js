const Sequelize = require('sequelize');
const models = require('../models/index.js');
const Op = Sequelize.Op;
const dbModel = models.QbPost;
const modelName = 'QbPost';
const { validationResult } = require('express-validator');
const { orQueryConstructor } = require('./../functions/functions');

/**
 * @route /
 * @method GET
 * @description Fetch all Records by Question Type
 * @param {json} req
 * @param {json} res
 */
exports.findQuestionsByQuestionType = (req, res) => {
  let whereQuery = {};
  whereQuery['id'] = req.query.ids;

  models.Tag.findAndCountAll({
    where: {
      __type: '__post_supertype',
    },
    include: [
      {
        association: models.Tag.associations['question_type_qbposts'],
      },
    ],
    limit: 5,
  })
    .then((ret) => {
      res.send({
        status: '200',
        message: 'Your search fetched the following ' + modelName + '(s)',
        count: ret.count,
        data: ret.rows,
      });
    })
    .catch((err) => {
      res.send({
        status: '400',
        message: 'Error occured',
        count: 0,
        results: [],
        error: err,
      });
    });
};

/**
 * @route /
 * @method GET
 * @description Fetch all Records by Board Year
 * @param {json} req
 * @param {json} res
 */
exports.findQuestionsByBoardyear = (req, res) => {
  let whereQuery = {};
  let includes = [];
  let whereQueryForQuestions = {};
  let includesForQuestions = {};
  let OpAndQueryForQuestions = [];
  // --- construct whereQuery
  if (req.query.ids) {
    whereQuery['id'] = { [Op.in]: req.query.ids };
  }
  if (req.query.title) {
    whereQuery['title'] = { [Op.like]: `%${req.query.title}%` };
  }
  // end construct whereQuery
  // --- construct includes
  if (req.query.includeQuestions) {
  }
  // end construct includes

  // --- construct whereQueryForQuestions
  if (req.query.filterQuestionGrades) {
    let hhh = orQueryConstructor(
      '__misc.__associations.__grades',
      req.query.filterQuestionGrades
    );
    OpAndQueryForQuestions = [...OpAndQueryForQuestions, { [Op.or]: hhh }];
  }
  if (req.query.filterQuestionSubjects) {
    let hhh = orQueryConstructor(
      '__misc.__associations.__subjects',
      req.query.filterQuestionSubjects
    );
    OpAndQueryForQuestions = [...OpAndQueryForQuestions, { [Op.or]: hhh }];
  }
  if (req.query.filterQuestionTopics) {
    let hhh = orQueryConstructor(
      '__misc.__associations.__topics',
      req.query.filterQuestionTopics
    );
    OpAndQueryForQuestions = [...OpAndQueryForQuestions, { [Op.or]: hhh }];
  }
  if (req.query.filterQuestionTypes) {
    let hhh = orQueryConstructor(
      '__misc.__associations.type',
      req.query.filterQuestionTypes
    );
    OpAndQueryForQuestions = [...OpAndQueryForQuestions, { [Op.or]: hhh }];
  }
  // end construct whereQueryForQuestions
  models.Tag.findAndCountAll({
    where: {
      ...whereQuery,
      __type: '__boardyear',
    },
    attributes: ['title'],
    include: [
      ...includes,
      {
        association: models.Tag.associations['boardyear_qbposts'],
        required: req.query.includeQuestions === 'true' ? true : false,
        attributes: ['type', 'content', '__misc'],
        where: {
          ...whereQueryForQuestions,
          [Op.and]: [...OpAndQueryForQuestions],
        },
        include: [
          {
            association: models.QbPost.associations['question_types'],
          },
        ],
      },
    ],
    subQuery: false,
    distinct: true,
    order: [
      ['title', 'asc'],
      ['boardyear_qbposts', 'question_types', '__tttFormat', 'asc'],
    ],
    // limit: 5,
  })
    .then((ret) => {
      res.send({
        status: '200',
        message: 'Your search fetched the following ' + modelName + '(s)',
        count: ret.count,
        data: ret.rows,
      });
    })
    .catch((err) => {
      res.send({
        status: '400',
        message: 'Error occured',
        count: 0,
        data: [],
        error: err,
      });
    });
};

/**
 * @route /
 * @method GET
 * @description Fetch all Records by Topic
 * @param {json} req
 * @param {json} res
 */
exports.findQuestionsByTopic = (req, res) => {
  dbModel
    .findAndCountAll({
      limit: 5,
    })
    .then((ret) => {
      res.send({
        status: '200',
        message: 'Your search fetched the following ' + modelName + '(s)',
        count: ret.count,
        data: ret.rows,
      });
    })
    .catch((err) => {
      res.send({
        status: '400',
        message: 'Error occured',
        count: 0,
        data: [],
        error: err,
      });
    });
};
