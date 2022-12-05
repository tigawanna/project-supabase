import React from 'react'
import { Outlet } from 'react-router-dom';

interface TenantsLayoutProps {

}

export const TenantsLayout: React.FC<TenantsLayoutProps> = ({}) => {
return (
    <div className='w-full h-full'>
        <Outlet />
    </div>
);
}
