import { Application } from "pixi.js";

/**
 * This is the main game class.
 *
 * @class App
 * @extends {Application}
 */
class App extends Application {
    constructor() {
        super({ resizeTo: window, backgroundColor: 0xffffff});
    }
}

export default new App();