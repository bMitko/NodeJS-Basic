import fs from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const filePath = fileName => join(__dirname, `../data/${fileName}`);

export async function readFile(fileName) {
    const books = await fs.readFile(filePath(fileName), 'utf-8')
    const parsedBooks = JSON.parse(books)

    return parsedBooks
};

export async function writeFile(fileName, data) {
    await fs.writeFile(filePath(fileName), JSON.stringify(data, null, 2))

};

export async function appendFile(fileName, log) {
    await fs.appendFile(filePath(fileName), log)
};