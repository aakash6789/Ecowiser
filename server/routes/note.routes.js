import { Router } from "express";
const router=Router();
import { upload } from "../middleware/multer.middleware.js";
import { submitNote,updateImage,updateContents,getNotes } from "../controllers/note.controller.js";

router.post('/submit',upload.single('image'),submitNote);
router.post('/updateImg',upload.single('image'),updateImage);
router.put('/updateContents',updateContents);
router.get('/get-notes',getNotes);

export default router;