import React,{useState,useEffect} from 'react';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';

// @ts-ignore
import COSEBilkent from 'cytoscape-cose-bilkent';

let cy : any;
Cytoscape.use(COSEBilkent);
const CytoScapeExample = () => {
  function hexToRgb ( hexType : string){ 
    /* 맨 앞의 "#" 기호를 삭제하기. */ 
    let hex = hexType.trim().replace( "#", "" ); 
    
    /* rgb로 각각 분리해서 배열에 담기. */ 
    let rgb : any;
    rgb = ( 3 === hex.length ) ?  hex.match( /[a-f\d]/gi ) : hex.match( /[a-f\d]{2}/gi );     
    
    rgb.forEach(function (str : any, x : any, arr : any){     
        /* rgb 각각의 헥사값이 한자리일 경우, 두자리로 변경하기. */ 
        if ( str.length == 1 ) str = str + str; 
        
        /* 10진수로 변환하기. */ 
        arr[ x ] = parseInt( str, 16 ); 
    }); 
    
    return "rgb(" + rgb.join(", ") + ")"; 
} 
  useEffect(()=> {
    const arr : any = [] ;
    const sourceNode = {
      classes : 'group1',
      data: { id: 'n1', label: 'n1' }, position: { x: 50, y: 50 }, 
    };
    const targetNode = {
      classes : 'group1',
      data : {id : 'n2',label : 'n2',position : {x : 100, y: 100}},
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
  cy.$('aa').on('tap',(e: any)=> {
    if(e.target.selected) {
      e.target.style({'background-color' :'blue'});
    }
  });

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
        { classes : 'aa',data: { id: 'one', label: 'Node 1' }, position: { x: 300, y: 300 } },
        { classes : 'aa',data: { id: 'two', label: 'Node 2' }, position: { x: 400, y: 400 } },
        { classes : 'aa',data: { id : 's1',source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },
        {classes : 'aa',data : {id : 'three', label : 'Node 3'},position : {x : 200, y : 100}},
        {classes : 'aa',data : {id : 's3',source : 'two', target : 'three'},label :'Edge from Node2 to Node3'},
        {classes : 'aa',data : {id :'s2',source : 'three', target : 'one'},label : 'Edge from Node3 to Node1'},
     ];

    const layout = { name: 'random' };

    const stylesheet = [
        {
            selector: 'node',
            style: {
                width : 20,
                height : 20,
                shape : 'rectangle',
              backgroundColor: '#666',
              label: 'data(label)'
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
    ];

    // test remove listener
    const testClick = () => {
      alert('no console anymore');
      cy.removeListener('tapstart mouseover');
    }
    
    const promiseOnExample = () => {
      cy.promiseOn('tap').then((event : any)=> {
        event.target._private.style["backgroundColor"] = hexToRgb('#398a39');
        console.log(event);
      });
    };

    return (
      <>
            <CytoscapeComponent
            elements={elements}
            stylesheet={stylesheet}
            style={{width : '500px', height : '500px'}}
            pan={{x : 100, y : 100}}
            cy={(cyValue : any)=>{
              cy = cyValue;
            }}
            zoom={2}
            layout={layout}
            />
            <button onClick={testClick}>test button</button>
            <button onClick={promiseOnExample}>promise button</button>
      </>
    );
};

export default CytoScapeExample;