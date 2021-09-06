import Sound from 'react-native-sound';

    const loadSound = (soundFileName: string, isLooping: boolean, volume = 1) => {

    // Enable playback in silence mode
    Sound.setCategory('Playback');

    // Load the sound file 'whoosh.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.
    var soundPlay = new Sound(soundFileName, Sound.MAIN_BUNDLE, (error) => {
    
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }

        // loaded successfully
        console.log('duration in seconds: ' + soundPlay.getDuration() + 'sound: ' + `${soundFileName}`);
        soundPlay.setVolume(volume);

        if (isLooping) {
            soundPlay.setNumberOfLoops(-1);
        }

        soundPlay.play((success) => {
            if (success) {
            console.log('successfully finished playing');
            } else {
            console.log('playback failed due to audio decoding errors');
            }
        });
    });

    return soundPlay;
}

export {loadSound}




