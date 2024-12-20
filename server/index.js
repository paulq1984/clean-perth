import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 5001;

const BASE_PATH = '/clean-perth-api';

const perthData = {
    town: "Perth",
    landfill: {
        address: "666 Wildlife Road, Perth, ON",
        hours: [
            "Tuesday, Wednesday and Friday - 8am to 16:30pm",
            "Saturday - 8am - 12pm",
            "If a holiday falls on a Monday, the landfill will be closed on the following Tuesday."
        ],
        notes: "Avilable to Town of Perth residents only. Proof of residency required."
    },
    binContents: [
        {
            bin: "Green",
            contents: [
                "Any type of food waste – meat, bones, dairy, vegetables, fruits, breads, nuts, sauces, egg shells, expired foods, etc.",
                "Soiled paper products – paper towels, tissues, pizza boxes, coffee filters, tea bags",
                "Wood - toothpicks, popsicle sticks, skewers, sawdust, etc.",
                "Greenery - household plants",
                "Pet waste and cat litter (must be in a paperbag or wrapped newspaper)",
                "Floor sweepings",
                "Hair (human and pet)",
                "Dryer lint",
                "Ashes"
            ]
        },
        {
            bin: "Yellow",
            contents: [
                "Plastics - #1, #2, #5 and #6 (excluding #6 polystyrene)",
                "Food and berage jars (clean)",
                "Aluminum pop cans (clean)",
                "Steel food cans (clean)",
                "Aluminum foil and trays (clean and empty)",
                "Gable top and tetra pak cartons - includes milk and juice cartons, drinking boxes and spiral bound containers"
            ]
        },
        {
            bin: "Blue",
            contents: [
                "Paper - newspapers, magazines and telephone books",
                "Boxboard - ceral and other food boxes, tissues boxes, etc.",
                "Paper towel and toilet paper rolls",
                "Cardboard (flattened and bundled)",
                "Pizza boxes (clean)",
                "Books (remove covers first)",
                "Shredded paper accepted in clear plastic bags"
            ]
        }
    ],
    areas: [
      {
        name: "North",
        collectionSchedule: [
            {
                binColor: "Green",
                dates: [
                    "2025-01-07T12:00:00Z",
                    "2025-01-14T12:00:00Z",
                    "2025-01-21T12:00:00Z",
                    "2025-01-28T12:00:00Z",
                    "2025-02-04T12:00:00Z",
                    "2025-02-11T12:00:00Z",
                    "2025-02-18T12:00:00Z",
                    "2025-02-25T12:00:00Z",
                    "2025-03-04T12:00:00Z",
                    "2025-03-11T12:00:00Z",
                    "2025-03-18T12:00:00Z",
                    "2025-03-25T12:00:00Z",
                    "2025-04-01T12:00:00Z",
                    "2025-04-08T12:00:00Z",
                    "2025-04-15T12:00:00Z",
                    "2025-04-22T12:00:00Z",
                    "2025-04-29T12:00:00Z",
                    "2025-05-06T12:00:00Z",
                    "2025-05-13T12:00:00Z",
                    "2025-05-20T12:00:00Z",
                    "2025-05-27T12:00:00Z",
                    "2025-06-03T12:00:00Z",
                    "2025-06-10T12:00:00Z",
                    "2025-06-17T12:00:00Z",
                    "2025-06-24T12:00:00Z"
                ]
            },
            {
                binColor: "Yellow",
                dates: [
                    "2025-01-14T12:00:00Z",
                    "2025-01-28T12:00:00Z",
                    "2025-02-11T12:00:00Z",
                    "2025-02-25T12:00:00Z",
                    "2025-03-11T12:00:00Z",
                    "2025-03-25T12:00:00Z",
                    "2025-04-08T12:00:00Z",
                    "2025-04-22T12:00:00Z",
                    "2025-05-06T12:00:00Z",
                    "2025-05-20T12:00:00Z",
                    "2025-06-03T12:00:00Z",
                    "2025-06-17T12:00:00Z"
                ]
            },
            {
                binColor: "Blue",
                dates: [
                    "2025-01-07T12:00:00Z",
                    "2025-01-21T12:00:00Z",
                    "2025-02-04T12:00:00Z",
                    "2025-02-18T12:00:00Z",
                    "2025-03-04T12:00:00Z",
                    "2025-03-18T12:00:00Z",
                    "2025-04-01T12:00:00Z",
                    "2025-04-15T12:00:00Z",
                    "2025-04-29T12:00:00Z",
                    "2025-05-13T12:00:00Z",
                    "2025-05-27T12:00:00Z",
                    "2025-06-10T12:00:00Z",
                    "2025-06-24T12:00:00Z"
                ]
            },
            {
                binColor: "Black",
                dates: [
                    "2025-01-09T12:00:00Z",
                    "2025-01-23T12:00:00Z",
                    "2025-02-06T12:00:00Z",
                    "2025-02-20T12:00:00Z",
                    "2025-03-06T12:00:00Z",
                    "2025-03-20T12:00:00Z",
                    "2025-04-03T12:00:00Z",
                    "2025-04-17T12:00:00Z",
                    "2025-05-01T12:00:00Z",
                    "2025-05-15T12:00:00Z",
                    "2025-05-29T12:00:00Z",
                    "2025-06-12T12:00:00Z",
                    "2025-06-26T12:00:00Z"
                ]
            }
        ]
    },
    {
      name: "South",
      collectionSchedule: [
          {
              binColor: "Green",
              dates: [
                  "2025-01-02T00:00:00Z",
                  "2025-01-08T00:00:00Z",
                  "2025-01-15T00:00:00Z",
                  "2025-01-22T00:00:00Z",
                  "2025-01-29T00:00:00Z",
                  "2025-02-05T00:00:00Z",
                  "2025-02-12T00:00:00Z",
                  "2025-02-19T00:00:00Z",
                  "2025-02-26T00:00:00Z",
                  "2025-03-05T00:00:00Z",
                  "2025-03-12T00:00:00Z",
                  "2025-03-19T00:00:00Z",
                  "2025-03-26T00:00:00Z",
                  "2025-04-02T00:00:00Z",
                  "2025-04-09T00:00:00Z",
                  "2025-04-16T00:00:00Z",
                  "2025-04-23T00:00:00Z",
                  "2025-04-30T00:00:00Z",
                  "2025-05-07T00:00:00Z",
                  "2025-05-14T00:00:00Z",
                  "2025-05-21T00:00:00Z",
                  "2025-05-28T00:00:00Z",
                  "2025-06-04T00:00:00Z",
                  "2025-06-11T00:00:00Z",
                  "2025-06-18T00:00:00Z",
                  "2025-06-25T00:00:00Z"
              ]
          },
          {
              binColor: "Yellow",
              dates: [
                  "2025-01-02T00:00:00Z",
                  "2025-01-15T00:00:00Z",
                  "2025-01-29T00:00:00Z",
                  "2025-02-12T00:00:00Z",
                  "2025-02-26T00:00:00Z",
                  "2025-03-12T00:00:00Z",
                  "2025-03-26T00:00:00Z",
                  "2025-04-09T00:00:00Z",
                  "2025-04-23T00:00:00Z",
                  "2025-05-07T00:00:00Z",
                  "2025-05-21T00:00:00Z",
                  "2025-06-04T00:00:00Z",
                  "2025-06-18T00:00:00Z"
              ]
          },
          {
              binColor: "Blue",
              dates: [
                  "2025-01-08T00:00:00Z",
                  "2025-01-22T00:00:00Z",
                  "2025-02-05T00:00:00Z",
                  "2025-02-19T00:00:00Z",
                  "2025-03-05T00:00:00Z",
                  "2025-03-19T00:00:00Z",
                  "2025-04-02T00:00:00Z",
                  "2025-04-16T00:00:00Z",
                  "2025-04-30T00:00:00Z",
                  "2025-05-14T00:00:00Z",
                  "2025-05-28T00:00:00Z",
                  "2025-06-11T00:00:00Z",
                  "2025-06-25T00:00:00Z"
              ]
          },
          {
              binColor: "Black",
              dates: [
                  "2025-01-03T00:00:00Z",
                  "2025-01-16T00:00:00Z",
                  "2025-01-30T00:00:00Z",
                  "2025-02-13T00:00:00Z",
                  "2025-02-27T00:00:00Z",
                  "2025-03-13T00:00:00Z",
                  "2025-03-27T00:00:00Z",
                  "2025-04-10T00:00:00Z",
                  "2025-04-24T00:00:00Z",
                  "2025-05-08T00:00:00Z",
                  "2025-05-22T00:00:00Z",
                  "2025-06-05T00:00:00Z",
                  "2025-06-19T00:00:00Z"
              ]
          }
      ]
  }  
    ]
}


