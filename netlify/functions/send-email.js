// Netlify Serverless Function for sending emails
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    const { recipientEmail = 'infobsc12@gmail.com' } = JSON.parse(event.body || '{}');

    // Gmail SMTP Configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ahamedathas12@gmail.com',
        pass: 'rfws vegm ycro kxky' // Gmail App Password
      }
    });

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
              The question was: <strong>"Sahla, will you be my Valentine? 💕"</strong>
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

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully!'
      })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: false,
        message: 'Failed to send email',
        error: error.message
      })
    };
  }
};
