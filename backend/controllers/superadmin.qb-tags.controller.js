const Sequelize = require('sequelize');
const models = require('../models/index.js');
const Op = Sequelize.Op;
const dbModel = models.QbTag;
const modelName = 'QbTag';
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
  if (req.query.filterSearch) {
    let filterSearch = [
      { ['_title']: { [Op.like]: `%${req.query.filterSearch}%` } },
      { ['_shortcode']: { [Op.like]: `%${req.query.filterSearch}%` } },
    ];
    filterQuery = { ...filterQuery, [Op.or]: [...filterSearch] };
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
      limit: req.query.filterLimit ? parseInt(req.query.filterLimit) : 30,
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
      dbModel
        .findOne({
          where: {
            id: req.params.id,
          },
        }).then(ret=> {
          res.send({
            status: 'success',
            message: modelName + ' updated successfully with ID = ' + req.params.id,
            error: null,
            count: null,
            data: req.body,
          });
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
