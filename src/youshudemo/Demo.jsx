import React, { useCallback, useState } from 'react';
import ToolBox from './ToolBox';
import Panel from './Panel';
import { Row, Col } from 'antd';
import "antd/dist/antd.css";
import { Layout } from 'antd';


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

    return (
        <>
                <Row style={{height: '100%'}}>
                    <Col span={20} >
                        <Panel chartConfig={chartConfig}/>
                    </Col>
                    <Col span={4}><ToolBox reRenderChart={(...args) => handleRender(...args)}/></Col>
                </Row>
                {/* <Layout>
                    <Layout>
                        <Content>Content</Content>
                        <Sider>Sider</Sider>
                    </Layout>
                </Layout> */}
        </>
    );
}

export default Demo;
