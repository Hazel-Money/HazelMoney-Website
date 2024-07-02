import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import { useGlobalContext } from '../../context/globalContext';
import IconCategory from '../../utils/iconCategory';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Tooltip from '@mui/material/Tooltip';

function currencyFormat(num) {
    return (num / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1')
}

const DetailedIncomeInfo = ({ transaction, setSelectedTransaction }) => {
    
    const {changeItemInformation, language, Incomescategories, Expensescategories, getIncomesCategories, getExpensesCategories } = useGlobalContext();

    useEffect(() => {
        getExpensesCategories();
        getIncomesCategories();
      }, []);

    function getCategoryID(categoryName, categoriesArray) {
        for (let i = 0; i < categoriesArray.length; i++) {
            if (categoriesArray[i].name === categoryName) {
                return categoriesArray[i].id;
            }
        }
        return null; 
    }

    let defaultCategory;
    const categoryName = transaction.category; 
    if (transaction.is_income == '1') {
        defaultCategory = getCategoryID(categoryName, Incomescategories);
    } else {
        defaultCategory = getCategoryID(categoryName, Expensescategories);
    }
    

    const [inputState, setInputState] = useState({
        id: transaction.id,
        amount: transaction.amount / 100,
        description: transaction.description,
        category_id: defaultCategory,
        payment_date: new Date(transaction.payment_date)
    });
    
    const {id, amount, payment_date, category_id, description } = inputState;
    
    const handleDatePickerChange = (date) => {
        setInputState({ ...inputState, payment_date: date });
    };

    const handleInputChange = (name) => (e) => {
        setInputState({ ...inputState, [name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const amountInCents = (parseFloat(inputState.amount) * 100).toString();

        changeItemInformation({...inputState, id: transaction.id, amount: amountInCents});
        setInputState({
            id: transaction.id,
            amount: transaction.amount,
            description: transaction.description,
            category_id: defaultCategory,
            payment_date: transaction.payment_date
        })
        setSelectedTransaction(null)
    };

    return (
        <Dialog
            open={Boolean(transaction)}
            onClose={() => setSelectedTransaction(null)}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
                style: {
                    minHeight: '45%',
                    minWidth: '35%',
                    borderRadius: '20px',
                    padding: '1rem',
                    background: 'var(--background2)',
                    border: '2px solid var(--border-color)FFF',
                    boxShadow: '0px 1px 15px rgba(0, 0, 0, 0.06)',
                    flexDirection: 'column',
                    display: 'flex',
                    gap: '1rem',
                    color: '#222260',
                },
            }}
        >
            <h2 style={{ textAlign: 'center' }}>{language === 'Portuguese' ? 'Alterar dados' : 'Edit information'}</h2>
            <IconContentWrapper>
                <IconWrapper color={transaction.color}>
                    <IconCategory category={transaction.icon} />
                </IconWrapper>
                <ContentWrapper>
                    <InnerContent>
                        <DialogContent>
                            <FormControl>
                                <Tooltip 
                                    title={language === 'Portuguese' ? 'Categoria' : 'Category'}
                                    placement='top'
                                >
                                    <select
                                        id="demo-simple-select"
                                        required
                                        value={category_id}
                                        name="category_id"
                                        onChange={handleInputChange("category_id")}
                                        label={language === 'Portuguese' ? 'Categoria' : 'Category'}
                                    >
                                        {transaction.is_income == '1' ? 
                                            Incomescategories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))
                                        : 
                                            Expensescategories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </Tooltip >
                            </FormControl>
                            <Tooltip 
                                title={language === 'Portuguese' ? 'Valor' : 'Amount'}
                                placement='top'
                            >
                                <input
                                    required
                                    margin="dense"
                                    id="amount"
                                    name="amount"
                                    type="text"
                                    onChange={handleInputChange('amount')}
                                    label='Amount'
                                    defaultValue={currencyFormat(transaction.amount)}
                                />
                            </Tooltip>
                            
                            <Tooltip 
                                title={language === 'Portuguese' ? 'Data de Pagamento' : 'Payment Date'}
                                placement='top'
                            >
                                <div>
                                    <DatePicker
                                        required
                                        id="payment_date"
                                        placeholderText={language === 'Portuguese' ? 'Insira uma data' : 'Enter a date'}
                                        dateFormat="Pp"
                                        showTimeSelect
                                        onChange={handleDatePickerChange}
                                        value={payment_date}
                                        selected={payment_date}
                                    />
                                </div>
                            </Tooltip>
                            <Tooltip 
                                title={language === 'Portuguese' ? 'Descrição' : 'Description'}
                                placement='top'
                            >
                                <textarea
                                    margin="dense"
                                    id="description"
                                    name="description"
                                    type="text"
                                    onChange={handleInputChange('description')}
                                    label='Description'
                                    defaultValue={transaction.description}
                                />
                            </Tooltip>
                        </DialogContent>
                    </InnerContent>
                    <div className='btn'>
                        <DialogActions>
                            <Button type="submit">{language === 'Portuguese' ? 'Alterar' : 'Save'}</Button>
                            <Button onClick={() => setSelectedTransaction(null)}>{language === 'Portuguese' ? 'Cancelar' : 'Cancel'}</Button>
                        </DialogActions>
                    </div>
                </ContentWrapper>
            </IconContentWrapper>
        </Dialog>
    );
}

const IconContentWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const IconWrapper = styled.div`
    width: 30%;
    height: 6rem;
    border-radius: 20px;
    background: #F5F5F5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--border-color)FFF;
    margin-top: -10%;
    i {
        font-size: 3rem;
        color: ${({ color }) => color};
    }
`;

const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    align-items: center;
    h5 {
        font-size: 1.3rem;
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

    input, textarea, select{
        margin-top: 3%;
        width: 100%;
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid var(--border-color);
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: var(--primary-color);
        &::placeholder{
            color: var(--primary-color3);
        }
    }
`

export default DetailedIncomeInfo;
