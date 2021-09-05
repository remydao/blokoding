import Translation from './translation.json';
import React from 'react';
import LanguageContext from '../context/ContextLanguage';

function useLanguage(){
  const contextLanguage = React.useContext(LanguageContext);
  let language = contextLanguage.language

  React.useEffect(() => {
      language = contextLanguage.language;
  }, [contextLanguage.language]);
  
  return Translation[language];
}

export {useLanguage};