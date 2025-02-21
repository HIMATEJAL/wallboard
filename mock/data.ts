import { Skill, Agent } from '../types';

export const mockSkills: Skill[] = [
  {
    name: 'GBL',
    avail: 2,
    aux: 2,
    busy: 1,
    queue: 0,
    longest: '00:00',
    calls: 207,
    aban: 6,
    svl: 85,
    answered: '82.9%',
    abandoned: '2.2%',
    callback: '0/19',
    isAggregate: true
  },
  // Add more mock data as needed
];

export const mockAgents: Agent[] = [
  { name: 'Selina', state: 'ACD', duration: '4:33' },
  { name: 'Alonza', state: 'ACD', duration: '3:31' },
  // Add more mock data as needed
];
