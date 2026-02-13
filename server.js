import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Gmail SMTP Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ahamedathas12@gmail.com',
    pass: 'rfws vegm ycro kxky' // Gmail App Password
  }
});

// Email sending endpoint
app.post('/send-email', async (req, res) => {
  try {
    const { recipientEmail = 'infobsc12@gmail.com' } = req.body;

    const mailOptions = {
      from: 'ahamedathas12@gmail.com',
      to: recipientEmail,
      subject: '💕 Valentine\'s Day Surprise - She Said Yes! 💕',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%); border-radius: 10px;">
          <div style="background: white; padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="color: #d63384; font-size: 2.5em; margin-bottom: 20px;">🎉 Great News! 🎉</h1>
            <h2 style="color: #f5576c; font-size: 2em; margin-bottom: 20px;">Sahla ❤️ Athas</h2>
            <p style="font-size: 1.2em; color: #333; line-height: 1.6;">
              Someone just clicked <strong style="color: #f5576c;">"Yes"</strong> on your Valentine's Day proposal! 💕
            </p>
            <p style="font-size: 1.1em; color: #666; margin-top: 20px;">
              The question was: <strong>"sahla will you marry me ?"</strong>
            </p>
            <p style="font-size: 1.1em; color: #666; margin-top: 20px;">
              <strong style="color: #d63384;">Congratulations! 🎊</strong>
            </p>
            <div style="margin-top: 30px; font-size: 3em;">
              💖💕💗💝💖
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email', 
      error: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Email server running on http://localhost:${PORT}`);
  console.log(`📧 Ready to send emails from ahamedathas12@gmail.com`);
});
