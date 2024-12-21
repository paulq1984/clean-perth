import React, { useState, useEffect } from "react";
import { Container, Tab, Tabs, Spinner } from "react-bootstrap";
import "./App.css";
import NavigationBar from "./Components/NavigationBar";
import ScheduleView from "./Components/ScheduleView";
import axios from "axios";

function App() {
  const [activeKey, setActiveKey] = useState("north");
  const [schedules, setSchedules] = useState({ north: null, south: null });
  const [isLoading, setIsLoading] = useState(true);

  const fetchScheduleData = async (area) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:5001/clean-perth-api/schedule?area=${area}`
      );
      console.log(response.data);

      setSchedules((prev) => ({
        ...prev,
        [area]: response.data,
      }));
    } catch (error) {
      console.error(`Error fetching data for area "${area}":`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);

    if (!schedules[selectedKey]) {
      fetchScheduleData(selectedKey);
    }
  };

  useEffect(() => {
    // Fetch the initial schedule for the default tab
    fetchScheduleData("north");
  }, []);

  return (
    <div>
      <NavigationBar />
      <Container className='mainContainer bg-body-tertiary'>
        {isLoading ? (
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        ) : (
          <Tabs
            activeKey={activeKey}
            onSelect={handleSelect}
            id='schedule-tab'
            className='mb-3'
            fill>
            <Tab eventKey='north' title='NORTH ZONE'>
              <ScheduleView scheduleData={schedules.north} />
            </Tab>
            <Tab eventKey='south' title='SOUTH ZONE'>
              <ScheduleView scheduleData={schedules.south} />
            </Tab>
          </Tabs>
        )}
      </Container>
    </div>
  );
}

export default App;
