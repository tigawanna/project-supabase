import React from "react";
import { User } from "../../supa/user-types";
import { useTheme } from "./../../shared/hooks/themeHook";
import {
  BsSunFill,
  BsFillMoonFill,
} from "react-icons/bs";

import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { TheIcon } from "../../shared/extra/TheIcon";
import { ReactModalWrapper } from "../../shared/extra/ReactModalWrapper";
import { ProfileMenu } from "./ProfileMenu";

interface ToolbarProps {
  user: User | null | undefined;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  user,
}) => {
  const theme = useTheme();
  const nextTheme =
    theme.theme === "dark" ? "light" : "dark";
  const mode =theme.theme === "dark"? BsSunFill: BsFillMoonFill;
  const toggle = () => {
    theme.setTheme(nextTheme);
  };
  const [open, setIsOpen] = React.useState(false);
  const avatar = user?.user_metadata?.avatar_url

  return (
    <div className="w-full h-10 flex justify-between items-center">

      <div className=" h-full flex justify-start items-center">
        <div className="m-1 w-fit h-full p-1 flex justify-center items-center ">
          <Link to="/">
            <div className="w-fit p-1 mx-5 flex justify-center items-centertext-white  ">
              <TheIcon
                Icon={AiOutlineHome}
                size={"25"}
                color={""}
                iconstyle={""}
              />
            </div>
          </Link>
        </div>
      </div>

      <div className="w-fit p-1 mx-5 flex justify-center items-center   ">
        <TheIcon
          Icon={mode}
          size={"25"}
          color={""}
          iconstyle={""}
          iconAction={toggle}
        />
      </div>
      <div className="w-fit md:px-2 h-full flex justify-center items-center gap-1 md:gap-2
         md:border-2 rounded-xl  font-bold dark:font-normal ">
        <div className="w-full  h-full flex justify-center items-center
         hover:text-blue-700">
        <Link to="/bills">bills</Link>
       </div>
      <div className="w-full h-full flex justify-center items-center 
       hover:text-blue-700">
        <Link to="/shops">shops</Link>
        </div>
      <div className="w-full px-1 h-full flex justify-center items-center 
      hover:text-blue-700">
        <Link to="/tenants">tenants</Link>
      </div>
      <div className="w-full px-1 h-full flex justify-center items-center 
      hover:text-rose-700">
          <Link to="/test">test</Link>
        </div>
      </div>
      
      <div className="w-fit h-full flex justify-end items-center">
      <button 
      type="button"
      onClick={()=>setIsOpen(true)}
      className="  rounded-md  flex justify-center items-center
         w-16  h-full  aspect-square">
          {!user ? (
              <TheIcon
                Icon={FaUserCircle}
                size={"25"}
                color={""}
              />
  
          ) : (
            <img
              src={avatar}
              alt={""}
              className="rounded-[50%] hover:rounded-sm border-2 max-h-[40px] aspect-square"
              // onClick={() => setOpen(true)}
            />
          )}
        </button>

        <ReactModalWrapper
          child={
            <ProfileMenu user={user} setIsOpen={setIsOpen} />}
          closeModal={() => setIsOpen(false)}
          isOpen={open}
          styles={{
            overlay_top: '0%',
            overlay_right: '0%',
            overlay_left: '0%',
            overlay_bottom: '0%',
            content_bottom: '20%',
            content_right: '0%',
            content_left: '60%',
            content_top: '0%'

          }}
        />
      </div>

    </div>
  );
};
