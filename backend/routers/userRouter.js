const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const noteController = require('../controllers/noteController');

router.post('/user/save',userController.saveUser);
router.get('/user/getall',userController.getAllUsers);

router.post('/note/save',noteController.saveNote);
router.post('/note/updnote',noteController.updateNote);

router.post('/note/del',noteController.delNote);
router.get('/note/get',noteController.getNote);
router.get('/note/snote',noteController.getSpesificNote);

module.exports = router;