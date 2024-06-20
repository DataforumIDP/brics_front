"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.docTypeCheck = exports.fileTypes = void 0;
exports.fileTypes = {
    img: ['png', 'jpeg', 'jpg', 'pdf'],
    doc: ['doc', 'docx', 'odt'],
    present: ['ppt', 'pptx', 'odp', 'pdf']
};
function docTypeCheck(type) {
    return (item) => {
        const fileType = item.split('.')[1];
        if (!exports.fileTypes[type].includes(fileType))
            throw new Error();
        return true;
    };
}
exports.docTypeCheck = docTypeCheck;
