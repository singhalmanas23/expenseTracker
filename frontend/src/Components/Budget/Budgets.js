import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import BudgetForm from './BudgetForm';
import BudgetItem from './BudgetItem';

function Budget() {
    const { budget, getBudget, deleteBudget, totalBudget } = useGlobalContext();

    useEffect(() => {
        getBudget();
    }, []);

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Budget</h1>
                
                <div className="expense-content">
                    <div className="form-container">
                        <BudgetForm />
                    </div>
                    <div className="budgets">
                        {budget.map((budgetItem) => (
                            <BudgetItem
                                key={budgetItem._id}
                                id={budgetItem._id}
                                title={budgetItem.title}
                                amount={budgetItem.amount}
                                startDate={budgetItem.startDate}
                                endDate={budgetItem.endDate}
                                deleteBudget={deleteBudget} // Pass deleteBudget function here
                            />
                        ))}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    );
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .expense-content {
        display: flex;
        flex-direction: column; // Adjust to column layout
        gap: 2rem;
        .form-container {
            margin-bottom: 2rem; 
        }
        .budgets {
            flex: 1;
        }
    }
`;

export default Budget;
