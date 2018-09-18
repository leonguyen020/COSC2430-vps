const areas = [
  {
    _id: 0,
    name: "District 1",
  },
  {
    _id: 1,
    name: "District 2",
  },
  {
    _id: 2,
    name: "District 3",
  },
  {
    _id: 3,
    name: "District 4",
  },
  {
    _id: 4,
    name: "District 5",
  },
  {
    _id: 5,
    name: "District 6",
  },
  {
    _id: 6,
    name: "District 7",
  },
  {
    _id: 7,
    name: "District 8",
  },
  {
    _id: 8,
    name: "District 9",
  },
  {
    _id: 9,
    name: "District 10",
  },
  {
    _id: 10,
    name: "District 11",
  },
  {
    _id: 11,
    name: "District 12",
  },
];
const directions = [
  {
    _id: 1,
    name: "North",
  },
  {
    _id: 2,
    name: "East",
  },
  {
    _id: 3,
    name: "South",
  },
  {
    _id: 4,
    name: "West",
  },
];

const numberOfBedrooms = [
  {
    _id: 1,
    name: 1,
  },
  {
    _id: 2,
    name: 2,
  },
  {
    _id: 3,
    name: 3,
  },
  {
    _id: 4,
    name: 4,
  },
];

const numberOfFloors = [
  {
    _id: 1,
    name: 1,
  },
  {
    _id: 2,
    name: 2,
  },
  {
    _id: 3,
    name: 3,
  },
  {
    _id: 4,
    name: 4,
  },
];

const price = [
  {
    _id: 0,
    name: "Any",
    array: [],
  },
  {
    _id: 1,
    name: "$0 to $9999",
    array: [0, 9999],
  },
  {
    _id: 2,
    name: "$10000 to $19999",
    array: [10000, 19999],
  },
  {
    _id: 3,
    name: "$20000 to $29999",
    array: [20000, 29999],
  },
  {
    _id: 4,
    name: "$30000 to $39999",
    array: [30000, 39999],
  },
  {
    _id: 5,
    name: "$40000 to $49999",
    array: [40000, 49999],
  },
  {
    _id: 6,
    name: "More Than $50000",
    array: [50000, 999999999],
  },
];

export { areas, directions, numberOfBedrooms, numberOfFloors, price };
