import { appendFile } from "../services/files.services.js";

export default function logger (req, res, next) {

    const timeStamp = new Date().toISOString()

    const log = `${timeStamp} ${req.method} ${req.url}\n`

    appendFile('calls.log', log)

    next()
}