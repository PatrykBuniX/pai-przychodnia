import { useEffect, useState } from "react";

const LS_KEY = "cookiesAccepted";

const useCookiesBar = () => {
  const [isCookiesBarHidden, setIsCookiesBarHidden] = useState(true);

  const hideCookiesBar = () => {
    setIsCookiesBarHidden(true);
    window.localStorage.setItem(LS_KEY, "true");
  };

  useEffect(() => {
    const entry = Boolean(window.localStorage.getItem(LS_KEY));
    entry !== null && setIsCookiesBarHidden(entry);
  }, []);

  return {
    isCookiesBarHidden,
    hideCookiesBar,
  };
};

export default useCookiesBar;
