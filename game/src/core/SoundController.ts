import { sound } from '@pixi/sound';

/**
 * A singleton class, which wraps the whole sound and music playing ingame.
 *
 * @class SoundController
 */
class SoundController {
    public play(sndId: string) {
        console.log(`[Sound Controller] Playing sound ${sndId}`)
        sound.play(sndId);
    }

    public async loadSounds(soundList: string[][]) {
        return new Promise<void>(resolve => {
            soundList.forEach((item) => {
                const soundName = item[0];
                const location = item[1];
                sound.add(soundName, location);
            });

            resolve();
        })
    }
}

export default new SoundController();