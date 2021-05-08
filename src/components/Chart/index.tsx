import {Line,Bar,Doughnut} from 'react-chartjs-2';

export interface ChartArray {
    data?: Array<any>;
}
const ReactChartjsSample : React.FC<ChartArray> = props => {

    const data = {
        labels: ['#1', '#2', '#3', '#4', '#5', '#6', '#7' , '#8'],
        datasets: [
          {
            label : 'This is DataSet',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            backgroundColor: [
                '#B21F00',
                '#C9DE00',
                '#2FDE00',
                '#00A6B4',
                '#6800B4',
                '#223333',
              ],
              hoverBackgroundColor: [
              '#501800',
              '#4B5000',
              '#175000',
              '#003350',
              '#35014F'
              ],
            data: [1,0,10,0,2,0,3,0]
          },
          {
            label : 'This is Random DataSet2',
            borderColor: 'rgba(132,24,231,1)',
            borderWidth: 2,
            backgroundColor: [
                '#00A6B4',
                '#B21F00',
                '#C9DE00',
                '#6800B4',
                '#223333',
                '#2FDE00',
              ],
              hoverBackgroundColor: [
                '#003350',
                '#501800',
              '#4B5000',
              '#35014F',
              '#175000',
              ],
            data: props.data
          }
        ]
    };
    
    const options = {
        responsive : true,
        maintainAspectRatio: false,
    };

    return (
        <>
            <Bar 
            data={data} 
            width={100}
            height={50}
            type="bar"
            options={options}/>
        </>
    );
};

export default ReactChartjsSample;