import React from 'react'
import { Outlet } from 'react-router-dom';
import { BillsToolbar } from '../../components/bills/BillsToolbar';
import { User } from '../../supa/types';

interface BillsLayputProps {
user?:User|null
}

export const BillsLayout: React.FC<BillsLayputProps> = ({user}) => {
return (
    <div className='overflow-y-hidden scroll-bar w-full'>
          <main className=' h-full w-full'>
            <Outlet />
        </main>
    </div>
);
}



