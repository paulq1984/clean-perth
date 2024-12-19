import {React, useState, useEffect} from 'react'

import { Container, Card, Col, Row, Badge } from 'react-bootstrap';
import  axios  from 'axios';


// Example JSON data
const data = {
  name: "North",
  collectionSchedule: [
    {
      binColor: "Green",
      dates: [
        "2025-01-07T12:00:00Z",
        "2025-01-14T12:00:00Z",
        "2025-01-21T12:00:00Z",
        "2025-01-28T12:00:00Z",
        // more dates...
      ],
    },
    {
      binColor: "Yellow",
      dates: [
        "2025-01-14T12:00:00Z",
        "2025-01-28T12:00:00Z",
        // more dates...
      ],
    },
    {
      binColor: "Blue",
      dates: [
        "2025-01-07T12:00:00Z",
        "2025-01-21T12:00:00Z",
        // more dates...
      ],
    },
    {
      binColor: "Black",
      dates: [
        "2025-01-09T12:00:00Z",
        "2025-01-23T12:00:00Z",
        // more dates...
      ],
    },
  ],
};



const ScheduleView = () => {

const [scheduleData, setScheduleData] = useState('')

useEffect(() => {
  axios.get('http://localhost:5001/clean-perth-api/schedule?area=North')
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.error(`Error fetchign Data: ${error}`)
  })
}, [])


  const groupByDate = () => {
    const groupedData = {};

    data.collectionSchedule.forEach((item) => {
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

  const getMonth = (date) => new Date(date).toLocaleString("default", { month: "long" });
  const getDay = (date) => new Date(date).toLocaleString("default", { weekday: "long" });
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
  }

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
        return ""
    }
  }

  return (
    <Container className='mainContainer bg-body-tertiary'>
      <Row xs={1} md={4} className="g-4">
      {sortedDates.map((date, index) => (
        <Col key={index}>
          <Card>
            <Card.Body>
              <Card.Title>
              {getDay(date)} {getDate(date)} {getMonth(date)}
              </Card.Title>
              {groupedData[date].map((binColor, idx) => (
                <h2 ><Badge className="binPill" key={idx} bg={`${getColorClass(binColor)}`}>
                {getType(binColor)}
              </Badge></h2>
            ))}
            </Card.Body>
           </Card>
        </Col>
      ))}
      </Row>
    </Container>
  );
}

export default ScheduleView;