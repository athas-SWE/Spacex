# Email Setup Instructions

## Backend Email Server Setup

The app includes an email server that sends notifications when someone clicks "Yes".

### Configuration

**Sender Email:** ahamedathas12@gmail.com  
**Recipient Email:** infobsc12@gmail.com  
**Gmail App Password:** rfws vegm ycro kxky

### How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the email server:**
   ```bash
   npm run server
   ```

3. **Start the frontend (in a new terminal):**
   ```bash
   npm run dev
   ```

   Or run both together:
   ```bash
   npm run dev:all
   ```

### Email Server Details

- **Port:** 3001 (default)
- **Endpoint:** `http://localhost:3001/send-email`
- **Method:** POST

### What Happens

When someone clicks the "Yes" button:
1. The video plays
2. An email is automatically sent to **infobsc12@gmail.com**
3. The email contains a beautiful notification that "She said Yes!"

### Email Content

The email includes:
- Subject: "💕 Valentine's Day Surprise - She Said Yes! 💕"
- Beautiful HTML formatted message
- "Sahla ❤️ Athas" heading
- Confirmation that someone clicked "Yes"

### Troubleshooting

If emails don't send:
1. Make sure the server is running on port 3001
2. Check that the Gmail app password is correct
3. Verify Gmail allows "Less secure app access" or use App Password
4. Check server console for error messages

### Security Note

For production, consider:
- Moving credentials to environment variables
- Using a more secure email service
- Adding rate limiting
- Implementing authentication
