import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useFont = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const body = document.body;
    if (i18n.language === "fa") {
      body.classList.add("fa-language");
    } else {
      body.classList.remove("fa-language");
    }
  }, [i18n.language]);
};

export default useFont;
