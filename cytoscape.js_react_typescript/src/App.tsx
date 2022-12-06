import React from 'react';
import './App.css';
import CytoScapeExample from './components/practice';
import Sample from './views/pages/Sample';
import SampleGrid from './views/pages/Grid';
import {SWRSample} from './views/pages/SWR';
import {Test} from './views/pages/SWR/test';
import "@blueprintjs/core/lib/css/blueprint.css";
import SoundButton from './views/button';

function App() {
  return (
    <>
      <SampleGrid/>
      {/* <SWRSample/> */}
      {/* <SoundButton /> */}
      {/* <Test/> */}
    </>
  );
}

export default App;
