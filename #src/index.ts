import express, { Request, Response } from "express";
import cors from "cors";

import path from "path";
import cookieParser from "cookie-parser";
import axios from "axios";
global.uploadDir = path.join(__dirname, "uploads_files");

const app = express();

app.use(cors());
app.use(cookieParser())
app.use(express.static('views'));

app.get("/attendees", (req: Request, res: Response) => {
    
    const p = path.join(__dirname, '../views/attendees.html')
    res.sendFile(p)
});

app.get("/lk", async (req: Request, res: Response) => {
    const type = await userType(req.cookies.token)
    console.log(type);
    
    let htmlPath = ''
    if (!type) htmlPath = path.join(__dirname, '../views/login.html')
    if (type === 'partner') htmlPath = path.join(__dirname, '../views/partner.html')
    if (type === 'org') htmlPath = path.join(__dirname, '../views/org.html')
    res.sendFile(htmlPath)
});

app.get("/дл", async (req: Request, res: Response) => {
    const type = await userType(req.cookies.token)
    console.log(type);
    
    let htmlPath = ''
    if (!type) htmlPath = path.join(__dirname, '../views/login.html')
    if (type === 'partner') htmlPath = path.join(__dirname, '../views/partner.html')
    if (type === 'org') htmlPath = path.join(__dirname, '../views/org.html')
    res.sendFile(htmlPath)
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

app.use((req, res, next) => {
    let htmlPath = path.join(__dirname, '../views/404.html')
    res.sendFile(htmlPath)
});


const PORT = 3226;

app.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
});

async function userType (token: string): Promise<string | null> {
    
    return new Promise (async resolve => {
        try {
            const result = await axios.post('https://brics.wpdataforum.ru/api/authorize/type', {}, {
                headers: { Authorization: `Bearer ${token}` }
            })


            resolve(result.data.type)
        } catch (e: any){
            console.log(e.response.data.errors);
            
            resolve(null)
        }
    })
}
