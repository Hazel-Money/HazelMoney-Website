import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useGlobalContext } from '../../context/globalContext';
import { calender } from '../../utils/Icons';
import IconCategory from '../../utils/iconCategory';

function currencyFormat(num) {
    return (num / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const DetailedIncomeInfo = ({ income, setSelectedIncome }) => {
    const { language } = useGlobalContext();

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <Dialog
            open={Boolean(income)} // Open the dialog if income is truthy
            onClose={() => setSelectedIncome(null)}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
                style: {
                    minHeight: '40%',
                    minWidth: '35%',
                    borderRadius: '20px',
                    paddingBottom: '20px',
                    background: '#FCF6F9',
                    border: '2px solid #FFFFFF',
                    boxShadow: '0px 1px 15px rgba(0, 0, 0, 0.06)',
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    color: '#222260',
                },
            }}
        >
            <IconWrapper color={income.color}>
                <IconCategory category={income.icon} />
            </IconWrapper>
            <ContentWrapper>
                <h5>{income.category}</h5>
                <InnerContent>
                    <div className="text">
                        <p>{income.currency} {currencyFormat(income.amount)}</p>
                        <p>{calender} {income.payment_date}</p>
                        <p>
                            {income.comment}
                            {income.description}
                        </p>
                    </div>
                    <DialogActions>
                        <Button type="submit">{language === 'Portuguese' ? 'Alterar' : 'Alter'}</Button>
                        <Button onClick={() => setSelectedIncome(null)}>{language === 'Portuguese' ? 'Cancelar' : 'Cancel'}</Button>
                    </DialogActions>
                </InnerContent>
            </ContentWrapper>
        </Dialog>
    );
}

const IconWrapper = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #F5F5F5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #FFFFFF;
    i {
        font-size: 2.6rem;
        color: ${({ color }) => color};
    }
`;

const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    h5 {
        font-size: 1.3rem;
        padding-left: 2rem;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            background: ${({ indicator }) => indicator};
        }
    }
`;

const InnerContent = styled.div`
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
`;

export default DetailedIncomeInfo;
