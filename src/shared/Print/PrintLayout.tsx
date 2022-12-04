import React from 'react'
import { Outlet } from 'react-router-dom';

interface PrintLayoutProps {

}

export const PrintLayout: React.FC<PrintLayoutProps> = ({}) => {
return (
    <div className='w-full h-full overflow-scroll'>
        <Outlet />
    </div>
);
}
