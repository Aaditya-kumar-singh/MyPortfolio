const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New Message</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 30px;
      color: #333;
    }
    .container {
      background-color: #ffffff;
      padding: 20px 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      margin: auto;
    }
    h2 {
      color: #ff6600;
    }
    p {
      line-height: 1.6;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #999;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>📬 New Message from Portfolio Contact Form</h2>
    <p><strong>📧 Email:</strong> {{email}}</p>
    <p><strong>📝 Subject:</strong> {{subject}}</p>
    <p><strong>💬 Message:</strong></p>
    <p>{{message}}</p>
    <div class="footer">
      <p>This message was sent from your portfolio website.</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = emailHtml;
