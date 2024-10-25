const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const { shell } = require('electron')


function fillTemplate(params) {
    // Load the docx file as binary content
    console.log(params)
    const content = fs.readFileSync(
        path.resolve(__dirname, "..", "templates", "template2.docx"),
        "binary"
    );
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    doc.render({
        name : params.name,
        surname : params.surname,
        lastname : params.lastname
    
    });

    const buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
    });
    // buf is a nodejs Buffer, you can either write it to a
    // file or res.send it with express for example.
    const outputFile = path.resolve(__dirname, '..', 'results',`output${Date.now()}.docx` );
    fs.writeFileSync(outputFile, buf);
    shell.openExternal(outputFile);
}

module.exports = {
    fillTemplate
}