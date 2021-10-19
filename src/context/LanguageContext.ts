import React from 'react';

const LanguageContext = React.createContext({
    language: "fr",
    changeLanguage: (newLanguage: string) => {}
})

export default LanguageContext;