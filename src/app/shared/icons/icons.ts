import {
  LucideCircleCheck,
  LucideCircleX,
  LucideUser,
  LucideSearch,
  LucideSettings,
  LucideBell,
  LucideHouse,
  LucideLock,
  LucideKeyRound,
  LucideMail,
} from '@lucide/angular';

export const icons = {
  'circle-check': LucideCircleCheck,
  'circle-x': LucideCircleX,
  'user': LucideUser,
  'search': LucideSearch,
  'settings': LucideSettings,
  'bell': LucideBell,
  'house': LucideHouse,
  'lock': LucideLock,
  'key': LucideKeyRound,
  'mail': LucideMail,
} as const;

export type IconName = keyof typeof icons;