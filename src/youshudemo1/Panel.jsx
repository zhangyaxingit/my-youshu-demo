import React, { memo, useState, useCallback, useEffect, useRef, useMemo} from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { Grid } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import * as echarts from 'echarts';
import {data} from './mock'
import {computeData} from './compute'
import { Rnd } from 'react-rnd'

const Container = memo(function Container({diagramDataArr, curDiagramId,  diagramNum}) {
    const diagramRef = useRef(null);

    useEffect(() => {  // 新建图表的情况
        if(diagramNum) {
            createNewDiagrm()
        }
    }, [diagramNum])

    useEffect(() => {
        console.log('当前数据和id', diagramDataArr, curDiagramId)
        const curDiagram = diagramDataArr.find(item => item.id === curDiagramId)
        if ( curDiagram && curDiagram.configData) { // 先拿到Echart
            if (curDiagram.type === 'chart') {
                const chartInstance = echarts.getInstanceByDom(document.getElementById(curDiagramId))
                const chartOption = getChartOpt(curDiagram.configData)
                chartInstance.setOption(chartOption)
            } else {

            }
        }
    }, [diagramDataArr, curDiagramId])

    let getChartOpt = (chartConfig) => {
        const {
            xSet, 
            ySet,
            color,
            selectChart,
            selectCompute
        } = chartConfig

        let { finalData: totalData,  ruleArr} = computeData(data, {xSet, ySet, selectCompute}, color)

        const xAxisData = Object.keys(totalData)
        let yAxisData = null
        let seriesData  = null
        if (!ruleArr) {
            yAxisData = xAxisData.map(x =>totalData[x])
            seriesData = [
                {
                    data: yAxisData,
                    type: selectChart
                },
            ]
        } else {
            yAxisData = ruleArr.map(rule => {
                return {
                    rule,
                    value: xAxisData.map(x => totalData[x][rule])
                }
            })
            seriesData = yAxisData.map(item => {
                return {
                    name: item.rule,
                    type: selectChart,
                    stack: 'rule',
                    emphasis: {
                        focus: 'series'
                    },
                    data: item.value
                }
            })
        }


        return {
                tooltip: {
                    trigger: 'axis'
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: 'category',
                    data: xAxisData
                },
                yAxis: {
                    type: 'value'
                },
                series: seriesData
            }
    }

    let createNewDiagrm = () => {
        let newDiagram = document.createElement('div')
        const curCurrentId = diagramDataArr[diagramDataArr.length -1].id
        newDiagram.id = curCurrentId
        
        newDiagram.style.width = '24rem'
        newDiagram.style.height = '18rem'
        newDiagram.style.backgroundColor = '#fff'
        newDiagram.style.marginLeft = '0.4rem'
        newDiagram.style.marginTop = '0.4rem'

        var panelNode = document.getElementById('panel');
        panelNode.appendChild(newDiagram);
        echarts.init(document.getElementById(curCurrentId)) // 初始化
    };

    
    
    return (<div id='panel' style={{
            flex:1, 
            height: '100%', 
            backgroundColor:'#f8f8f8',
            display: 'flex', 
            paddingLeft: '4rem', 
            paddingRight: '4rem', 
            flexWrap:'wrap',
            // justifyContent: 'space-between'
        }}>

            <Rnd
                default={{
                    x: 0,
                    y: 0,
                    width: 320,
                    height: 200,
                }}>
                <div style={{width:'100%', height: '100%', backgroundColor: '#fff'}}></div>
            </Rnd>
        {/* <div style={{width: '24rem', height: '20rem', backgroundColor: '#fff'}} id='chart' ref={main2}></div> */}
	</div>);
});


export default Container;

