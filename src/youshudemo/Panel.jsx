import React, { memo, useState, useCallback, useEffect, useRef, useMemo} from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import * as echarts from 'echarts';
import {data} from './mock'
import {computeData} from './compute'


const Container = memo(function Container({chartConfig}) {
    const main2 = useRef(null);
    let chartInstance = null;
    
    useEffect(() => {
        renderChart();
    })

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
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                // legend: {
                //     data: ['Remain']
                // },
                xAxis: {
                    // boundaryGap: false,
                    type: 'category',
                    data: xAxisData
                },
                yAxis: {
                    type: 'value'
                },
                series: seriesData
            }
    }

    let renderChart = () => {
        const myChart = echarts.getInstanceByDom(main2.current);
        if(myChart)
            chartInstance = myChart;
        else
            chartInstance = echarts.init(main2.current);

        if (chartConfig) {
            const chartOptions = getChartOpt(chartConfig)
             chartInstance.setOption(chartOptions)
        }
    };
    
    return (<div style={{ flex:1, height: '100%', backgroundColor:'#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '4rem', paddingRight: '4rem' }}>
        <div style={{width: '60rem', height: '50rem', backgroundColor: '#fff'}} id='chart' ref={main2}></div>
	</div>);
});


export default Container;

