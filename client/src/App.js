import * as React from 'react';

import {Container, Row, Col} from "react-bootstrap"

import './App.css';
import NavigationBar from './Components/NavigationBar';
import ScheduleView from './Components/ScheduleView';



function App() {
  
  return (
    <div>
      <NavigationBar/>
      <Container className='mainContainer bg-body-tertiary'>
        <Row>
          <Col>North</Col>
          <Col>South</Col>
        </Row>
       </Container>
       <ScheduleView/>
    </div>

  );
}

export default App;
