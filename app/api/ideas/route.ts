import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
  if (!payload || typeof payload !== 'object') return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  const { name, description } = payload as Record<string, unknown>;
  if (typeof description !== 'string' || description.length > 8000 || description.trim().length < 50) {
    return NextResponse.json({ error: 'Please describe your idea in at least 50 characters.' }, { status: 400 });
  }
  if (name !== undefined && (typeof name !== 'string' || name.length > 120)) {
    return NextResponse.json({ error: 'Invalid name.' }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.IDEAS_TO;
  if (!host || !user || !pass || !to) {
    console.error('Idea email is not configured: required SMTP settings are missing.');
    return NextResponse.json({ error: 'Email is not configured.' }, { status: 503 });
  }

  try {
    const port = Number(process.env.SMTP_PORT || 465);
    const transporter = nodemailer.createTransport({ host, port, secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465, auth: { user, pass } });
    const senderName = typeof name === 'string' && name.trim() ? name.trim() : 'Anonymous';
    await transporter.sendMail({
      from: `Build Afterlife <${user}>`,
      to,
      replyTo: user,
      subject: `New build idea from ${senderName}`,
      text: `A new idea for Afterlife Theory Labs\n\nName: ${senderName}\n\nDescription:\n${description.trim()}`,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Could not deliver build idea email.', error);
    return NextResponse.json({ error: 'Could not send your idea right now.' }, { status: 502 });
  }
}
