import React,{useState,useEffect} from 'react';
import cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
// import Select from 'react-select';

// @ts-ignore
import COSEBilkent from 'cytoscape-cose-bilkent';

// @ts-ignore
import panzoom from 'cytoscape-panzoom';
// should use this css
import "cytoscape-panzoom/cytoscape.js-panzoom.css";
// sample elements
const elements = [
      {data : {id : 'CMX1',label : 'CMX16A-W35', node : 'CMX',colored : 'blue'},position : {x : 500, y : 500}},
      {data : {id : 'CMX2',label : 'CMX16A-W53', node : 'CMX',colored : 'blue'},position : {x : 500, y: 600}},
      {data : {id : 'CMX3',label : 'CMX16A-W55',node : 'CMX',colored : 'blue'},position : {x : 500, y : 700}},
      {data : {id : 'LIM1',label : 'LIM-3C',node : 'LIM',colored : 'blue'},position : {x : 600, y : 600}},
      {data : {id : 'LIM2',label : 'LID-6C',node : 'LID',colored : 'blue'},position : {x : 700, y : 600}},
      {data : {id : 'SRN1',label : 'SRN8A-35L',node : 'SRN',colored : 'blue'},position : {x : 800, y : 300}},
      {data : {id : 'SRN2',label : 'SRN8A-35H',node : 'SRN',colored : 'blue'},position : {x : 800, y : 400}},
      {data : {id : 'SRN3',label : 'SRN8A-53L',node : 'SRN',colored : 'blue'},position : {x : 800, y : 500}},
      {data : {id : 'SRN4',label : 'SRN8A-53H',node : 'SRN',colored : 'blue'},position : {x : 800, y : 600}},
      {data : {id : 'SRN5',label : 'SRN8A-55L',node : 'SRN',colored : 'blue'},position : {x : 800, y : 700}},
      {data : {id : 'SRN6',label : 'SRN8A-55H',node : 'SRN',colored : 'blue'},position : {x : 800, y : 800}},
      {data : {id : 'OTS1',label : 'OTS',node : 'OTS',colored : 'red'}, position : {x : 900, y : 300}},
      {data : {id : 'OTS2',label : 'OTS',node : 'OTS',colored : 'red'},position : {x : 900, y : 400}},
      {data : {id : 'OTS3',label : 'OTS',node : 'OTS',colored : 'red'},position : {x : 900, y : 500}},
      {data : {id : 'OTS4',label : 'OTS',node : 'OTS',colored : 'red'},position : {x : 900, y : 600}},
      {data : {id : 'OTS5',label : 'OTS',node : 'OTS',colored : 'red'},position : {x : 900, y : 700}},
      {data : {id : 'OTS6',label : 'OTS',node : 'OTS',colored : 'red'},position : {x : 900, y : 800}},
      {data : {id : 'RU1',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 300}},
      {data : {id : 'RU2',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 400}},
      {data : {id : 'RU3',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 500}},
      {data : {id : 'RU4',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 600}},
      {data : {id : 'RU5',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 700}},
      {data : {id : 'RU6',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 800}},
      {data : {id : 's4',source : 'CMX1',target : 'LIM1'}},
      {data : {id : 's5',source : 'CMX2',target : 'LIM1'}},
      {data : {id : 's6',source : 'CMX3',target : 'LIM1'}},
      {data : {id : 's7',source : 'LIM1',target : 'LIM2', colored: "yellow"}},
      {data : {id : 's8',source : 'LIM2',target : 'LIM1', colored : "yellow"}},
      {data : {id : 's9',source : 'SRN1',target : 'LIM2'}},
      {data : {id : 's10',source : 'SRN2',target : 'LIM2'}},
      {data : {id : 's11',source : 'SRN3',target : 'LIM2'}},
      {data : {id : 's12',source : 'SRN4',target : 'LIM2'}},
      {data : {id : 's13',source : 'SRN5',target : 'LIM2'}},
      {data : {id : 's14',source : 'SRN6',target : 'LIM2'}},
      {data : {id : 's15',source : 'OTS1',target : 'SRN1'}},
      {data : {id : 's16',source : 'OTS2',target : 'SRN2'}},
      {data : {id : 's17',source : 'OTS3',target : 'SRN3'}},
      {data : {id : 's18',source : 'OTS4',target : 'SRN4'}},
      {data : {id : 's19',source : 'OTS5',target : 'SRN5'}},
      {data : {id : 's20',source : 'OTS6',target : 'SRN6'}},
      {data : {id : 's21',source : 'RU1',target : 'OTS1'}},
      {data : {id : 's22',source : 'RU2',target : 'OTS2'}},
      {data : {id : 's23',source : 'RU3',target : 'OTS3'}},
      {data : {id : 's24',source : 'RU4',target : 'OTS4'}},
      {data : {id : 's25',source : 'RU5',target : 'OTS5'}},
      {data : {id : 's26',source : 'RU6',target : 'OTS6'}},
   ];
let cy : any;
cytoscape.use(COSEBilkent);
cytoscape.use(panzoom);
const CytoScapeExample = () => {
  const options = [
    {value : 'WDM-PON-P2P',label : 'WDM-PON-P2P'},
    {value : 'WDM-PON-Cascade',label : 'WDM-PON-Cascade'},
    {value : 'WDM-PON-P2P_Protection',label : 'WDM-PON-P2P_Protection'},
    {value : 'WDM-PON-P2P_RingProtection',label : 'WDM-PON-P2P_RingProtection'},
  ];
  const [selectedOptions,setSelectedOptions] = useState<any>(options);

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
                width : 100,
                height : 100,
                shape : 'rectangle',
                borderWidth : 5,
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
                },
                backgroundImageOpacity : 1,
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
              'line-color': function(node : any) {
                if(node.data("colored") === "blue") {
                  return "blue";
                }
                else if(node.data("colored") === "yellow") {
                  return "yellow";
                }
              },
              'target-arrow-color': 'blue',
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
            elements={elements}
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
};

export default CytoScapeExample;