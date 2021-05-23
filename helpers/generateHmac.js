const crypto = require('crypto-js');
/**
 *
 * @param { data (including timestamp and all parts) } data
 * @param { sharedSecretKey } secret
 * @returns HMAC of the given data
 */
module.exports = (data, secret) => {
  var hmac = crypto.HmacSHA256(data, secret).toString();
  return hmac;
};
