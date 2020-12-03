var express = require('express');
var router = express.Router();
const controller = require('../controllers/qbpost.exam.client.controller.js');
const { body, validationResult } = require('express-validator');

/* GET users listing. */
// router.get('/', controller.index);
// router.get('/create', controller.create);
// router.get('/dummy', controller.dummy);
// router.post('/', [body('statement').notEmpty()], controller.store);
// router.get('/:id', controller.show);
// router.get('/:id/edit', controller.edit);
// router.put('/:id', controller.update);
// router.delete('/:id', controller.delete);

// custom
router.get(
  '/findQuestionsByQuestionType',
  controller.findQuestionsByQuestionType
);
router.get('/findQuestionsByBoardyear', controller.findQuestionsByBoardyear);
router.get('/findQuestionsByTopic', controller.findQuestionsByTopic);

module.exports = router;
