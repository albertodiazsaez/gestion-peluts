import { ID } from "appwrite";

export class Colores {

    constructor($id: string, color: string) {
        this.$id = $id;
        this.color = color;
    }

    $id: string;
    color: string;
}