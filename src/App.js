import logo from './logo.svg';
import Board from './Board';
import Dice from './Dice';
import { LayoutProvider } from './contexts/LayoutContext';
import { PositionProvider } from './contexts/PositionContext';
import Player from './Player';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <LayoutProvider>
        <PositionProvider>
          <Board />
          <Player/>
          <Dice />
        </PositionProvider>
      </LayoutProvider>
    </div>
  );
}

export default App;
