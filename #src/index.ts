import express, { Request, Response } from "express";
import cors from "cors";

import path from "path";
import cookieParser from "cookie-parser";
global.uploadDir = path.join(__dirname, "uploads_files");

const app = express();

app.use(cors());
app.use(cookieParser())
app.use(express.static('views'));

app.get("/attendees", (req: Request, res: Response) => {
    
    const p = path.join(__dirname, '../views/attendees.html')
    res.sendFile(p)
});

app.get("/lk", (req: Request, res: Response) => {
    const p = path.join(__dirname, '../views/lk.html')
    res.sendFile(p)
});

app.get('*.*', (req, res) => {
    const filePath = path.join(__dirname, 'views', req.path);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`File not found: ${filePath}`);
            res.status(401).send('File not found');
        }
    });
});


const PORT = 3226;

app.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
});
