export interface Event {
  id: string;
  datetime: Date;
  description: string;
  typeId: string;
}

export interface EventType {
  id: string;
  name: string;
}
