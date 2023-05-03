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
        
        // This code enables the pixi dev tools.
        globalThis.__PIXI_APP__ = this;
    }
}

export default new App();