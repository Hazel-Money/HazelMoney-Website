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
    const { currencies, setCurrency, currency, changeCurrency, getCurrency } = useGlobalContext();

    useEffect(() => {
        getCurrency();
    }, [])

    const currenciesOptions = () => {
        return currencies.map((currency) => `${currency.code} - ${currency.name}`);
    }

    const handleChange = (event, newValue) => {
        const currencyCode = String(newValue).slice(0, 3);
        changeCurrency(currencyCode);
    };

    const [open, setOpen] = useState(false);
    const [accountName, setAccountName] = useState('');
    const [balance, setBalance] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        handleClose();
    };

    return (
        <SettingsStyled>
            <InnerLayout>
                <h1>Settings</h1>
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
                                    id="accountName"
                                    name="accountName"
                                    label="Account Name"
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    required
                                    margin="dense"
                                    id="balance"
                                    name="balance"
                                    label="Balance"
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">Create</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </InnerLayout>
        </SettingsStyled>
    )
}

const SettingsStyled = styled.div`
    display: flex;
    overflow: auto;
    .currency{
        margin-top: 5vh;
    }
    .accounts{
        margin-top: 8vh;
        .form-container{
            margin-top: 2vh;
            width: 35%;
        }
    }
`;

export default Settings;