// Middleware to parse JSON
app.use(cors({ origin: "http://localhost:3000", methods: "GET, POST"}));
app.use(express.json());

app.get(`${BASE_PATH}/`, (req, res) => {
    res.json(perthData)
})

//get bin contents by bin
app.get(`${BASE_PATH}/bins`, (req, res) => {
    const { binColor } = req.query;

    if (!binColor) {
        return res.status(400).json({ message: "Missing binColor query parameter" });
    }

    const bin = perthData.binContents.find(item => item.bin.toLowerCase() === binColor.toLowerCase());

    if (bin) {
        res.json(bin);
    } else {
        res.status(404).json({ message: `Bin Color ${binColor} not found` });
    }
});

//Schedule Endpoint
app.get(`${BASE_PATH}/schedule`, (req, res) => {
    const { area } = req.query;

    if (!area) {
        return res.status(400).json({ message: "Missing area query parameter" });
    }

    // Find the area by name in the areas array
    const schedule = perthData.areas.find(
        item => item.name.toLowerCase() === area.toLowerCase()
    );

    if (schedule) {
        res.json(schedule);
    } else {
        res.status(404).json({ message: `${area} area schedule not found.` });
    }
});

app.get(`${BASE_PATH}/binSchedule`, (req, res) => {
    const { area, binColor } = req.query;

    // Validate query parameters
    if (!area) {
        return res.status(400).json({ message: "Missing 'area' query parameter." });
    }
    if (!binColor) {
        return res.status(400).json({ message: "Missing 'binColor' query parameter." });
    }

    // Find the area by name
    const areaData = perthData.areas.find(
        item => item.name.toLowerCase() === area.toLowerCase()
    );

    if (!areaData) {
        return res.status(404).json({ message: `Area '${area}' not found.` });
    }

    // Find the bin collection schedule within the area
    const schedule = areaData.collectionSchedule.find(
        schedule => schedule.binColor.toLowerCase() === binColor.toLowerCase()
    );

    if (!schedule) {
        return res.status(404).json({
            message: `Bin color '${binColor}' not found in area '${area}'.`
        });
    }

    res.json({
        area: areaData.name,
        binColor: schedule.binColor,
        dates: schedule.dates
    });
})

// Start the server
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}${BASE_PATH}`);
});