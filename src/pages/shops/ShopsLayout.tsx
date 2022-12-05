import React from 'react'
import { Outlet } from 'react-router-dom';

interface ShopsLayputProps {

}

export const ShopsLayout: React.FC<ShopsLayputProps> = ({}) => {




return (
    <div className='w-full h-full'>
        <Outlet />
    </div>
);
}
