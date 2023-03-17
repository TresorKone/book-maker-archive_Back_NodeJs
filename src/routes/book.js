const express = require('express');

const bookController = require('../controllers/book');
const jwtCheck = require('../middleware/check-auth');

const router = express.Router();

// GET /book
router.get('/', bookController.getIndex);

// GET /book/:id
router.get('/:bookId', bookController.getBook);

// POST /book/add
router.post('/add', jwtCheck, bookController.postAddBook);

// PATCH /book/edit/:id
router.patch('/edit/:bookId', jwtCheck, bookController.postEditBook);

// DELETE /book/delete/:id
router.delete('/delete/:bookId', jwtCheck, bookController.postDeleteBook);

// PATCH /book/liked/:id
router.patch('/liked/:bookId', jwtCheck, bookController.likeButton);

// GET /book/getLikes/:id
router.get('/getLikes/:bookId', bookController.getLikes);

//PATCH /book/unlike/:id
router.patch('/unlike/:bookId', jwtCheck, bookController.unlikeButton);


module.exports = router;