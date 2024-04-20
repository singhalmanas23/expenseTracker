import React, { useState } from 'react';
import sha256 from 'crypto-js/sha256';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'; 

const Pay = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        name: 'DemoTest',
        mobile: '999999999',
        amount: '10',
        muid: 'nuid-909090'
    });

    const handleFormDataChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const makePayment = async (e) => {
        e.preventDefault();
        const transactionid = "Tr-" + uuidv4().toString(36).slice(-6);

        const payload = {
            merchantId: process.env.MERCHANT_ID,
            merchantTransactionId: transactionid,
            merchantUserId: 'MUID-' + uuidv4().toString(36).slice(-6),
            amount: 10000,
            redirectUrl: `http://localhost:3000/api/status/${transactionid}`,
            redirectMode: "POST",
            callbackUrl: `http://localhost:3000/api/status/${transactionid}`,
            mobileNumber: formData.mobile,
            paymentInstrument: {
                type: "PAY_PAGE",
            },
        };

        const dataPayload = JSON.stringify(payload);
        const dataBase64 = Buffer.from(dataPayload).toString("base64");

        const fullURL = dataBase64 + "/pg/v1/pay" + process.env.SALT_KEY;
        const dataSha256 = sha256(fullURL);
        const checksum = dataSha256 + "###" + process.env.SALT_INDEX;

        const UAT_PAY_API_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

        try {
            const response = await axios.post(
                UAT_PAY_API_URL,
                { request: dataBase64 },
                {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                        "X-VERIFY": checksum,
                    },
                }
            );

            const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;
            navigate(redirectUrl); 
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            {/* <form onSubmit={makePayment}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleFormDataChange('name', e.target.value)}
                        type="text"
                        autoComplete="name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="mobile">Mobile</label>
                    <input
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={(e) => handleFormDataChange('mobile', e.target.value)}
                        type="text"
                        autoComplete="mobile"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={(e) => handleFormDataChange('amount', e.target.value)}
                        type="text"
                        autoComplete="amount"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="muid">MUID</label>
                    <input
                        id="muid"
                        name="muid"
                        value={formData.muid}
                        onChange={(e) => handleFormDataChange('muid', e.target.value)}
                        type="text"
                        autoComplete="muid"
                        required
                    />
                </div>
                <button type="submit">Pay</button>
            </form> */}
            <h1>Pay</h1>
        </div>
    );
};

export default Pay;
