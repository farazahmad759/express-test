var express = require('express');
var router = express.Router();
const controller = require('../controllers/exam.admin.controller.js');
/* GET users listing. */
router.get('/', controller.index);
router.post('/createWithQuestions', controller.createWithQuestions);
router.get('/create', controller.create);
router.post('/', controller.store);
router.get('/:id', controller.show);
router.get('/:id/edit', controller.edit);
router.put('/:id/updateWithQuestions', controller.updateWithQuestions);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
