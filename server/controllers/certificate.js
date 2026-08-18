const puppeteer = require("puppeteer");
const os = require("os");
const Progress = require("../models/courseProgress");
const User = require("../models/userDetails");
const CourseContent = require("../models/courseContent");

const launchBrowser = () => {
    const isLinux = os.platform() === "linux";

    return puppeteer.launch({
        headless: "new",
        args: isLinux ? ["--no-sandbox", "--disable-setuid-sandbox"] : [],
    });
};

const escapeHtml = (value) =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

const parseMonthParams = (monthParam, yearParam) => {
    const now = new Date();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();

    if (monthParam && /^\d{4}-\d{2}$/.test(monthParam)) {
        const [rawYear, rawMonth] = monthParam.split("-");
        year = parseInt(rawYear, 10);
        month = parseInt(rawMonth, 10);
    } else {
        if (monthParam !== undefined) {
            month = parseInt(monthParam, 10);
        }
        if (yearParam !== undefined) {
            year = parseInt(yearParam, 10);
        }
    }

    if (
        Number.isNaN(month) ||
        Number.isNaN(year) ||
        month < 1 ||
        month > 12 ||
        year < 1970 ||
        year > 9999
    ) {
        return null;
    }

    return { month, year };
};

const generateCertificate = async (req, res) => {
    try {
        const { name, course, date, instructor } = req.body;

        if (!name || !course || !date || !instructor) {
            return res.status(400).json({
                message: "Name, course, date, and instructor are required.",
            });
        }

        // Convert mm/dd/yyyy to dd/mm/yyyy
        const [month, day, year] = date.split("/");
        const formattedDate = `${day}/${month}/${year}`;

        const safeName = escapeHtml(name);
        const safeCourse = escapeHtml(course);
        const safeInstructor = escapeHtml(instructor);
        const browser = await launchBrowser();

        const page = await browser.newPage();

        // Set viewport to match A4 landscape
        await page.setViewport({ width: 1122, height: 793 });

        // HTML template
        const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Certificate</title>
      <style>
        @page {
          size: A4 landscape;
          margin: 0;
        }

        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          font-family: 'Roboto', sans-serif;
          background: #f9f9f9;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #333;
          position: relative;
        }

        .certificate-container {
          width: calc(100% - 60px);
          height: calc(100% - 60px);
          margin: 30px;
          padding: 40px;
          background: white;
          border: 8px solid #2c3e50;
          border-radius: 20px;
          box-shadow: 
            0 0 0 4px #f9f9f9,
            0 0 0 8px #34495e,
            0 20px 40px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          box-sizing: border-box;
        }

        .certificate-container::before {
          content: '';
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          bottom: 20px;
          border: 2px solid #bdc3c7;
          border-radius: 10px;
          pointer-events: none;
        }

        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          background-image: url('https://static.wixstatic.com/media/2f1a45_1fbc288ed00d486dabf61207472822d2%7Emv2.png/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/2f1a45_1fbc288ed00d486dabf61207472822d2%7Emv2.png');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          opacity: 0.2;
          z-index: 1;
          pointer-events: none;
        }

        .certificate-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        .certificate-title {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 20px;
        }

        .certificate-subtitle {
          font-size: 22px;
          margin-bottom: 40px;
        }

        .recipient-name {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 700;
          color: #2980b9;
          margin-bottom: 30px;
          text-transform: capitalize;
        }

        .course-name {
          font-size: 24px;
          margin-bottom: 30px;
          font-weight: 500;
          font-style: italic;
          color: #34495e;
        }

        .date {
          font-size: 18px;
          color: #7f8c8d;
          position: absolute;
          bottom: 40px;
          right: 40px;
        }

        .footer-text {
          position: absolute;
          bottom: 40px;
          left: 40px;
          font-size: 14px;
          color: #95a5a6;
        }

        .instructor-name {
          font-family: 'Brush Script MT', cursive;
          font-size: 24px;
          color: #2c3e50;
          margin-top: 60px;
          margin-bottom: 5px;
        }

        .signature {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
          border-top: 1px solid #ccc;
          width: 200px;
          text-align: center;
          padding-top: 5px;
        }
      </style>
    </head>
    <body>
      <div class="certificate-container">
        <div class="watermark"></div>
        <div class="certificate-content">
          <div class="certificate-title">Certificate of Completion</div>
          <div class="certificate-subtitle">This certifies that</div>
          <div class="recipient-name">${safeName}</div>
          <div class="certificate-subtitle">has successfully completed the course</div>
          <div class="course-name">${safeCourse}</div>
          
          <div class="instructor-name">${safeInstructor}</div>
          <div class="signature">Instructor Signature</div>

          <div class="footer-text">EduTrack</div>
          <div class="date">${formattedDate}</div>
        </div>
      </div>
    </body>
    </html>
    `;

        await page.setContent(html, { waitUntil: "networkidle0", timeout: 0 });

        const pdfBuffer = await page.pdf({
            format: "A4",
            landscape: true,
            printBackground: true,
        });

        await browser.close();

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=${safeCourse}_certificate.pdf`,
            "Content-Length": pdfBuffer.length,
        });

        return res.send(Buffer.from(pdfBuffer));
    } catch (error) {
        console.error("Certificate generation error:", error);
        return res
            .status(500)
            .json({ message: "Error generating certificate" });
    }
};

