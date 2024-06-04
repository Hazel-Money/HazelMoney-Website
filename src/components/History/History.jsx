import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import IconCategory from '../../utils/iconCategory';
import Tooltip from '@mui/material/Tooltip';

function currencyFormat(num) {
    return (num/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function History() {
    const {transactionHistory, historyError, language} = useGlobalContext()

    const [...history] = transactionHistory()
    return (
        <HistoryStyled>
            {historyError && <p className='error'>{historyError}</p>}
            {history.map((item) => {
                const{id, categoryName, amount, is_income, icon, currency, payment_date} = item
                return (
                    <Tooltip 
                        title={(language === 'Portuguese' ? "Data: " : "Date: ") + payment_date}
                        placement='top'
                    >
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
                                { " " + currency }
                            </p>
                        </div>
                    </Tooltip>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item {
        background: var(--white-color);
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export default History