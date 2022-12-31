import React from 'react'
import { ShopModetType, ShopsType } from '../../supa/query-types';
import { GiElectric, GiWaterDrop } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom';
import { TheIcon } from '../../shared/extra/TheIcon';
interface ShopCardProps {
shop?:ShopsType | null
mode:ShopModetType
}

export const ShopCard: React.FC<ShopCardProps> = ({shop,mode}) => {
    // console.log("shop === ",shop)
const navigate = useNavigate()
return (
 <div 
 onClick={() => {if (mode ==="view") navigate('/shops/' + shop?.id)}}
 className='w-[85%] border-2 shadow-lg md:w-[30%] dark:border rounded-lg 
 flex flex-col items-center justify-start p-2
 hover:border-purple-700'>
<div 
className='w-full flex items-center justify-center rounded-xl cursor-pointer'>
    <div className='text-xl font-bold w-full'>{shop?.shop_number}</div>
      <div className='flex justify-center items-center '>
                {shop?.has_elec ? <TheIcon Icon={GiElectric} color="gold" size='20'/> : null}
                {shop?.has_water ? < TheIcon Icon={GiWaterDrop} color="blue" size='20'/> : null}
       </div>
        </div>
        <div className='w-full flex items-center justify-center truncate'>
            <div className='text-base font-mono w-full'>{shop?.tenants.tenant_name}</div>
            <div className='font boldl'>{shop?.order}</div>
        </div>

 </div>
);
}
