const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email to admin (notification about new contact form submission)
const sendAdminNotification = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const adminMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission - ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">New Contact Form Submission</h2>
          <p><strong>From:</strong> ${contactData.name} (${contactData.email})</p>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            <p style="white-space: pre-wrap;">${contactData.message}</p>
          </div>
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            This is an automated notification from Transformer Cycle Hub contact form.
          </p>
        </div>
      `
    };

    await transporter.sendMail(adminMailOptions);
    console.log('✅ Admin notification email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Error sending admin notification email:', error);
    return false;
  }
};

// Send confirmation email to user
const sendUserConfirmation = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const userMailOptions = {
      from: process.env.EMAIL_FROM,
      to: contactData.email,
      subject: 'Thank you for contacting Transformer Cycle Hub',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">Thank you for reaching out!</h2>
          <p>Dear ${contactData.name},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Your Message Details:</h3>
            <p><strong>Subject:</strong> ${contactData.subject}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${contactData.message}</p>
          </div>
          
          <p>We typically respond within 24-48 hours during business days.</p>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #e8f5e8; border-radius: 5px;">
            <h3 style="color: #4CAF50; margin-top: 0;">Need immediate assistance?</h3>
            <p>📧 Email: info@transformercyclehub.com</p>
            <p>📞 Phone: +254 700 000 000</p>
            <p>📍 Address: Nairobi, Kenya</p>
          </div>
          
          <p>Best regards,<br>The Transformer Cycle Hub Team</p>
          
          <hr>
          <p style="color: #666; font-size: 12px;">
            This is an automated confirmation email. Please do not reply to this email.
          </p>
        </div>
      `
    };

    await transporter.sendMail(userMailOptions);
    console.log('✅ User confirmation email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Error sending user confirmation email:', error);
    return false;
  }
};

// Send contact form submission
const sendContactForm = async (contactData) => {
  try {
    // Send notification to admin
    const adminEmailSent = await sendAdminNotification(contactData);
    
    // Send confirmation to user
    const userEmailSent = await sendUserConfirmation(contactData);
    
    return {
      success: adminEmailSent && userEmailSent,
      adminEmailSent,
      userEmailSent
    };
  } catch (error) {
    console.error('❌ Error sending contact form emails:', error);
    return {
      success: false,
      adminEmailSent: false,
      userEmailSent: false,
      error: error.message
    };
  }
};

module.exports = {
  sendContactForm,
  sendAdminNotification,
  sendUserConfirmation
}; 