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
import Modal from 'react-modal';
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
       <TestModal
       isOpen={isOpen}
       closeModal={()=>setIsOpen(false)}
       styles={customStyles}

       />


    </div>

);
}





interface TestModalProps {
isOpen:boolean;
closeModal:()=>void
styles:any
}

export const TestModal: React.FC<TestModalProps> = ({isOpen,closeModal,styles}) => {
return (
    <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={styles}
        contentLabel="Example Modal"
    >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
        </form>
    </Modal>
);
}





const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
        position: 'absolute',
        top: '20%',
        left: '30%',
        right: '30%',
        bottom: '20%',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'
    }
};
