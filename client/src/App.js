import * as React from 'react';

import {Container, Tab, Tabs} from "react-bootstrap"

import './App.css';
import NavigationBar from './Components/NavigationBar';
import ScheduleView from './Components/ScheduleView';



function App() {
  
  return (
    <div>
      <NavigationBar/>
      <Container className='mainContainer bg-body-tertiary'>
        <Tabs
          defaultActiveKey="north"
          id="schedule-tab"
          className='mb-3'
          fill
        >
          <Tab eventKey="north" title="North">
          <ScheduleView/>
          </Tab>
          <Tab eventKey="south" title="South">
          <ScheduleView/>
          </Tab>
        </Tabs>
       </Container>
    </div>

  );
}

export default App;
