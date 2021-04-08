import React,{useState,useEffect} from 'react';
import cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';

// @ts-ignore
import COSEBilkent from 'cytoscape-cose-bilkent';

// @ts-ignore
import panzoom from 'cytoscape-panzoom';
// should use this css
import "cytoscape-panzoom/cytoscape.js-panzoom.css";

let cy : any;
cytoscape.use(COSEBilkent);
cytoscape.use(panzoom);
const CytoScapeExample = () => {
  const defaults = {
    zoomFactor: 0.05, // zoom factor per zoom tick
    zoomDelay: 45, // how many ms between zoom ticks
    minZoom: 0.1, // min zoom level
    maxZoom: 10, // max zoom level
    fitPadding: 50, // padding when fitting
    panSpeed: 10, // how many ms in between pan ticks
    panDistance: 10, // max pan distance per tick
    panDragAreaSize: 75, // the length of the pan drag box in which the vector for panning is calculated (bigger = finer control of pan speed and direction)
    panMinPercentSpeed: 0.25, // the slowest speed we can pan by (as a percent of panSpeed)
    panInactiveArea: 8, // radius of inactive area in pan drag box
    panIndicatorMinOpacity: 0.5, // min opacity of pan indicator (the draggable nib); scales from this to 1.0
    zoomOnly: false, // a minimal version of the ui only with zooming (useful on systems with bad mousewheel resolution)
    fitSelector: undefined, // selector of elements to fit
    animateOnFit: function(){ // whether to animate on fit
      return false;
    },
    fitAnimationDuration: 1000, // duration of animation on fit
  
  };
  useEffect(()=> {
    cy.panzoom(defaults);
    const arr : any = [] ;
    const sourceNode = {
      classes : 'group1',
      data: { id: 'n1', label: 'n1',parent :'nparent' }, position: { x: 50, y: 50 }, 
    };
    const targetNode = {
      classes : 'group1',
      data : {id : 'n2',label : 'n2',parent : 'nparent',position : {x : 100, y: 100}},
    }
    const testEdge = {
      classes : 'group1',
      data: { id: 'e0', source: 'n1', target: 'n2' }
    }
    // batch
    cy.batch(()=>{
      arr.push(sourceNode);
      arr.push(targetNode);
      arr.push(testEdge);
      cy.add(arr)
    })

  // test event
  cy.on('tapstart mouseover','node',(e: any)=> {
    console.log('tapstart mouseover node: ',e);
  });

  //
  // cy.$('aa').on('tap',(e: any)=> {
  //   if(e.target.selected) {
  //     e.target.style({'background-color' :'blue'});
  //   }
  // });

  // filter example by data using classes(group과 유사) and synchronous
  cy.batch(()=> {
    const filtered = cy.nodes().filter((ele : any, i : any)=> {
      const testId = ele._private.classes.values().next().value;
      return testId === 'group1';
    });
  
    // and then remove
    cy.remove(filtered);
  });

  },[]);

    // sample elements
    const elements = [
        {data : {id : 'p1'}},
        {data: { id: 'one', label: 'port1',parent:'p1' }, position: { x: 300, y: 300 } },
        {data: { id: 'two', label: 'port2',parent: 'p1' }, position: { x: 300, y: 400 } },
        {data: { id : 's1', source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },
        {data : {id : 'three', label : 'port3'},position : {x : 200, y : 100}},
        {data : {id : 's3', source : 'two', target : 'three'},label :'Edge from Node2 to Node3'},
        {data : {id :'s2', source : 'three', target : 'one'}, label : 'Edge from Node3 to Node1'},
     ];

    const layout = { name: 'random' };

    const stylesheet = [
        {
            selector: 'node',
            style: {
                width : 20,
                height : 20,
                shape : 'circle',
                backgroundColor: 'gray',
                label: 'data(label)'
            }
          },
          {
            selector : ':parent',
            style : {
                backgroundOpacity : 0.5
            }
          },
          {
            selector: 'edge',
            style: {
              'width': 1,
              'line-color': 'blue',
              'target-arrow-color': 'blue',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier'
            }
          },
          {
            selector : '.group1',
            style : {
              width : 20,
              height : 20,
              shape : 'round-tag',
              backgroundColor : '#dd2',
              label : 'data(label)',
            }
          },
          {
            selector : '.group2',
            style : {
              width : 10,
              height : 10,
              shape : 'star',
              'background-color' : '#fdb',
              'label' : 'data(label)',
            }
          }
          // ,
          // {
          //   selector : 'node:selected', // 단순히 selected만 주어도 가능함, event 없이
          //   style : {
          //     width : 20,
          //     height : 20,
          //     shape : 'round-tag',
          //     backgroundColor : 'blue',
          //     label : 'data(label)'
          //   }
          // }
    ];

    // test remove listener
    const testClick = () => {
      alert('no console anymore');
      cy.removeListener('tapstart mouseover');
    }
  
    return (
      <>
            <CytoscapeComponent
            elements={elements}
            stylesheet={stylesheet}
            style={{width : '1000px', height : '1000px', background : 'green',marginLeft:'15%',marginRight:'15%'}}
            pan={{x : 100, y : 100}}
            cy={(cyValue : any)=>{
              cy = cyValue;
            }}
            zoom={2}
            layout={layout}
            />
            <button onClick={testClick}>test button</button>
      </>
    );
};

export default CytoScapeExample;