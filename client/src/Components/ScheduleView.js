import React, { useMemo, useState } from "react";
import { Container, Row, Col, Card, Badge, Modal } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faBoxOpen,
  faCarrot,
  faBottleWater,
  faCalendarWeek,
} from "@fortawesome/free-solid-svg-icons";

const binDetails = [
  {
    binColor: "Green",
    contents: [
      "Any type of food waste – meat, bones, dairy, vegetables, fruits, breads, nuts, sauces, egg shells, expired foods, etc.",
      "Soiled paper products – paper towels, tissues, pizza boxes, coffee filters, tea bags",
      "Wood - toothpicks, popsicle sticks, skewers, sawdust, etc.",
      "Greenery - household plants",
      "Pet waste and cat litter (must be in a paperbag or wrapped newspaper)",
      "Floor sweepings",
      "Hair (human and pet)",
      "Dryer lint",
      "Ashes",
    ],
  },
  {
    binColor: "Yellow",
    contents: [
      "Plastics - #1, #2, #5 and #6 (excluding #6 polystyrene)",
      "Food and berage jars (clean)",
      "Aluminum pop cans (clean)",
      "Steel food cans (clean)",
      "Aluminum foil and trays (clean and empty)",
      "Gable top and tetra pak cartons - includes milk and juice cartons, drinking boxes and spiral bound containers",
    ],
  },
  {
    binColor: "Blue",
    contents: [
      "Paper - newspapers, magazines and telephone books",
      "Boxboard - ceral and other food boxes, tissues boxes, etc.",
      "Paper towel and toilet paper rolls",
      "Cardboard (flattened and bundled)",
      "Pizza boxes (clean)",
      "Books (remove covers first)",
      "Shredded paper accepted in clear plastic bags",
    ],
  },
  {
    binColor: "Garbage",
    contents: ["All other refuse"],
  },
];

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

const getTypeIcon = (binColor) => {
  switch (binColor.toLowerCase()) {
    case "yellow":
      return <FontAwesomeIcon icon={faBottleWater} />;
    case "blue":
      return <FontAwesomeIcon icon={faBoxOpen} />;
    case "green":
      return <FontAwesomeIcon icon={faCarrot} />;
    default:
      return <FontAwesomeIcon icon={faTrashCan} />;
  }
};

const ScheduleView = ({ scheduleData = {} }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBin, setSelectedBin] = useState(null);

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

  const handleShowModal = (binColor) => {
    setSelectedBin(binColor);
    setShowModal(true);
  };

  const handleCloseModel = () => {
    setShowModal(false);
    setSelectedBin(null);
  };

  const getBinDetails = (binColor) => {
    const bin = binDetails.find((item) => item.binColor === binColor);
    return bin ? bin.contents : "Contents not available.";
  };

  return (
    <Container className='mainContainer bg-body-tertiary'>
      {weeklySchedule.map(([weekStart, dates], weekIndex) => (
        <Row xs={1} md={2} className='g-4 scheduleRow' key={weekStart}>
          {dates.map((date, index) => (
            <Col key={`${weekStart}-${index}`}>
              <Card>
                <Card.Header>
                  <span className='typeIcon'>
                    <FontAwesomeIcon icon={faCalendarWeek} />
                  </span>
                  {getDay(date)} {getDate(date)} {getMonth(date)}
                </Card.Header>
                <Card.Body>
                  {groupedData[date]?.map((binColor, idx) => (
                    <h2 key={`${date}-${idx}`}>
                      <Badge
                        className='binPill'
                        bg={`${getColorClass(binColor)}`}
                        onClick={() => handleShowModal(binColor)}>
                        <span className='typeIcon'>
                          {getTypeIcon(binColor)}
                        </span>

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

      {/* Model */}
      <Modal show={showModal} onHide={handleCloseModel}>
        <Modal.Header closeButton>
          <Modal.Title>Bin Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBin ? (
            <>
              <h5>
                {getTypeIcon(selectedBin)} {getType(selectedBin)} Contents
              </h5>
              <p>{getBinDetails(selectedBin)}</p>
            </>
          ) : (
            <p>No details available.</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ScheduleView;
