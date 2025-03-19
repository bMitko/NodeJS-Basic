import Book from '../models/book.model.js';

const BookController = {
    async getAllBooks(req, res) {

        const { author, year } = req.query

        const books = await Book.getAllBooks()
        const byAuthorAndYear = books.filter(book => book.author === author && book.year === parseInt(year))
        const byAuthor = books.filter(book => book.author === author)
        const byYear = books.filter(book => book.year === parseInt(year))

        if (author && year) {
            if (byAuthorAndYear.length === 0) {
                res.status(404).send({
                    error: `We don't have book published by ${author} in ${year}`
                })
            }
            else
                res.send(byAuthorAndYear)
        }
        else if (author) {
            if (byAuthor.length === 0) {
                res.status(404).send({
                    error: `We dont't have a book written by ${author}.`
                })
            }
            else
                res.send(byAuthor)
        }
        else if (year) {
            if (byYear.length === 0) {
                res.status(404).send({
                    error: `We dont't have a book published in ${year}.`
                })
            }
            else
                res.send(byYear)
        }
        else
            res.send(books)
    },

    async getBookById(req, res) {
        const { id } = req.params

        const book = await Book.getBookById(id)

        if (!book) {
            res.status(404).send({
                error: `Book with id: ${id} was not found`
            })
        }
        else
            res.send(book)
    },

    async getBookReview(req, res) {
        const { id } = req.params

        const book = await Book.getBookById(id)

        if (!book) {
            res.status(404).send({
                error: `Book with id: ${id} was not found`
            })
        }
        else
            res.send(book.reviews || { error: `This book has 0 reviews` })
    },

    async postBook(req, res) {
        const { body } = req

        const newBook = await Book.createBook(body)

        res.status(201).send(newBook)
    },

    async updateBook(req, res) {
        const { id } = req.params
        const { body } = req

        const updatedBook = await Book.updateBook(id, body)

        if (updatedBook === 0) {
            res.status(404).send({
                error: `Book with id: ${id} was not found`
            })
        }
        else
            res.send(updatedBook)
    },

    async deleteBook(req, res) {
        const { id } = req.params

        const filteredBooks = await Book.deleteBook(id)

        if (filteredBooks === 0) {
            res.status(404).send({
                error: `You cant delete book that doesn't exist`
            })
        }
        else
            res.sendStatus(204)

    },

    async getStats(req, res) {

        const stats = await Book.getStats()

        res.send(stats)
    }
};

export default BookController;