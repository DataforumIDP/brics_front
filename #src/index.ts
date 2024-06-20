import express, { Request, Response } from "express";
import cors from "cors";

import path from "path";
global.uploadDir = path.join(__dirname, "uploads_files");

const app = express();

app.use(cors());

app.use(express.static('views'));

app.get("/attendees", (req: Request, res: Response) => {
    const p = path.join(__dirname, '../views/attendees.html')
    res.sendFile(p)
});
app.get("/technicians", (req: Request, res: Response) => {

    const p = path.join(__dirname, '../views/technicians.html')
    res.sendFile(p)
});

app.get("/parser", (req: Request, res: Response) => {

    const p = path.join(__dirname, '../views/parser.html')
    res.sendFile(p)
});

app.get('*.*', (req, res) => {
    const filePath = path.join(__dirname, 'views', req.path);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`File not found: ${filePath}`);
            res.status(404).send('File not found');
        }
    });
});


const PORT = 3226;

app.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
});
