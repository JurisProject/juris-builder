// with thanks to https://github.com/Urigo/graphql-modules/blob/8cb2fd7d9938a856f83e4eee2081384533771904/website/lambda/contact.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { validateEmail, validateLength } = require('./validations')

exports.handler = async (event, context) => {

  const body = JSON.parse(event.body)

  console.log('Sending Email');
  console.log({body});

  try {
    validateLength('body.toName', body.toName, 3, 50)
  } catch (e) {
    return {
      statusCode: 403,
      body: e.message,
    }
  }

  try {
    validateEmail('body.toEmail', body.toEmail)
  } catch (e) {
    return {
      statusCode: 403,
      body: e.message,
    }
  }

  let descriptor = {
    from: `${body.fromName} <noreply@getjuris.com>`,
    replyTo: `${body.fromName} <${body.fromEmail}>`,
    to: `"${body.toName}" <${body.toEmail}>`,
    subject: body.subject ? body.subject : `${body.fromName} sent you a message from gql-modules.com`,
    text: body.message,
  }

  if (body.attachment) {
    descriptor.attachments = [{disposition: 'attachment', filename: 'file.pdf', type: 'application/pdf', content: body.attachment}];
  }

  console.log({descriptor});

  try {
    const msg = await sgMail.send(descriptor);
    return {
      statusCode: 200,
      body: JSON.stringify(msg)
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }

}
