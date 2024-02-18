import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { InnerLayout } from '../../styles/Layouts';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useGlobalContext } from '../../context/globalContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DialogTitle from '@mui/material/DialogTitle';
import hazelMoneyIcon from '../../img/hazelmoneyIcon.png'

function Settings() {
    const {language, setLanguage,  currencies, getCurrencies, setCurrency, currency, changeCurrency, getCurrency, addAccount, getUserFromCookies } = useGlobalContext();

    useEffect(() => {
        getCurrencies();
        getCurrency();
    }, [])

    const getCurrenciesOptions = () => {
        return currencies.map((currency) => `${currency.code} - ${currency.name}`);
    }

    const handleChange = (event, newValue) => {
        const currencyCode = String(newValue).slice(0, 3);
        changeCurrency(currencyCode);
    };

    const user = getUserFromCookies();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [inputState, setInputState] = useState({
        user_id: user.id,
        name: '',
        currency_code: "USD",
        balance: '',
      });

    const { user_id, name, currency_code, balance } = inputState;  
    const currenciesOptions = getCurrenciesOptions();

    const handleInputChange = (name) => (e, newValue) => {
        let value = e.target ? e.target.value : newValue;
        if (name === 'currency_code') {
            value = String(newValue).slice(0, 3);
        }
        setInputState((prevInputState) => ({
            ...prevInputState,
            [name]: value,
        }));
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const amountInCents = (parseFloat(inputState.balance) * 100).toString();

        addAccount({...inputState, user_id: user_id, currency_code: currency_code, balance: amountInCents });
        setInputState({
            user_id: user.id,
            name: '',
            currency_code: '', 
            balance: '',
        })
        handleClose();
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
        localStorage.setItem('environmentLanguage', event.target.value);
    };

    return (
        <SettingsStyled>
            <InnerLayout>
                <div className='main'>
                    <div className="top">
                        <h1>{language === 'Portuguese' ? 'Configurações' : 'Settings'}</h1>
                        <img src={hazelMoneyIcon}/>
                    </div>
                    <div className='left-side'>
                        <div className='accounts'>
                            <h2>{language === 'Portuguese' ? 'Contas' : 'Accounts'}</h2>
                            <div className="form-container">
                                <Button variant="outlined" onClick={handleClickOpen}> 
                                    {language === 'Portuguese' ? 'Criar conta' : 'Create account'}
                                </Button>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{
                                        component: 'form',
                                        onSubmit: handleSubmit,
                                        style: { minHeight: '40%', minWidth: '35%', borderRadius: '14px' }
                                    }}
                                >
                                    <DialogTitle>{language === 'Portuguese' ? 'Criar conta' : 'Create account'}</DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            required
                                            margin="dense"
                                            id="name"
                                            name="name"
                                            label={language === 'Portuguese' ? 'Nome da Conta' : 'Account Name'}
                                            type="text"
                                            fullWidth
                                            onChange={handleInputChange('name')}
                                        />
                                        <TextField
                                            required
                                            margin="dense"
                                            id="balance"
                                            name="balance"
                                            label={language === 'Portuguese' ? 'Saldo' : 'Balance'}
                                            type="text"
                                            fullWidth
                                            onChange={handleInputChange('balance')}
                                            style={{ marginBottom: '1rem' }}
                                        />
                                        
                                        <Autocomplete
                                            required
                                            defaultValue={currenciesOptions[0]}
                                            id="currency_code"
                                            name="currency_code"
                                            fullWidth
                                            options={currenciesOptions}
                                            onChange={handleInputChange('currency_code')}
                                            renderInput={(params) => <TextField {...params} label={language === 'Portuguese' ? 'Moeda *' : 'Currency *'} />}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>{language === 'Portuguese' ? 'Cancelar' : 'Cancel'}</Button>
                                        <Button type="submit">{language === 'Portuguese' ? 'Criar' : 'Create'}</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                    <div className='right-side'>
                        <div className='users'>
                            <h2>{language === 'Portuguese' ? 'Utilizadores' : 'Users'}</h2> 
                            <div className='language'>
                                <h3>{language === 'Portuguese' ? 'Idioma' : 'Language'}</h3>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={language}
                                    onChange={handleLanguageChange}
                                >
                                    <MenuItem value={"English"}>English</MenuItem>
                                    <MenuItem value={"Portuguese"}>Português</MenuItem>
                                </Select>
                            </div>
                            
                            <div className='currency'>

                                <h3 className='change-currency'>{language === 'Portuguese' ? 'Alterar moeda' : 'Change currency'}</h3>

                                <Autocomplete
                                    defaultValue={currency}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={getCurrenciesOptions()}
                                    sx={{ width: 300 }}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} label={language === 'Portuguese' ? 'Moeda' : 'Currency'} />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </SettingsStyled>
    )
}

const SettingsStyled = styled.div`
    display: flex;
    overflow: auto;
    height: 100%;
    .top{
        display: flex;
        width: 100%;
        height: 4rem;
        h1{
            float: left;
            width: 95%;
        }
        img{
            margin-top: -2%;
            margin-bottom: 1%;
            float: right;
            transform: rotate(30deg);
        }
    }
    .left-side{
        float: left;
        width: 50%;
        height: 100%;
        .currency{
            margin-top: 15%;
            float: left;
        }
        .accounts{
            margin-top: 10%;
            .form-container{
                margin-top: 2vh;
            }
            .language{
                margin-top: 4vh;
            }
        }
    }
    .right-side{
        float: right;
        width: 50%;
        height: 100%;
        .users{
            margin-top: 10%;
            h3{
                margin-top: 10%;
            }
            .currency h3{
                margin-bottom: 3%;
            }
        }
    }

`;

export default Settings;
