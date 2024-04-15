import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBell } from 'react-icons/fa'; 

const NotificationButton = ({ onClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <Button onClick={toggleNotifications}>
      <FaBell size={28}/>
      {showNotifications && <NotificationBadge />}
    </Button>
  );
};

const Button = styled.button`
  position: relative;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;


const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  #background-color: red;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  size:40px;
`;

export default NotificationButton;
