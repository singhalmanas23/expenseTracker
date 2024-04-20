import React, { useState } from 'react';
import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Intro from './Components/Form/Intro';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import Animation from './Components/Animation/Animation';
import Limits from './Components/Limit/Limit';
import Reminder from './Components/Reminder/Reminder';
import Budgets from './Components/Budget/Budgets';
import View  from './Components/Vhistory/View';
import Pay from './Components/Payment/Pay';

function App() {
  const [active, setActive] = useState(1);
  const [userName, setUserName] = useState('');
  const [isNameEntered, setIsNameEntered] = useState(false);

  const handleLogin = (name) => {
    setUserName(name);
    setIsNameEntered(true);
  };

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <View/>
      case 3:
        return <Income />
      case 4: 
        return <Expenses />
      case 5:
        return <Limits/>
      case 6:
        return <Budgets/>
      case 7:
        return <Reminder/>
      case 8:
         return <Pay/>
      default: 
      return <Dashboard />
    }
  }

  return (
    <AppStyled bg={bg} className="App">
    <Animation/>
      <Orb />
      {isNameEntered ? (
        <MainLayout>
          <Navigation active={active} setActive={setActive} userName={userName}/>
          <main>
            {displayData()}
          </main>
        </MainLayout>
      ) : (
        <Intro onLogin={handleLogin} />
      )}
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
