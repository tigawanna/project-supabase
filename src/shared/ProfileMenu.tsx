import React from 'react'
import { Record,Admin } from 'pocketbase';
import { useQueryClient } from '@tanstack/react-query';
import { client } from './../pb/config';
import { Link } from 'react-router-dom';

interface ProfileMenuProps {
    user: Record | Admin | null | undefined
    avatar:string
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({user,avatar,setOpen}) => {
    const queryClient = useQueryClient();

    const logout = () => {
        client.authStore.clear();
        queryClient.invalidateQueries(["user"]);
        setOpen(prev=>!prev)
    };

return (
 <div className='absolute top-3 right-5  w-[90%] md:w-[300px]  h-fit z-40
 dark:bg-slate-900 bg-slate-700 border rounded-md bg-opacity-100
 shadow shadow-slate-300 
 flex flex-col justify-center items-center gap-5'>
    
    <div className='w-full h-fit flex flex-col justify-center items-center p-2 '>
        {user?.username}
    </div>    
    <div className='w-full h-fit flex flex-col justify-center items-center'>
            <img
                src={avatar}
                alt={""}
                className="rounded-full hover:rounded-md border-2 min-h-[100px] 
                max-h-[100px] aspect-square "
            />
    </div>
        <div className='w-full h-fit flex flex-col justify-center items-center p-2 '>
            <Link to={'/profile'}
            onClick={() => setOpen(prev=>!prev)}
            className="border-b hover:text-blue-500"
            >
                Edit profile
            </Link>
        </div>
        <div className='w-full h-fit flex flex-col justify-center items-center p-2'>
         <button
         onClick={()=>logout()}
         className='p-2 text-sm font-semibold rounded-lg border-[1px] hover:scale-110 hover:bg-gray-700'
         >Sign out</button>
        </div>

 </div>
);
}
