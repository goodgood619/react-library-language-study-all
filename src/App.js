import PracticeStyled from './Practice';
import Button from './Button/index';
import {AppBlock} from './style';
import {ThemeProvider} from 'styled-components';
import Dialog from './Dialog/index';
import Chart from './BarChart/index';
import RCTreeSelect from './RCTreeSelect/index';
import ReactSpinnerSample from './ReactSpinners/index';
import BlueprintButton from './BlueprintJS/Core/Button/index';
import "@blueprintjs/core/lib/css/blueprint.css";
import BreadCrumbs from './BlueprintJS/Core/Breadcrumbs';
import CollapseExample from './BlueprintJS/Core/Collapse';
import DropDownMenuExample from './BlueprintJS/Core/Menu/index';
import ProgressBarExample from './BlueprintJS/Core/ProgressBar';
import GridLayoutExample from './ReactGridLayout';
import DialogExample from './BlueprintJS/Core/Dialog/index';
import CircularProgressbarExample from './ReactCircularBar';


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
        <BlueprintButton/>
        <BreadCrumbs/>
        <CollapseExample/>
        <DropDownMenuExample/>
        <ProgressBarExample/>
        <GridLayoutExample/>
        <DialogExample/>
        <CircularProgressbarExample/>
      </>
      </ThemeProvider>
  );
}

export default App;
