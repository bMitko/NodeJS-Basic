import { Router } from 'express';
import BookController from '../controllers/book.controller.js';

const router = Router();

router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getBookById);
router.get('/:id/reviews', BookController.getBookReview);
router.post('/', BookController.postBook);
router.post('/:id/reviews', BookController.updateBook);
router.put('/:id', BookController.updateBook)
router.delete('/:id', BookController.deleteBook)

export default router;
