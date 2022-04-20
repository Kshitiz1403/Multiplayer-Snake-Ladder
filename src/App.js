import { LayoutProvider } from './contexts/LayoutContext';
import { PositionProvider } from './contexts/PositionContext';
import { VictoryProvider } from './contexts/VictoryContext';
import './App.css'
import io from 'socket.io-client';
import { UserProvider } from './contexts/UserContext';
import StartGame from './StartGame';

export const socket = io('http://localhost:5000')
function App() {

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
