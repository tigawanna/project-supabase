import React from 'react'
import { Outlet } from 'react-router-dom';
import { BillsToolbar } from '../../components/bills/BillsToolbar';
import { User } from '../../supa/user-types';

interface BillsLayputProps {
user?:User|null
}

export const BillsLayout: React.FC<BillsLayputProps> = ({user}) => {
return (
    <div className='w-full h-full'>
     <Outlet />
   </div>
);
}



