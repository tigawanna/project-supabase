import React from 'react'
import { supabase } from './../../supa/config';
import { QueriesObserver, useQuery } from '@tanstack/react-query';
import { get_shops } from './../../supa/operations';
import { QueryStateWrapper } from '../../shared/QueryStateWrapper';
import { LoaderSpinner, LoaderElipse } from './../../shared/loaders/Loaders';
import { ShopsType } from '../../supa/query-types';
import { DivList } from '../../shared/lists/DivList';
import { ShopCard } from '../../components/shops/ShopCard';
interface ShopsProps {

}

export interface opsType {
   id: string;
   created_at: string;
   tenant: string;
   shop_number: string;
   order: number;
   has_water: boolean;
   has_elec: boolean;
   is_vacant: boolean;
//    tenants: Tenants;
}

export const Shops: React.FC<ShopsProps> = ({}) => {
const query = useQuery<ShopsType[] | null, unknown, ShopsType[] | null, string[]>(['shops'],get_shops)



const shops = query.data
console.log("shops === ",shops)
   console.log(" query errors=== ", query.error)
return (
 <div className='h-full w-full flex flex-col items-center '>
<div className='w-full flex items-center justify-center font-bold text-xl p-2'>
   SHOPS
</div>
<QueryStateWrapper
error={query.error}
isError={query.isError}
isLoading={query.isLoading}
loader={<LoaderElipse/>}
>
<div className='w-full h-[80%] p-2 flex flex-wrap items-center justify-center 
overflow-scroll gap-2'>
{
   shops&&shops.map((shop)=>{
      return(
         <ShopCard shop={shop} key={shop.id}/>
      )
   })
}
</div>
</QueryStateWrapper>

 </div>
);
}
