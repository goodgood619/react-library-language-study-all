import React,{useState,useEffect} from 'react';
import cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import {observer} from 'mobx-react-lite';
// import Select from 'react-select';

// @ts-ignore
import COSEBilkent from 'cytoscape-cose-bilkent';

// @ts-ignore
import panzoom from 'cytoscape-panzoom';
// should use this css
import "cytoscape-panzoom/cytoscape.js-panzoom.css";
let cy : any;
cytoscape.use(COSEBilkent);
cytoscape.use(panzoom);
const CytoScapeExample = observer((props : {elements : any}) => {
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
    // const arr : any = [] ;
    // const sourceNode = {
    //   classes : 'group1',
    //   data: { id: 'n1', label: 'n1',parent :'nparent' }, position: { x: 50, y: 50 }, 
    // };
    // const targetNode = {
    //   classes : 'group1',
    //   data : {id : 'n2',label : 'n2',parent : 'nparent',position : {x : 100, y: 100}},
    // }
    // const testEdge = {
    //   classes : 'group1',
    //   data: { id: 'e0', source: 'n1', target: 'n2' }
    // }
    // // batch
    // cy.batch(()=>{
    //   arr.push(sourceNode);
    //   arr.push(targetNode);
    //   arr.push(testEdge);
    //   cy.add(arr)
    // });

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

    const layout = { name: 'preset' };

    const stylesheet = [
        {
            selector: 'node',
            style: {
                width : 60,
                height : 60,
                shape : 'rectangle',
                borderWidth : 1.5,
                borderStyle : 'solid',
                borderColor : function(node : any){
                  if(node.data("colored") === "blue") {
                    return "blue";
                  }
                  else if(node.data("colored") === "red") {
                    return "red";
                  }
                },
                borderOpacity : 1,
                label: 'data(label)',
                backgroundImage : function(node : any) {
                  if(node.data("node") === "CMX") {
                    return "./image/CMX.PNG";
                  }
                  else if(node.data("node") === "OTS") {
                    return "./image/OTS.PNG";
                  }
                  else if(node.data("node") === "LID") {
                    return "./image/LID.PNG";
                  }
                  else if(node.data("node") === "LIM") {
                    return "./image/LIM.PNG";
                  }
                  else if(node.data("node") === "SRN") {
                    return "./image/SRN.PNG";
                  }
                  else if(node.data("node") === "RU") {
                    return "./image/RU.PNG";
                  } 
                  else if(node.data("node") === 'DU') {
                    return "./image/DU.PNG";
                  }
                  else if(node.data("node") === "IA") {
                    return "./image/IA.PNG";
                  }
                  else if(node.data("node") === "OCM") {
                    return "./image/OCM.PNG";
                  }
                  else if(node.data("node")=== 'CRN') {
                    return "./image/CRN.PNG";
                  }
                  else if(node.data("node") === 'IA2') {
                    return "./image/IA2.PNG";
                  }
                  else if(node.data("node") === 'LMU') {
                    return "./image/LMU.PNG";
                  }
                  else if(node.data("node") === 'LSU') {
                    return "./image/LSU.PNG";
                  }
                },
                backgroundImageOpacity : 1,
                backgroundFit : `cover`, // backgroundimage를 node크기에 맞게 정확히 삽입 
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
              'width': 2,
              'line-color': function(node : any) {
                if(node._private.data.colored === 'blue') {
                  return "blue";
                }
                else if(node._private.data.colored === 'yellow') {
                  return "#ffe135";
                } 
                else if(node._private.data.colored === 'orange') {
                  return "orange";
                }
                else return "gray";
              },
              // 'target-arrow-color': 'blue',
              'curve-style': 'bezier',
            }
          },
          // {
          //   selector : '.group1',
          //   style : {
          //     width : 20,
          //     height : 20,
          //     shape : 'round-tag',
          //     backgroundColor : '#dd2',
          //     label : 'data(label)',
          //   }
          // },
          // {
          //   selector : '.group2',
          //   style : {
          //     width : 10,
          //     height : 10,
          //     shape : 'star',
          //     'background-color' : '#fdb',
          //     'label' : 'data(label)',
          //   }
          // }
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
            elements={props.elements}
            stylesheet={stylesheet}
            style={{width : '1400px', height : '700px'}}
            pan={{x : 100, y : 100}}
            cy={(cyValue : any)=>{
              cy = cyValue;
            }}
            zoom={2}
            layout={layout}
            />
      </>
    );
});

export default CytoScapeExample;