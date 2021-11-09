import React from 'react';

const SoundContext = React.createContext({
    mainSound: 0.5,
    changeMainSound: (value: number, mute: boolean) => {},
    isMuted: false,
    changeMuted: (value: boolean, vol: number) => {}
});

export default SoundContext;