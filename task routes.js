const controller = require('../controllers/taskController');
const router = require('express').Router();

// CRUD Routes Task
router.post('/', controller.addTask);
router.get('/', controller.AllTask);
router.get('/delete/all', controller.allDelete);
router.get('/:taskId', controller.detailTask);
router.delete('/:taskId', controller.softDelete);

module.exports = router;