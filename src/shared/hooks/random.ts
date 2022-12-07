import React from "react";


export const useCheckMobileView = () => {
  const [width, setWidth] =
    React.useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      handleWindowSizeChange
    );
    return () => {
      window.removeEventListener(
        "resize",
        handleWindowSizeChange
      );
    };
  }, []);

  const isMobile = width <= 768;
  return { width, isMobile };
};
