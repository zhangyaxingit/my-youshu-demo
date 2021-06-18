import React, { memo, useState, useCallback, useEffect, useRef, useMemo} from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import * as echarts from 'echarts';
import {data} from './mock'
import {computeData} from './compute'

const Container = memo(function Container({diagramDataArr, curDiagramId,  diagramNum}) {
    const diagramRef = useRef(null);

    useEffect(() => {  // 新建图标的情况
        if(diagramNum) {
            createNewDiagrm()
        }
    }, [diagramNum])

    useEffect(() => {
        const curDiagram = diagramDataArr.find(item => item.id === curDiagramId)
        if ( curDiagram && curDiagram.configData) { // 先拿到Echart
            const chartInstance = echarts.getInstanceByDom(document.getElementById(curDiagramId))
            chartInstance.setOption({
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
                }]
            })
        }
    }, [diagramDataArr, curDiagramId])

    let createNewDiagrm = () => {
        
        let newDiagram = document.createElement('div')
        const curCurrentId = diagramDataArr[diagramDataArr.length -1].id
        newDiagram.id = curCurrentId
        newDiagram.style.width = '24rem'
        newDiagram.style.height = '20rem'
        newDiagram.style.backgroundColor = '#fff'

        var panelNode = document.getElementById('panel');
        panelNode.appendChild(newDiagram);
        echarts.init(document.getElementById(curCurrentId)) // 初始化
    };

    
    
    return (<div id='panel' style={{ flex:1, height: '100%', backgroundColor:'#f8f8f8', display: 'flex', paddingLeft: '4rem', paddingRight: '4rem' }}>
        {/* <div style={{width: '24rem', height: '20rem', backgroundColor: '#fff'}} id='chart' ref={main2}></div> */}
	</div>);
});


export default Container;

