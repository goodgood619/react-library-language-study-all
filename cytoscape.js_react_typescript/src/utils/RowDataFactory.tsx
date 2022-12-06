import {RefData} from './RefData';

export default class RowDataFactory {

    createRowData() {
        const rowData = [];

        for (let i = 0; i < 14; i++) {
            rowData.push({
                groups : RefData.GROUPS[i],
                nodes : RefData.NODES[i],
                aids : RefData.AIDS[i],
                units : RefData.UNITS[i],
                hardware : RefData.HardWardVersion[i],
                fpga : RefData.FPGAVersion[i],
                software : RefData.SOFTWAREVERSION[i],
                serialNumber : RefData.SERIALNUMBER[i],
                proficiency: Math.round(Math.random() * 100),
                result : RefData.RESULT[i]
            });
        }

        return rowData;
    }

    createChartData() {
        return {
            labels : ['#1','#2','#3','$5','!23','@#24','2021년 5월 11일','2021년 5월 12일','2021년 5월 13일','2021년 5월 14일','2021년 5월 15일','2021년 5월 16일','2021년 5월 17일','2021년 5월 18일',
            ,'2021년 5월 19일','2021년 5월 20일','2021년 5월 21일','2021년 5월 22일','2021년 5월 23일','2021년 5월 24일','2021년 5월 25일','2021년 5월 26일','2021년 5월 27일','2021년 5월 28일'],
            datasets: [
                {
                  label: "Random Dataset",
                  borderColor: "rgb(54, 162, 235)",
                  backgroundColor: "rgba(54, 162, 235, 0.5)",
                  cubicInterpolationMode: "monotone",
                  data: [1,2,3,4,2,52,1,2,3,4,2,5,3,2,1,2,3,2,12,14,2,43,1,12],
                },
              ],
        }
    }

    createSoundData() {
        const rowData = [];
        for(let i = 0; i < 4; i++) {
            rowData.push(false);
        }
        return rowData;
    }
}