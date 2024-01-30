import React from 'react';
import styled from "styled-components";
import { InnerLayout } from '../../styles/Layouts';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useGlobalContext } from '../../context/globalContext';

function Settings() {
    const { currencies, setCurrency, currency } = useGlobalContext();

    const currenciesOptions = () => {
        return currencies.map((currency) => `${currency.code} - ${currency.name}`);
    }

    const handleChange = (event, newValue) => {
        const currencyCode = String(newValue).slice(0, 3);
        setCurrency(currencyCode);
    };

    return (
        <SettingsStyled>
            <InnerLayout>
                <h1>Settings</h1>
                <div className='currency'>
                    <Autocomplete
                        value={currency}
                        disablePortal
                        id="combo-box-demo"
                        options={currenciesOptions()}
                        sx={{ width: 300 }}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} label="Currency" />}
                    />
                </div>
            </InnerLayout>
        </SettingsStyled>
    )
}

const SettingsStyled = styled.div`
    display: flex;
    overflow: auto;
`;

export default Settings;
