const Sequelize = require('sequelize');
const models = require('../models/index.js');
const { fn, col, cast } = models.sequelize;
const Op = Sequelize.Op;
const dbModel = models.QbPost;
const modelName = 'QbPost';
const { validationResult } = require('express-validator');
const util = require('util');
const { orQueryConstructor } = require('./../functions/functions');
/**
 * @route /
 * @method GET
 * @description Fetch all Records, and show them in a View
 * @param {json} req
 * @param {json} res
 */
exports.index = async (req, res) => {
  let filterQuery = {};
  let OpAndQuery = [];
  let includes = [];
  filterQuery['__type'] = '__question';
  if (req.query.filterIds) {
    filterQuery['id'] = { [Op.in]: req.query.filterIds };
  }
  if (req.query.filterStatement) {
    filterQuery['content.__statements.__en'] = {
      [Op.like]: `%${req.query.filterStatement}%`,
    };
  }
  if (req.query.choiceText) {
    let hhh = [];
    for (var i = 0; i < 2; i++) {
      hhh.push({
        ['content']: {
          __en: {
            __choices: {
              [i]: {
                title: {
                  [Op.like]: `%${req.query.choiceText}%`,
                },
              },
            },
          },
        },
      });
    }
    filterQuery = {
      ...filterQuery,
      [Op.or]: [...hhh],
    };
  }
  if (req.query.filterSearch) {
    filterQuery['title'] = { [Op.like]: `%${req.query.filterSearch}%` };
  }
  if (req.query.filterQuestionTypes) {
    filterQuery['type'] = { [Op.in]: req.query.filterQuestionTypes };
  }
  if (req.query.filterGrades) {
    // filterQuery['$grades.id$'] = { [Op.in]: req.query.filterGrades };
    let hhh = orQueryConstructor(
      '__misc.__associations.__grades',
      req.query.filterGrades
    );
    OpAndQuery = [...OpAndQuery, { [Op.or]: hhh }];
  }
  if (req.query.filterSubjects) {
    // filterQuery['$subjects.id$'] = { [Op.in]: req.query.filterSubjects };
    let hhh = orQueryConstructor(
      '__misc.__associations.__subjects',
      req.query.filterSubjects
    );
    console.log(
      'filterQuery === before grades = ',
      util.inspect(filterQuery, false, null, true)
    );
    OpAndQuery = [...OpAndQuery, { [Op.or]: hhh }];
    console.log(
      'filterQuery === after subjects = ',
      util.inspect(filterQuery, false, null, true)
    );
  }
  if (req.query.filterDifficulty) {
    req.query.filterDifficulty[0] = parseInt(req.query.filterDifficulty[0]);
    req.query.filterDifficulty[1] = parseInt(req.query.filterDifficulty[1]);
    filterQuery['__misc.__difficulty'] = {
      [Op.between]: req.query.filterDifficulty,
    };
    console.log(req.query.filterDifficulty);
  }
  if (req.query.filterBoardyearsCount) {
    req.query.filterBoardyearsCount[0] = parseInt(
      req.query.filterBoardyearsCount[0]
    );
    req.query.filterBoardyearsCount[1] = parseInt(
      req.query.filterBoardyearsCount[1]
    );
    filterQuery['__misc.__boardyears_count'] = {
      [Op.between]: req.query.filterBoardyearsCount,
    };
    console.log(req.query.filterBoardyearsCount);
  }
  if (req.query.filterTopics) {
    let allTopics = req.query.filterTopics;
    let parentTopics = req.query.filterTopics;
    for (let i = 0; (topicDepth = 2), i < topicDepth; i++) {
      let childTopics = await models.Tag.findAll({
        where: {
          __type: '__topic',
          __parentId: {
            [Op.in]: parentTopics,
          },
        },
      });
      childTopics = childTopics.map((a) => a.id);
      allTopics = [...allTopics, ...childTopics];
      parentTopics = childTopics;
    }
    filterQuery['$topics.id$'] = {
      [Op.in]: [...allTopics],
    };
  }
  if (req.query.filterExercises) {
    filterQuery['$exercises.id$'] = { [Op.in]: req.query.filterExercises };
  }
  if (req.query.filterBoardyears) {
    // filterQuery['$boardyears.id$'] = { [Op.in]: req.query.filterBoardyears };
    let hhh = orQueryConstructor(
      '__misc.__associations.__boardyears',
      req.query.filterBoardyears
    );
    OpAndQuery = [...OpAndQuery, { [Op.or]: hhh }];
  }
  if (req.query.filterSyllabuses) {
    filterQuery['$syllabuses.id$'] = { [Op.in]: req.query.filterSyllabuses };
  }
  if (req.query.category1) {
    filterQuery['category1'] = req.query.category1;
  }
  if (req.query.category2) {
    filterQuery['category2'] = req.query.category2;
  }
  if (req.query.category3) {
    filterQuery['category3'] = req.query.category3;
  }
  if (req.query.category4) {
    filterQuery['category4'] = req.query.category4;
  }
  if (req.query.__lang) {
    // filterQuery[`content`] = {
    //   questions: { ['0']: { __lang: '__en' } },
    // };
    // filterQuery[`content`] = {
    //   __en: { [Op.ne]: null },
    // };
    filterQuery[`content`] = {
      __statements: { [req.query.__lang]: { [Op.ne]: null } },
    };
  }
  if (req.query.filterAssociationIds) {
    let hhh = orQueryConstructor(
      '__misc.__associations.__associationIds',
      req.query.filterAssociationIds
    );
    OpAndQuery = [...OpAndQuery, { [Op.or]: hhh }];
  }
  if (req.query.includeQuestionTypes) {
    includes.push({
      association: models.QbPost.associations['question_types'],
      through: { attributes: [] },
      attributes: ['id', 'title'],
      required: req.query.includeQuestionTypes == 'true' ? true : false,
      // where: { __type: '__grade' },
    });
    includes.push({
      association: models.QbPost.associations['types'],
      attributes: ['id', 'title'],
      required: req.query.includeQuestionTypes == 'true' ? true : false,
      // include: [{
      //   attributes: ['id', 'title'],
      //   association: models.Tag.associations['descendents'],
      //   required:true,
      //   distinct:true,
      // }] // this nested include creates problem with LIMIT
      // where: { __type: '__grade' },
    });
  }
  if (req.query.includeGrades) {
    includes.push({
      association: models.QbPost.associations['grades'],
      through: { attributes: [] },
      attributes: ['id', 'title'],
      required: req.query.includeGrades == 'true' ? true : false,
      // separate: true,
      // where: { __type: '__grade', id: { [Op.in]: req.query.filterGrades } },
    });
    console.log('included ======================================');
  }
  if (req.query.includeSubjects) {
    includes.push({
      association: models.QbPost.associations['subjects'],
      through: { attributes: [] },
      attributes: ['id', '__type'],
      required: req.query.includeSubjects == 'true' ? true : false,
      // where: { __type: '__subject', id: { [Op.in]: req.query.filterGrades } },
    });
    // filterQuery['$ancestors.id$'] = { [Op.eq]: 3 };
  }
  if (
    req.query.includeTopics ||
    req.query.filterTopics ||
    req.query.filterTopicSyllabuses
  ) {
    let whereTopicSyllabuses = {};
    let topicIncludes = [];
    if (req.query.filterTopicSyllabuses) {
      req.query.includeTopics = 'true';
      whereTopicSyllabuses = {
        ...whereTopicSyllabuses,
        ['id']: { [Op.in]: req.query.filterTopicSyllabuses },
      };
      topicIncludes.push({
        association: models.Tag.associations['syllabuses'],
        attributes: ['id'],
        where: { ...whereTopicSyllabuses },
      });
    }
    includes.push({
      association: models.QbPost.associations['topics'],
      through: { attributes: [] },
      attributes: ['id', 'title'],
      required: req.query.includeTopics == 'true' ? true : false,
      include: [...topicIncludes],
      // where: { __type: '__grade' },
    });
  }
  if (req.query.includeExercises) {
    includes.push({
      association: models.QbPost.associations['exercises'],
      through: { attributes: [] },
      attributes: ['id', 'title'],
      required: req.query.includeExercises == 'true' ? true : false,
      // where: { __type: '__grade' },
    });
  }
  if (req.query.includeBoardyears) {
    includes.push({
      association: models.QbPost.associations['boardyears'],
      through: { attributes: [] },
      attributes: ['id', 'title'],
      required: req.query.includeBoardyears == 'true' ? true : false,
      // where: { __type: '__grade' },
    });
  }
  if (req.query.includeSyllabuses) {
    includes.push({
      association: models.QbPost.associations['syllabuses'],
      through: { attributes: [] },
      attributes: ['id', 'title', '__shortcode'],
      required: req.query.includeSyllabuses == 'true' ? true : false,
      where: { __type: '__syllabus' },
    });
  }
  // filterQuery = {
  //   ...filterQuery,
  //   [Op.and]: [...OpAndQuery],
  // };
  // console.log(
  //   '===========================',
  //   util.inspect(filterQuery, false, null, true)
  // );
  dbModel
    .findAndCountAll({
      subQuery: false,
      where: {
        ...filterQuery,
        [Op.and]: [...OpAndQuery],
        // '$grades.id$': { [Op.in]: [1, 2, 3, 4, 5, 6, 7] },
      },
      distinct: true,
      attributes: ['id', 'type', 'content', '__misc'],
      // attributes: ['__misc'],
      // order: [['ancestors', 'id', 'ASC']],
      include: [
        ...includes,
        // {
        //   model: models.QbPost,
        //   as: 'ancestors',
        //   through: { attributes: [] },
        //   required: false,
        //   attributes: ['id', 'content', '__misc', '__type'],
        //   where: {
        //     [Op.or]: [
        //       {
        //         __type: {
        //           [Op['eq']]: '__passage',
        //         },
        //       },
        //     ],
        //   },
        // },
        // {
        //   model: models.Tag,
        //   as: 'grades',
        //   through: { attributes: [] },
        //   attributes: ['id', 'title', '__misc'],
        //   where: {
        //     [Op.or]: [
        //       {
        //         '__misc.syllabus': {
        //           [Op['in']]: [5, 7],
        //         },
        //       },
        //     ],
        //   },
        // },
        // {
        //   model: models.Tag,
        //   as: 'boardyears',
        //   attributes: ['id', 'title', '__misc'],
        //   where: {
        //     [Op.or]: [
        //       {
        //         __type: {
        //           [Op['like']]: '%__boardyear%',
        //         },
        //       },
        //     ],
        //   },
        // },
      ],
      limit: req.query.filterLimit ? parseInt(req.query.filterLimit) : 30,
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
        error: err,
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
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({ errors: errors.array() });
  // }
  let __associations = construct__miscAssociations(
    req.body.type,
    req.body.__grades,
    req.body.__subjects,
    req.body.__topics,
    req.body.__boardyears
  );

  req.body.__misc = { ...req.body.__misc, __associations };
  let reqBody = req.body;
  console.log('attempting to update question', req.body.__misc);
  dbModel.create(reqBody).then((ret) => {
    // req.body.qfields.forEach(async (item) => {
    //   await ret.createQfield(item).then((ret2) => {
    //     console.log('added');
    //   });
    // });
    if (req.body.__question_types && req.body.__question_types.length > 0) {
      ret.setQuestion_types(req.body.__question_types);
      // console.log('=========================== ', req.body.__question_types);
    }
    if (req.body.__grades && req.body.__grades.length > 0) {
      ret.setGrades(req.body.__grades);
      console.log('=========================== ', req.body.__grades);
    }
    if (req.body.__subjects && req.body.__subjects.length > 0) {
      ret.setSubjects(req.body.__subjects);
    }
    if (req.body.__topics && req.body.__topics.length > 0) {
      ret.setTopics(req.body.__topics);
    }
    if (req.body.__exercises && req.body.__exercises.length > 0) {
      ret.setExercises(req.body.__exercises);
    }
    if (req.body.__boardyears && req.body.__boardyears.length > 0) {
      ret.setBoardyears(req.body.__boardyears);
    }
    if (req.body.__syllabuses && req.body.__syllabuses.length > 0) {
      ret.setSyllabuses(req.body.__syllabuses);
    }
    res.send([{ message: 'created successfully' }, { ret: req.body.qfields }]);
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
  let whereQuery = {};
  let includes = [];
  whereQuery['id'] = req.params.id;
  if (req.query.includeQuestionTypes) {
    includes.push({
      association: models.QbPost.associations['question_types'],
      through: { attributes: [] },
      attributes: ['id', 'title'],
      required: req.query.includeGrades == 'true' ? true : false,
      // where: { __type: '__grade' },
    });
  }
  if (req.query.includeGrades) {
    includes.push({
      association: models.QbPost.associations['grades'],
      through: { attributes: [] },
      attributes: ['id', 'title'],
      required: req.query.includeGrades == 'true' ? true : false,
      // where: { __type: '__grade' },
    });
  }
  if (req.query.includeSubjects) {
    includes.push({
      association: models.QbPost.associations['subjects'],
      through: { attributes: [] },
      attributes: ['id', '__type'],
      required: req.query.includeSubjects == 'true' ? true : false,
      where: { __type: '__subject' },
    });
    // whereQuery['$ancestors.id$'] = { [Op.eq]: 3 };
  }
  if (req.query.includeTopics) {
    includes.push({
      association: models.QbPost.associations['topics'],
      through: { attributes: [] },
      attributes: ['id', 'title'],
      required: req.query.includeTopics == 'true' ? true : false,
      // where: { __type: '__grade' },
    });
  }
  if (req.query.includeExercises) {
    includes.push({
      association: models.QbPost.associations['exercises'],
      through: { attributes: [] },
      attributes: ['id', 'title'],
      required: req.query.includeExercises == 'true' ? true : false,
      // where: { __type: '__grade' },
    });
  }
  if (req.query.includeBoardyears) {
    includes.push({
      association: models.QbPost.associations['boardyears'],
      through: { attributes: [] },
      attributes: ['id', 'title'],
      required: req.query.includeBoardyears == 'true' ? true : false,
      // where: { __type: '__grade' },
    });
  }
  if (req.query.includeSyllabuses) {
    includes.push({
      association: models.QbPost.associations['syllabuses'],
      through: { attributes: [] },
      attributes: ['id', 'title', '__shortcode'],
      required: req.query.includeSyllabuses == 'true' ? true : false,
      where: { __type: '__syllabus' },
    });
  }
  dbModel
    .findAll({
      attributes: {
        include: [
          'id',
          '__gradesArray',
          '__subjectsArray',
          '__syllabusesArray',
        ],
      },
      where: { ...whereQuery },
      include: [...includes],
      // limit:1
    })
    .then((ret) => {
      if (ret === null) {
        res.send({
          status: 'error',
          message: 'No ' + modelName + ' with ID = ' + req.params.id + ' found',
          data: null,
        });
      } else {
        res.send({
          status: 'success',
          message: modelName + ' with ID = ' + req.params.id + ' has found',
          data: ret[0],
        });
      }
    })
    .catch((err) => {
      res.send({
        status: 'error',
        message:
          'No ' +
          modelName +
          ' with ID = ' +
          req.params.id +
          ' found. Error Details:' +
          err,
      });
    });
  // dbModel
  //   .findByPk(req.params.id)
  //   .then((ret) => {
  //     if (ret === null) {
  //       res.send({
  //         status: '404',
  //         message: 'No ' + modelName + ' with ID = ' + req.params.id + ' found',
  //       });
  //     } else {
  //       res.send({
  //         status: '200',
  //         message: modelName + ' with ID = ' + ret.id + ' has found',
  //         data: ret,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.send({
  //       status: '404',
  //       message:
  //         'No ' +
  //         modelName +
  //         'with ID = ' +
  //         ret.id +
  //         ' found. Error Details:' +
  //         err,
  //     });
  //   });
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
  let reqBody = req.body;
  dbModel
    .update(reqBody, {
      where: {
        id: req.params.id,
      },
    })
    .then(async (id) => {
      dbModel
        .findOne({
          where: {
            id: req.params.id,
          },
        })
        .then((ret) => {
          if (
            req.body.__question_types &&
            req.body.__question_types.length > 0
          ) {
            ret.setQuestion_types(req.body.__question_types);
            // console.log('=========================== ', req.body.__question_types);
          }
          if (req.body.__grades && req.body.__grades.length > 0) {
            ret.setGrades(req.body.__grades);
            // console.log('=========================== ', req.body.__grades);
          }
          if (req.body.__subjects && req.body.__subjects.length > 0) {
            ret.setSubjects(req.body.__subjects);
          }
          if (req.body.__topics && req.body.__topics.length > 0) {
            ret.setTopics(req.body.__topics);
          }
          if (req.body.__exercises && req.body.__exercises.length > 0) {
            ret.setExercises(req.body.__exercises);
          }
          if (req.body.__boardyears && req.body.__boardyears.length > 0) {
            ret.setBoardyears(req.body.__boardyears);
          }
          if (req.body.__syllabuses && req.body.__syllabuses.length > 0) {
            ret.setSyllabuses(req.body.__syllabuses);
          }
        });
      res.send({
        status: 'success',
        message: modelName + ' updated successfully with ID = ' + id,
        data: id,
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

// ***************
// CUSTOM
// ***************
/**
 * @route /bulkCreate
 * @method POST
 * @description Save array of Records in database
 * @param {json} req
 * @param {json} res
 */
exports.bulkCreate = (req, res) => {
  console.log(req.body);
  let reqBody = req.body;
  dbModel.bulkCreate(reqBody).then((ret) => {
    res.send({
      status: '200',
      message: modelName + '(s) created successfully',
      data: ret,
    });
  });
};

exports.dummy = (req, res) => {
  dbModel.findOne({ where: {} }, { include: models.Exam }).then(async (ret) => {
    // let exam = await ret.getExam();
    res.send([{ message: 'Congrats again' }, { ret }]);
  });
};
exports.updateQuestionType = async (req, res) => {
  models.QbSyllabus.findAndCountAll({
    where: { _created_at: null },
    // attributes: ['_misc'],
    order: [['id', 'asc']],
    limit: 5,
  })
    .then((ret) => {
      res.send({ data: ret.rows });
    })
    .catch((err) => {
      res.send({ error: err, whichError: 'i dono' });
    });
  // for (let i = 0; i < 10; i++) {
  //   // all;
  // }
};

function construct__miscAssociations(
  type,
  __grades,
  __subjects,
  __topics,
  __boardyears
) {
  __associationIds = ',';
  __associations = {};
  if (type) {
    __associationIds += type + ',';
    __associations = { ...__associations, type: `,${type},` };
  }
  if (__grades) {
    let temp = ',';
    __grades.forEach((item) => {
      temp += item + ',';
      __associationIds += item + ',';
    });
    __associations = { ...__associations, __grades: temp };
  }
  if (__subjects) {
    let temp = ',';
    __subjects.forEach((item) => {
      temp += item + ',';
      __associationIds += item + ',';
    });
    __associations = { ...__associations, __subjects: temp };
  }
  if (__topics && typeof __topics == typeof []) {
    let temp = ',';
    for (let i = 0; i < __topics.length; i++) {
      temp += __topics[i] + ',';
      __associationIds += __topics[i] + ',';
    }
    __associations = { ...__associations, __topics: temp };
  }
  if (__boardyears && typeof __boardyears == typeof []) {
    let temp = ',';
    for (let i = 0; i < __boardyears.length; i++) {
      temp += __boardyears[i] + ',';
      __associationIds += __boardyears[i] + ',';
    }
    __associations = { ...__associations, __boardyears: temp };
  }
  __associations = { ...__associations, __associationIds };
  console.log(
    '====================__associations',
    type,
    __grades,
    __subjects,
    __topics,
    __boardyears,
    __associations
  );
  return __associations;
}
