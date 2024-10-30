const fs = require("fs")
const path = require('path')
const { patchDocument, PatchType, TextRun } = require("docx");
const { shell } = require('electron')
const PRODUCTION = false


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
    console.log(__dirname)
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = new Date().getMonth().toString().padStart(2, "0");
    const currentDay = new Date().getDate().toString().padStart(2, "0");

    const fullPathArray =  process.execPath.split(path.sep)
    fullPathArray.pop()
    console.log(fullPathArray)
    
    let fullPath = path.join(...fullPathArray)
    if(!PRODUCTION) fullPath = process.cwd()
    


    
    console.log(fullPath);
    console.log(path.normalize(fullPath))
    
    
    patchDocument({
        outputType: "nodebuffer",
        data: fs.readFileSync(
            path.resolve(fullPath, "templates", "template2.docx")),
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
            docType : paragraph(`${params.docType || "        "}`,true),
            passportSerie : paragraph(`${params.passportSerie || "        "}`,true),
            passportNum : paragraph(`${params.passportNum || "        "}`,true),
            passportOrg : paragraph(`${params.passportOrg || "        "}`,true),
            passportDate : paragraph(`${params.passportDate?.c.day.toString().padStart(2, "0") || "   "}.${params.passportDate?.c.month.toString().padStart(2, "0") || "   "}.${params.passportDate?.c.year.toString()|| "   "}`,true),
            snilsNum : paragraph(`${params.snilsNum || ""}`,false),
            omsNum : paragraph(`${params.omsNum || ""}`,false),
            subject: paragraph(`${params.subject || "                  "}`,true),
            district : paragraph(`${params.district || "                  "}`,true),
            city : paragraph(`${params.city || "                 "}`,true),
            locality : paragraph(`${params.locality || "                  "}`,true),
            street : paragraph(`${params.street || "                  "}`,true),
            house : paragraph(`${params.house || "    "}`,true),
            apartment : paragraph(`${params.apartment || "    "}`,true),
            building : paragraph(`${params.building || "    "}`,true),
            box : paragraph(`${params.apartment || "                  "}`,true),
            area1 : paragraph('Городская', params.area === "Городская"),
            area2 : paragraph('Сельская', params.area === "Сельская"),
            childWeight : paragraph(`${params.childWeight || ""}`, true),
            childLength : paragraph(`${params.childLength || ""}`,true),
            childSex1 : paragraph('Мужской', params.childSex === "Мужской"),
            childSex2 : paragraph('Женский', params.childSex === "Женский"),

        },
    }).then((buf) => {
        console.log(process.cwd())
        const outputFile = path.join(fullPath, "results", `output${Date.now()}.docx`);
        fs.writeFileSync(outputFile, buf);
        shell.openExternal(outputFile);
    });
 
}

module.exports = {
    fillTemplate
}