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
  if (req.query.__type) {
    whereQuery['__type'] = req.query.__type;
  }
  if (req.query.title) {
    whereQuery['title'] = { [Op.like]: `%${req.query.title}%` };
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
  if (req.query.showParent) {
    includes.push({
      model: models.Tag,
      as: 'parent',
      attributes: ['title'],
    });
  }
  if (req.query.includeAncestors) {
    includes.push({
      association: models.Tag.associations['ancestors'],
      attributes: ['title'],
    });
    whereQuery['$ancestors.id$'] = { [Op.eq]: 3 };
  }
  if (req.query.includeDescendents) {
    includes.push({
      association: models.Tag.associations['descendents'],
      attributes: ['title', '__type'],
      // where: { '$descendents.__Tag_Tags.ancestorId$': 3, __type: '__chapter' },
    });
  }
  if (req.query.includeQuestions) {
    includes.push({
      model: models.QbPost,
      attributes: ['content'],
      where: { __type: { [Op.like]: '%__question%' } },
    });
  }
  console.log('associations = ', includes);
  dbModel
    .findAndCountAll({
      attributes: [
        'id',
        ['id', 'key'],
        'title',
        'description',
        '__type',
        '__status',
      ],
      where: {
        ...whereQuery,
        // '$ancestors.id$': { [Op.eq]: 3 },

        // '__misc.categories': { [Op.in]: ['1', '2'] },
      },
      order: [['title', 'ASC']],
      include: [...includes],
    })
    .then((ret) => {
      let tempResults = [];
      ret.rows.forEach((item) => {
        let tempRow = { ...item.dataValues };
        tempResults.push(tempRow);
      });

      res.send({
        status: '200',
        message: 'Your search fetched the following ' + modelName + '(s)',
        count: ret.count,
        results: tempResults,
      });
    });
  // .catch((err) => {
  //   res.send({ error: err });
  // });
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let reqBody = req.body;
  console.log(reqBody);
  dbModel.create(reqBody).then((ret) => {
    ret.setAncestors([1, 2, 3]);
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
          result: null,
        });
      } else {
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
        message:
          'No ' +
          modelName +
          'with ID = ' +
          ret.id +
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
