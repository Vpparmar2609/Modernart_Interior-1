import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectToDatabase from '@/lib/db';
import Inquiry from '@/lib/models/Inquiry';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, type, budget, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    await connectToDatabase();
    await Inquiry.create(data);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // Send from the authenticated user to avoid spam filters
      replyTo: email,
      to: process.env.SMTP_USER, // Send to yourself
      subject: `New Consultation Request: ${name} (${type})`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Project Type: ${type}
Budget: ${budget}

Message:
${message}
      `,
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Project Type:</strong> ${type}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
