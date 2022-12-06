import { Chart, ChartData, ChartOptions, ScaleType } from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
//@ts-ignore
import streamingPlugin from "chartjs-plugin-streaming";
import React, { useRef } from "react";
//@ts-ignore
import {saveAs} from 'file-saver';
import html2canvas from 'html2canvas';
export interface ChartArray {
  data?: any;
}

Chart.register([zoomPlugin,streamingPlugin]);

const ReactChartjsSample: React.FC<ChartArray> = props => {

  const ref = useRef(Chart);

  const handleExport = (e: any) => {
    console.log(ref);
    if(ref !== null) {
      let canvas = document.getElementById('line');
      html2canvas(canvas!).then(canvas => {
        canvas.toBlob(function(blob){
          saveAs(blob,'test.png');
        })
      });
    }
  };

  const options : ChartOptions = {
    responsive : false, // canvas의 width, height 절대값이 적용가능하게 함,
    scales : {
      xAxes : {
        beginAtZero : true, 
        ticks : {
          autoSkip : false // x축의 label들을 전부 보여줌
        }
      }
    },
    plugins: {
      legend : {
        position : 'right',
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          enabled: true,
          mode: "x",
        },
      },
    },
  };

  return (
    <div>
      <Line
      id='line'
        ref={ref}
        data = {props.data}
        type={"line"}
        options={options}
        width={500}
        height={500}
      ></Line>
      <button onClick={handleExport}>
        test export png
      </button>
    </div>
  );
};

export default ReactChartjsSample;