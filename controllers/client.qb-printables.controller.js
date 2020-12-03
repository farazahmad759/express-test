const Sequelize = require('sequelize');
const models = require('../models/index.js');
const Op = Sequelize.Op;
const dbModel = models.QbPrintable;
const modelName = 'QbPrintable';
const { validationResult } = require('express-validator');

/**
 * @route /
 * @method GET
 * @description Fetch all Records, and show them in a View
 * @param {json} req
 * @param {json} res
 */
exports.index = (req, res) => {
  let filterQuery = {};
  let filterIncludes = [];
  let filterOrder = [['_title', 'ASC']];
  if (req.query.filterOrder) {
    filterOrder = req.query.filterOrder;
    filterOrder.forEach((item, i) => {
      filterOrder[i] = JSON.parse(item);
    });
  }

  if (req.query.filterIds) {
    filterQuery['id'] = { [Op.in]: `${req.query.filterIds}` };
  }
  if (req.query.filterTitle) {
    filterQuery['_title'] = { [Op.like]: `%${req.query.filterTitle}%` };
  }

  if (req.query.includeSyllabuses) {
  }
  dbModel
    .findAndCountAll({
      where: { ...filterQuery },
      include: [...filterIncludes],
      order: [...filterOrder],
      distinct: true,
      subQuery: false,
    })
    .then((ret) => {
      res.send({
        status: 'success',
        message: ret.count + ' ' + modelName + '(s) found.',
        error: null,
        count: ret.count,
        data: ret.rows,
      });
    })
    .catch((err) => {
      res.send({
        status: 'success',
        message: null,
        error: err,
        count: null,
        data: [],
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
    status: 'success',
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
exports.store = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  dbModel
    .create(req.body, {})
    .then((ret) => {
      res.send({
        status: 'success',
        message: modelName + ' created successfully with ID = ' + ret.id,
        error: null,
        count: null,
        data: ret.id,
      });
    })
    .catch((err) => {
      res.send({
        status: 'error',
        message: null,
        error: err,
        count: null,
        data: [],
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
exports.show = (req, res) => {};

/**
 * @route /:id/edit
 * @method GET
 * @description Show the view to Edit the Record
 * @param {json} req
 * @param {json} res
 */
exports.edit = (req, res) => {
  res.send({
    status: 'success',
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
exports.update = async (req, res) => {
  dbModel
    .update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then(async (id) => {
      res.send({
        status: 'success',
        message: modelName + ' updated successfully with ID = ' + req.params.id,
        error: null,
        count: null,
        data: req.body,
      });
    })
    .catch((err) => {
      res.send({
        status: 'success',
        message: modelName + ' could not update with ID = ' + id,
        error: err,
        count: null,
        data: req.body,
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
        status: 'success',
        message: modelName + ' deleted successfully with ID = ' + req.params.id,
        error: null,
        count: null,
        data: id,
      });
    });
};

/**
 * @route /regularExam
 * @method GET
 * @description Create RegularExam
 * @param {json} req
 * @param {json} res
 */
exports.regularExam = async (req, res) => {
  let filterQuery = {};
  let filterIncludes = [];
  let filterOrder = [];
  //   {
  //     "_grade_ids": [3, 2],
  //     "_subject_ids": [1, 2],
  //     "_boardyear_ids": [59],
  //     "_topic_ids": [],
  //     "_questiontypes_dep": [
  //       {
  //         "id": 2,
  //         "frontend_totalQuestions": 2,
  //         "frontend_optionalQuestions": 0,
  //         "frontend_marksPerQuestion": 2
  //       },
  //       {
  //         "id": 12,
  //         "frontend_totalQuestions": 10,
  //         "frontend_optionalQuestions": 0,
  //         "frontend_marksPerQuestion": 2
  //       }
  //     ],
  //     "initialQuestions": [
  //         {
  //             "0": "hello"
  //         },
  //         {
  //             "1": "1"
  //         }
  //     ]
  // }

  if (req.body._grade_ids && req.body._grade_ids.length > 0) {
    filterQuery['_grade_id'] = { [Op.in]: req.body._grade_ids };
  }
  if (req.body._subject_ids && req.body._subject_ids.length > 0) {
    filterQuery['_subject_id'] = { [Op.in]: req.body._subject_ids };
  }
  if (req.body._boardyear_ids && req.body._boardyear_ids.length > 0) {
    filterIncludes.push({
      association: models.QbQuestion.associations['assoc_boardyears'],
      through: { attributes: [] },
      attributes: [],
      required: true,
    });
    filterQuery['$assoc_boardyears.id$'] = {
      [Op.in]: req.body._boardyear_ids,
    };
  }
  if (req.body._topic_ids && req.body._topic_ids.length > 0) {
    let allTopics = req.body._topic_ids;
    let parentTopics = req.body._topic_ids;
    for (let i = 0; (topicDepth = 2), i < topicDepth; i++) {
      let childTopics = await models.QbTopic.findAll({
        where: {
          _type: '_topic',
          _parent_id: {
            [Op.in]: parentTopics,
          },
        },
      });
      childTopics = childTopics.map((a) => a.id);
      allTopics = [...allTopics, ...childTopics];
      parentTopics = childTopics;
    }

    filterQuery['$assoc_topics.id$'] = {
      [Op.in]: [...allTopics],
    };

    filterIncludes.push({
      association: models.QbQuestion.associations['assoc_topics'],
      through: { attributes: [] },
      attributes: [],
      required: true,
    });
  }

  let allCount = req.body.initialQuestions ? 0 : 0;
  let allRows = req.body.initialQuestions ? req.body.initialQuestions : {};
  // allRows.sort(
  //   (a, b) =>
  //     parseInt(a._questiontype_ind_id) - parseInt(b._questiontype_ind_id)
  // ); questionTypes_dep can be sorted here????
  if (req.body._questiontypes_dep) {
    for (let i = 0; i < req.body._questiontypes_dep.length; i++) {
      allRows[req.body._questiontypes_dep[i].id] = allRows[
        req.body._questiontypes_dep[i].id
      ]
        ? allRows[req.body._questiontypes_dep[i].id]
        : [];
      filterQuery['_questiontype_dep_id'] = {
        [Op.eq]: req.body._questiontypes_dep[i].id,
      };

      let ret = await models.QbQuestion.findAndCountAll({
        where: { ...filterQuery },
        include: [...filterIncludes],
        subQuery: false,
        distinct: true,
        limit: req.body._questiontypes_dep[i].frontend_totalQuestions,
      });
      allCount += ret.rows.length;
      allRows[req.body._questiontypes_dep[i].id] = {
        info: req.body._questiontypes_dep[i],
        questions:
          allRows[req.body._questiontypes_dep[i].id].construtor ===
          [].constructor
            ? [
                ...allRows[req.body._questiontypes_dep[i].id].questions,
                ...ret.rows,
              ]
            : [...ret.rows],
      };
    }
  }

  res.send({
    status: 'success',
    message: 'exam questions fetched',
    error: null,
    count: allCount,
    data: allRows,
  });
};
