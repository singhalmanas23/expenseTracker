const crypto = require('crypto');
const axios = require('axios');
require("dotenv").config();

const newPayment = async (req, res) => {
  try {
    const transactionid = "Tr-" + uuidv4().toString(36).slice(-6);
    const payload = {
      merchantId: process.env.MERCHANT_ID,
      merchantTransactionId: transactionid,
      merchantUserId: 'MUID-' + uuidv4().toString(36).slice(-6),
      amount: req.body.amount * 100, // Assuming amount is passed in the request body
      redirectUrl: `http://localhost:3000/api/status/${transactionid}`,
      redirectMode: "POST",
      callbackUrl: `http://localhost:3000/api/status/${transactionid}`,
      mobileNumber: req.body.mobile, // Assuming mobile number is passed in the request body
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64");
    const fullURL = payloadBase64 + "/pg/v1/pay" + process.env.SALT_KEY;
    const dataSha256 = crypto.createHash('sha256').update(fullURL).digest('hex');
    const checksum = dataSha256 + "###" + process.env.SALT_INDEX;

    const UAT_PAY_API_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    const response = await axios.post(
      UAT_PAY_API_URL,
      {
        request: payloadBase64,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
      }
    );

    const redirect = response.data.data.instrumentResponse.redirectInfo.url;
    res.redirect(redirect);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const checkStatus = async (req, res) => {
  try {
    const merchantTransactionId = req.params['txnId'];
    const merchantId = process.env.MERCHANT_ID;
    const keyIndex = 2;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + process.env.SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;

    const options = {
      method: 'GET',
      url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': `${merchantId}`
      },
    };

    const response = await axios.request(options);
    if (response.data.success === true) {
      res.status(200).send({ success: true, message: "Payment Success" });
    } else {
      res.status(400).send({ success: false, message: "Payment Failure" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  newPayment,
  checkStatus
};
