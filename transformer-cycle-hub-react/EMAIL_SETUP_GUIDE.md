# Email Setup Guide for Contact Form

## 📧 Email Functionality Overview

The contact form now sends **two emails** when someone submits a message:

1. **Admin Notification Email** → Sent to `l.carew@alustudent.com`
2. **User Confirmation Email** → Sent to the person who submitted the form

## 🔧 Email Setup Instructions

### **Step 1: Gmail App Password Setup**

Since you're using Gmail, you need to create an "App Password":

1. **Go to your Google Account settings**
   - Visit: https://myaccount.google.com/
   - Click "Security"

2. **Enable 2-Step Verification** (if not already enabled)
   - Go to "2-Step Verification"
   - Follow the setup process

3. **Create App Password**
   - Go to "App passwords"
   - Select "Mail" and "Other (Custom name)"
   - Name it "Transformer Cycle Hub"
   - Copy the generated 16-character password

### **Step 2: Update Email Configuration**

Update your `backend/config.env` file:

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_character_app_password
EMAIL_FROM=your_gmail@gmail.com
ADMIN_EMAIL=l.carew@alustudent.com
```

**Replace:**
- `your_gmail@gmail.com` with your actual Gmail address
- `your_16_character_app_password` with the app password you generated

### **Step 3: Test the Email Functionality**

1. **Restart your backend server:**
   ```bash
   cd backend
   npm start
   ```

2. **Test the contact form:**
   - Go to http://localhost:3000/contact
   - Fill out the form with your email
   - Submit the form
   - Check both your email and l.carew@alustudent.com

## 📬 Email Templates

### **Admin Notification Email**
- **Subject**: "New Contact Form Submission - [Subject]"
- **Content**: 
  - Sender name and email
  - Subject and message
  - Submission timestamp
  - Professional formatting

### **User Confirmation Email**
- **Subject**: "Thank you for contacting Transformer Cycle Hub"
- **Content**:
  - Personalized greeting
  - Message details
  - Contact information
  - Professional branding

## 🛠️ Alternative Email Services

### **Option A: SendGrid (Recommended for Production)**

1. **Sign up for SendGrid**
   - Go to https://sendgrid.com/
   - Create a free account (100 emails/day)

2. **Get API Key**
   - Go to Settings → API Keys
   - Create a new API key
   - Copy the key

3. **Update Configuration**
   ```env
   EMAIL_SERVICE=sendgrid
   EMAIL_API_KEY=your_sendgrid_api_key
   EMAIL_FROM=your_verified_email@domain.com
   ```

### **Option B: Mailgun**

1. **Sign up for Mailgun**
   - Go to https://www.mailgun.com/
   - Create a free account

2. **Get API Key**
   - Go to Settings → API Keys
   - Copy the API key

3. **Update Configuration**
   ```env
   EMAIL_SERVICE=mailgun
   EMAIL_API_KEY=your_mailgun_api_key
   EMAIL_DOMAIN=your_domain.com
   EMAIL_FROM=noreply@your_domain.com
   ```

## 🔍 Troubleshooting

### **Common Issues**

1. **"Invalid login" error**
   - Make sure you're using an App Password, not your regular Gmail password
   - Enable 2-Step Verification first

2. **"Authentication failed" error**
   - Check your Gmail username and password
   - Make sure the email is correct

3. **Emails not sending**
   - Check your internet connection
   - Verify the email configuration
   - Check server logs for errors

4. **Emails going to spam**
   - Add the sender email to your contacts
   - Check spam folder
   - Use a verified domain (for production)

### **Testing Email Configuration**

```bash
# Test email functionality
cd backend
node -e "
const { sendContactForm } = require('./utils/email');
sendContactForm({
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Test Message',
  message: 'This is a test message'
}).then(result => console.log('Email test result:', result));
"
```

## 📊 Email Analytics (Future Enhancement)

For production, consider adding:

1. **Email tracking**
2. **Delivery reports**
3. **Bounce handling**
4. **Spam score monitoring**

## 🔒 Security Best Practices

1. **Never commit email passwords to git**
2. **Use environment variables**
3. **Use App Passwords, not regular passwords**
4. **Rate limit email sending**
5. **Validate email addresses**

## 🚀 Production Deployment

### **Environment Variables**
Set these in your production environment:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your_production_email@gmail.com
EMAIL_PASS=your_production_app_password
EMAIL_FROM=your_production_email@gmail.com
ADMIN_EMAIL=l.carew@alustudent.com
NODE_ENV=production
```

### **Email Service Recommendations**
- **Development**: Gmail (free)
- **Production**: SendGrid, Mailgun, or AWS SES

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Verify your email configuration
3. Test with a simple email first
4. Check server logs for detailed error messages 