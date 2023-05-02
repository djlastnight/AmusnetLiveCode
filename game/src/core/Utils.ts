import { Text } from "pixi.js";

class Utils {
    public createText(text: string) {
        return new Text(text);
    }
}

export default new Utils();