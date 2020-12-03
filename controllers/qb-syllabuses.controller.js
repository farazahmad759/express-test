const Sequelize = require('sequelize');
const models = require('../models/index.js');
const Op = Sequelize.Op;
const dbModel = models.Tag;
const modelName = 'Tag';
const { validationResult } = require('express-validator');

/**
 * @route /
 * @method GET
 * @description Fetch all Records, and show them in a View
 * @param {json} req
 * @param {json} res
 */
exports.index = (req, res) => {
  let whereQuery = {};
  let includes = [];
  console.log('query', req.query);
  // whereQuery['__misc'] = {__statements: { ['0']: { __lang: '__en' } }};
  // whereQuery['__misc'] = {__statements: { [Op.in]: { __lang: '__en' } }};

  if (req.query.__type) {
    if (req.query.__type.constructor == [].constructor) {
      whereQuery['__type'] = { [Op.in]: req.query.__type };
    } else {
      whereQuery['__type'] = { [Op.like]: `%${req.query.__type}%` };
    }
  }
  if (req.query.filterSearch) {
    let filterSearch = [
      { ['title']: { [Op.like]: `%${req.query.filterSearch}%` } },
      { ['__shortcode']: { [Op.like]: `%${req.query.filterSearch}%` } },
    ];
    if (req.query.includeSyllabuses) {
      filterSearch = [
        ...filterSearch,
        {
          ['$syllabuses.title$']: {
            [Op.like]: `%${req.query.filterSearch}%`,
          },
        },
        {
          ['$syllabuses.__shortcode$']: {
            [Op.like]: `%${req.query.filterSearch}%`,
          },
        },
      ];
    }
    whereQuery = { ...whereQuery, [Op.or]: [...filterSearch] };
  }
  if (req.query.filter__tttFormatsArray) {
    whereQuery['__tttFormat'] = { [Op.in]: req.query.filter__tttFormatsArray };
  }
  if (req.query.filter__shortcodesArray) {
    whereQuery['__shortcode'] = { [Op.in]: req.query.filter__shortcodesArray };
  }
  if (req.query.filterGrades) {
    whereQuery['$grades.id$'] = { [Op.in]: req.query.filterGrades };
  }
  if (req.query.filterSubjects) {
    whereQuery['$subjects.id$'] = { [Op.in]: req.query.filterSubjects };
  }
  if (req.query.filterSyllabuses) {
    whereQuery['$syllabuses.id$'] = { [Op.in]: req.query.filterSyllabuses };
  }
  if (req.query.title) {
    whereQuery['title'] = { [Op.like]: `%${req.query.title}%` };
  }
  if (req.query.__shortcode) {
    whereQuery['__shortcode'] = { [Op.like]: `%${req.query.__shortcode}%` };
  }
  if (req.query.category1) {
    whereQuery['__misc.category1'] = { [Op.eq]: req.query.category1 };
  }
  if (req.query.category2) {
    whereQuery['__misc.category2'] = { [Op.eq]: req.query.category2 };
  }
  if (req.query.category3) {
    whereQuery['__misc.category3'] = { [Op.eq]: req.query.category3 };
  }
  if (req.query.category4) {
    whereQuery['__misc.category4'] = { [Op.eq]: req.query.category4 };
  }
  // ---------------------------------------------------------------
  // for __raw
  if (req.query.__raw_class_level_id) {
    whereQuery['__raw.class_level_id'] = {
      [Op.eq]: req.query.__raw_class_level_id,
    };
  }
  if (req.query.__raw_s_id) {
    whereQuery['__raw.s_id'] = { [Op.eq]: req.query.__raw_s_id };
  }
  if (req.query.__raw_q_type_id) {
    whereQuery['__raw.q_type_id'] = { [Op.eq]: req.query.__raw_q_type_id };
  }
  // end for __raw
  // ---------------------------------------------------------------
  if (req.query.excludeIds) {
    whereQuery['id'] = { [Op.notIn]: req.query.excludeIds };
  }
  if (req.query.showParent) {
    includes.push({
      model: models.Tag,
      as: 'parent',
      attributes: ['title'],
    });
  }
  if (req.query.includeParent) {
    includes.push({
      association: models.Tag.associations['parent'],
      attributes: ['id', 'title'],
    });
    // whereQuery['$parent.id$'] = { [Op.eq]: 3 };
  }
  if (req.query.includeAncestors) {
    includes.push({
      association: models.Tag.associations['ancestors'],
      attributes: ['id'],
      required: req.query.includeAncestors == 'true' ? true : false,
    });
    // whereQuery['$ancestors.id$'] = { [Op.eq]: 3 };
  }
  if (req.query.includeDescendents) {
    let whereDescendentGrades = {};
    let whereDescendentSubjects = {};
    let whereDescendentSyllabuses = {};
    let descendentIncludes = [];
    // workaround #1
    // only few items are shown when either filterDescendentGrades or filterDescendentSubjects
    // is not set, despite many items meeting the criteria. The problem is actually associated
    // with 'order' portion of the query
    if (
      !req.query.filterDescendentGrades ||
      !req.query.filterDescendentSubjects
    ) {
      req.query.filterLimit = 100;
    }
    // workaround #1 ends
    if (req.query.filterDescendentGrades) {
      whereDescendentGrades = {
        ...whereDescendentGrades,
        ['id']: { [Op.in]: req.query.filterDescendentGrades },
      };
      descendentIncludes.push({
        association: models.Tag.associations['grades'],
        attributes: ['id'],
        where: { ...whereDescendentGrades },
      });
    }
    if (req.query.filterDescendentSubjects) {
      whereDescendentSubjects = {
        ...whereDescendentSubjects,
        ['id']: { [Op.in]: req.query.filterDescendentSubjects },
      };
      descendentIncludes.push({
        association: models.Tag.associations['subjects'],
        attributes: ['id'],
        where: { ...whereDescendentSubjects },
      });
    }
    if (req.query.filterDescendentSyllabuses) {
      whereDescendentSyllabuses = {
        ...whereDescendentSyllabuses,
        ['id']: { [Op.in]: req.query.filterDescendentSyllabuses },
      };
      descendentIncludes.push({
        association: models.Tag.associations['syllabuses'],
        attributes: ['id'],
        where: { ...whereDescendentSyllabuses },
      });
    }
    includes.push({
      association: models.Tag.associations['descendents'],
      attributes: ['id', 'title', '__type', '__misc'],
      required: req.query.includeDescendents == 'true' ? true : false,
      include: [...descendentIncludes],
      // where: { 'grades.id': { [Op.in]: [749] } },
      // where: { '$descendents.__Tag_Tags.ancestorId$': 3, __type: '__chapter' },
    });
  }
  if (req.query.includeGrades || req.query.filterGrades) {
    includes.push({
      association: models.Tag.associations['grades'],
      attributes: ['id', 'title'],
      required: req.query.includeGrades == 'true' ? true : false,
      where: { __type: '__grade' },
    });
    // whereQuery['$grades.id$'] = { [Op.eq]: 1 };
  }
  if (req.query.includeSubjects || req.query.filterSubjects) {
    includes.push({
      association: models.Tag.associations['subjects'],
      attributes: ['id', '__type'],
      required: req.query.includeSubjects == 'true' ? true : false,
      where: { __type: '__subject' },
    });
    // whereQuery['$ancestors.id$'] = { [Op.eq]: 3 };
  }
  if (req.query.includeSyllabuses || req.query.filterSyllabuses) {
    includes.push({
      association: models.Tag.associations['syllabuses'],
      attributes: ['id', 'title', '__shortcode'],
      required: req.query.includeSyllabuses == 'true' ? true : false,
      where: { __type: '__syllabus' },
    });
  }

  if (req.query.includeTagQbPosts) {
    includes.push({
      association: models.Tag.associations['tag_qbposts'],
      attributes: ['content'],
      required: req.query.includeTagQbPosts == 'true' ? true : false,
      // where: { __type: { [Op.like]: '%__question%' } },
    });
  }
  if (req.query.includeQuestionTypeQbPosts) {
    includes.push({
      association: models.Tag.associations['question_type_qbposts'],
      attributes: ['content'],
      required: req.query.includeQuestionTypeQbPosts == 'true' ? true : false,
      // where: { __type: { [Op.like]: '%__question%' } },
    });
  }
  if (req.query.includeGradeQbPosts) {
    includes.push({
      association: models.Tag.associations['grade_qbposts'],
      attributes: ['content'],
      required: req.query.includeGradeQbPosts == 'true' ? true : false,
      // where: { __type: { [Op.like]: '%__question%' } },
    });
  }
  if (req.query.includeSubjectQbPosts) {
    includes.push({
      association: models.Tag.associations['subject_qbposts'],
      attributes: ['content'],
      required: req.query.includeSubjectQbPosts == 'true' ? true : false,
      // where: { __type: { [Op.like]: '%__question%' } },
    });
  }
  if (req.query.includeTopicQbPosts) {
    includes.push({
      association: models.Tag.associations['topic_qbposts'],
      attributes: ['content'],
      required: req.query.includeTopicQbPosts == 'true' ? true : false,
      // where: { __type: { [Op.like]: '%__question%' } },
    });
  }
  if (req.query.includeBoardyearQbPosts) {
    includes.push({
      association: models.Tag.associations['boardyear_qbposts'],
      attributes: ['content'],
      required: req.query.includeBoardyearQbPosts == 'true' ? true : false,
      // where: { __type: { [Op.like]: '%__question%' } },
    });
  }
  if (req.query.includeExerciseQbPosts) {
    includes.push({
      association: models.Tag.associations['exercise_qbposts'],
      attributes: ['content'],
      required: req.query.includeExerciseQbPosts == 'true' ? true : false,
      // where: { __type: { [Op.like]: '%__question%' } },
    });
  }
  if (req.query.includeSyllabusQbPosts) {
    includes.push({
      association: models.Tag.associations['syllabus_qbposts'],
      attributes: ['content'],
      required: req.query.includeSyllabusQbPosts == 'true' ? true : false,
      // where: { __type: { [Op.like]: '%__question%' } },
    });
  }

  let queryOrderBy = [
    ['id', 'asc'],
    ['__tttFormat', 'ASC'],
    ['title', 'ASC'],
  ];
  if (req.query.filterOrderBy) {
    queryOrderBy = req.query.filterOrderBy;
    queryOrderBy.forEach((item, i) => {
      queryOrderBy[i] = JSON.parse(item);
    });
    // queryOrderBy = [
    //   ['grades', 'id', 'asc'],
    //   ['__tttFormat', 'ASC'],
    //   ['title', 'ASC'],
    //   ];
  }
  console.log('associations = ', includes);
  dbModel
    .findAndCountAll({
      attributes: {
        include: [
          'id',
          ['id', 'key'],
          '__tttFormat',
          '__parentId',
          'title',
          'description',
          '__type',
          '__status',
          '__misc',
        ],
      },
      // attributes: ['id'],
      subQuery: false,
      where: {
        ...whereQuery,
        // '$ancestors.id$': { [Op.eq]: 3 },
        // '__misc.categories': { [Op.in]: ['1', '2'] },
      },
      // if below order key is removed, the workaround #1 is not needed
      order: [...queryOrderBy],
      include: [...includes],
      distinct: true,
      limit: req.query.filterLimit ? parseInt(req.query.filterLimit) : 200,
      offset:
        req.query.filterPage && req.query.filterLimit
          ? (parseInt(req.query.filterPage) - 1) *
            parseInt(req.query.filterLimit)
          : 0,
    })
    .then((ret) => {
      res.send({
        status: 'success',
        message: 'Your search fetched the following ' + modelName + '(s)',
        count: ret.count,
        data: ret.rows,
      });
    })
    .catch((err) => {
      res.send({ status: 'error', error: err });
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
  if (req.body.__parentId != null) {
    let _parent = await dbModel.findByPk(req.body.__parentId);
    req.body.__hierarchyLevel = _parent.__hierarchyLevel + 1;
  }
  let reqBody = req.body;
  console.log(reqBody);
  // reqBody.__Tag_Tags = [
  //   {
  //     gradeId:1,
  //     subjectId:1
  //   }
  // ]
  dbModel
    .create(reqBody, {
      // include: '__Tag_Tags'
    })
    .then((ret) => {
      if (req.body.descendents) {
        ret.setDescendents(req.body.descendents);
      }
      if (req.body.ancestors) {
        ret.setAncestors(req.body.ancestors);
      }
      if (req.body.__grades) {
        ret.setGrades(req.body.__grades); // Todo
        // ret.setGrades([{ancestorId:1, gradeId:2}]);
      }
      if (req.body.__subjects) {
        ret.setSubjects(req.body.__subjects);
      }
      if (req.body.__syllabuses) {
        ret.setSyllabuses(req.body.__syllabuses);
      }
      res.send({
        status: 'success',
        message: modelName + ' created successfully with ID = ' + ret.id,
        data: ret.id,
      });
    });
  // .catch(err=>{
  //   res.send({status: 'error', error:err, data:null});
  // });
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
  if (req.query.includeAncestors) {
    includes.push({
      association: models.Tag.associations['ancestors'],
      attributes: ['id', '__type'],
      required: req.query.includeAncestors == 'true' ? true : false,
      // where: { __type: '__subject' },
    });
    // whereQuery['$ancestors.id$'] = { [Op.eq]: 3 };
  }
  if (req.query.includeDescendents) {
    includes.push({
      association: models.Tag.associations['descendents'],
      attributes: ['id'],
      required: req.query.includeDescendents == 'true' ? true : false,
      // where: { '$descendents.__Tag_Tags.ancestorId$': 3, __type: '__chapter' },
    });
  }
  if (req.query.includeGrades) {
    includes.push({
      association: models.Tag.associations['grades'],
      attributes: ['id'],
      required: req.query.includeGrades == 'true' ? true : false,
      where: { __type: '__grade' },
    });
    // whereQuery['$grades.id$'] = { [Op.eq]: 1 };
  }
  if (req.query.includeSubjects) {
    includes.push({
      association: models.Tag.associations['subjects'],
      attributes: ['id', '__type'],
      required: req.query.includeSubjects == 'true' ? true : false,
      where: { __type: '__subject' },
    });
    // whereQuery['$ancestors.id$'] = { [Op.eq]: 3 };
  }
  if (req.query.includeSyllabuses) {
    includes.push({
      association: models.Tag.associations['syllabuses'],
      attributes: ['id'],
      required: req.query.includeSyllabuses == 'true' ? true : false,
      where: { __type: '__syllabus' },
    });
  }
  dbModel
    .findAll({
      attributes: {
        include: [
          'id',
          '__ancestorsArray',
          '__gradesArray',
          '__subjectsArray',
          '__syllabusesArray',
          '__tttFormat',
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
  console.log('_parentId', req.body.__parentId);
  // managing __parentId (still has flaws)
  if (req.body.__parentId) {
    let _parent = await dbModel.findByPk(req.body.__parentId);
    let _grandParentId = _parent.__parentId;
    let _grandParent = await dbModel.findByPk(_grandParentId);

    // console.log('grandParent ID', _grandParentId, _grandParent);
    if (_grandParent) {
      await dbModel.update(
        { __hierarchyLevel: _grandParent.__hierarchyLevel + 1 },
        { where: { id: _parent.id } }
      );
    }
    req.body.__hierarchyLevel = _parent.__hierarchyLevel + 1;
  } else {
    console.log('req.body.__parentId', req.body.__parentId);
  }
  // managing __parentId ENDS
  let reqBody = req.body;
  dbModel
    .update(reqBody, {
      where: {
        id: req.params.id,
      },
    })
    .then(async (id) => {
      await dbModel
        .findOne({
          where: {
            id: req.params.id,
          },
        })
        .then((ret) => {
          console.log(
            '--------------------------updating tag',
            req.body.ancestors
          );
          if (req.body.descendents) {
            ret.setDescendents(req.body.descendents);
          }
          if (req.body.ancestors) {
            ret.setAncestors(req.body.ancestors);
          }
          if (req.body.__grades) {
            ret.setGrades(req.body.__grades);
          }
          if (req.body.__subjects) {
            ret.setSubjects(req.body.__subjects);
          }
          if (req.body.__syllabuses) {
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
        status: 'success',
        message: modelName + ' deleted successfully with ID = ' + id,
        data: id,
      });
    });
};

exports.customKnex = async (req, res) => {
  let results = await models.knex
    .from('tags')
    .leftJoin('__tag_tags', 'tags.id', '=', '__tag_tags.tagId')
    .options({ nestTables: true });
  res.send(results);
};
// exports.customKnex = async (req, res) => {
//   let result = await models.knex(
//       models.knex('tags').select('id', 'title').as('t1')

//   )
//   .join(
//       models.knex('__tag_tags').select('id', 'gradeId', 'tagId').as('grades'),
//       't1.id',
//       'grades.tagId'
//   )
//   // .join(
//   //     models.knex('__tag_tags')
//   //     .select('*')
//   //     .as('subjects'),
//   //     // .where('subjectId', '=', null),
//   //     't1.id',
//   //     'subjects.subjectId'
//   // )
//         .options({nestTables: true})

//   // .where('title', 'like', '%Grade%')

//   res.send(result);
// }
