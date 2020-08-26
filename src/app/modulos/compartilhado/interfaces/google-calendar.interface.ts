export interface DefaultReminder {
  method: string;
  minutes: number;
}

export interface Creator {
  email: string;
}

export interface Organizer {
  email: string;
}

export interface Start {
  dateTime: Date;
}

export interface End {
  dateTime: Date;
}

export interface Attendee {
  email: string;
  displayName: string;
  responseStatus: string;
  organizer?: boolean;
  self?: boolean;
}

export interface EntryPoint {
  entryPointType: string;
  uri: string;
  label: string;
  pin: string;
  regionCode: string;
}

export interface Key {
  type: string;
}

export interface ConferenceSolution {
  key: Key;
  name: string;
  iconUri: string;
}

export interface ConferenceData {
  entryPoints: EntryPoint[];
  conferenceSolution: ConferenceSolution;
  conferenceId: string;
  signature: string;
}

export interface Reminders {
  useDefault: boolean;
}

export interface GoogleCalendarItem {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: Date;
  updated: Date;
  summary: string;
  creator: Creator;
  organizer: Organizer;
  start: Start;
  end: End;
  iCalUID: string;
  sequence: number;
  attendees: Attendee[];
  hangoutLink: string;
  conferenceData: ConferenceData;
  reminders: Reminders;
  description: string;
}
