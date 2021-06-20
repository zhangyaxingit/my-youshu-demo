import React, { memo, useState, useCallback, useEffect, useRef, useMemo} from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { Grid } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import * as echarts from 'echarts';
import { DownloadOutlined, TableOutlined, BarChartOutlined, FileExcelFilled } from '@ant-design/icons';
import {data} from './mock'
import {computeData} from './compute'
import { Rnd } from 'react-rnd'

const Container = memo(function Container({diagramDataArr, curDiagramId,  diagramNum}) {
    const [dataArr, setDataArr] = useState([
        { type: 'chart', id:'rnd1', opts: {
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
            }]},
            rndData: {
                x: 0,
                y: 0,
                width: 320,
                height: 200,
            }
        },
        { type: 'table', id:'rnd2', opts: {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }]},
            rndData: {
                x: 10,
                y: 10,
                width: 320,
                height: 200,
            }
        }
    ])
    const main2 = useRef(null);

    // useEffect(() => {
    //     const myChart = echarts.getInstanceByDom(main2.current);
    //     // myChart.resize()
    //     let chartInstance = null
    //     if(myChart)
    //         chartInstance = myChart;
    //     else
    //         chartInstance = echarts.init(main2.current);
    //     chartInstance.setOption({
    //         xAxis: {
    //             type: 'category',
    //             data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //         },
    //         yAxis: {
    //             type: 'value'
    //         },
    //         series: [{
    //             data: [150, 230, 224, 218, 135, 147, 260],
    //             type: 'line'
    //         }]
    //     })
    // })

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
        console.log('当前数据', dataArr, newDataArr)
        setDataArr(newDataArr)
    }, []);


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
    }, []);


    
    
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
                            onResizeStop={(e, direction, ref, delta, position) => handleRndResizeStop(e, ref, position, index)}
                        >
                        <div style={{width:'100%', height: '100%', backgroundColor: item.type === 'chart' ?'red' : 'green', display: 'flex', justifyContent: 'center', alignContent:'center'}}>
                            <div style={{backgroundColor: 'red', flex: 1, padding: '0.2rem'}}></div>
                        </div>
                    </Rnd>
                    })
                }
	    </div>);
    });


export default Container;

