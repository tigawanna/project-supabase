import React from 'react'
import { LoaderElipse } from './../../shared/loaders/Loaders';
import { ShopCard } from '../../components/shops/ShopCard';
import { QueryStateWrapper } from '../../shared/extra/QueryStateWrapper';
import { useShop } from './../../shared/hooks/shops';
import { ShopModetType } from '../../supa/query-types';
interface ShopsProps {

}


export const Shops: React.FC<ShopsProps> = ({}) => {
// const query = useQuery<ShopsType[] | null, unknown, ShopsType[] | null, string[]>(['shops'],get_shops)
const [mode,setMode]=React.useState<ShopModetType>("add")
const query = useShop()


const shops = query.data
// console.log("shops === ",shops)
//    console.log(" query errors=== ", query.error)
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
         <ShopCard shop={shop} key={shop.id} mode={mode}/>
      )
   })
}
</div>
</QueryStateWrapper>

 </div>
);
}

