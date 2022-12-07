import React from 'react'
import { ReactModalWrapper } from '../../shared/extra/ReactModalWrapper';


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
       <ReactModalWrapper
       isOpen={isOpen}
       closeModal={()=>setIsOpen(false)}
       styles={{overlay_bg_color:''}}
       child={<TestChild/>}
       />


    </div>

);
}






interface ModalStyles{
    overlay: React.CSSProperties,
    content: React.CSSProperties
}
const customStyles:ModalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',


    },
    content: {
        position: 'absolute',
        top: '20%',
        left: '30%',
        right: '30%',
        bottom: '20%',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '7px',
        outline: 'none',
        padding: '20px'
    }
};



interface TestChildProps {
    deps?:any
    isOpen?: boolean
    closeModal?: () => void
}

export const TestChild: React.FC<TestChildProps> = ({closeModal}) => {
    
return (
 <div>
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form className='flex flex-col items-center'>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
        </form>
 </div>
);
}
