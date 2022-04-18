import Board from './Board';
import Dice from './Dice';
import { LayoutProvider } from './contexts/LayoutContext';
import { PositionProvider } from './contexts/PositionContext';
import Player from './Player';
import { VictoryProvider } from './contexts/VictoryContext';
import { Pages } from './Pages';
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
