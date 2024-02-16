import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { signout, settings } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import { useGlobalContext } from '../../context/globalContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

function currencyFormat(num) {
    return (num/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

function Navigation({active, setActive}) {
    const {userUsername, userEmail,getUserInformation, uploadProfilePicture,changeUserInformation,language,getProfilePicture, setProfilePicture, profilePicture, refreshAccountContent, setAccountId, setAccountName, accountName, accountId, logout, getAccounts, getUserFromCookies, totalBalance, currency, accounts, getCurrency, balance, getBalance} = useGlobalContext();

    useEffect(() => {
        getAccounts();
        getCurrency();
        getBalance();
        getProfilePicture();
        getUserInformation();
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
        username: '',
        email: ''
      });

    useEffect(() => {
    setInputState(prevState => ({
        ...prevState,
        username: userUsername || '',
        email: userEmail || ''
    }));
}, [userUsername, userEmail]);

    const { user_id, username, email } = inputState;  

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputState)
        changeUserInformation({...inputState, user_id: user_id});
        setInputState({
            user_id: user.id,
            username: '',
            email: ''
        })
        handleClose();
    };

    const handleInputChange = (name) => (e) => {
        console.log(inputState)
        setInputState({ ...inputState, [name]: e.target.value });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        uploadProfilePicture(file);
        handleClose();
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
                            style: { 
                                minHeight: '40%', 
                                minWidth: '35%',
                                borderRadius: '14px',
                                paddingBottom: '20px',
                                background: 'white' 
                            }
                        }}
                    >
                        <div className='gradient' style={{
                            backgroundImage: 'linear-gradient(160deg,var(--primary-color), #0000ff7c)',
                            height: '125px',
                            borderRadius: '4px 4px 0px 0px',
                        }}>
                        </div>
                        <div className="profile-information" style={{ textAlign: 'center' }}>
                            <div style={{
                                position: 'relative',
                                display: 'inline-block',
                                marginTop: '-75px',
                                padding: '5px',
                                background: 'transparent',
                            }}>
                                <img
                                    src={profilePicture}
                                    style={{
                                        height: '150px',
                                        borderRadius: '100px',
                                    }}
                                />
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleFileChange}
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        left: '0',
                                        opacity: '0',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius:'14px',
                                        cursor: 'pointer'
                                    }} />
                            </div>
                            <DialogContent>
                                <TextField
                                    required
                                    margin="dense"
                                    id="username"
                                    name="username"
                                    type="text"
                                    fullWidth
                                    onChange={handleInputChange('username')}
                                    label='Username'
                                    defaultValue={userUsername}
                                />
                                <TextField
                                    required
                                    margin="dense"
                                    id="email"
                                    name="email"
                                    type="email"
                                    fullWidth
                                    onChange={handleInputChange('email')}
                                    label='Email'
                                    defaultValue={userEmail}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button type="submit">{language === 'Portuguese' ? 'Alterar' : 'Alter'}</Button>
                                <Button onClick={handleClose}>{language === 'Portuguese' ? 'Cancelar' : 'Cancel'}</Button>
                            </DialogActions>
                        </div>
                    </Dialog>
                </div>
                <div className="text">
                    <h2>{userUsername}</h2>
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
                transition: ease-in-out 0.4s;
                &:hover {
                    transition: ease-in-out 0.4s;
                    transform: scale(1.1);
                }
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