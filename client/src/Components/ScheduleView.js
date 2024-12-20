import {React, useState, useEffect} from 'react'

import { Container, Card, Col, Row, Badge } from 'react-bootstrap';
import  axios  from 'axios';

const groupDatesByCalendarWeek = (dates) => {
  const groupedWeeks = {};

  dates.forEach((date) => {
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Calculate the start of the week (Monday)
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - ((dayOfWeek + 6) % 7)); // Adjust to Monday start
    startOfWeek.setHours(0, 0, 0, 0); // Ensure no time component

    const weekKey = startOfWeek.toISOString().split("T")[0]; // Use the start date as the key

    if (!groupedWeeks[weekKey]) {
      groupedWeeks[weekKey] = [];
    }
    groupedWeeks[weekKey].push(date);
  });

  // Sort weeks by their start dates
  return Object.entries(groupedWeeks).sort(
    ([weekA], [weekB]) => new Date(weekA) - new Date(weekB)
  );
};


const ScheduleView = () => {
  const [scheduleData, setScheduleData] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5001/clean-perth-api/schedule?area=North")
      .then((response) => {
        console.log(response.data);
        setScheduleData(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, []);

  const groupByDate = () => {
    const groupedData = {};

    (scheduleData?.collectionSchedule || []).forEach((item) => {
      item.dates.forEach((date) => {
        if (!groupedData[date]) {
          groupedData[date] = [];
        }
        groupedData[date].push(item.binColor);
      });
    });

    return groupedData;
  };

  const groupedData = groupByDate();
  const sortedDates = Object.keys(groupedData).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const weeklyDates = groupDatesByCalendarWeek(sortedDates);

  const getMonth = (date) =>
    new Date(date).toLocaleString("default", { month: "long" });
  const getDay = (date) =>
    new Date(date).toLocaleString("default", { weekday: "long" });
  const getDate = (date) => new Date(date).getDate();

  const getColorClass = (binColor) => {
    switch (binColor.toLowerCase()) {
      case "yellow":
        return "warning";
      case "blue":
        return "primary";
      case "green":
        return "success";
      case "black":
        return "secondary";
      default:
        return "dark";
    }
  };

  const getType = (binColor) => {
    switch (binColor.toLowerCase()) {
      case "yellow":
        return "Yellow Box";
      case "blue":
        return "Blue Box";
      case "green":
        return "Green Bin";
      case "black":
        return "Garbage";
      default:
        return "";
    }
  };

  return (
    <Container className="mainContainer bg-body-tertiary">
      <h2>Waste Collection Schedule for {scheduleData.name} Zone.</h2>
      {weeklyDates.map(([weekStart, dates], weekIndex) => (
        <Row xs={1} md={2} className="g-4 scheduleRow" key={weekIndex}>
          
          {dates.map((date, index) => (
            <Col key={index}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {getDay(date)} {getDate(date)} {getMonth(date)}
                  </Card.Title>
                  {groupedData[date].map((binColor, idx) => (
                    <h2 key={idx}>
                      <Badge
                        className="binPill"
                        bg={`${getColorClass(binColor)}`
                        
                      }
                      
                      >
                        {getType(binColor)}
                      </Badge>
                    </h2>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};


export default ScheduleView;