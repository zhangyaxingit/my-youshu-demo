import React, { memo, useState, useCallback, useEffect, useRef, useMemo} from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import * as echarts from 'echarts';
import {data} from './mock'
import {computeData} from './compute'

const Container = memo(function Container({diagramDataArr, curDiagramId}) {
    // console.log('创建新素222', diagramDataArr)
    const [diagramNum, setDiagramNum] = useState(diagramDataArr.length)

    useEffect(() => {
        if(diagramNum) {
            createNewDiagrm()
        }
    }, [diagramNum])

    useEffect(() => {

        setDiagramNum(diagramDataArr.length)
    }, [diagramDataArr])

    let createNewDiagrm = () => {
        
        let newDiagram = document.createElement('div')
        newDiagram.id = diagramDataArr.pop().id
        newDiagram.style.width = '24rem'
        newDiagram.style.height = '20rem'
        newDiagram.style.backgroundColor = '#fff'

        var panelNode = document.getElementById('panel');
        panelNode.appendChild(newDiagram);
    };

    
    
    return (<div id='panel' style={{ flex:1, height: '100%', backgroundColor:'#f8f8f8', display: 'flex', paddingLeft: '4rem', paddingRight: '4rem' }}>
        {/* <div style={{width: '24rem', height: '20rem', backgroundColor: '#fff'}} id='chart' ref={main2}></div> */}
	</div>);
});


export default Container;

