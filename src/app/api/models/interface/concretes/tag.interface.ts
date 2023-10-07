import { Base } from "../abstracts/base.interface";

export interface Tag extends Base {
    code: string;
    libelle: string;
    description: string;
}
