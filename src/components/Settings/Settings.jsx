import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { InnerLayout } from '../../styles/Layouts';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useGlobalContext } from '../../context/globalContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Settings() {
    const { currencies,getCurrencies, setCurrency, currency, changeCurrency, getCurrency, addAccount, getUserFromCookies} = useGlobalContext();

    useEffect(() => {
        getCurrencies();
        getCurrency();
    }, [])

    const currenciesOptions = () => {
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
        currency_code: currency,
        balance: '',
      });
    
    const { user_id, name, currency_code, balance } = inputState;  


    const handleInputChange = (name) => (e) => {
        setInputState((prevInputState) => ({
            ...prevInputState,
            [name]: e.target.value,
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        addAccount({...inputState, user_id: user_id});
        setInputState({
        user_id: user.id,
        name: '',
        currency_code: currency, 
        balance: '',
        })
        handleClose();
    };

    return (
        <SettingsStyled>
            <InnerLayout>
                <div className='main'>
                    <h1>Settings</h1>
                    <div className='left-side'>
                        <div className='accounts'>
                            <h2>Accounts</h2>
                            <div className="form-container">
                                <Button variant="outlined" onClick={handleClickOpen}> 
                                    Create account 
                                </Button>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{
                                        component: 'form',
                                        onSubmit: handleSubmit,
                                    }}
                                >
                                    <DialogTitle>Create account</DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            required
                                            margin="dense"
                                            id="name"
                                            name="name"
                                            label="Account Name"
                                            type="text"
                                            fullWidth
                                            onChange={handleInputChange('name')}
                                        />
                                        <TextField
                                            required
                                            margin="dense"
                                            id="balance"
                                            name="balance"
                                            label="Balance"
                                            type="text"
                                            fullWidth
                                            onChange={handleInputChange('balance')}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button type="submit">Create</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                        <div className='currency'>
                            <Autocomplete
                                defaultValue={currency}
                                disablePortal
                                id="combo-box-demo"
                                options={currenciesOptions()}
                                sx={{ width: 300 }}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} label="Currency" />}
                            />
                        </div>
                    </div>
                    <div className='right-side'>
                        <div className='users'>
                            <h2>Users</h2> 
                            <h3>Change password</h3>
                            <h3>Upload profile picture</h3>
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
                width: 35%;
            }
        }
    }
    .right-side{
        float: right;
        width: 50%;
        height: 100%;
        .users{
            margin-top: 10%;
        }
    }
`;

export default Settings;
