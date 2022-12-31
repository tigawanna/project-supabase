
import React from 'react'
import { ShopsType } from "../../supa/query-types";
import { GrNext,GrPrevious } from 'react-icons/gr'
import { TheIcon } from '../../shared/extra/TheIcon';
//@ts-ignore
import useKeypress from 'react-use-keypress';
import { useQuery } from '@tanstack/react-query';
import { getMostPreviousBill } from '../../supa/operations';
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

        className='w-full h-full bg-slate-700 rounded-xl
       flex items-center justify-center'>
       <TheIcon
                Icon={GrPrevious}
                size={'30'}
                iconAction={() => moveLeft()}
            />
            <div 
            
            className='w-full h-full bg-purple-700 rounded-xl text-xlfirst-letter:
           flex items-center justify-center
           '>
           <ShopsCarouselForm shop={shop}/>
            </div>
                <TheIcon
                Icon={GrNext}
                size={'30'}
                iconAction={()=>moveRight() }
                />

        </div>
    );
}



interface ShopsCarouselFormProps {
    shop: ShopsType | null | undefined
}

export const ShopsCarouselForm: React.FC<ShopsCarouselFormProps> = ({shop}) => {
const query = useQuery(['latest-bill', shop], () => getMostPreviousBill(shop?.id as string))
    console.log(query)
return (
 <div className='w-full h-full bg-pink-900 
    flex flex-col items-center justify-center'>
    <div className='w-full flex flex-col justify-center p-5'>
    <div className='text-3xl font-bold w-full'>{shop?.shop_number}</div>
     <div className='text-xl font-bold w-full'>{shop?.tenants.tenant_name}</div>
    <div className='font bold text-xl'>{shop?.order}</div>
    </div>

 </div>
);
}
