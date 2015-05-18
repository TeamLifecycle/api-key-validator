twilio = function(req, res) {
    accountSid = req.body["account_sid"];
    authToken = req.body["auth_token"];
    if (!(accountSid && authToken)) {
      return res.sendStatus(403);
    }
    twilioClient = new Twilio(accountSid, authToken);
    return twilioClient.checkKeys(function(err, data) {
      if (err) {
        return res.sendStatus(403);
      }
      return res.sendStatus(200);
    });
  }