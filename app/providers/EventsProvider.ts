import { addDays, subDays } from "date-fns";

interface Event {}

export const eventsData: {
  id: number;
  datetime: Date;
  description: string;
  type: number;
}[] = [
  {
    id: 1,
    datetime: new Date(),
    description: "Cruzeiro x Vasco",
    type: 4,
  },
  {
    id: 2,
    datetime: new Date(),
    description: "Academia",
    type: 2,
  },
  {
    id: 3,
    datetime: subDays(new Date(), 6),
    description: "Academia",
    type: 2,
  },
  {
    id: 4,
    datetime: addDays(new Date(), 3),
    description: "Academia",
    type: 2,
  },
];
