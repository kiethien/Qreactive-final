const qr = require('qrcode');
const mongoose = require('mongoose');
const EmailQR = require('../models/emailQR');
const Session = require('../models/Session');


const users = require('../models/users');



const generateEmailQR = async (req, res) => {
  try {
    var currentAccount;
        const user = await users.findOne({ email: req.body.emailUser });
        
        if (!user) {
            currentAccount = "none";
        }
        else {
        currentAccount = user.email;
        
        }

        const { email, subject, content } = req.body;

        // Save the form data to the MongoDB database
        const emailQRData = new EmailQR({
          email,
          subject,
          content,
          account: currentAccount,
        });

        // Generate QR code for email
        const emailData = `mailto:${email}?subject=${subject}&body=${content}`;
        const qrCodeDataUrl = await qr.toDataURL(emailData);
        emailQRData.QRcode = qrCodeDataUrl;
        emailQRData.email = email;
        emailQRData.subject = subject;
        emailQRData.content = content;
        await emailQRData.save();

        // Send the QR code image URL to the client
        res.json({ qrImageUrl: qrCodeDataUrl });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  generateEmailQR,
};
