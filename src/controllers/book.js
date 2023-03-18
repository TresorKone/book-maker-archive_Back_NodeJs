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
            });
            next(err);
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
            next(err);
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
            next(err);
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
            next(err);
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
            next(err);
        })
};

exports.likeButton = (req, res, next) => {
    const id = req.params.bookId;
    const userWhoLiked = req.userId;


    Book.findByIdAndUpdate(id, {
        $push:{likes:userWhoLiked}
    }, { new:true })
        .then(book => {
            return res.status(200).json('post ' + book.title + ' liked')
        })
        .catch(err => {
            console.log(err)
            res.status(500).json('server error');
            next(err);
        })
};

exports.getLikes = (req, res, next) => {
    const id = req.params.bookId;
    let likesArray;

    Book.findById(id)
        .then(book => {
            if (id === undefined) {
                return res.status.json('there are no book with this id in the database');
            }

            // The front side can now use a "count" or "length" like method do displays de number of likes
            return likesArray = book.likes;
        })
        .then(r => {
            res.status(200).json({
                data: r.length,
                message: 'data fetched'
            })
        })
        .catch(err => {
            res.status(500).json('error server');
            next(err);
        })
};

exports.unlikeButton = (req, res, next) => {
    const id = req.params.bookId;

    Book.findByIdAndUpdate(id, {
        $pull: {likes: req.body.userId }
    }, { new:true, upsert: true })
        .then(book => {
            return res.status(200).json('post ' + book.title + ' unliked')
        })
        .catch(err => {
            console.log(err)
            res.status(500).json('server error');
            next(err);
        })

};