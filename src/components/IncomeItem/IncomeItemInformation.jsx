import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Select from '@mui/material/Select';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useGlobalContext } from '../../context/globalContext';
import { calender, comment } from '../../utils/Icons';
import IconCategory from '../../utils/iconCategory';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function currencyFormat(num) {
    return (num / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const DetailedIncomeInfo = ({ income, setSelectedIncome }) => {
    
    const {changeItemInformation, language, Incomescategories } = useGlobalContext();

    const defaultCategory = Incomescategories[0].id;

    const [inputState, setInputState] = useState({
        id: income.id,
        amount: income.amount,
        description: income.description,
        category_id: defaultCategory,
        payment_date: income.payment_date
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

        changeItemInformation({...inputState, id: income.id, amount: amountInCents});
        setInputState({
            id: income.id,
            amount: income.amount,
            description: income.description,
            category_id: income.category,
            payment_date: defaultCategory
        })
        setSelectedIncome(null)
    };


    return (
        <Dialog
            open={Boolean(income)}
            onClose={() => setSelectedIncome(null)}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
                style: {
                    minHeight: '45%',
                    minWidth: '35%',
                    borderRadius: '20px',
                    padding: '1rem',
                    background: '#FCF6F9',
                    border: '2px solid #FFFFFF',
                    boxShadow: '0px 1px 15px rgba(0, 0, 0, 0.06)',
                    flexDirection: 'column',
                    display: 'flex',
                    gap: '1rem',
                    color: '#222260',
                },
            }}
        >
            <h2 style={{ textAlign: 'center' }}>Alterar dados</h2>
            <IconContentWrapper>
                <IconWrapper color={income.color}>
                    <IconCategory category={income.icon} />
                </IconWrapper>
                <ContentWrapper>
                    <InnerContent>
                        <DialogContent>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">{language === 'Portuguese' ? 'Categoria' : 'Category'}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    required
                                    value={category_id}
                                    name="category_id"
                                    onChange={handleInputChange("category_id")}
                                    label={language === 'Portuguese' ? 'Categoria' : 'Category'}
                                >
                                    {Incomescategories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                required
                                margin="dense"
                                id="amount"
                                name="amount"
                                type="text"
                                fullWidth
                                onChange={handleInputChange('amount')}
                                label='Amount'
                                defaultValue={currencyFormat(income.amount)}
                            />
                            <DatePicker
                                required
                                locale="pt"
                                id="payment_date"
                                placeholderText={language === 'Portuguese' ? 'Insira uma data' : 'Enter a date'}
                                dateFormat="Pp"
                                showTimeSelect
                                onChange={handleDatePickerChange}
                                value={payment_date}
                            />
                            <TextField
                                required
                                margin="dense"
                                id="description"
                                name="description"
                                type="text"
                                fullWidth
                                onChange={handleInputChange('description')}
                                label='Description'
                                defaultValue={income.description}
                            />
                        </DialogContent>
                    </InnerContent>
                    <div className='btn'>
                        <DialogActions>
                            <Button type="submit">{language === 'Portuguese' ? 'Alterar' : 'Alter'}</Button>
                            <Button onClick={() => setSelectedIncome(null)}>{language === 'Portuguese' ? 'Cancelar' : 'Cancel'}</Button>
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
    border: 2px solid #FFFFFF;
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
`

export default DetailedIncomeInfo;
