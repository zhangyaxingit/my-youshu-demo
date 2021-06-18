import React, { useCallback, useState } from 'react';
import ToolBox from './ToolBox';
import Panel from './Panel';
import { Row, Col } from 'antd';
import "antd/dist/antd.css";
import './style.css'
import { Layout, Button } from 'antd';
import { DownloadOutlined, TableOutlined, BarChartOutlined, FileExcelFilled } from '@ant-design/icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Canvas2Image from './../components/canvas2image'


const { Header, Footer, Sider, Content } = Layout;

const Demo = () => {
    const [chartConfig, setChartConfig] = useState(null)
    const handleRender = useCallback((xSet, ySet, color, selectChart, selectCompute) => {
        setChartConfig({
            xSet, 
            ySet, 
            color,
            selectChart,
            selectCompute
        })
    }, []);

    const handleDownload = useCallback(() => {
        const panelDom = document.getElementById("panel")
        console.log('1111', panelDom.offsetWidth, panelDom.offsetHeight)
        // var width = panelDom.offsetWidth; 
        // var height = panelDom.offsetHeight; 
        // var canvas = document.createElement("canvas");
        // var scale = 3; 
    
        // canvas.width = width * scale; 
        // canvas.height = height * scale; 
        // canvas.getContext("2d").scale(scale, scale); 
    
        // let opts = {
        //     scale: scale, 
        //     canvas: canvas,
        //     width: width,
        //     height: height 
        // };
        // html2canvas(panelDom, opts)
        //     .then(function (canvas) {
        //         var context = canvas.getContext('2d');
        //         context.mozImageSmoothingEnabled = false;
        //         context.webkitImageSmoothingEnabled = false;
        //         context.msImageSmoothingEnabled = false;
        //         context.imageSmoothingEnabled = false;

        //         Canvas2Image.saveAsPNG(canvas, canvas.width, canvas.height)
        //     });
            html2canvas(panelDom)
                .then(function (canvas) {
                    Canvas2Image.saveAsPNG(canvas, canvas.width, canvas.height)
                });
    }, []);


    return (
        <>
            <Layout>
                <Header className='flex-row-container' style={{backgroundColor: 'transparent', padding: 0}} >
                    {/* 11111 */}
                    <div style={{display: 'flex', flex:5, justifyContent:'center', flexDirection: 'row'}}>
                        <Button icon={<BarChartOutlined />} size='large' />
                        <Button icon={<TableOutlined />} size='large' style={{marginLeft: '2rem'}} />
                    </div>
                    <div style={{display: 'flex', flex:1, paddingLeft: 20}}>
                        <Button type="primary" icon={<DownloadOutlined />} size='small' onClick={() => handleDownload()} />
                    </div>
                </Header>
                <Content>
                    {/* 222 */}
                    <Row style={{height: '100%'}}>
                        <Col span={20} >
                            <Panel chartConfig={chartConfig}/>
                        </Col>
                        <Col span={4}><ToolBox reRenderChart={(...args) => handleRender(...args)}/></Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
}

export default Demo;
