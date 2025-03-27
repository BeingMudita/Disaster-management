import React, { useState, useEffect } from "react";

const LanguageSelector = () => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <select className="language-selector" value={language} onChange={(e) => setLanguage(e.target.value)}>
      <option value="en">English</option>
      <option value="hi">हिन्दी (Hindi)</option>
      <option value="es">Español (Spanish)</option>
      <option value="fr">Français (French)</option>
    </select>
  );
};

export default LanguageSelector;
