var ips = {};

module.exports = async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(ip);
  if (ip in ips) {
    ips[ip]++;
  } else {
    ips[ip] = 0;
  }

  if (ips[ip] > 2) {
    return res.status(429).send('Too many requests, please try again later.');
  }
  console.log(ips);
  next();
};
