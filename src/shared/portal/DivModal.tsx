import React from 'react'
import { ReactNode } from 'react';
import { Portal } from './Portal';

interface DivModalProps {
children:ReactNode
 isOpen:boolean
 handleClose:()=>void
}

export const DivModal: React.FC<DivModalProps> = ({ children, isOpen, handleClose }) => {
    React.useEffect(() => {
        const closeOnEscapeKey = (e:any) => e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);

    if (!isOpen) return null;
return (
    <Portal wrapperId="react-portal-modal-container">
    <div className="modal">
        <button onClick={handleClose} className="close-btn">
            Close
        </button>
        <div className="modal-content">{children}</div>
    </div>
    </Portal>
);
}
