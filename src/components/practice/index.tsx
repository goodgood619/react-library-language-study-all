
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';

import COSEBilkent from 'cytoscape-cose-bilkent';

let cy : any;
Cytoscape.use(COSEBilkent);
const CytoScapeExample = () => {
    // sample elements
    const elements = [
        { data: { id: 'one', label: 'Node 1' }, position: { x: 300, y: 300 } },
        { data: { id: 'two', label: 'Node 2' }, position: { x: 400, y: 400 } },
        { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },
        {data : {id : 'three', label : 'Node 3'},position : {x : 200, y : 100}},
        {data : {source : 'two', target : 'three'},label :'Edge from Node2 to Node3'},
        {data : {source : 'three', target : 'one'},label : 'Edge from Node3 to Node1'},
     ];

    const stylesheet = [
        {
            selector: 'node',
            style: {
                width : 20,
                height : 20,
                shape : 'rectangle',
              'background-color': '#666',
              'label': 'data(label)'
            }
          },
      
          {
            selector: 'edge',
            style: {
              'width': 3,
              'line-color': 'blue',
              'target-arrow-color': 'blue',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier'
            }
          }
    ];;
    
    const addExample = (cy : any) => {
        cy.add([
            { group: 'nodes', data: { id: 'n0' }, position: { x: 100, y: 100 } },
            { group: 'nodes', data: { id: 'n1' }, position: { x: 200, y: 200 } },
            { group: 'edges', data: { id: 'e0', source: 'n0', target: 'n1' } }
        ])
        return cy;
    };
    
    return (
            <CytoscapeComponent
            elements={elements}
            stylesheet={stylesheet}
            style={{width : '800px', height : '800px'}}
            pan={{x : 100, y : 100}}
            zoom={2}
            />
    );
};

export default CytoScapeExample;