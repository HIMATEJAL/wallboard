export interface Skill {
  name: string;
  avail: number;
  aux: number;
  busy: number;
  queue: number;
  longest: string;
  calls: number;
  aban: number;
  svl: number;
  answered: string;
  abandoned: string;
  callback: string;
  isAggregate?: boolean;
}

export interface Agent {
  name: string;
  state: string;
  duration: string;
}
