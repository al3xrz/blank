const fs = require("fs")
const path = require('path')
const { patchDocument, PatchType, TextRun } = require("docx");
const { shell } = require('electron')

function fillTemplate(params) {
    console.log(params)
    
    patchDocument({
        outputType: "nodebuffer",
        data: fs.readFileSync(
            path.join(process.cwd(), "templates", "template2.docx")),
        patches: {
            motherName: {
                type: PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: `${params.surname} ${params.name} ${params.lastname}`,
                    underline: false
                })],
            },
        },
    }).then((buf) => {
        const outputFile = path.join(process.cwd(), "results",  `output${Date.now()}.docx`);
        fs.writeFileSync(outputFile, buf);
        shell.openExternal(outputFile);
    });

}

module.exports = {
    fillTemplate
}