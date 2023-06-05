export interface IEvent {
  id: string;
  type: string;
  data: Map<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
