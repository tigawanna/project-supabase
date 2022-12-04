import React from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { OauthSignIn } from "../../components/auth/OauthSignIn";
import { User } from "../../supa/user-types";

interface LoginProps {
user?:User|null
}

export const Login: React.FC<LoginProps> = ({user}) => {

  const navigate = useNavigate()
  React.useEffect(() => {
    if (user?.email) {
      navigate('/')
    }
  }, [user?.email])


return (
  <div className="w-full  h-full flex flex-col items-center 
  justify-center ">
 <div className="w-[80%] md:w-[60%]  m-2 p-2 flex flex-col 
    items-center justify-center">
      <OauthSignIn/>
    </div>
    {/* <Link
    className="text-blue-500"
    to={'/auth/signup'}>
      Create new account
    </Link> */}
    </div>
  );
};
