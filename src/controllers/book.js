const Book = require('../models/book');
const User = require('../models/user');

exports.getIndex = (req, res, next) => {
    Book.find()
        .then(books => {
            res.status(200).json({
                data: books,
                message: "books index"
            })
        })
        .catch(err => {
            console.log(err);

            res.status(400).json({
                message: "no books in the database"
            })
        })
};


exports.getBook = (req, res, next) => {
    const id = req.params.bookId;

    Book.findById(id)
        .populate('userId')
        .then(book => {
            if (!book) {
                return res.status(404).json({
                    message: 'could not find this book'
                })
            }
            res.status(200).json({
                data: book,
                message: "book details"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                message: "no book fetched"
            })
        })
};


exports.postAddBook = (req, res, next) => {

    const title = req.body.title;
    const synopsys = req.body.synopsys;
    const content = req.body.content;

    const book = new Book({
        title: title,
        synopsys: synopsys,
        content: content,
        userId: req.userId
    });

    book.save()
        .then(r => {
            return User.findById(req.userId);
        })
        .then(user => {
            user.books.push(book);
            return user.save();
        })
        .then(r => {
            res.status(201).json({
                data: r,
                message: 'book added'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'book not added'
            });
        });
};


exports.postEditBook = (req, res, next) => {
    const id = req.params.bookId;
    const updatedTitle = req.body.title;
    const updatedSynopsys = req.body.synopsys;
    const updatedContent = req.body.content

    Book.findById(id)
        .then(book => {

            //user check
            if (book.userId.toString() !== req.userId) {
                return res.status(403).json('not authorized')
            }

            book.title = updatedTitle;
            book.synopsys = updatedSynopsys;
            book.content = updatedContent;

            return book.save()
                .then(r => {
                    res.status(200).json({
                        data: r,
                        message: "book edited"
                    })
                })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                message: 'book not edited',
            })
        })
};

exports.postDeleteBook = (req, res, next) => {
    const id = req.params.bookId;

    Book.findById(id)
        .then(book => {
            //user check
            if (book.userId.toString() !== req.userId) {
                return res.status(403).json('not authorized')
            }

            return Book.deleteOne({
                _id: id
            });
        })
        .then(r => {
            console.log(r)
            res.status(202).json({
                message: 'resources deleted'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json('book not deleted, there might be some errors on the back side');
        })
};