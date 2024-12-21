import React, { useMemo } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

const groupDatesByCalendarWeek = (dates) => {
  const groupedWeeks = {};

  dates.forEach((date) => {
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay();

    // Calculate the start of the week (Monday)
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - ((dayOfWeek + 6) % 7));
    startOfWeek.setHours(0, 0, 0, 0);

    const weekKey = startOfWeek.toISOString().split("T")[0];

    if (!groupedWeeks[weekKey]) {
      groupedWeeks[weekKey] = [];
    }
    groupedWeeks[weekKey].push(date);
  });

  return Object.entries(groupedWeeks).sort(
    ([weekA], [weekB]) => new Date(weekA) - new Date(weekB)
  );
};

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

const ScheduleView = ({ scheduleData = {} }) => {
  const groupedData = useMemo(() => {
    const result = {};
    (scheduleData?.collectionSchedule || []).forEach((item) => {
      item.dates.forEach((date) => {
        if (!result[date]) {
          result[date] = [];
        }
        result[date].push(item.binColor);
      });
    });
    return result;
  }, [scheduleData]);

  const sortedDates = useMemo(
    () => Object.keys(groupedData).sort((a, b) => new Date(a) - new Date(b)),
    [groupedData]
  );

  const weeklySchedule = useMemo(
    () => groupDatesByCalendarWeek(sortedDates),
    [sortedDates]
  );

  return (
    <Container className="mainContainer bg-body-tertiary">
      <h2>Waste Collection Schedule</h2>
      {scheduleData.name && <h3>Zone: {scheduleData.name}</h3>}
      {weeklySchedule.map(([weekStart, dates], weekIndex) => (
        <Row xs={1} md={2} className="g-4 scheduleRow" key={weekStart}>
          {dates.map((date, index) => (
            <Col key={`${weekStart}-${index}`}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {getDay(date)} {getDate(date)} {getMonth(date)}
                  </Card.Title>
                  {groupedData[date]?.map((binColor, idx) => (
                    <h2 key={`${date}-${idx}`}>
                      <Badge
                        className="binPill"
                        bg={`${getColorClass(binColor)}`}
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
