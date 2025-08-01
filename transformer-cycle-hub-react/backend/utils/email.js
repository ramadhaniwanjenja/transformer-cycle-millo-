const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  console.log('📧 Creating email transporter with:', {
    service: process.env.EMAIL_SERVICE || 'gmail',
    user: process.env.EMAIL_USER,
    hasPass: !!process.env.EMAIL_PASS
  });
  
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

// Send pickup request notification to admin
const sendPickupRequestNotification = async (pickupData, userData) => {
  try {
    const transporter = createTransporter();
    
    const adminMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `New Pickup Request - ${userData.firstName} ${userData.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">New Pickup Request</h2>
          <p><strong>From:</strong> ${userData.firstName} ${userData.lastName} (${userData.email})</p>
          <p><strong>Phone:</strong> ${userData.phone}</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            <h3>Pickup Details:</h3>
            <p><strong>Date:</strong> ${new Date(pickupData.pickupDate).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${pickupData.pickupTime}</p>
            <p><strong>Waste Type:</strong> ${pickupData.wasteType}</p>
            <p><strong>Estimated Weight:</strong> ${pickupData.estimatedWeight} kg</p>
            <p><strong>Description:</strong> ${pickupData.description}</p>
            <p><strong>Address:</strong> ${pickupData.address.street}, ${pickupData.address.city}, ${pickupData.address.state} ${pickupData.address.zipCode}</p>
            ${pickupData.specialInstructions ? `<p><strong>Special Instructions:</strong> ${pickupData.specialInstructions}</p>` : ''}
            ${pickupData.isUrgent ? '<p style="color: #ff4444;"><strong>⚠️ URGENT REQUEST</strong></p>' : ''}
          </div>
          
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #e8f5e8; border-radius: 5px;">
            <h3 style="color: #4CAF50; margin-top: 0;">Action Required</h3>
            <p>Please review this pickup request and either approve or reject it from your admin dashboard.</p>
          </div>
          
          <hr>
          <p style="color: #666; font-size: 12px;">
            This is an automated notification from Transformer Cycle Hub pickup system.
          </p>
        </div>
      `
    };

    await transporter.sendMail(adminMailOptions);
    console.log('✅ Pickup request notification sent to admin');
    return true;
  } catch (error) {
    console.error('❌ Error sending pickup request notification:', error);
    return false;
  }
};

