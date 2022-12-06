import React from 'react'
import ReactDom from 'react-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { get_bills_rpc } from './../../supa/operations';
import { QueryStateWrapper } from '../../shared/QueryStateWrapper';
import { BillFromRPC } from './../../supa/query-types';
import { supabase } from '../../supa/config';
import { TheTable } from '../../shared/table';
import { DivModal } from './../../shared/portal/DivModal';
import ReactModal from 'react-modal';

interface TestProps {
    user: any
}

export const Test: React.FC<TestProps> = ({}) => {
 const [isOpen, setIsOpen] = React.useState(false);

return (
    <div  className=" w-[100%]  bg-purple-500">
        <button onClick={() => setIsOpen(true)}>
            Click to Open Modal
        </button>
    


    </div>

);
}










