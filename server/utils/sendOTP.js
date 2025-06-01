const transporter = require("./nodemailer");

const sendOTP = async (toEmail, otp) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: toEmail,
        subject: "Your OTP Code",
        html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #f0f9f0 0%, #e8f5e8 100%);
                padding: 20px;
                line-height: 1.6;
            }
            
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                border: 2px solid #e8f5e8;
            }
            
            .header {
                background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
                padding: 40px 30px;
                text-align: center;
                position: relative;
            }
            
            .header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="30" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="70" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="90" cy="80" r="2.5" fill="rgba(255,255,255,0.1)"/></svg>');
            }
            
            .lock-icon {
                background: rgba(255, 255, 255, 0.2);
                width: 80px;
                height: 80px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
                font-size: 36px;
                position: relative;
                z-index: 1;
            }
            
            .header h1 {
                color: white;
                font-size: 28px;
                font-weight: 600;
                margin-bottom: 10px;
                position: relative;
                z-index: 1;
            }
            
            .header p {
                color: rgba(255, 255, 255, 0.9);
                font-size: 16px;
                position: relative;
                z-index: 1;
            }
            
            .content {
                padding: 50px 40px;
                text-align: center;
            }
            
            .greeting {
                font-size: 20px;
                color: #2e7d32;
                margin-bottom: 30px;
                font-weight: 500;
            }
            
            .otp-container {
                background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%);
                border: 3px dashed #4CAF50;
                border-radius: 15px;
                padding: 30px;
                margin: 30px 0;
                position: relative;
            }
            
            .otp-label {
                font-size: 16px;
                color: #2e7d32;
                margin-bottom: 15px;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .otp-code {
                font-size: 48px;
                font-weight: bold;
                color: #1b5e20;
                letter-spacing: 8px;
                margin: 20px 0;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
                font-family: 'Courier New', monospace;
            }
            
            .otp-note {
                font-size: 14px;
                color: #558b2f;
                margin-top: 15px;
                font-style: italic;
            }
            
            .warning {
                background: #fff3e0;
                border-left: 4px solid #ff9800;
                padding: 20px;
                margin: 30px 0;
                border-radius: 0 10px 10px 0;
            }
            
            .warning-title {
                font-weight: 600;
                color: #e65100;
                margin-bottom: 10px;
                font-size: 16px;
            }
            
            .warning-text {
                color: #bf360c;
                font-size: 14px;
                line-height: 1.5;
            }
            
            .footer {
                background: #f8f9fa;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #e8f5e8;
            }
            
            .footer-text {
                color: #6c757d;
                font-size: 14px;
                margin-bottom: 15px;
            }
            
            .company-name {
                color: #4CAF50;
                font-weight: 600;
                font-size: 18px;
            }
            
            .divider {
                height: 2px;
                background: linear-gradient(90deg, transparent, #4CAF50, transparent);
                margin: 30px 0;
            }
            
            @media (max-width: 600px) {
                .container {
                    margin: 10px;
                    border-radius: 15px;
                }
                
                .header {
                    padding: 30px 20px;
                }
                
                .content {
                    padding: 30px 20px;
                }
                
                .otp-code {
                    font-size: 36px;
                    letter-spacing: 4px;
                }
                
                .header h1 {
                    font-size: 24px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="lock-icon">🔐</div>
                <h1>Verification Required</h1>
                <p>Secure access to your account</p>
            </div>
            
            <div class="content">
                <div class="greeting">
                    Hello! We've received a request to verify your identity.
                </div>
                
                <div class="otp-container">
                    <div class="otp-label">Your Verification Code</div>
                    <div class="otp-code">${otp}</div>
                </div>
                
                <div class="divider"></div>
                
                <div class="warning">
                    <div class="warning-title">🛡️ Security Notice</div>
                    <div class="warning-text">
                        Never share this code with anyone. Our team will never ask for your OTP via phone, email, or text message.
                    </div>
                </div>
            </div>
            
            
        </div>
    </body>
    </html>`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
