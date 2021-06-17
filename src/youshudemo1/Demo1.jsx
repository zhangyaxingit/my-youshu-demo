import React, { useCallback, useState } from 'react';
import ToolBox from './ToolBox';
import Panel from './Panel1';
import { Row, Col } from 'antd';
import "antd/dist/antd.css";
import './style.css'
import { Layout, Button } from 'antd';
import { DownloadOutlined, TableOutlined, BarChartOutlined, FileExcelFilled } from '@ant-design/icons';
import html2canvas from 'html2canvas';
import Canvas2Image from '../components/canvas2image'
const { Header, Content } = Layout;

const Demo = () => {
    const [diagramDataArr , setDiagramDataArr] = useState([])
    const [curDiagramId, setCurDiagramId] = useState(null)

    const handleRender = useCallback((xSet, ySet, color, selectChart, selectCompute) => {
        const chartConfig = {
            xSet, 
            ySet, 
            color,
            selectChart,
            selectCompute
        }
        const newDiagramDataArr = diagramDataArr.map(item => {
            return {
                ...item,
                configData: item.id === curDiagramId ? chartConfig : item.configData
            }
        })

        setDiagramDataArr(newDiagramDataArr)

    }, []);

    const handleDownload = useCallback(() => {
        const panelDom = document.getElementById("panel")
        console.log('1111', panelDom.offsetWidth, panelDom.offsetHeight)
            html2canvas(panelDom)
                .then(function (canvas) {
                    Canvas2Image.saveAsPNG(canvas, canvas.width, canvas.height)
                });
    }, []);

    const handleCreateiDiagram = useCallback((type) => {
        console.log(type)
        const curDiagramId = `${new Date().getTime()}_${type}`
        setDiagramDataArr([...diagramDataArr, {
            id: curDiagramId,
            configData: {},
        }])
        setCurDiagramId(curDiagramId)
    }, []);


    return (
        <>
            <Layout>
                <Header className='flex-row-container' style={{backgroundColor: 'transparent', padding: 0}} >
                    <div style={{display: 'flex', flex:5, justifyContent:'center', flexDirection: 'row'}}>
                        <Button icon={<BarChartOutlined />} size='large' onClick={() => handleCreateiDiagram('chart')}/>
                        <Button icon={<TableOutlined />} size='large' style={{marginLeft: '2rem'}} onClick={() => handleCreateiDiagram('table')}/>
                    </div>
                    <div style={{display: 'flex', flex:1, paddingLeft: 20}}>
                        <Button type="primary" icon={<DownloadOutlined />} size='small' onClick={() => handleDownload()} />
                    </div>
                </Header>
                <Content>
                    <Row style={{height: '100%'}}>
                        <Col span={20} >
                            <Panel diagramDataArr={diagramDataArr} curDiagramId={curDiagramId}/>
                        </Col>
                        <Col span={4}><ToolBox reRenderChart={(...args) => handleRender(...args)} disabled={false}/></Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
}

export default Demo;
