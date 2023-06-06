export type Event<
  EventData extends Record<string, unknown> = Record<string, unknown>,
> = Readonly<{
  id: Readonly<string>;
  type: Readonly<string>;
  timestamp: Readonly<Date>;
  data: Readonly<EventData>;
}>;
