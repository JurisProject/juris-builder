// with thanks to https://github.com/Urigo/graphql-modules/blob/8cb2fd7d9938a856f83e4eee2081384533771904/website/lambda/contact.js
const sendMail = require('sendmail')()
const { validateEmail, validateLength } = require('./validations')

exports.handler = (event, context, callback) => {
  // if (!process.env.CONTACT_EMAIL) {
  //   return callback(null, {
  //     statusCode: 500,
  //     body: 'process.env.CONTACT_EMAIL must be defined',
  //   })
  // }

  const body = JSON.parse(event.body)

  try {
    validateLength('body.toName', body.toName, 3, 50)
  } catch (e) {
    return callback(null, {
      statusCode: 403,
      body: e.message,
    })
  }

  try {
    validateEmail('body.toEmail', body.toEmail)
  } catch (e) {
    return callback(null, {
      statusCode: 403,
      body: e.message,
    })
  }

  try {
    validateLength('body.message', body.message, 10, 1000)
  } catch (e) {
    return callback(null, {
      statusCode: 403,
      body: e.message,
    })
  }

  let descriptor = {
    from: `"${body.fromName}" <${body.fromEmail}>`,
    to: `"${body.toName} <${body.toEmail}>`,
    subject: body.subject ? body.subject : `${body.fromName} sent you a message from gql-modules.com`,
    text: body.message,
  }

  if (body.attachment) {
    descriptor.attachments = [{filename: 'file.pdf', encoding: 'base64', content: body.attachment}];
  }

  sendMail(descriptor, e => {
    if (e) {
      callback(null, {
        statusCode: 500,
        body: e.message,
      })
    } else {
      callback(null, {
        statusCode: 200,
        body: '',
      })
    }
  })
}
