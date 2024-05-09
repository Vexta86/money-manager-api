const urlSafeBase64 = require('urlsafe-base64')
const vapid = require('./vapid.json');

exports.get_public_key = (req, res, next) => {
    res.status(200).send( urlSafeBase64.decode(vapid.publicKey)  )
}