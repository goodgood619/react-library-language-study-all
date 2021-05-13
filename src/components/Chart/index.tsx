import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  ZoomAndPan,
  Legend,
  Title,
  Tooltip,
  BarSeries
} from "@devexpress/dx-react-chart-material-ui";
import { EventTracker, HoverState, Stack } from "@devexpress/dx-react-chart";
import React, { useRef } from "react";
//@ts-ignore
import {saveAs} from 'file-saver';
import html2canvas from 'html2canvas';
export interface ChartArray {
  data?: Array<any>;
}

interface LineProps {
  /** The line start’s x coordinate */
  x1: number;
  /** The line end’s x coordinate */
  x2: number;
  /** The line start’s y coordinate */
  y1: number;
  /** The line end’s y coordinate */
  y2: number;
}

// Bar의 경우, x축이 number와 String일때 width의 길이가 다르다.
const ReactChartjsSample: React.FC<ChartArray> = props => {

  const ref = useRef();
  const handleChart = (e: any) => {
    console.log('devChart click item', e);
  };

  const handleExport = (e: any) => {
    console.log(ref);
    if(ref !== null) {
      let canvas = document.getElementById("chart");
      html2canvas(canvas!).then(canvas => {
        canvas.toBlob(function(blob){
          saveAs(blob,'test.png');
        })
      });
    }
  };



  const lineFC: React.FC<LineProps> = (props) => (
    <>
      {props}
    </>
  );
  return (
    <>
      <Paper
      id="chart"
      ref={ref}>
        <Chart
          data={props.data}>
          <ArgumentAxis 
          tickSize={5}
          />
          <ValueAxis />
          <Title
            text="test chart" />
          <Legend
            position="right"
          />
          <BarSeries name="Bar name" valueField="y" argumentField="x" />
          <LineSeries name="Line name" valueField="y" argumentField="x" />
          <Stack/>
          <ZoomAndPan />
          <EventTracker onClick={handleChart} />
          <Tooltip />
          <HoverState />
        </Chart>
      </Paper>
      <button onClick={handleExport}>
        test export png
      </button>
    </>
  );
};

export default ReactChartjsSample;