// with thanks to https://github.com/Urigo/graphql-modules/blob/8cb2fd7d9938a856f83e4eee2081384533771904/website/lambda/contact.js
const fs = require('fs');
const sendMail = require('sendmail')({
  dkim: { // Default: False
    privateKey: "-----BEGIN RSA PRIVATE KEY-----\nMIICXAIBAAKBgQC0+JfV3lNWUkSICkMo7bV4NdRlLgk8ZSsfKY2ZELlGQGwqHkM5\nN+xwnBoyzmABlvSfnpQif6eDLUhas6rQL2ackS7+yMWJVAwSRugGASnF87wegDMM\nrlbkE9cfmFug1+Y5Z51brAo4Bis3U9I6hLNl+6drMHxtxQ9JTb++2Zk6nwIDAQAB\nAoGAGMOLw3BQ5xcK2bLNzeP5WSHElrPd/624YONGxRNMxxg5tOm/OS015ZL24szq\nxkzp3I3Op4ngWkrwA7liPmq+F6LsnoFSm2u7jA5fjiW3uG67yh+QZRGN9abEu96Z\nXh/hwy38+6iDdcxSrgct1r0GKyAStqi31mmrVR6ifPZkjMECQQD+ORt2zAaQI8BO\nRI1lZYst1V/KMw+Nr03ZXmJjTXqte9yRkeEg+SH5liZ2WZ1hRkk9wi/GJMIbEzXO\nAD2+Gi9rAkEAtjxpqLj5ysm5mGSKf7z5gQrNdYdHSpZ7X9sXFsLhnqhkJqdoHe6m\nnKsmgckPAxYZmEbH/ekqXW6F2uC+SOXynQJAT545ALqjL49S0fBcTC5CKYeS6XOW\nYmxNuE78B1ejnSOWj6ydUkNUJaOlxhkI1gc6NvJTHf4zIGGizzJ6I8h1owJATOyT\nbTUnvAIK5dkK3YDXkTEOKV5BKar7ySqiRGle86oBHI/t0zS5/8f/KSnFvHfHtg+q\nu/OAfo/40Lutlvf5wQJBALJ6Q6fBfI7JqCZg2JiOOtNPbj/DR2uRC9UZHgbPx2HI\n2HQEzI3iUT88BiYKXZ7mQWsvHik05GpUNShWdg0uF18=\n-----END RSA PRIVATE KEY-----",
    keySelector: 'getjurisbuilder',
    domain: 'getjuris.com'
  }
})
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
    from: `"${body.fromName}" <noreply@getjuris.com>`,

    replyTo: `"${body.fromName}" <${body.fromEmail}>`,
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
