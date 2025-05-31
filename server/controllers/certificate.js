const puppeteer = require('puppeteer');

const generateCertificate = async (req, res) => {
  try {
    const { name, course, date } = req.body;

    if (!name || !course || !date) {
      return res.status(400).json({ message: "Name, course, and date are required." });
    }

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      // executablePath: '/path/to/chrome' // Optional: set if puppeteer can't find chrome
    });
    const page = await browser.newPage();

    // HTML template with inline CSS
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Certificate</title>
      <style>
        body {
          width: 842px;
          height: 595px;
          margin: 0;
          padding: 40px;
          font-family: 'Roboto', sans-serif;
          background: #f9f9f9;
          border: 10px solid #4a90e2;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #333;
          position: relative;
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
        .signature {
          margin-top: 40px;
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
      <div class="certificate-title">Certificate of Completion</div>
      <div class="certificate-subtitle">This certifies that</div>
      <div class="recipient-name">${name}</div>
      <div class="certificate-subtitle">has successfully completed the course</div>
      <div class="course-name">${course}</div>
      <div class="signature">Instructor Signature</div>
      <div class="footer-text">Powered by Your Course System</div>
      <div class="date">${date}</div>
    </body>
    </html>
    `;

    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate PDF buffer
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    // Send PDF as response
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${name}_certificate.pdf`,
      'Content-Length': pdfBuffer.length,
    });

    return res.send(Buffer.from(pdfBuffer));

  } catch (error) {
    console.error("Certificate generation error:", error);
    return res.status(500).json({ message: "Error generating certificate" });
  }
};

module.exports = { generateCertificate };
