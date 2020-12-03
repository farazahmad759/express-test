const Sequelize = require('sequelize');
const models = require('../models/index.js');
const Op = Sequelize.Op;
const dbModel = models.QbPost;
const modelName = 'QbPost';
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
  let filterOrder = [];
  if (req.query.id) {
    filterQuery['id'] = req.query.id;
  }
  if (req.query.title) {
    filterQuery['content.title'] = { [Op.like]: `%${req.query.title}%` };
  }
  if (req.query.description) {
    filterQuery['content.description'] = {
      [Op.like]: `%${req.query.description}%`,
    };
  }
  if (req.query.search) {
    filterQuery = {
      ...filterQuery,
      [Op.or]: [
        {
          'content.title': {
            [Op.like]: `%${req.query.search}%`,
          },
        },
        {
          'content.description': {
            [Op.like]: `%${req.query.search}%`,
          },
        },
      ],
    };
  }
  if (req.query.order) {
    filterOrder = req.query.order;
  }
  dbModel
    .findAndCountAll({
      where: {
        ...filterQuery,
      },
      attributes: ['id', 'content'],
      order: [...filterOrder],
    })
    .then((ret) => {
      res.send({
        status: '200',
        message: 'Your search fetched the following ' + modelName + '(s)',
        count: ret.count,
        results: ret.rows,
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
  let reqBody = req.body;
  dbModel
    .create(reqBody, {
      include: [
        {
          association: dbModel.associations.descendents,
        },
      ],
    })
    .then((ret) => {
      // ret.setDescendents([1, 2, 3]);
      // req.body.qfields.forEach(async (item) => {
      //   await ret.createQfield(item).then((ret2) => {
      //     console.log('added');
      //   });
      // });
      res.send([
        { message: 'created successfully' },
        { ret: req.body.qfields },
      ]);
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
    .findByPk(req.params.id, {
      include: [
        {
          model: models.QbPost,
          as: 'descendents',
          through: { attributes: [] },
          attributes: ['id', 'content'],
          include: [
            {
              model: models.QbPost,
              as: 'ancestors',
              required: false,
              through: { attributes: [] },
              attributes: ['id', 'content'],
              where: {
                [Op.or]: [{ __type: '__passage' }],
              },
            },
          ],
        },
      ],
    })
    .then((ret) => {
      if (ret === null) {
        res.send({
          status: '404',
          message: 'No ' + modelName + ' with ID = ' + req.params.id + ' found',
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
          req.query.id +
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
      results: ret,
    });
  });
};

exports.dummy = (req, res) => {
  dbModel.findOne({ where: {} }, { include: models.Exam }).then(async (ret) => {
    // let exam = await ret.getExam();
    res.send([{ message: 'Congrats again' }, { ret }]);
  });
};
