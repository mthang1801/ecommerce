import React, {useEffect, useState} from 'react'

const LanguageOption = ({lang}) => {
  const [defaultLang, setDefault] = useState("us");
  const configLang = {
    us : "USA", 
    en : "Spain", 
    vi : "Tiếng Việt"
  }
  useEffect(() => {
    setDefault(lang)
  },[lang])
  return (
    <span>
      {configLang[defaultLang]}
    </span>
  )
}

export default LanguageOption
