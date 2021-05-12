import React from 'react';
import './App.css';
import CytoScapeExample from './components/practice';
import Sample from './views/pages/Sample';
import SampleGrid from './views/pages/Grid';
import {SWRSample} from './views/pages/SWR';
import "@blueprintjs/core/lib/css/blueprint.css";
import SoundButton from './views/button';

function App() {
  return (
    <>
      <SampleGrid/>
      {/* <SWRSample/> */}
      {/* <SoundButton /> */}
    </>
  );
}

export default App;
