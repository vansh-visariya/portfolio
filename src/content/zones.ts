export type ZoneId = 'about' | 'projects' | 'skills' | 'blog' | 'contact';

export interface Zone {
  id: ZoneId;
  name: string;
  label: string;
  tagline: string;
  color: string;
  position: [number, number, number];
}

export const ZONES: Zone[] = [
  {
    id: 'about',
    name: 'Input Layer',
    label: 'About',
    tagline: 'Where the signal enters',
    color: '#ffffff',
    position: [0, 0, -14],
  },
  {
    id: 'projects',
    name: 'Hidden Layer',
    label: 'Projects',
    tagline: 'Things I\u2019ve built',
    color: '#cccccc',
    position: [20, 0, -28],
  },
  {
    id: 'skills',
    name: 'Attention Block',
    label: 'Skills',
    tagline: 'Learned weights & expertise',
    color: '#999999',
    position: [-20, 0, -28],
  },
  {
    id: 'blog',
    name: 'Memory Bank',
    label: 'Blog',
    tagline: 'Stored thoughts & notes',
    color: '#777777',
    position: [-12, 0, -48],
  },
  {
    id: 'contact',
    name: 'Output Layer',
    label: 'Contact',
    tagline: 'Send a signal back',
    color: '#e8e8e8',
    position: [12, 0, -48],
  },
];

export const SPAWN: [number, number, number] = [0, 0, 0];
export const ACTIVATION_RADIUS = 5.5;
export const WORLD_BOUNDS = 60;
export const PLAYER_SPEED = 11;

export const SYNAPSES: [ZoneId, ZoneId][] = [
  ['about', 'projects'],
  ['about', 'skills'],
  ['skills', 'projects'],
  ['skills', 'blog'],
  ['projects', 'contact'],
  ['blog', 'contact'],
];

export function getZone(id: ZoneId): Zone {
  return ZONES.find((z) => z.id === id)!;
}
