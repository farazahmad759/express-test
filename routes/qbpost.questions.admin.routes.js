var express = require('express');
var router = express.Router();
const controller = require('../controllers/qbpost.question.admin.controller.js');
const { body, validationResult } = require('express-validator');

/* GET users listing. */
router.get('/', controller.index);
router.get('/create', controller.create);
router.get('/dummy', controller.dummy);
router.get('/updateQuestionType', controller.updateQuestionType);
router.post('/', [body('statement').notEmpty()], controller.store);
router.get('/:id', controller.show);
router.get('/:id/edit', controller.edit);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

// custom
router.post('/bulkCreate', controller.bulkCreate);

module.exports = router;