const generateMonthlyLearningReport = async (req, res) => {
    try {
        const { userid } = req.params;
        const parsedMonth = parseMonthParams(req.query.month, req.query.year);

        if (!parsedMonth) {
            return res.status(400).json({
                message:
                    "Invalid month/year format. Use month=1-12&year=YYYY or month=YYYY-MM.",
            });
        }

        const { month, year } = parsedMonth;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);
        const monthLabel = startDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
        });

        const user = await User.findOne({ userid }, { username: 1 });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const progressRecords = await Progress.find({ userId: userid });
        const courseIds = progressRecords.map((record) => record.courseId);
        const courseContents = await CourseContent.find(
            { courseId: { $in: courseIds } },
            { courseId: 1, modules: 1 }
        );
        const contentsByCourseId = new Map(
            courseContents.map((content) => [content.courseId, content])
        );

        const completedCourses = [];
        const completedModules = [];

        progressRecords.forEach((progress) => {
            const completedInMonth = progress.progressHistory?.some(
                (entry) =>
                    entry.percent === 100 &&
                    new Date(entry.date) >= startDate &&
                    new Date(entry.date) < endDate
            );

            if (completedInMonth) {
                completedCourses.push(progress.courseName);
            }

            const completionDates = progress.moduleStatus?.moduleCompletionDates;
            const content = contentsByCourseId.get(progress.courseId);
            if (!completionDates || !content) {
                return;
            }

            completionDates.forEach((moduleDates, moduleIndex) => {
                moduleDates.forEach((completionDate, subModuleIndex) => {
                    const parsedDate = completionDate
                        ? new Date(completionDate)
                        : null;
                    if (
                        !parsedDate ||
                        Number.isNaN(parsedDate.valueOf()) ||
                        parsedDate < startDate ||
                        parsedDate >= endDate
                    ) {
                        return;
                    }

                    const moduleTitle =
                        content.modules?.[moduleIndex]?.moduleTitle ||
                        `Module ${moduleIndex + 1}`;
                    const submoduleTitle =
                        content.modules?.[moduleIndex]?.submodules?.[
                            subModuleIndex
                        ]?.submoduleTitle || `Submodule ${subModuleIndex + 1}`;

                    completedModules.push({
                        courseName: progress.courseName,
                        moduleTitle,
                        submoduleTitle,
                        completedOn: parsedDate.toLocaleDateString("en-GB"),
                    });
                });
            });
        });

        const safeUsername = escapeHtml(user.username);
        const safeMonthLabel = escapeHtml(monthLabel);
        const coursesHtml =
            completedCourses.length > 0
                ? completedCourses
                      .map((courseName) => `<li>${escapeHtml(courseName)}</li>`)
                      .join("")
                : "<li>No courses were completed in this month.</li>";

        const modulesHtml =
            completedModules.length > 0
                ? completedModules
                      .map(
                          (item) =>
                              `<li><strong>${escapeHtml(
                                  item.courseName
                              )}</strong> — ${escapeHtml(
                                  item.moduleTitle
                              )} / ${escapeHtml(item.submoduleTitle)} <span>(completed on ${escapeHtml(
                                  item.completedOn
                              )})</span></li>`
                      )
                      .join("")
                : "<li>No modules were completed in this month.</li>";

        const browser = await launchBrowser();
        const page = await browser.newPage();
        await page.setViewport({ width: 794, height: 1122 });

        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>Monthly Learning Report</title>
            <style>
                @page { size: A4; margin: 28px; }
                body { font-family: Arial, sans-serif; color: #1f2937; font-size: 14px; }
                h1 { margin: 0 0 6px 0; font-size: 24px; }
                .subtitle { margin-bottom: 18px; color: #4b5563; }
                h2 { margin: 18px 0 8px 0; font-size: 18px; }
                ul { margin: 0; padding-left: 20px; }
                li { margin-bottom: 8px; line-height: 1.4; }
                span { color: #6b7280; }
            </style>
        </head>
        <body>
            <h1>Monthly Learning Report</h1>
            <div class="subtitle">${safeUsername} • ${safeMonthLabel}</div>
            <h2>Courses Completed</h2>
            <ul>${coursesHtml}</ul>
            <h2>Modules Completed</h2>
            <ul>${modulesHtml}</ul>
        </body>
        </html>
        `;

        await page.setContent(html, { waitUntil: "networkidle0", timeout: 0 });
        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
        });
        await browser.close();

        const monthFragment = String(month).padStart(2, "0");
        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=${userid}_${year}-${monthFragment}_learning_report.pdf`,
            "Content-Length": pdfBuffer.length,
        });

        return res.send(Buffer.from(pdfBuffer));
    } catch (error) {
        console.error("Monthly report generation error:", error);
        return res
            .status(500)
            .json({ message: "Error generating monthly learning report" });
    }
};

module.exports = { generateCertificate, generateMonthlyLearningReport };
