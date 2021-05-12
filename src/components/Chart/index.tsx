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

export interface ChartArray {
  data?: Array<any>;
}

// Bar의 경우, x축이 number와 String일때 width의 길이가 다르다.
const ReactChartjsSample: React.FC<ChartArray> = props => {

  const handleChart = (e: any) => {
    console.log('devChart click item', e);
  };

  const handleExport = (e: any) => {
    console.log(e);
  };

  return (
    <>
      <Paper>
        <Chart
          data={props.data}>
          <ArgumentAxis />
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
        test export button
      </button>
    </>
  );
};

export default ReactChartjsSample;