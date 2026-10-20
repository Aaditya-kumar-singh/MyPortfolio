const test = require('node:test');
const assert = require('node:assert/strict');
const nodemailer = require('nodemailer');
const { sendEmail } = require('../controllers/emailController');

const createResponse = () => ({
  statusCode: 200,
  payload: null,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(payload) {
    this.payload = payload;
    return this;
  },
});

test('rejects an invalid sender email before attempting delivery', async () => {
  const response = createResponse();
  await sendEmail({ body: { email: 'not-an-email', subject: 'Hello', message: 'Message' } }, response);
  assert.equal(response.statusCode, 400);
  assert.equal(response.payload.success, false);
});

test('enforces subject and message length limits', async () => {
  const longSubjectResponse = createResponse();
  await sendEmail({ body: { email: 'sender@example.com', subject: 'x'.repeat(121), message: 'Hello' } }, longSubjectResponse);
  assert.equal(longSubjectResponse.statusCode, 400);

  const longMessageResponse = createResponse();
  await sendEmail({ body: { email: 'sender@example.com', subject: 'Hello', message: 'x'.repeat(5001) } }, longMessageResponse);
  assert.equal(longMessageResponse.statusCode, 400);
});

test('escapes user HTML and safely sends a valid contact message', async (t) => {
  const priorUser = process.env.EMAIL_USER;
  const priorPassword = process.env.EMAIL_PASS;
  process.env.EMAIL_USER = 'portfolio@example.com';
  process.env.EMAIL_PASS = 'test-password';
  t.after(() => {
    if (priorUser === undefined) delete process.env.EMAIL_USER;
    else process.env.EMAIL_USER = priorUser;
    if (priorPassword === undefined) delete process.env.EMAIL_PASS;
    else process.env.EMAIL_PASS = priorPassword;
  });

  let sentOptions;
  t.mock.method(nodemailer, 'createTransport', () => ({
    sendMail: async (options) => {
      sentOptions = options;
      return { accepted: [options.replyTo] };
    },
  }));

  const payload = {
    email: 'sender@example.com',
    subject: 'Hello $& <script>alert(1)</script>',
    message: 'Please review <img src=x onerror=alert(1)> and these tokens: $& $\'',
  };
  const response = createResponse();
  await sendEmail({ body: payload }, response);

  assert.equal(response.statusCode, 200);
  assert.equal(response.payload.success, true);
  assert.equal(sentOptions.replyTo, payload.email);
  assert.match(sentOptions.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(sentOptions.html, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.doesNotMatch(sentOptions.html, /<script|<img/i);
  assert.match(sentOptions.html, /Hello \$&amp;/);
  assert.match(sentOptions.text, /Please review <img src=x onerror=alert\(1\)>/);
});
