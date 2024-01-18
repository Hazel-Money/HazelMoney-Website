import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import IconCategory from '../../utils/iconCategory';

function currencyFormat(num) {
    return (num/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function History() {
    const {transactionHistory} = useGlobalContext()

    const [...history] = transactionHistory()
    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {history.map((item) => {
                const{id, categoryName, amount, is_income, icon} = item
                return (
                    <div key={id} className="history-item">
                        <IconCategory category={icon} />
                        <p style={{
                            color: is_income == '0' ? 'red' : 'var(--color-green)'
                        }}>
                            {categoryName}
                        </p>
                        <p style={{
                            color: is_income == '0' ? 'red' : 'var(--color-green)'
                        }}>
                            {
                                is_income == '0' ? `-${currencyFormat(amount <= 0 ? 0 : amount )}` : `+${currencyFormat(amount <= 0 ? 0 : amount)}`
                            }
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

export default History