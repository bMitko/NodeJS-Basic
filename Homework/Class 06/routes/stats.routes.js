import  { Router } from 'express'
import BookController from '../controllers/book.controller.js'

const router = Router()

router.get('/', BookController.getStats)

export default router;