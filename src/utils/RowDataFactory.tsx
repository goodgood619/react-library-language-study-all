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
        const ret = [];
        let y = 0;
        for (let i = 0; i < 10; i += 1) {
            y += Math.round(Math.random() * 10 - 5);
            ret.push({ x: String(i*5), y });
        }
        return ret;
    }

    createSoundData() {
        const rowData = [];
        for(let i = 0; i < 4; i++) {
            rowData.push(false);
        }
        return rowData;
    }
}