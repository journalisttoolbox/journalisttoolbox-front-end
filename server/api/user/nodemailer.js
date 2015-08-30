var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'team@newsroom.tools',
      pass: 'a(=gTrMd6Zoe4G'
  }
});

module.exports = transporter;