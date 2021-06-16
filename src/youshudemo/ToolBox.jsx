import React, { memo, useState, useCallback, useEffect } from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import Dustbin from './Dustbin';
import Rubish from './Rubish';
import update from 'immutability-helper';
import { data, dataType, chartTypes, computeTypes } from './mock'
import { Typography, Menu, Select, Row, Col} from 'antd';
import './style.css';
import "antd/dist/antd.css";
const { Option } = Select;

const Container = memo(function Container(props) {
    const { dimension, metric } = dataType

    const [xSet, setXSet] = useState({ accepts: ['dimension'], lastDroppedItem: null });
    const [ySet, setYSet] = useState({ accepts: ['metric'], lastDroppedItem: null });
    const [color, setColor] = useState({ accepts: ['dimension'], lastDroppedItem: {name:null} });
    const [selectval, setSelectVal] = useState(chartTypes[0].name)
    const [selectCompute, setSelectCompute] = useState(computeTypes[0].name)


    const [dimensions] = useState(Object.keys(dimension).map(item => {
        return {
            name: item,
            str: dimension[item],
            type: 'dimension'
        }
    }));

    const [metrics] = useState(Object.keys(metric).map(item => {
        return {
            name: item,
            str: metric[item],
            type: 'metric'
        }
    }));

    const [droppedBoxNames, setDroppedBoxNames] = useState([]);

    function isDropped(boxName) {
        return droppedBoxNames.indexOf(boxName) > -1;
    }

    const handleDrop = useCallback((index, item) => {
        const { name } = item;
        setDroppedBoxNames(update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }));
        switch (index) {
            case 'xSet':
                setXSet(update(xSet, {
                    lastDroppedItem: {
                        $set: item,
                    }, 
                }));
                break;
            case 'ySet':
                setYSet(update(ySet, {
                    lastDroppedItem: {
                        $set: item,
                    }, 
                }));
                break;
            case 'color':
                setColor(update(color, {
                    lastDroppedItem: {
                        $set: item,
                    }, 
                }));
                break;
            default:
                break;
        }
    }, [droppedBoxNames, xSet, ySet, color]);

    const handleChange = useCallback((type,item) => {
        type === 'chart' ? setSelectVal(item) : setSelectCompute(item)
    }, []);

    useEffect(() => {
        if (xSet.lastDroppedItem && ySet.lastDroppedItem && selectval && selectCompute) {
            props.reRenderChart(xSet.lastDroppedItem.name, ySet.lastDroppedItem.name, color.lastDroppedItem.name, selectval, selectCompute)
        }
    }, [xSet, ySet, color, selectval, selectCompute])
    
    return (
        <Row style={{height: '100%'}}>
            <Col span={12}>
                <div className='tool-bar'>
                    <h1 className='bar-title box-title'>图表</h1>
                    <Col style={{height: '100%', backgroundColor: 'red', display: 'flex', flexDirection: 'column'}}>
                        <div className='axis-bar'>
                            <h1 className='bar-title'>X轴</h1>
                            <div className='items-container'>
                                <Dustbin accepts={xSet.accepts} lastDroppedItem={xSet.lastDroppedItem} tip={'拖入'} onDrop={(item) => handleDrop('xSet', item)} key={'xSet'}/>
                            </div>
                        </div>
                        <div className='axis-bar'>
                                <h1 className='bar-title'>Y轴</h1>
                                <div className='items-container'>
                                    <Dustbin accepts={ySet.accepts} lastDroppedItem={ySet.lastDroppedItem} tip={'拖入'} onDrop={(item) => handleDrop('ySet', item)} key={'ySet'}/>
                                </div>
                            </div>
                        <div className='axis-bar'>
                            <h1 className='bar-title'>图表类型</h1>
                            <div className='items-container'>
                                <Select defaultValue={selectval} style={{ width: '100%' }} onChange={(item) => handleChange('chart', item)}>
                                    {
                                        chartTypes.map(item => {
                                            return <Option value={item.name}>{item.dsc}</Option>
                                        })
                                    }
                                </Select>
                                <div style={{display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: '#fff'}}>
                                    <text style={{width: '4rem', borderLeft: '1px solid #ccc'}}>颜色</text>
                                    <Dustbin accepts={color.accepts} lastDroppedItem={color.lastDroppedItem} tip={'拖入'} onDrop={(item) => handleDrop('color', item)} key={'color'}/>
                                </div>
                            </div>
                        </div>
                        <div className='axis-bar'>
                            <h1 className='bar-title'>计算方式</h1>
                            <div className='items-container'>
                                <Select defaultValue={selectCompute} style={{ width: '100%', }} onChange={(item) => handleChange('compute', item)}>
                                    {
                                        computeTypes.map(item => {
                                            return <Option value={item.name}>{item.dsc}</Option>
                                        })
                                    }
                                </Select>
                            </div>
                        </div>
                    </Col>
                </div>
            </Col>
            <Col span={12}>
                <div className='tool-bar'>
                    <h1 className='bar-title box-title'>数据模型</h1>
                    <div className='bar'>
                        <h1 className='bar-title'>维度</h1>
                        <div className='items-container'>
                            {dimensions.map(({ name, type, str }, index) => (<Rubish name={name} type={type} str={str} isDropped={isDropped(name)} key={index}/>))}
                        </div>
                    </div>
                    <div className='bar'>
                        <h1 className='bar-title'>度量</h1>
                        <div  className='items-container'>
                            {metrics.map(({ name, type, str }, index) => (<Rubish name={name} type={type} str={str} isDropped={isDropped(name)} key={index}/>))}
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
});


export default Container;