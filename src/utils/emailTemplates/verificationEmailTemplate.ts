export const VerificationEmailTemplate = (verificationCode: string | number, emailHash: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body { background: #f5f5f5; font-family: Arial, sans-serif; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: 30px auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px; }
    .body { padding: 20px; color: #333; }
    .code-box { background: #e8f5e9; border: 1px dashed #4CAF50; padding: 10px; font-size: 22px; font-weight: bold; text-align: center; border-radius: 5px; margin: 20px 0; }
    .footer { font-size: 12px; color: #777; text-align: center; padding: 10px; border-top: 1px solid #ddd; background: #f9f9f9; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Verify Your Email - Royalx</div>
    <div class="body">
      <p>Hi there,</p>
      <p>Thank you for signing up. Please enter the following code to verify your email:</p>
      <div class="code-box">${verificationCode}</div>
      <p>You can also click this link to verify: <a href=${process.env.NEXT_PUBLIC_BASE_URL as string}/verify-email?email=${emailHash}>Verify Email</a></p>
      <p>If you did not request this, please ignore this email.</p>
    </div>
    <div class="footer">&copy; ${new Date().getFullYear()} Royalx. All rights reserved.</div>
  </div>
</body>
</html>
`;
