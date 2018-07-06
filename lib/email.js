var config            = require('config')
  , nodemailer        = require('nodemailer')
  , mailgun_transport = require('nodemailer-mailgun-transport')

const api_key         = config.get('mailgun.api_key')
    , domain          = config.get('mailgun.domain')
    ;

var mailgun = nodemailer.createTransport(mailgun_transport({ auth : { api_key, domain }}));

module.exports = (req, res, next) => {
  return mailgun
          .sendMail(req.body)
          .then((result) => {
            let { id, message, messageId } = result;
            res.send({ id, message, messageId });
          })
          .catch((err) => {
            let { message } = err;

            res.status(500).send({ message });
          });
};
