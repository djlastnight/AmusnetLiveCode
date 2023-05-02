import gsap from "gsap";
import Utils from "./core/Utils";
import App from "./core/App";
import SoundController from "./core/SoundController";

/**
 * Defines the game entry point.
 *
 */
async function entryPoint() {
    // Append pixi canvas to the html page.
    document.getElementById("content").appendChild(App.view);

    // Then loading the assets and running the game.
    await loadAssets();
    startGame();
}

/**
 * Loads the game assets in a async manner.
 *
 * @return {*} 
 */
async function loadAssets() {
    await SoundController.loadSounds([["click", "assets/audio/click.mp3"]]);

    // Here is the place to load other assets.

    return new Promise<void>(resolve => {
        App.loader.load(() => {
            resolve();
        })
    })
}

/**
 * Starts the game business logic.
 *
 */
function startGame() {
    // TODO: the code below is for test purposes only.
    const text = Utils.createText("Click me to start");
    text.position.set(200, 200);
    text.anchor.set(0.5, 0.5);
    App.stage.addChild(text);

    App.stage.interactive = true;
    App.stage.once("mousedown", async () => {
        text.text = "Hello Amusnet!";
        App.stage.interactive = false;
        gsap.fromTo(text, { angle: 0 }, { duration: 5.0, angle: 360 });
        await gsap.to(text.scale, { x: 2, y: 2, duration: 1.0, delay: 2.0 });
        await gsap.to(text.scale, { x: 1, y: 1, duration: 2.0 });
        text.style.fill = "red";
        text.anchor.set(0, 0);
        gsap.to(text.position, { x: 0, y: 0, duration: 1.0 });
        text.text = "Nice to meet you";
        SoundController.play("click");
    }, this);
}

entryPoint();