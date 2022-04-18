import Board from './Board/Board';
import Dice from './Dice/Dice';
import { LayoutProvider } from './contexts/LayoutContext';
import { PositionProvider } from './contexts/PositionContext';
import Player from './Player/Player';
import { VictoryProvider } from './contexts/VictoryContext';
import { Pages } from './Pages/Pages';
import './App.css'


function App() {
  return (
    <div className='App'>
      <LayoutProvider>
        <PositionProvider>
          <VictoryProvider>
            <Pages>
              <Board />
              <Player />
              <Dice />
            </Pages>
          </VictoryProvider>
        </PositionProvider>
      </LayoutProvider>
    </div>
  );
}

export default App;
