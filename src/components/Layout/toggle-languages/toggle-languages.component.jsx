import React, { useEffect, useState , useRef} from "react";
import ReactCountryFlag from "react-country-flag";
import {
  ToggleLanguageContainer,
  Text,
  LanguageList,
  RowInline
} from "./toggle-languages.styles";
const configLang = {
  us: { text: "USA", code: "US" },
  vi: { text: "Tiếng Việt", code: "VN" },
  es: { text: "Spain", code: "ES" },
};

const ToggleLanguage = ({ lang }) => {
  const [defaultLang, setDefaultLang] = useState(configLang.vi);
  const [showLangBoard, setShowLangBoard] = useState(false);
  const langRef = useRef(null);
  const listCountriesCode = Object.keys(configLang).filter(
    (keys) => configLang[keys].code !== defaultLang.code
  );

  useEffect(() => {
    function trackLangsBoard(e){
      if(langRef && langRef.current.contains(e.target)){      
        setShowLangBoard(true);
      }else{
        setShowLangBoard(false);
      }
    }
    document.addEventListener("mouseover", trackLangsBoard);
    return () => document.removeEventListener("mouseover", trackLangsBoard);
  },[])
  return (
    <ToggleLanguageContainer ref={langRef}>
      <ReactCountryFlag
        countryCode={defaultLang.code}
        svg
        style={{ transform: "scale(1.5)", marginRight: "1rem" }}
      />
      <Text>{defaultLang.text}</Text>
      <LanguageList show={showLangBoard}>
        {listCountriesCode.map((code) => (
          <RowInline key={code}>
            <ReactCountryFlag
              countryCode={configLang[code].code}
              svg
              style={{ transform: "scale(1.5)", marginRight: "1rem" }}
            />
            <Text>{configLang[code].text}</Text>
          </RowInline>
        ))}
      </LanguageList>
    </ToggleLanguageContainer>
  );
};

export default ToggleLanguage;
