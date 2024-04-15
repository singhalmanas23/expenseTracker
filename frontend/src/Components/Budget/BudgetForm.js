import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BudgetForm() {
    const { addBudget, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        startDate: null, // Changed to null to handle date objects properly
        endDate: null, // Changed to null to handle date objects properly
    });
    const [budgets, setBudgets] = useState([]);

    const { title, amount, startDate, endDate } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    }

    const notify = () => toast.success("Budget added Successfully");

    const handleSubmit = e => {
        e.preventDefault();
        addBudget(inputState);
        setBudgets([...budgets, inputState]); // Add the entered budget to the list
        setInputState({
            title: '',
            amount: '',
            startDate: null, // Changed to null to handle date objects properly
            endDate: null, // Changed to null to handle date objects properly
        });
    };

    return (
        <div>
            <BudgetFormStyled onSubmit={handleSubmit}>
                {error && <p className='error'>{error}</p>}
                <div className="input-control">
                    <input
                        type="text"
                        value={title}
                        name={'title'}
                        placeholder="Budget Title"
                        onChange={handleInput('title')}
                    />
                </div>
                <div className="input-control">
                    <input
                        value={amount}
                        type="text"
                        name={'amount'}
                        placeholder={'Budget Amount'}
                        onChange={handleInput('amount')}
                    />
                </div>
                <div className="date-range input-control">
                    <DatePicker
                        id='startDate'
                        placeholderText='Start Date'
                        selected={startDate}
                        dateFormat="dd/MM/yyyy"
                        onChange={date => setInputState({ ...inputState, startDate: date })}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <DatePicker
                        id='endDate'
                        placeholderText='End Date'
                        selected={endDate}
                        dateFormat="dd/MM/yyyy"
                        onChange={date => setInputState({ ...inputState, endDate: date })}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </div>
                <div className="submit-btn">
                    <Button
                        name={'Add Budget'}
                        icon={plus}
                        bPad={'.8rem 1.6rem'}
                        bRad={'30px'}
                        bg={'var(--color-accent'}
                        color={'#fff'}
                        onClick={notify}
                    />
                    <ToastContainer />
                </div>
            </BudgetFormStyled>
            <BudgetListStyled>
                <h1>Budget History</h1>
                {budgets.map((budget, index) => (
                    <div key={index}>
                        <p>{budget.title}: {budget.amount}</p>
                        <p>Start Date: {budget.startDate ? budget.startDate.toLocaleDateString() : ''}</p>
                        <p>End Date: {budget.endDate ? budget.endDate.toLocaleDateString() : ''}</p>
                    </div>
                ))}
            </BudgetListStyled>
        </div>
    )
}

const BudgetFormStyled = styled.form`
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
    .date-range {
        display: flex;
        gap: 1rem;
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

const BudgetListStyled = styled.div`
    margin-top: 20px;
    div {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        margin-top: 10px;
    }
`;

export default BudgetForm;
