import React from 'react'
import { IconType } from 'react-icons';
import { IconContext } from "react-icons/lib";
interface TheIconProps {
  Icon: IconType;
  size?: string;
  color?: string;
  iconstyle?: string;
  iconAction?: () => any;
}

export const TheIcon = (
  {
    Icon,
    color,
    iconAction,
    iconstyle,
    size
  }: TheIconProps
) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    iconAction && iconAction()
    // other logic for handling the icon's click event
  }
  return (
    <IconContext.Provider value={{
      size, color, className: iconstyle
    }}>
      <div onClick={handleClick}>
        <Icon />
      </div>

    </IconContext.Provider>
  );
};

