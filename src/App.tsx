import React from 'react';
import Container from './components/Container';
import Example from './multidemo/Example';
import ToolBox from './youshudemo/ToolBox';
import Panel from './youshudemo/Panel';
import Demo from './youshudemo/Demo';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './App.css';
import { Console } from 'console';

const App = () => {
    return (
        <div className="App">
            {/* <DndProvider backend={HTML5Backend}>  // 目前好像用不到这个东东
     
                <Example />
			</DndProvider> */}
            {/* <Container /> */}
            {/* <Example /> */}
            {/* <Panel />
            <ToolBox/> */}
            <Demo/>
        </div>
    );
}

export default App;
