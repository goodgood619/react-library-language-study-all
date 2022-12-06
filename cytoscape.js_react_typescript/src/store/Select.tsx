import {makeAutoObservable} from 'mobx';

class SelectStore {
    selectedTopology : any;
    topologyData : Array<any> = [];
    constructor() {
        makeAutoObservable(this);
    }

    setSelectedTopology(selectedTopology : any) {
        this.selectedTopology = selectedTopology;
    }

    getSelectedTopology() {
        return this.selectedTopology;
    }
}

const SampleSelectStore = new SelectStore();

export default SampleSelectStore;