// Send pickup approval notification to user
const sendPickupApprovalNotification = async (pickupData, userData) => {
  try {
    const transporter = createTransporter();
    
    const userMailOptions = {
      from: process.env.EMAIL_FROM,
      to: userData.email,
      subject: 'Your Pickup Request Has Been Approved!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">🎉 Pickup Request Approved!</h2>
          <p>Dear ${userData.firstName},</p>
          <p>Great news! Your pickup request has been approved by our team.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Pickup Details:</h3>
            <p><strong>Date:</strong> ${new Date(pickupData.pickupDate).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${pickupData.pickupTime}</p>
            <p><strong>Waste Type:</strong> ${pickupData.wasteType}</p>
            <p><strong>Estimated Weight:</strong> ${pickupData.estimatedWeight} kg</p>
            <p><strong>Address:</strong> ${pickupData.address.street}, ${pickupData.address.city}, ${pickupData.address.state} ${pickupData.address.zipCode}</p>
          </div>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #e8f5e8; border-radius: 5px;">
            <h3 style="color: #4CAF50; margin-top: 0;">What's Next?</h3>
            <p>Our pickup team will contact you within 24 hours to confirm the exact pickup time and provide any additional instructions.</p>
            <p>Please ensure your waste is properly prepared and accessible for pickup.</p>
          </div>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #fff3cd; border-radius: 5px;">
            <h3 style="color: #856404; margin-top: 0;">📞 Contact Information</h3>
            <p>If you have any questions, please contact us:</p>
            <p>📧 Email: info@transformercyclehub.com</p>
            <p>📞 Phone: +254 700 000 000</p>
          </div>
          
          <p>Thank you for choosing Transformer Cycle Hub!</p>
          <p>Best regards,<br>The Transformer Cycle Hub Team</p>
          
          <hr>
          <p style="color: #666; font-size: 12px;">
            This is an automated confirmation email. Please do not reply to this email.
          </p>
        </div>
      `
    };

    await transporter.sendMail(userMailOptions);
    console.log('✅ Pickup approval notification sent to user');
    return true;
  } catch (error) {
    console.error('❌ Error sending pickup approval notification:', error);
    return false;
  }
};

// Send pickup rejection notification to user
const sendPickupRejectionNotification = async (pickupData, userData, adminNotes) => {
  try {
    const transporter = createTransporter();
    
    const userMailOptions = {
      from: process.env.EMAIL_FROM,
      to: userData.email,
      subject: 'Pickup Request Update',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc3545;">Pickup Request Status Update</h2>
          <p>Dear ${userData.firstName},</p>
          <p>We regret to inform you that your pickup request could not be approved at this time.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Request Details:</h3>
            <p><strong>Date:</strong> ${new Date(pickupData.pickupDate).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${pickupData.pickupTime}</p>
            <p><strong>Waste Type:</strong> ${pickupData.wasteType}</p>
            <p><strong>Estimated Weight:</strong> ${pickupData.estimatedWeight} kg</p>
          </div>
          
          ${adminNotes ? `
          <div style="margin: 20px 0; padding: 15px; background-color: #f8d7da; border-radius: 5px;">
            <h3 style="color: #721c24; margin-top: 0;">Reason for Rejection:</h3>
            <p>${adminNotes}</p>
          </div>
          ` : ''}
          
          <div style="margin: 20px 0; padding: 15px; background-color: #e8f5e8; border-radius: 5px;">
            <h3 style="color: #4CAF50; margin-top: 0;">What You Can Do:</h3>
            <p>• Review the reason for rejection and make necessary adjustments</p>
            <p>• Submit a new request with corrected information</p>
            <p>• Contact us for clarification or assistance</p>
          </div>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #fff3cd; border-radius: 5px;">
            <h3 style="color: #856404; margin-top: 0;">📞 Need Help?</h3>
            <p>Contact us for assistance:</p>
            <p>📧 Email: info@transformercyclehub.com</p>
            <p>📞 Phone: +254 700 000 000</p>
          </div>
          
          <p>Thank you for your understanding.</p>
          <p>Best regards,<br>The Transformer Cycle Hub Team</p>
          
          <hr>
          <p style="color: #666; font-size: 12px;">
            This is an automated notification email. Please do not reply to this email.
          </p>
        </div>
      `
    };

    await transporter.sendMail(userMailOptions);
    console.log('✅ Pickup rejection notification sent to user');
    return true;
  } catch (error) {
    console.error('❌ Error sending pickup rejection notification:', error);
    return false;
  }
};

// Send pickup completion notification to user
const sendPickupCompletionNotification = async (pickupData, userData, actualWeight, pointsEarned) => {
  try {
    const transporter = createTransporter();
    
    const userMailOptions = {
      from: process.env.EMAIL_FROM,
      to: userData.email,
      subject: 'Pickup Completed - Green Points Earned!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">🎉 Pickup Successfully Completed!</h2>
          <p>Dear ${userData.firstName},</p>
          <p>Your pickup has been completed successfully! Thank you for contributing to a greener environment.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Pickup Summary:</h3>
            <p><strong>Waste Type:</strong> ${pickupData.wasteType}</p>
            <p><strong>Actual Weight Collected:</strong> ${actualWeight} kg</p>
            <p><strong>Green Points Earned:</strong> ${pointsEarned} points</p>
            <p><strong>Completion Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #e8f5e8; border-radius: 5px;">
            <h3 style="color: #4CAF50; margin-top: 0;">🌱 Your Impact</h3>
            <p>By recycling ${actualWeight}kg of waste, you've helped reduce environmental pollution and earned ${pointsEarned} green points!</p>
            <p>Your total green points: ${userData.greenPoints + pointsEarned}</p>
          </div>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #fff3cd; border-radius: 5px;">
            <h3 style="color: #856404; margin-top: 0;">💚 Keep Up the Great Work!</h3>
            <p>Continue recycling and earning green points. Every contribution makes a difference!</p>
            <p>📧 Email: info@transformercyclehub.com</p>
            <p>📞 Phone: +254 700 000 000</p>
          </div>
          
          <p>Thank you for choosing Transformer Cycle Hub!</p>
          <p>Best regards,<br>The Transformer Cycle Hub Team</p>
          
          <hr>
          <p style="color: #666; font-size: 12px;">
            This is an automated confirmation email. Please do not reply to this email.
          </p>
        </div>
      `
    };

    await transporter.sendMail(userMailOptions);
    console.log('✅ Pickup completion notification sent to user');
    return true;
  } catch (error) {
    console.error('❌ Error sending pickup completion notification:', error);
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

// Send pickup request confirmation email
const sendPickupRequestEmail = async (user, pickup) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Pickup Request Confirmation - Transformer Cycle Hub',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4CAF50, #2E8B57); color: white; padding: 20px; text-align: center;">
            <h1>🔄 Pickup Request Confirmed</h1>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <h2>Hello ${user.firstName} ${user.lastName},</h2>
            
            <p>Your waste pickup request has been successfully submitted and is now pending admin approval.</p>
            
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3>📋 Request Details:</h3>
              <ul>
                <li><strong>Waste Type:</strong> ${pickup.wasteType}</li>
                <li><strong>Quantity:</strong> ${pickup.quantity} kg</li>
                <li><strong>Pickup Date:</strong> ${new Date(pickup.pickupDate).toLocaleDateString()}</li>
                <li><strong>Pickup Time:</strong> ${pickup.pickupTime}</li>
                <li><strong>Address:</strong> ${pickup.address}</li>
                ${pickup.notes ? `<li><strong>Notes:</strong> ${pickup.notes}</li>` : ''}
              </ul>
            </div>
            
            <p>Our admin team will review your request and you'll receive an email notification once it's approved or rejected.</p>
            
            <p>You can track your pickup status in your dashboard.</p>
            
            <div style="text-align: center; margin: 20px 0;">
              <a href="${process.env.FRONTEND_URL}/dashboard" style="background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Dashboard</a>
            </div>
            
            <p>Thank you for contributing to a sustainable future!</p>
            
            <p>Best regards,<br>Transformer Cycle Hub Team</p>
          </div>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('Pickup request confirmation email sent to:', user.email);
    
  } catch (error) {
    console.error('Error sending pickup request email:', error);
  }
};

// Send pickup approval email
const sendPickupApprovalEmail = async (user, pickup) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Pickup Request Approved - Transformer Cycle Hub',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4CAF50, #2E8B57); color: white; padding: 20px; text-align: center;">
            <h1>✅ Pickup Request Approved</h1>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <h2>Hello ${user.firstName} ${user.lastName},</h2>
            
            <p>Great news! Your waste pickup request has been approved by our admin team.</p>
            
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3>📋 Pickup Details:</h3>
              <ul>
                <li><strong>Waste Type:</strong> ${pickup.wasteType}</li>
                <li><strong>Quantity:</strong> ${pickup.quantity} kg</li>
                <li><strong>Pickup Date:</strong> ${new Date(pickup.pickupDate).toLocaleDateString()}</li>
                <li><strong>Pickup Time:</strong> ${pickup.pickupTime}</li>
                <li><strong>Address:</strong> ${pickup.address}</li>
                ${pickup.adminNotes ? `<li><strong>Admin Notes:</strong> ${pickup.adminNotes}</li>` : ''}
              </ul>
            </div>
            
            <p>Our collection team will arrive at your specified address on the scheduled date and time.</p>
            
            <p><strong>Please ensure your waste is properly sorted and ready for collection.</strong></p>
            
            <div style="text-align: center; margin: 20px 0;">
              <a href="${process.env.FRONTEND_URL}/dashboard" style="background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Dashboard</a>
            </div>
            
            <p>Thank you for your contribution to environmental sustainability!</p>
            
            <p>Best regards,<br>Transformer Cycle Hub Team</p>
          </div>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('Pickup approval email sent to:', user.email);
    
  } catch (error) {
    console.error('Error sending pickup approval email:', error);
  }
};

// Send pickup rejection email
const sendPickupRejectionEmail = async (user, pickup, adminNotes) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Pickup Request Update - Transformer Cycle Hub',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f44336, #d32f2f); color: white; padding: 20px; text-align: center;">
            <h1>❌ Pickup Request Update</h1>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <h2>Hello ${user.firstName} ${user.lastName},</h2>
            
            <p>We regret to inform you that your waste pickup request has been rejected by our admin team.</p>
            
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3>📋 Request Details:</h3>
              <ul>
                <li><strong>Waste Type:</strong> ${pickup.wasteType}</li>
                <li><strong>Quantity:</strong> ${pickup.quantity} kg</li>
                <li><strong>Pickup Date:</strong> ${new Date(pickup.pickupDate).toLocaleDateString()}</li>
                <li><strong>Pickup Time:</strong> ${pickup.pickupTime}</li>
                <li><strong>Address:</strong> ${pickup.address}</li>
                <li><strong>Admin Notes:</strong> ${adminNotes}</li>
              </ul>
            </div>
            
            <p>Please review the admin notes above and feel free to submit a new request with the necessary corrections.</p>
            
            <div style="text-align: center; margin: 20px 0;">
              <a href="${process.env.FRONTEND_URL}/pickup" style="background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Submit New Request</a>
            </div>
            
            <p>If you have any questions, please don't hesitate to contact our support team.</p>
            
            <p>Best regards,<br>Transformer Cycle Hub Team</p>
          </div>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('Pickup rejection email sent to:', user.email);
    
  } catch (error) {
    console.error('Error sending pickup rejection email:', error);
  }
};

// Send tutorial completion email
const sendTutorialCompletionEmail = async (userEmail, userName, tutorialTitle) => {
  try {
    const transporter = createTransporter(); // Re-use createTransporter for consistency
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: userEmail,
      subject: `🎉 Tutorial Completed: ${tutorialTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #4CAF50, #2E8B57); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">🎓 Tutorial Completed!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Congratulations on completing your upcycling tutorial!</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${userName}!</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              You have successfully completed the tutorial: <strong style="color: #4CAF50;">${tutorialTitle}</strong>
            </p>
            
            <div style="background: #e8f5e8; border-left: 4px solid #4CAF50; padding: 20px; margin: 20px 0; border-radius: 5px;">
              <h3 style="color: #2E8B57; margin: 0 0 10px 0;">🏆 Rewards Earned</h3>
              <ul style="color: #666; margin: 0; padding-left: 20px;">
                <li><strong>+10 Points</strong> added to your account</li>
                <li>New upcycling skill learned</li>
                <li>Contribution to environmental sustainability</li>
              </ul>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Keep learning and earning points by completing more tutorials. Your efforts help create a more sustainable future!
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/tutorials" 
                 style="background: linear-gradient(135deg, #4CAF50, #2E8B57); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
                Explore More Tutorials
              </a>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 20px; text-align: center; color: #999; font-size: 14px;">
              <p>Thank you for being part of our recycling community!</p>
              <p>Transformer Cycle Hub Team</p>
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Tutorial completion email sent to ${userEmail}`);
  } catch (error) {
    console.error('Error sending tutorial completion email:', error);
  }
};

// Send reward redemption email
const sendRewardRedemptionEmail = async (userEmail, userName, rewardName, pointsSpent) => {
  try {
    const transporter = createTransporter(); // Re-use createTransporter for consistency
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: userEmail,
      subject: `🎁 Reward Redeemed: ${rewardName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #FF6B35, #ff8c42); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">🎁 Reward Redeemed!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Congratulations on redeeming your reward!</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${userName}!</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              You have successfully redeemed: <strong style="color: #FF6B35;">${rewardName}</strong>
            </p>
            
            <div style="background: #fff3e0; border-left: 4px solid #FF6B35; padding: 20px; margin: 20px 0; border-radius: 5px;">
              <h3 style="color: #e65100; margin: 0 0 10px 0;">🏆 Redemption Details</h3>
              <ul style="color: #666; margin: 0; padding-left: 20px;">
                <li><strong>Reward:</strong> ${rewardName}</li>
                <li><strong>Points Spent:</strong> ${pointsSpent} points</li>
                <li><strong>Status:</strong> Pending approval</li>
              </ul>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Our team will review your redemption and contact you soon with delivery details. Thank you for your contribution to environmental sustainability!
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/rewards" 
                 style="background: linear-gradient(135deg, #FF6B35, #ff8c42); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
                View My Rewards
              </a>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 20px; text-align: center; color: #999; font-size: 14px;">
              <p>Thank you for being part of our recycling community!</p>
              <p>Transformer Cycle Hub Team</p>
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Reward redemption email sent to ${userEmail}`);
  } catch (error) {
    console.error('Error sending reward redemption email:', error);
  }
};

module.exports = {
  sendContactForm,
  sendAdminNotification,
  sendUserConfirmation,
  sendPickupRequestNotification,
  sendPickupApprovalNotification,
  sendPickupRejectionNotification,
  sendPickupCompletionNotification,
  sendPickupRequestEmail,
  sendPickupApprovalEmail,
  sendPickupRejectionEmail,
  sendTutorialCompletionEmail,
  sendRewardRedemptionEmail
}; 