import React,{ ReactNode } from "react";
import Modal  from 'react-modal';

interface ReactModalWrapperProps {
    isOpen: boolean;
    closeModal: () => void
    styles?:{
        overlay_bg_color?:string
        content_top?:string,
        content_left?:string,
        content_right?:string,
        content_bottom?:string,
        content_border?: string
        content_border_radius?:string
        content_bg_color?: string,
        content_box_shadow?: string

    }
    child: ReactNode
    deps?: any
}
interface ModalStyles {
    overlay: React.CSSProperties,
    content: React.CSSProperties
}
export const ReactModalWrapper: React.FC<ReactModalWrapperProps> = ({isOpen, closeModal, styles, child, deps }) => {
    
const customStyles: ModalStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: styles?.overlay_bg_color??'rgba(255, 255, 255, 0.75)',
        },
        content: {
            position: 'absolute',
            top: styles?.overlay_bg_color??'20%',
            left: styles?.content_left??'20%',
            right: styles?.content_right??'20%',
            bottom: styles?.content_bottom??'20%',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            border:styles?.content_border??'1px solid white',
            borderRadius:styles?.content_border_radius??'10px',
            outline: 'none',
            padding: '20px',
            backgroundColor:styles?.content_bg_color??"",
            boxShadow:styles?.content_box_shadow??"1px 2px 1px 2px "
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Modal"
        >
            {/* @ts-expect-error */}
            {React.isValidElement(child) ? React.cloneElement(child, { deps, isOpen, closeModal }) : child}


        </Modal>
    );
}
