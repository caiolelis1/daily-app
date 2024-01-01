"use client";

import { format } from "date-fns";

import { Event } from "@/app/types";

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
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const bgColor = TYPES_COLORS[0];
  return (
    <div className={"rounded-md px-2 cursor-pointer w-full " + bgColor}>
      <p>
        {format(event.datetime, "HH:mm")} - {event.description}
      </p>
    </div>
  );
};

export default EventCard;
