import type { NotificationName } from "../enums";

export interface TNotification {
  id: string;
  counter: number;
  name: NotificationName
}
