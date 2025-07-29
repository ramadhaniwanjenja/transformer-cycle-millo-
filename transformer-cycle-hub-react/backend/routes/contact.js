const express = require('express');
const { body, validationResult } = require('express-validator');
const { sendContactForm } = require('../utils/email');

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    // Prepare contact data
    const contactData = {
      name,
      email,
      subject,
      message,
      submittedAt: new Date()
    };

    console.log('📧 Contact form submission received:', {
      name,
      email,
      subject,
      messageLength: message.length
    });

    // Send emails
    const emailResult = await sendContactForm(contactData);

    if (emailResult.success) {
      console.log('✅ Contact form emails sent successfully');
      res.status(200).json({
        success: true,
        message: 'Thank you for your message! We have received it and will get back to you soon.',
        data: {
          adminEmailSent: emailResult.adminEmailSent,
          userEmailSent: emailResult.userEmailSent
        }
      });
    } else {
      console.error('❌ Failed to send contact form emails:', emailResult.error);
      res.status(500).json({
        success: false,
        message: 'Your message was received but there was an issue sending confirmation emails. We will still get back to you.',
        error: process.env.NODE_ENV === 'development' ? emailResult.error : 'Email service temporarily unavailable'
      });
    }

  } catch (error) {
    console.error('❌ Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router; 