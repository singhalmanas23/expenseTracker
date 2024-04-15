import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';

function AllHistory() {
    const { transaction } = useGlobalContext();

    const history = transaction(); // Remove the spread operator

    console.log(history); // Log history array here

    return (
        <HistoryStyled>
            <h2>History</h2>
            <div className="history-container">
                {history.map((item) => {
                    const { _id, title, amount, type } = item;

                    console.log(type); // Log type within the map function

                    return (
                        <div key={_id} className="history-item">
                            <p style={{
                                color: type === 'income' ? 'var(--color-green)' : 'var(--color-red)'
                            }}> 
                                {title}
                            </p>

                            <p style={{
                                color: type === 'income' ? 'var(--color-green)' : 'var(--color-red)'
                            }}>
                                {
                                    type === 'income' ? `+${amount <= 0 ? 0 : amount}` : `-${amount <= 0 ? 0 : amount}`
                                }
                            </p>
                        </div>
                    );
                })}
            </div>
        </HistoryStyled>
    );
}

const HistoryStyled = styled.div`
    align-item:center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    .history-container {
        max-height: 300px; /* Adjust the maximum height as needed */
        overflow-y: auto; /* Enable vertical scrolling */
    }

    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default AllHistory;
