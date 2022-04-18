import Board from './Board/Board';
import Dice from './Dice/Dice';
import { LayoutProvider } from './contexts/LayoutContext';
import { PositionProvider } from './contexts/PositionContext';
import Player from './Player/Player';
import { VictoryProvider } from './contexts/VictoryContext';
import { Game } from './Game/Game';
import './App.css'
import openSocket from 'socket.io-client';
import { useEffect } from 'react';
import { JoinRoom } from './JoinRoom';
import { UserProvider } from './contexts/UserContext';
import StartGame from './StartGame';

export const socket = openSocket('http://localhost:5000')
function App() {
  useEffect(() => {
    // socket.on('init', (msg) => {
    //   console.log(msg)
    // })
    // socket.on('msg', msg =>
    //   console.log(msg))
  }, [])

  return (
    <div className='App'>
      <LayoutProvider>
        <PositionProvider>
          <UserProvider>
            <VictoryProvider>
              <StartGame />
            </VictoryProvider>
          </UserProvider>
        </PositionProvider>
      </LayoutProvider>
    </div>
  );
}

export default App;
