import { Router } from "express";
const router=Router();
import { upload } from "../middleware/multer.middleware.js";
import { submitNote,updateImage,updateContents,getNotes,deleteNote } from "../controllers/note.controller.js";

router.post('/submit',upload.single('image'),submitNote);
router.post('/updateImg',upload.single('image'),updateImage);
router.put('/updateContents',updateContents);
router.get('/get-notes',getNotes);
router.post('/delete-note',deleteNote);

export default router;