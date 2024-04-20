import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentCheckStatusForm = () => {
    const [transactionId, setTransactionId] = useState('');

    const handleTransactionIdChange = (event) => {
        setTransactionId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`/checkPaymentStatus/${transactionId}`);
            console.log('Payment status:', response.data);
            // Handle payment status (redirect user, display message, etc.)
        } catch (error) {
            console.error('Error checking payment status:', error);
            // Handle error (display message to the user, etc.)
        }
    };

    return (
        <PaymentFormStyled onSubmit={handleSubmit}>
            <div className="input-control">
                <input
                    type="text"
                    value={transactionId}
                    onChange={handleTransactionIdChange}
                    placeholder="Enter Transaction ID"
                    required
                />
            </div>
            <div className="submit-btn">
                <Button
                    name={'Check Status'}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent)'}
                    color={'#fff'}
                    type="submit"
                />
                <ToastContainer />
            </div>
        </PaymentFormStyled>
    )
}

const Styled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control {
        input {
            width: 100%;
        }
    }
    .submit-btn {
        button {
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover {
                background: var(--color-green) !important;
            }
        }
    }
`;

export default PaymentCheckStatusForm;
