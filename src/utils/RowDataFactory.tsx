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
        const rowData = [];
        for(let i = 0 ;i<8;i++) {
            rowData.push(Math.round(Math.random()*100));
        }
        return rowData;
    }
}