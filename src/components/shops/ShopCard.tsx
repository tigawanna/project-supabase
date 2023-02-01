import React from 'react'
import { BillsResponse, ShopModetType, ShopsType } from '../../supa/query-types';
import { GiElectric, GiWaterDrop } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom';
import { TheIcon } from '../../shared/extra/TheIcon';
import { useQuery } from '@tanstack/react-query';
import { getMostPreviousBill } from '../../supa/operations';
import { computePeriod } from '../bills/utils';
import { ModeType } from '../../pages/bills/Bills';

interface ShopCardProps {
shop?:ShopsType | null
 mode: Partial<ModeType>
}

export const ShopCard: React.FC<ShopCardProps> = ({shop,mode}) => {
    // //console.log("shop === ",shop)
const navigate = useNavigate()
const date = new Date();
const [period, setPeriod] = React.useState(() => computePeriod(date,mode));

const query = useQuery<BillsResponse[], unknown, BillsResponse[], (string | ShopsType | null | undefined)[]>(
['latest-bill', shop,mode], () => getMostPreviousBill(shop?.id as string))

const data = query?.data

return (
 <div 
 onClick={() => {if (mode ==="view") navigate('/shops/' + shop?.id)}}
    style={{ outline:data && data[0].month === period.curr_month ? "2px red solid":""}}
 className=' flex flex-col items-center justify-start p-2'>

<div 
className='w-full flex items-center justify-center rounded-xl cursor-pointer'>
    <div className='text-xl font-bold w-full'>{shop?.shop_number}</div>
      <div className='flex justify-center items-center '>
        {shop?.has_elec ? <TheIcon Icon={GiElectric} color="gold" size='20'/> : null}
        {shop?.has_water ? < TheIcon Icon={GiWaterDrop} color="blue" size='20'/> : null}
       </div>
        </div>
        <div className='w-full flex items-center justify-center truncate'>
            <div className='text-base font-mono w-full'>{shop?.tenants?.tenant_name}</div>
            <div className='font boldl'>{shop?.order}</div>
        </div>


{/* <QueryStateWrapper
isError={query.isError}
isLoading={query.isLoading}
error={query.error}
data={query.data}
>

    <div className='w-full  '>
    {data && data[0].month === period.curr_month ?
    <div className='b'></div> :null}
    </div>

</QueryStateWrapper> */}

 </div>


);
}
