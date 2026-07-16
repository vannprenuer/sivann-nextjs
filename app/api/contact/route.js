// Handles the "Say Hello" contact form submission.
//
// If RESEND_API_KEY is set (get a free key at resend.com), messages are
// emailed to CONTACT_TO_EMAIL via Resend's REST API -- no SDK needed, just
// fetch. If it's not set (e.g. local dev, or before you've configured it),
// the route logs the message server-side and still returns success, so the
// form never breaks -- it just won't actually deliver an email until the
// env vars are added in Vercel.

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, message } = body || {};
  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'hallo@sivann.com';

  if (!apiKey) {
    console.warn('[contact form] RESEND_API_KEY not set — message not emailed, logging only:', { name, email, message });
    return Response.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Sivann.com Contact Form <contact@sivann.com>',
        to: [toEmail],
        reply_to: email,
        subject: `New message from ${name} via sivann.com`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error('[contact form] Resend API error:', detail);
      return Response.json({ error: 'Failed to send' }, { status: 502 });
    }
    return Response.json({ ok: true, delivered: true });
  } catch (err) {
    console.error('[contact form] send failed:', err.message);
    return Response.json({ error: 'Failed to send' }, { status: 502 });
  }
}
