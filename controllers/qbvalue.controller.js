const Sequelize = require('sequelize');
const models = require('../models/index.js');
const Op = Sequelize.Op;
const dbModel = models.QbValue;
const modelName = 'QbValue';
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
  dbModel
    .findAndCountAll({
      subQuery: false,
      where: {
        ...whereQuery,
      },
      order: [['id', 'asc']],
      include: [...includes],
    })
    .then((ret) => {
      res.send({
        status: 'success',
        message: 'Your search fetched the following ' + modelName + '(s)',
        count: ret.count,
        data: ret.rows,
      });
    });
  // .catch((err) => {
  //   res.send({ status: 'error', error: err });
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
exports.store = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let reqBody = req.body;
  console.log(reqBody);
  dbModel
    .create(reqBody, {
      // include: '__QbValue_QbValues'
    })
    .then((ret) => {
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
  dbModel
    .findAll({
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
exports.update = (req, res) => {
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
        .then((ret) => {});
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
