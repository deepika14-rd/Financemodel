import type { Icon } from '@phosphor-icons/react';
import { ChartPieIcon } from '@phosphor-icons/react/ChartPie';
import { GearSixIcon } from '@phosphor-icons/react/GearSix';
import { PlugsConnectedIcon } from '@phosphor-icons/react/PlugsConnected';
import { UserIcon } from '@phosphor-icons/react/User';
import { UsersIcon } from '@phosphor-icons/react/Users';
import { XSquare } from '@phosphor-icons/react/XSquare';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  user: UserIcon,
  users: UsersIcon,
} as Record<string, Icon>;
