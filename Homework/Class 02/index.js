import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const homeworkFile = path.join(__dirname, "homework.txt");

fs.writeFileSync(homeworkFile, "Homework 02 in Basic Node");
fs.appendFileSync(homeworkFile, "\nFINISHED !")

const text = fs.readFileSync(homeworkFile, "utf-8")
console.log(text)











