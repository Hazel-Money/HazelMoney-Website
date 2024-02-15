import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatar.png'
import { signout, settings } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import { useGlobalContext } from '../../context/globalContext';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DialogTitle from '@mui/material/DialogTitle';

function currencyFormat(num) {
    return (num/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

function Navigation({active, setActive}) {
    const {language,getProfilePicture, setProfilePicture, profilePicture, refreshAccountContent, setAccountId, setAccountName, accountName, accountId, logout, getAccounts, getUserFromCookies, totalBalance, currency, accounts, getCurrency, balance, getBalance} = useGlobalContext();

    useEffect(() => {
        getAccounts();
        getCurrency();
        getBalance();
        getProfilePicture();
    }, [])


    //when accountId value changes, it wil refresh the content for that account
    useEffect(() => {
        refreshAccountContent();
    }, [accountId]);

    useEffect(() => {
        const storedAccountId = localStorage.getItem('accountId');
        const storedAccountName = localStorage.getItem('accountName');

        setAccountId(storedAccountId || "All");
        setAccountName(storedAccountName || "All");
    }, []);

    
    const user = getUserFromCookies();
    const handleSignOut = () => {
        logout();
    };

    const handleChange = (event) => {
        const credentials = event.target.value.split(",");
        const selectedAccountName = credentials[0];
        setAccountName(selectedAccountName);

        const selectedAccountId = credentials[1]
        setAccountId(selectedAccountId);

        localStorage.setItem('accountId', selectedAccountId);
        localStorage.setItem('accountName', selectedAccountName);
    };

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
      });
    
    const { user_id, name } = inputState;  

    const handleSubmit = (event) => {
        event.preventDefault();
        //addAccount({...inputState, user_id: user_id, currency_code: currency_code});
        setInputState({
        user_id: user.id,
        name: '',
        })
        handleClose();
    };

    const handleInputChange = (name) => (e) => {
        setInputState({ ...inputState, [name]: e.target.value });
    };

    return (
        <NavStyled>
            <div className="user-con">
                <div className="form-container">
                    <div className="pfp-container" onClick={handleClickOpen}> 
                        <img src={profilePicture} />
                    </div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            component: 'form',
                            onSubmit: handleSubmit,
                            style: { minHeight: '40%', minWidth: '35%' }
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
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>{language === 'Portuguese' ? 'Cancelar' : 'Cancel'}</Button>
                            <Button type="submit">{language === 'Portuguese' ? 'Criar' : 'Create'}</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className="text">
                    <h2>{user.username}</h2>
                    <p><strong>{currency}</strong> {currencyFormat(balance)}</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return (
                        <li
                            key={item.id}
                            onClick={() => setActive(item.id)}
                            className={active === item.id ? 'active' : ''}
                        >
                            {item.icon}
                            <span>{language === 'Portuguese' ? item.title_pt : item.title}</span>
                        </li>
                    );
                })}
            </ul>
            <div className="bottom-nav">
                <div className="bottom-nav-left">
                    <li onClick={handleSignOut}>
                        {signout} {language === 'Portuguese' ? 'Sair' : 'Sign Out'}
                    </li>
                </div>
                <div className="bottom-nav-right">
                    <div className="account-select">
                        <select
                            required
                            name="account_id"
                            id="account_id"
                            onChange={handleChange}
                            value={`${accountName},${accountId}`}
                        >
                        <option key="All" value={["All","All"]}>All accounts</option>
                        {accounts.map((account) => (
                            <option key={account.id} value={[account.name,account.id]}>
                            {account.name}
                            </option>
                        ))}
                        </select>
                    </div>
                </div>
            </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        .pfp-container {
            cursor: pointer;
            img{
                width: 80px;
                height: 80px;
                border-radius: 50%;
                object-fit: cover;
                background: #fcf6f9;
                border: 2px solid #FFFFFF;
                padding: .2rem;
                box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
            }
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }
    
    .bottom-nav {
        display: flex;
        justify-content: space-between;
        .bottom-nav-left {
            cursor: pointer;
            li {
                margin: 10px 10px;
            }
        }
        .bottom-nav-right {
            display: grid;
            place-items: center;
            select{
                float: right;
                width: 80%;
                font-family: inherit;
                font-size: 1.1rem;
                outline: none;
                border: none;
                padding: .5rem 1rem;
                border-radius: 5px;
                border: 2px solid #fff;
                background: transparent;
                resize: none;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                color: rgba(34, 34, 96, 0.9);
                &::placeholder{
                    color: rgba(34, 34, 96, 0.4);
                }
            }
        }
    }
`;

export default Navigation