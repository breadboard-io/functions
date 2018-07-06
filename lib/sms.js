var config            = require('config')
  , _                 = require('lodash')
  , twilio            = require('twilio')
  ;

const twilio_key      = config.get('twilio.key')
    , twilio_secret   = config.get('twilio.secret')
    , twilio_phone    = config.get('twilio.phone')
    ;

var twilio_client = twilio(twilio_key, twilio_secret);

module.exports = (req, res, next) => {
  let options = _.defaults({ from : twilio_phone }, req.body);

  return twilio_client
          .messages
          .create(options)
          .then((result) => {
            let { from, to, errorCode, errorMessage, sid, status } = result;

            res.send({ from, to, errorCode, errorMessage, sid, status });
          })
          .catch((err) => {
            let { message } = err;

            res.status(500).send({ message });
          });
};
