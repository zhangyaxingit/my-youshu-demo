import React, { memo, useState, useCallback, useEffect, useRef, useMemo} from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { Grid } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import * as echarts from 'echarts';
import { DownloadOutlined, TableOutlined, BarChartOutlined, FileExcelFilled } from '@ant-design/icons';
import { data, diagramDate } from './mock'
import {computeData} from './compute'
import { Rnd } from 'react-rnd'

const Container = memo(function Container({diagramDataArr, curDiagramId,  diagramNum}) {
    console.log('diagramDataArr', diagramDataArr)
    const [dataArr, setDataArr] = useState(diagramDate)

    useEffect(() => {
        const chartDiagramArr = dataArr.filter(item => item.type === 'chart')
        chartDiagramArr.map(chart =>{
            const myChart = echarts.getInstanceByDom(document.getElementById(`chart_${chart.id}`));
            let chartInstance = null
            if(myChart)
                chartInstance = myChart;
            else
                chartInstance = echarts.init(document.getElementById(`chart_${chart.id}`));
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
        })
    })

    const handleRndDragStop = useCallback((e, d, rndIndex) => {
        const newDataArr = dataArr.map((item, index) => {
            return {
                ...item,
                rndData: rndIndex !== index ? item.rndData : {
                    ...item.rndData,
                    x: d.x, 
                    y: d.y
                }
            }
        })
        setDataArr(newDataArr)
    }, [dataArr]);


    const handleRndResizeStop = useCallback((e, ref, position, rndIndex) => {
        const newDataArr = dataArr.map((item, index) => {
            return {
                ...item,
                rndData: rndIndex !== index ? item.rndData : {
                    width: ref.style.width,
                    height: ref.style.height,
                    ...position,
                }
            }
        })
        setDataArr(newDataArr)
    }, [dataArr]);

    const handleRndResize = useCallback((e, direction, ref, delta, position, type_id) => {
        console.log('调用了', ref)
        const [type, id] = type_id.split('_')
        if (type === 'chart') {
            const myChart = echarts.getInstanceByDom(document.getElementById(type_id));
            myChart.resize()
        }
    }, [dataArr]);
    
    
    return (<div id='panel' style={{
                flex:1, 
                height: '100%', 
                backgroundColor:'#ddd',
                display: 'flex', 
                paddingLeft: '4rem', 
                paddingRight: '4rem', 
                flexWrap:'wrap',
            }}>
                {
                    dataArr.map((item, index) => {
                        return <Rnd
                            bounds="#panel"
                            key={item.id}
                            size={{ width: item.rndData.width,  height: item.rndData.height }}
                            position={{ x: item.rndData.x, y: item.rndData.y }}
                            onDragStop={(e, d) => handleRndDragStop(e, d, index)}
                            onResize={(e, direction, ref, delta, position) => handleRndResize(e, direction, ref, delta, position, `${item.type}_${item.id}` )}
                            onResizeStop={(e, direction, ref, delta, position) => handleRndResizeStop(e, ref, position, index)}
                        >
                            {
                                item.type === 'chart' && <div style={{width:'100%', height: '100%', display: 'flex', justifyContent: 'center', alignContent:'center'}}>
                                    <div style={{backgroundColor: '#fff', flex: 1, padding: '0.2rem'}} id={`chart_${item.id}`}></div>
                                </div>
                            }
                            {
                                item.type === 'table' && <div style={{width:'100%', height: '100%', display: 'flex', justifyContent: 'center', alignContent:'center'}}>
                                    <div style={{backgroundColor: 'red', flex: 1, padding: '0.2rem'}}>table</div>
                                </div>
                            }
                    </Rnd>
                    })
                }
	    </div>);
    });


export default Container;

