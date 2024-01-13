import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';

function Dashboard() {
  //const { getUsers } = useGlobalContext();
  const [users, setUsers] = useState([]);

  /*

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [getUsers]); 

  inside innerlayout: 
  <h2>Users:</h2>
        <ul>
          {users.map((user) => (
            <li>{user.id}{user.username}<br/>{user.email}</li>
          ))}
        </ul>
  */
  return (
    <DashBoardStyled>
      <InnerLayout>
        
      </InnerLayout>
    </DashBoardStyled>
  );
}

const DashBoardStyled = styled.div``;

export default Dashboard;
