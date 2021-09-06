import React from 'react';

const LanguageContext = React.createContext({
    language: "en",
    changeLanguage: (newLanguage: string) => {}
})

export default LanguageContext;