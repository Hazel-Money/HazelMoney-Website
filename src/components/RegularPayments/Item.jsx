import React from 'react'
import styled from 'styled-components'
import { trash, comment, calender, dollar, food, medical, money, freelance, stocks, users, bitcoin, card, yt, piggy, book, tv, takeaway, clothing, circle, transport, dining} from '../../utils/Icons'
import Button from '../Button/Button'
import IconCategory from '../../utils/iconCategory';

function currencyFormat(num) {
    return (num/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function RegularPaymentsItem({
    id,
    account_id,
    category,
    amount,
    is_income,
    payment_date,
    description,
    icon,
    color,
    deleteItem,
    indicatorColor
}){

  return (
    <RegularPaymentsItemStyled indicator={indicatorColor}>
        <div className="icon" style={{color: color}}>
            <IconCategory category={icon} />
        </div>
        <div className="content">
            <h5>{category}</h5>
            <div className="inner-content">
                <div className="text">
                    <p>{dollar} {currencyFormat(amount)}</p>
                    <p>{calender} {payment_date}</p>
                    <p>
                        {comment}
                        {description}
                    </p>
                </div>
            </div>
        </div>
    </RegularPaymentsItemStyled>
  )
}

const RegularPaymentsItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    .icon {
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2.6rem;
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--primary-color);
                opacity: 0.8;
            }
        }
    }
`;

export default RegularPaymentsItem