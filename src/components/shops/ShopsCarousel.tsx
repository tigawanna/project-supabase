
import React from 'react'
import { ShopsType } from "../../supa/query-types";
import { GrNext,GrPrevious } from 'react-icons/gr'
import { TheIcon } from '../../shared/extra/TheIcon';
//@ts-ignore
import useKeypress from 'react-use-keypress';
import { ShopsCarouselForm } from './ShopCarouseForm';

interface ShopsCarouselProps {
    shops: ShopsType[] | null | undefined
    index: number
    setIdx: React.Dispatch<React.SetStateAction<number>>
}

export const ShopsCarousel: React.FC<ShopsCarouselProps> = ({ shops, index, setIdx }) => {
    const moveLeft=()=>{
        setIdx(prev => {
            if (prev > 0) {
                return prev - 1
            }
            return prev
        }
        )
    }
    const moveRight=()=>{
        setIdx(prev => {
            if (shops && (prev < shops?.length - 1)) {
                return prev + 1
            }
            return prev
        }
        )
    }
    useKeypress(['ArrowLeft', 'ArrowRight'], (event:any) => {
        if (event.key === 'ArrowLeft') {
        moveLeft()
        } else {
        moveRight();
        }
        // Do something when the user has pressed the Escape key
    });


    const shop = shops&&shops[index]
    return (
        <div 

        className='w-full h-full bg-slate-600 rounded-xl
       flex items-center justify-center'>
       <TheIcon
                Icon={GrPrevious}
                size={'30'}
                iconAction={() => moveLeft()}
            />
            <div 
            
            className='w-full h-full bg-slate-900 rounded-xl text-xlfirst-letter:
           flex items-center justify-center
           '>
           <ShopsCarouselForm shop={shop} moveRight={moveRight}/>
            </div>
                <TheIcon
                Icon={GrNext}
                size={'30'}
                iconAction={()=>moveRight() }
                />

        </div>
    );
}




