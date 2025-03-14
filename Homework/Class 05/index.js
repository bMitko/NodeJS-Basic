import express from 'express';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid'

const app = express();

const PORT = 3000;
const HOSTNAME = 'localhost';

app.use(express.json());

const BOOKS_FILE_PATH = './data/books.json'

app.get('/books', async (req, res) => {
    const { author, year } = req.query

    const books = await fs.readFile(BOOKS_FILE_PATH, 'utf-8');
    const parsedBooks = JSON.parse(books)

    const byAuthor = parsedBooks.filter(book => book.author === author)
    const byYear = parsedBooks.filter(book => book.year === parseInt(year))

    if (author) {
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
        res.send(parsedBooks)
})

app.get('/books/:id', async (req, res) => {
    const { id } = req.params

    const books = await fs.readFile(BOOKS_FILE_PATH, 'utf-8');
    const parsedBooks = JSON.parse(books)

    const bookId = parsedBooks.find(book => book.id === id)
    // if the id is from type number: parsedBooks.find(book => book.id === parseInt(id))

    if (!bookId) {
        res.status(404).send({
            error: `No book with id: ${id} was found`
        });
    }
    else
        res.send(bookId)
})

app.post('/books', async (req, res) => {

    const books = await fs.readFile(BOOKS_FILE_PATH, 'utf-8');
    const parsedBooks = JSON.parse(books)

    const newBook = {
        ...req.body,
        id: uuidv4(),
        title: "Catalyst",
        author: "Lydia Kang",
        year: 2015
    }

    parsedBooks.push(newBook)

    await fs.writeFile(BOOKS_FILE_PATH, JSON.stringify(parsedBooks, null, 2))

    res.status(201).send(newBook)
})

app.delete('/books/:id', async (req, res) => {
    const { id } = req.params

    const books = await fs.readFile(BOOKS_FILE_PATH, 'utf-8')
    const parsedBooks = JSON.parse(books)

    const filteredBooks = parsedBooks.filter(book => book.id !== id)

    await fs.writeFile(BOOKS_FILE_PATH, JSON.stringify(filteredBooks, null, 2))

    res.sendStatus(204)
})

app.get('/stats', async (req, res) => {
    const books = await fs.readFile(BOOKS_FILE_PATH, 'utf-8')
    const parsedBooks = JSON.parse(books)

    const numberOfBooks = parsedBooks.length

    const authors = {}
    parsedBooks.forEach(book => authors[book.author] = 0);
    parsedBooks.forEach(book => authors[book.author] = (authors[book.author] + 1));
    let statsForAuthors = []
    for (let [author, number] of Object.entries(authors)) {
        statsForAuthors.push("\n" + "- " + author + ": " + number)
    }

    const years = []
    parsedBooks.forEach(book => years.push(book.year))
    years.sort((a, b) => a - b)

    res.send(`Total number of books: ${numberOfBooks}
        Number of books per author: ${statsForAuthors}
        Oldest book was published in ${years[0]}
        Newest book was published in ${years[years.length - 1]}`)
})

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is now listening at: http://${HOSTNAME}:${PORT}`);
});



