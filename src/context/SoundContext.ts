import React from 'react';

const SoundContext = React.createContext({
    mainSound: 0.5,
    changeMainSound: (value: number) => {}
});

export default SoundContext;