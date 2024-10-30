const fs = require("fs");
const path = require("path");
const { patchDocument, PatchType, TextRun } = require("docx");
const { shell } = require("electron");


// const PRODUCTION = false

function paragraph(text, underline = false, bold = false) {
  return {
    type: PatchType.PARAGRAPH,
    children: [
      new TextRun({
        text,
        underline,
        bold,
      }),
    ],
  };
}

function fillTemplate(params) {
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = new Date().getMonth().toString().padStart(2, "0");
  const currentDay = new Date().getDate().toString().padStart(2, "0");

  const fullPath = process.cwd();
 
  templatePath = path.join(fullPath, "templates", "template2.docx");
  resultPath = path.join(fullPath, "results", `output${Date.now()}.docx`);

  console.log("templatePath", templatePath);
  console.log("resultPath", resultPath);

  patchDocument({
    outputType: "nodebuffer",
    data: fs.readFileSync(templatePath),
    patches: {
      dayNowB: paragraph(currentDay, false, true),
      monthNowB: paragraph(currentMonth, false, true),
      yearNowB: paragraph(currentYear, false, true),
      dayNow: paragraph(currentDay, false, false),
      monthNow: paragraph(currentMonth, false, false),
      yearNow: paragraph(currentYear, false, false),
      motherName: paragraph(
        `${params.surname} ${params.name} ${params.lastname}`
      ),
      motherNameFill: paragraph(
        `${params.surname} ${params.name} ${params.lastname}`.padStart(2, "_").padEnd(90,'_'), true, false
      ),
      
      childDateBirthDay: paragraph(
        `${params.childDateBirth?.c.day.toString().padStart(2, "0") || "    "}`,
        true
      ),
      childDateBirthMonth: paragraph(
        `${
          params.childDateBirth?.c.month.toString().padStart(2, "0") || "    "
        }`,
        true
      ),
      childDateBirthYear: paragraph(
        `${params.childDateBirth?.c.year || "        "}`,
        true
      ),
      childTimeBirthHour: paragraph(
        `${
          params.childTimeBirth?.c.hour.toString().padStart(2, "0") || "    "
        }`,
        true
      ),
      childTimeBirthMin: paragraph(
        `${
          params.childTimeBirth?.c.minute.toString().padStart(2, "0") || "    "
        }`,
        true
      ),
      motherBirthDateDay: paragraph(
        `${
          params.motherBirthDate?.c.day.toString().padStart(2, "0") || "    "
        }`,
        true
      ),
      motherBirthDateMonth: paragraph(
        `${
          params.motherBirthDate?.c.month.toString().padStart(2, "0") || "    "
        }`,
        true
      ),
      motherBirthDateYear: paragraph(
        `${params.motherBirthDate?.c.year || "        "}`,
        true
      ),
      docTypeU: paragraph(`${params.docType || "        "}`, true),
      passportSerieU: paragraph(`${params.passportSerie || "        "}`, true),
      passportNumU: paragraph(`${params.passportNum || "        "}`, true),
      passportOrgU: paragraph(`${params.passportOrg || "        "}`, true),
      passportDateU: paragraph(
        `${params.passportDate?.c.day.toString().padStart(2, "0") || "   "}.${
          params.passportDate?.c.month.toString().padStart(2, "0") || "   "
        }.${params.passportDate?.c.year.toString() || "   "}`,
        true
      ),
      docType: paragraph(`${params.docType || "        "}`, false),
      passportSerie: paragraph(`${params.passportSerie || "        "}`, false),
      passportNum: paragraph(`${params.passportNum || "        "}`, false),
      passportOrg: paragraph(`${params.passportOrg || "        "}`, false),
      passportDate: paragraph(
        `${params.passportDate?.c.day.toString().padStart(2, "0") || "   "}.${
          params.passportDate?.c.month.toString().padStart(2, "0") || "   "
        }.${params.passportDate?.c.year.toString() || "   "}`,
        true
      ),
      snilsNum: paragraph(`${params.snilsNum || ""}`, false),
      omsNum: paragraph(`${params.omsNum || ""}`, false),
      subject: paragraph(`${params.subject || "                  "}`, true),
      district: paragraph(`${params.district || "                  "}`, true),
      city: paragraph(`${params.city || "                 "}`, true),
      locality: paragraph(`${params.locality || "                  "}`, true),
      street: paragraph(`${params.street || "                  "}`, true),
      house: paragraph(`${params.house || "    "}`, true),
      apartment: paragraph(`${params.apartment || "    "}`, true),
      building: paragraph(`${params.building || "    "}`, true),
      box: paragraph(`${params.box || "                  "}`, true),
      area1: paragraph("Городская", params.area === "Городская"),
      area2: paragraph("Сельская", params.area === "Сельская"),
      childWeight: paragraph(`${params.childWeight || ""}`, true),
      childLength: paragraph(`${params.childLength || ""}`, true),
      childSex1: paragraph("Мужской", params.childSex === "Мужской"),
      childSex2: paragraph("Женский", params.childSex === "Женский"),
    },
  })
    .then((buf) => {
    //   console.log(buf);
      fs.writeFileSync(resultPath, buf);
      shell.openPath(resultPath);
    })
    .catch((e) => console.log(e));
}

module.exports = {
  fillTemplate,
};
