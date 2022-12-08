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
const{isMobile,width}= useCheckInMobile()  
const adjustSize=(mobile:boolean,size:string,mobile_size:string)=>{
return mobile?mobile_size:size
}
const customStyles: ModalStyles = {
        overlay: {
            position: 'fixed',
            zIndex:60,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: styles?.overlay_bg_color??'rgba(255, 255, 255, 0.75)',
        },
        content: {
            position: 'absolute',
            top: styles?.overlay_bg_color??adjustSize(isMobile,'1%','5%'),
            left: styles?.content_left ?? adjustSize(isMobile, '15%', '5%'),
            right: styles?.content_right ?? adjustSize(isMobile, '15%', '5%'),
            bottom: styles?.content_bottom ?? adjustSize(isMobile, '2%', '5%'),
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            border:styles?.content_border??'',
            borderRadius:styles?.content_border_radius??'10px',
            outline: 'none',
            backgroundColor:styles?.content_bg_color??"",
     
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={true}
            style={customStyles}
            contentLabel="Modal"
        >
            <button
            onClick={closeModal}
            className='absolute top-10 right-10 hover:text-bold hover:text-red-600'>X</button>
            {/* @ts-expect-error */}
            {React.isValidElement(child) ? React.cloneElement(child, { deps, isOpen, closeModal }) : child}


        </Modal>
    );
}




const useCheckInMobile = () => {
    const [width, setWidth] =
        React.useState<number>(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    React.useEffect(() => {
        window.addEventListener(
            "resize",
            handleWindowSizeChange
        );
        return () => {
            window.removeEventListener(
                "resize",
                handleWindowSizeChange
            );
        };
    }, []);

    const isMobile = width <= 768;
    return { width, isMobile };
};
