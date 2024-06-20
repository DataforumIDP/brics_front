"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
global.uploadDir = path_1.default.join(__dirname, "uploads_files");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.static('views'));
app.get("/attendees", (req, res) => {
    const p = path_1.default.join(__dirname, '../views/attendees.html');
    res.sendFile(p);
});
app.get("/technicians", (req, res) => {
    const p = path_1.default.join(__dirname, '../views/technicians.html');
    res.sendFile(p);
});
app.get("/parser", (req, res) => {
    const p = path_1.default.join(__dirname, '../views/parser.html');
    res.sendFile(p);
});
app.get('*.*', (req, res) => {
    const filePath = path_1.default.join(__dirname, 'views', req.path);
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
