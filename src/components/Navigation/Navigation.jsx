import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { chevron, signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import { useGlobalContext } from '../../context/globalContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Divider, Drawer, IconButton, ListItemButton, SwipeableDrawer } from '@mui/material';
import { LogOutIcon } from 'lucide-react';

function currencyFormat(num) {
    return (num/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

function Navigation({active, setActive, drawerOpen, setDrawerOpen, permanent}) {
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

    const [userDialogOpen, setUserDialogOpen] = useState(false);

    const handleOpenUserDialog = () => {
        setUserDialogOpen(true);
    };

    const handleCloseUserDialog = () => {
        setUserDialogOpen(false);
    };

    const [inputState, setInputState] = useState({
        user_id: user.id,
        username: userUsername,
        email: userEmail
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
        changeUserInformation({...inputState, user_id: user_id});
        setInputState({
            user_id: user.id,
            username: '',
            email: ''
        })
        handleCloseUserDialog();
    };

    const handleInputChange = (name) => (e) => {
        setInputState({ ...inputState, [name]: e.target.value });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        uploadProfilePicture(file);
        handleCloseUserDialog();
    };

    const handleMenuItemPress = (id) => {
        setActive(id);
        setDrawerOpen(false);
    }

    return (
         <Drawer
            open={drawerOpen} 
            handleClose={() => setDrawerOpen(false)}
            variant={permanent ? 'permanent' : 'temporary'}
            PaperProps={ permanent && { sx: { background: 'transparent', borderWidth: 0, paddingY: '30px', paddingLeft: '10px' } } }
            // ModalProps={ permanent && {  } }
         >
            <NavStyled>
                <div className="user-con">
                    <div className="form-container">
                        <div className="pfp-container" onClick={handleOpenUserDialog}> 
                            <img src={profilePicture} />
                        </div>
                        <Dialog
                            open={userDialogOpen}
                            onClose={handleCloseUserDialog}
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
                                backgroundImage: 'linear-gradient(45deg, #cc6633, #994700)',
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
                                    height: '150px',
                                    width: '150px',
                                }}>
                                    <img
                                        src={profilePicture}
                                        alt=''
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: '100px',
                                            objectFit: 'cover'
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
                                            cursor: 'pointer',
                                            aspectRatio: 1
                                        }}
                                    />
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
                                        label={language === 'Portuguese' ? 'Nome' : 'Username'}
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
                                    <Button style={{color:'var(--hazel-color)'}} type="submit">{language === 'Portuguese' ? 'Alterar' : 'Save'}</Button>
                                    <Button style={{color:'var(--hazel-color)'}} onClick={handleCloseUserDialog}>{language === 'Portuguese' ? 'Cancelar' : 'Cancel'}</Button>
                                </DialogActions>
                            </div>
                        </Dialog>
                        <div className="text">
                            <h2>{userUsername}</h2>
                            <p><strong>{currency}</strong> {currencyFormat(balance)}</p>
                        </div>
                    </div>
                    {!permanent &&
                        <IconButton
                            color='inherit'
                            edge='end'
                            onClick={() => setDrawerOpen(!drawerOpen)}
                            style={{ aspectRatio: 1, width: 50 }}
                        >
                        {chevron}
                      </IconButton>
                    }
                </div>
                {/* <Divider /> */}
                <ul className="menu-items open">
                    {menuItems.map((item) => {
                        return (
                            <li
                                key={item.id}
                                onClick={() => handleMenuItemPress(item.id)}
                                className={active === item.id ? 'active' : 'inactive'}
                            >
                                {item.icon}
                                <span>{language === 'Portuguese' ? item.title_pt : item.title}</span>
                            </li>
                        );
                    })}
                </ul>
                {/* <Divider /> */}
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
                            <option key="All" value={["All","All"]}>{language === 'Portuguese' ? 'Todas as contas' : 'All accounts'}</option>
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
        </Drawer>
    );
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: var(--background-color);
    border: 3px solid var(--border-color);
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-con {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;

        .pfp-container {
            cursor: pointer;
            img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                object-fit: cover;
                background: var(--white-color);
                border: 2px solid var(--border-color);
                padding: .2rem;
                box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
                transition: ease-in-out 0.4s;
                &:hover {
                    transition: ease-in-out 0.4s;
                    transform: scale(1.1);
                }
            }
        }
        .form-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 1rem;
        }
        h2{
            color: var(--primary-color);
        }
        p{
            color: var(--primary-color2);
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
            margin: .8rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: var(--primary-color3);
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
        color: var(--primary-color2) !important;
        i{
            color: var(--primary-color) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: var(--primary-color);
            border-radius: 0 10px 10px 0;
        }
    }
    .inactive {
        color: var(--primary-color3) !important;
        i {
            color: var(--primary-color2) !important;
        }
        span {
            color: var(--primary-color3) !important;   
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
            color: var(--primary-color2);
        }
        .bottom-nav-right {
            display: grid;
            place-items: center;
            select{
                float: right;
                width: 100%;
                max-width: 12vw;
                font-family: inherit;
                font-size: 1.1rem;
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
                    color: var(--primary-color);
                }
                option{
                    color: var(--primary-color);
                    background: var(--background-color);
                }
            }
        }
    }

    /* @media only screen and (max-width: 600px) {
        padding: 3%;
        width: 25%;
        .user-con {
            height: auto;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            padding: 0rem;
            .pfp-container{
                img{
                    width: 55px;
                    height: 55px;
                }
            }
            .text{
                h2{
                    font-size: 1rem;
                }
                p{
                    font-size: 0.8rem;
                }
            }
        }

        .menu-toggle {
            display: block;
            cursor: pointer;
            position: fixed;
            top: 180px; 
            right: 20px; 
            z-index: 1000; 
            padding: 1rem;
            background-color: transparent; 
            border: none; 
        }

        .menu-items li span {
            display: none; 
        }

        .bottom-nav {
            flex-direction: column-reverse;
            align-items: center;
            padding: 0;
            .bottom-nav-left{
                width: 100%;
                margin: 0;
                li{
                    margin-right: 0 !important;
                    font-size: 0.7rem;
                }
            }
            .bottom-nav-left,
            .bottom-nav-right {
                display: flex;
                justify-content: center;
                margin-top: 1rem;
                li {
                    margin: 0 0.5rem;
                }
            }
            .bottom-nav-right {
                select {
                    max-width: 100%;
                    padding: 0;
                    font-size: 1rem;
                }
            }
        }
    } */
`;

export default Navigation
