import { ActionTrigger } from './action-trigger.type';
import { IconsFormat } from './icons-format.type';

export type Button = {
  class: string;
  text?: string;
  prefix?: IconsFormat;
  suffix?: IconsFormat;
  tooltip?: { text: string; position: string };
  show?: (params?: any) => boolean;
  disabled: (params?: any) => boolean;
  actionTrigger: ActionTrigger;
  action: (param: any) => any;
};
