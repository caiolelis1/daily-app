"use client";

import { Event } from "@prisma/client";
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

interface EventCardProps {
  event: Event & { typeIdIndex: number };
}

const EventCard = ({ event }: EventCardProps) => {
  const bgColor = TYPES_COLORS[event.typeIdIndex];
  return (
    <div className={"rounded-md px-2 cursor-pointer w-full " + bgColor}>
      {event.allDay ? (
        <span>{event.description}</span>
      ) : event.datetime ? (
        <span>
          {format(event.datetime, "HH:mm")} - {event.description}
        </span>
      ) : (
        <span>??:?? - {event.description}</span>
      )}
    </div>
  );
};

export default EventCard;
