const fs = require("fs")
const path = require('path')
const { patchDocument, PatchType, TextRun } = require("docx");
const { shell } = require('electron')


function paragraph(text, underline = false, bold = false) {
    return (
        {
            type: PatchType.PARAGRAPH,
            children: [new TextRun({
                text,
                underline,
                bold
            })],

        }
    )
}



function fillTemplate(params) {
    console.log(params)
    // if(params.childDateBirth.c.day<10)params.childDateBirth.c.day=`0${params.childDateBirth.c.day}`
    // if(params.childDateBirth.c.month<10)params.childDateBirth.c.month=`0${params.childDateBirth.c.month}`
    // if(params.childTimeBirth.c.hour<10)params.childTimeBirth.c.hour=`0${params.childTimeBirth.c.hour}`
    // if(params.childTimeBirth.c.minute<10)params.childTimeBirth.c.minute=`0${params.childTimeBirth.c.minute}`
    // if(params.motherBirthDate.c.day<10)params.motherBirthDate.c.day=`0${params.motherBirthDate.c.day}`
    // if(params.motherBirthDate.c.month<10)params.motherBirthDate.c.month=`0${params.motherBirthDate.c.month}`
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = new Date().getMonth().toString().padStart(2, "0");
    const currentDay = new Date().getDate().toString().padStart(2, "0");


    patchDocument({
        outputType: "nodebuffer",
        data: fs.readFileSync(
            path.join(process.cwd(), "templates", "template2.docx")),
        patches: {
            dayNow: paragraph(currentDay, false, true),
            monthNow: paragraph(currentMonth, false, true),
            yearNow: paragraph(currentYear, false, true),
            motherName: paragraph(`${params.surname} ${params.name} ${params.lastname}`),
            childDateBirthDay: paragraph(`${params.childDateBirth?.c.day.toString().padStart(2, "0") || "    "}`, true),
            childDateBirthMonth: paragraph(`${params.childDateBirth?.c.month.toString().padStart(2, "0") || "    "}`, true),
            childDateBirthYear: paragraph(`${params.childDateBirth?.c.year || "        "}`, true),
            childTimeBirthHour: paragraph(`${params.childTimeBirth?.c.hour.toString().padStart(2, "0") || "    "}`, true),
            childTimeBirthMin: paragraph(`${params.childTimeBirth?.c.minute.toString().padStart(2, "0") || "    "}`,true),
            motherBirthDateDay: paragraph(`${params.motherBirthDate?.c.day.toString().padStart(2, "0") || "    "}`,true),
            motherBirthDateMonth: paragraph(`${params.motherBirthDate?.c.month.toString().padStart(2, "0") || "    "}`,true),
            motherBirthDateYear: paragraph(`${params.motherBirthDate?.c.year || "        "}`,true),
            
            

        },
    }).then((buf) => {
        const outputFile = path.join(process.cwd(), "results", `output${Date.now()}.docx`);
        fs.writeFileSync(outputFile, buf);
        shell.openExternal(outputFile);
    });

}

module.exports = {
    fillTemplate
}