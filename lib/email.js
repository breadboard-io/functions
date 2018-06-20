var _                 = require('lodash')
  , Promise           = require('bluebird')
  , config            = require('config')
  ;

var nodemailer        = require('nodemailer')
  , mailgun_transport = require('nodemailer-mailgun-transport')
  , api_key           = config.get('mailgun.api_key')
  , domain            = config.get('mailgun.domain')
  , mailgun           = nodemailer.createTransport(mailgun_transport({ auth : { api_key, domain }}))
  ;

module.exports = (req, res, next) => {
  return mailgun.sendMail(req.body);
};
