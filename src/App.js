import PracticeStyled from './Practice';
import Button from './Button/index';
import {AppBlock} from './style';
import {ThemeProvider} from 'styled-components';
import Dialog from './Dialog/index';
import Chart from './BarChart/index';
import RCTreeSelect from './RCTreeSelect/index';
import ReactSpinnerSample from './ReactSpinners/index';


function App() {
  return (
    <ThemeProvider
      theme ={{
        palette : {
          blue: '#228be6',
          gray: '#495057',
          pink: '#f06595' 
        }
      }}>
      <>
        <AppBlock>
          <Button>BUTTON</Button>
          <Button color="gray">BUTTON</Button>
          <Button color="pink">BUTTON</Button>
        </AppBlock>
        <Chart/>
        <RCTreeSelect/>
        <ReactSpinnerSample/>
      </>
      </ThemeProvider>
  );
}

export default App;
