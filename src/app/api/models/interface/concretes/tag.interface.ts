import { BaseInterface } from "../abstracts/base.interface";

export interface TagInterface extends BaseInterface {
    code: string;
    libelle: string;
    description: string;
}
