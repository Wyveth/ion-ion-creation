import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ActionTrigger } from "./action-trigger.type";

export type IconsFormat = {
  condition?: (params?: any) => boolean;
  icon?: IconDefinition;
  class?: string;
  tooltip?: { text: string; position: string };
  actionTrigger?: ActionTrigger;
  action?: ((event: any) => any) | null;
};
