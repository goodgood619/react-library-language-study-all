import React from 'react';
import './App.css';
import CytoScapeExample from './components/practice';
import Sample from './pages/Sample';
import SampleGrid from './pages/Grid';
import {SWRSample} from './pages/SWR';
import "@blueprintjs/core/lib/css/blueprint.css";

function App() {
  return (
    <>
      {/* <SampleGrid/> */}
      <SWRSample/>
    </>
  );
}

export default App;
