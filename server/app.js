import express from 'express';
import cors from "cors"
import noteRouter from "./routes/note.routes.js"
const app=express();
app.use(cors({credentials:true}));
app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true, limit:'16kb'}));
app.use(express.static('./public'));
app.get('/',(req,res)=>{
res.send('<h1>Hi, this is working</h1>')
})
app.use('/api/v1/notes',noteRouter);
export default app;