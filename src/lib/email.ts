import nodemailer from 'nodemailer';

function createTransport() {
  return nodemailer.createTransport({
    host: import.meta.env.SMTP_HOST || 'smtp.example.com',
    port: parseInt(import.meta.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: import.meta.env.SMTP_USER || '',
      pass: import.meta.env.SMTP_PASS || '',
    },
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const to = import.meta.env.CONTACT_EMAIL || 'kenzie@example.com';
  const from = import.meta.env.SMTP_USER || 'noreply@example.com';

  await createTransport().sendMail({
    from: `"Kenzie's Kandles" <${from}>`,
    to,
    subject: `New message from ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;">
        <h2 style="color:#7c3aed;">New message from Kenzie's Kandles website</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <h3>Message:</h3>
        <p style="white-space:pre-wrap;">${data.message}</p>
      </div>
    `,
  });
}
