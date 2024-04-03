import { Router } from "express";
const router=Router();
import { upload } from "../middleware/multer.middleware.js";
import { submitNote } from "../controllers/note.controller.js";

router.post('/submit',upload.single('image'),submitNote);

export default router;