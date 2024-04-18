import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PaymentForm() {
    const { addPayment, totalLimit, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        upiId: '',
        amount: '',
    });

    const { upiId, amount } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    }

    const notify = () => toast.success("Payment submitted successfully");

    const handleSubmit = e => {
        e.preventDefault();
        const paymentAmount = parseFloat(amount);
        if (paymentAmount <= totalLimit) {
            addPayment(inputState);
            setInputState({
                upiId: '',
                amount: '',
            });
            notify();
        } else {
            setError("Payment amount exceeds daily limit");
        }
    };

    return (
        <PaymentFormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={upiId}
                    name={'upiId'}
                    placeholder="Enter UPI ID or Number"
                    onChange={handleInput('upiId')}
                />
            </div>
            <div className="input-control">
                <input
                    type="number"
                    value={amount}
                    name={'amount'}
                    placeholder="Enter Amount"
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="submit-btn">
                <Button
                    name={'Pay'}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent)'}
                    color={'#fff'}
                    onClick={notify}
                />
                <ToastContainer />
            </div>
        </PaymentFormStyled>
    )
}

const PaymentFormStyled = styled.form`
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

export default PaymentForm;
