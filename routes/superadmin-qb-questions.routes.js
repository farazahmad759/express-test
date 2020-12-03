var express = require('express');
var router = express.Router();
const controller = require('../controllers/superadmin.qb-questions.controller');
const { body, validationResult } = require('express-validator');

/* superadmin routes */
router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/', [body('_content').notEmpty()], controller.store);
router.get('/:id', controller.show);
router.get('/:id/edit', controller.edit);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
