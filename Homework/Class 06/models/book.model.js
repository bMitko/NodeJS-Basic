import { readFile, writeFile } from '../services/files.services.js';
import { v4 as uuidv4 } from 'uuid';

const Book = {
    async getAllBooks() {
        const books = await readFile('books.json')
        
        return books
    },

    async getBookById(id) {
        const books = await readFile('books.json')
        const book = books.find(book => book.id === id)
        
        return book
    },

    async getStats() {
        const books = await readFile('books.json')

        const numberOfBooks = books.length

        const authorsAndBooks = {}
        books.forEach(book => authorsAndBooks[book.author] = 0);
        books.forEach(book => authorsAndBooks[book.author] = (authorsAndBooks[book.author] + 1));
        const booksPerAuthor = [authorsAndBooks]
        const statsForAuthors = []
        for (let [author, number] of Object.entries(authorsAndBooks)) {
            statsForAuthors.push(author + ": " + number)
        }

        const years = []
        books.forEach(book => years.push(book.year))
        years.sort((a, b) => a - b)

        const stats = {
            totalNumberOfBooks: numberOfBooks,
            perAuthor1: booksPerAuthor,
            perAuthor2: statsForAuthors,
            perAuthor3: authorsAndBooks,
            oldestBook: years[0],
            newestBook: years[years.length - 1]
        }

        return stats
    },

    async createBook(body) {
        const books = await readFile('books.json')
        const newBook = {
            id: uuidv4(),
            ...body

        }
        books.push(newBook)
        await writeFile('books.json', books)

        return books
    },

    async updateBook(id, body) {
        const books = await readFile('books.json')
        const index = books.findIndex(book => book.id === id)

        if(index < 0){
            return 0
        }
        else
        books[index] = {
            ...books[index],
            ...body
        }
        await writeFile('books.json', books)
        return books[index]
    },

    async deleteBook(id) {
        const books = await readFile('books.json')
        const filteredBooks = books.filter(book => book.id !== id)

        if(books.find(book => book.id === id)){
            await writeFile('books.json', filteredBooks)
            return filteredBooks
        }
        else 
        return 0
    }

};

export default Book;