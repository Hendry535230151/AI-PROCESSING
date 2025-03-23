const express = require('express');
const router = express.Router();
const fileController = require('../controller/file_controller');

router.get('/', fileController.getFiles);
router.get('/directory/:directory_id', fileController.getFileByDirectory);
router.get('/:id', fileController.getFileById);
router.post('/', fileController.createFile);
router.put('/:id/rename', fileController.renameFile);
router.put('/:id/move', fileController.changeFileToOtherDirectory);
router.delete('/:id', fileController.deleteFile);

module.exports = router;
