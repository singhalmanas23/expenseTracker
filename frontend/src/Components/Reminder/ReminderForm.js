import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { bell } from '../../utils/Icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PaymentReminderForm() {
    const { addReminder, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        dueDate: null,
        userName: '', // Added field for user's name
    });
    const [reminders, setReminders] = useState([]);

    const { title, amount, dueDate, userName } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    }

    const notify = () => toast.success("Payment reminder added successfully");

    const handleSubmit = e => {
        e.preventDefault();
        addReminder(inputState);
        setReminders([...reminders, inputState]);
        setInputState({
            title: '',
            amount: '',
            dueDate: null,
            userName: '', // Reset user's name field after submission
        });
    };

    return (
        <div>
            <PaymentReminderFormStyled onSubmit={handleSubmit}>
                {error && <p className='error'>{error}</p>}
                <div className="input-control">
                    <input
                        type="text"
                        value={title}
                        name={'title'}
                        placeholder="Payment Title"
                        onChange={handleInput('title')}
                    />
                </div>
                <div className="input-control">
                    <input
                        value={amount}
                        type="text"
                        name={'amount'}
                        placeholder={'Payment Amount'}
                        onChange={handleInput('amount')}
                    />
                </div>
                <div className="input-control">
                    <input
                        value={userName}
                        type="text"
                        name={'userName'}
                        placeholder={'Recipient Name'}
                        onChange={handleInput('userName')}
                    />
                </div>
                <div className="date input-control">
                    <DatePicker
                        id='dueDate'
                        placeholderText='Due Date'
                        selected={dueDate}
                        dateFormat="dd/MM/yyyy"
                        onChange={date => setInputState({ ...inputState, dueDate: date })}
                    />
                </div>
                <div className="submit-btn">
                    <Button
                        name={'Add Reminder'}
                        //icon={bell}
                        bPad={'.8rem 1.6rem'}
                        bRad={'30px'}
                        bg={'var(--color-accent'}
                        color={'#fff'}
                        onClick={notify}
                    />
                    <ToastContainer />
                </div>
            </PaymentReminderFormStyled>
        </div>
    )
}

const PaymentReminderFormStyled = styled.form`
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
        margin-top:20px;
        margin-left:20px;
        color: rgba(34, 34, 96, 0.9);
        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control {
        input {
            width: 90%;
        }
    }
    .date {
        width:60%;
    }
    .submit-btn {
        button {
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover {
                background: var(--color-green) !important;
            }
            margin-left:20px;
        }
    }
`;

const PaymentReminderListStyled = styled.div`
    margin-top: 20px;
    div {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        margin-top: 10px;
    }
`;

export default PaymentReminderForm;
