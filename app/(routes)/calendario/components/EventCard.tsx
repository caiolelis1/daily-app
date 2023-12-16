"use client";

import clsx from "clsx";
import { format } from "date-fns";

const TYPES_COLORS = [
  "bg-pink-500",
  "bg-purple-500",
  "bg-indigo-500",
  "bg-sky-500",
  "bg-teal-500",
  "bg-yellow-500",
  "bg-orange-500",
  "bg-red-500",
];

interface Event {
  id: number;
  datetime: Date;
  description: string;
  type: number;
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const bgColor = TYPES_COLORS[event.type];
  return (
    <div className={"rounded-md px-2 cursor-pointer " + bgColor}>
      <p>
        {format(event.datetime, "HH:mm")} - {event.description}
      </p>
    </div>
  );
};

export default EventCard;
