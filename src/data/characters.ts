export interface GameCharacter {
  id: string;
  name: string;
  title: string;
  emoji: string;
  bgColor: string;
  accentColor: string;
}

export const CHARACTERS: Record<string, GameCharacter> = {
  narrator: {
    id: 'narrator',
    name: '',
    title: '',
    emoji: '📖',
    bgColor: 'rgba(6,5,8,0.97)',
    accentColor: '#777777',
  },
  detective: {
    id: 'detective',
    name: 'You',
    title: 'Detective',
    emoji: '🕵️',
    bgColor: 'rgba(20,14,8,0.97)',
    accentColor: '#F5A623',
  },
  weber: {
    id: 'weber',
    name: 'Chief Inspector Weber',
    title: 'Head of Cybercrime Division',
    emoji: '⭐',
    bgColor: 'rgba(10,18,38,0.97)',
    accentColor: '#5B8DD9',
  },
  mia: {
    id: 'mia',
    name: 'Analyst Mia',
    title: 'Digital Forensics Specialist',
    emoji: '🔬',
    bgColor: 'rgba(6,22,10,0.97)',
    accentColor: '#7ABF6A',
  },
  jonas: {
    id: 'jonas',
    name: 'Officer Jonas',
    title: 'Field Evidence Officer',
    emoji: '📸',
    bgColor: 'rgba(30,18,6,0.97)',
    accentColor: '#D4A070',
  },
};

export const AVATAR_EMOJIS = ['🕵️', '🕵️‍♀️', '👨‍💻', '👩‍💻', '🧔', '👩‍⚖️'];

export const AVATAR_NAMES = [
  'The Shadow',
  'The Wraith',
  'The Analyst',
  'The Technician',
  'The Veteran',
  'The Counselor',
];

export const AVATAR_TAGLINES = [
  'Every system has a ghost. I find it.',
  'The law bends. I do not.',
  'Numbers never lie. People do.',
  'One flaw. That\'s all I need.',
  'I\'ve buried cases others couldn\'t solve.',
  'Justice is a scalpel, not a hammer.',
];

export const SPECIALTIES = [
  { icon: '💾', label: 'Digital Forensics', desc: 'Recover what others delete' },
  { icon: '🧠', label: 'Social Engineering', desc: 'Read the human factor' },
  { icon: '🔐', label: 'Cybersecurity', desc: 'Hunt threats, harden systems' },
  { icon: '🔍', label: 'Field Investigation', desc: 'Eyes on the ground' },
];

export const AVATAR_COLORS = [
  '#F5A623',
  '#E05A47',
  '#4A90D9',
  '#7ABF6A',
  '#B98FD4',
  '#D4A070',
];
