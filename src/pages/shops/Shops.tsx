import React from 'react'
import { LoaderElipse } from './../../shared/loaders/Loaders';
import { ShopCard } from '../../components/shops/ShopCard';
import { QueryStateWrapper } from '../../shared/extra/QueryStateWrapper';
import { useShop } from './../../shared/hooks/shops';
import { ShopModetType, ShopsType } from '../../supa/query-types';
import { ReactModalWrapper } from '../../shared/extra/ReactModalWrapper';
import { ShopsCarousel } from '../../components/shops/ShopsCarousel';

interface ShopsProps {

}


export const Shops: React.FC<ShopsProps> = ({}) => {
// const query = useQuery<ShopsType[] | null, unknown, ShopsType[] | null, string[]>(['shops'],get_shops)
const [mode,setMode]=React.useState<ShopModetType>("add")
const [open, setOpen] = React.useState(false)
const [idx, setIdx] = React.useState(0)
const query = useShop()


const shops = query.data
// console.log("shops === ",shops)
//    console.log(" query errors=== ", query.error)
return (
 <div className='h-full w-full flex flex-col items-center '>
<div className='w-full flex items-center justify-center font-bold text-xl p-2'>
   SHOPS
</div>
<ReactModalWrapper
   isOpen={open}
   closeModal={() => setOpen(prev => !prev)}
   child={<ShopsCarousel index={idx} shops={shops} setIdx={setIdx}/>}
   styles={{content_left:"10%",content_right:'10%'}}

/>
<QueryStateWrapper
error={query.error}
isError={query.isError}
isLoading={query.isLoading}
loader={<LoaderElipse/>}
>
<div className='w-full h-[80%] p-2 flex flex-wrap items-center justify-center 
overflow-scroll gap-2'>
{
shops&&shops.map((shop,indx)=>{
return(
   <div 
   onClick={()=>{
      setOpen(true)
      setIdx(indx)
   }}
   key={shop.id}
   className='w-[85%] border-2 shadow-lg md:w-[30%] dark:border 
   rounded-lg  hover:border-purple-700'>
   <ShopCard shop={shop}  mode={mode}/>
   </div>
   )
})
}
</div>
</QueryStateWrapper>

 </div>
);
}



