import React from 'react'
import { LoaderElipse } from './../../shared/loaders/Loaders';
import { ShopCard } from '../../components/shops/ShopCard';
import { QueryStateWrapper } from '../../shared/extra/QueryStateWrapper';
import { useShop } from './../../shared/hooks/shops';
import { ShopModetType, ShopsType } from '../../supa/query-types';
import { ReactModalWrapper } from '../../shared/extra/ReactModalWrapper';

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
   child={<ShopsCrrousel index={idx} shops={shops} setIdx={setIdx}/>}

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



interface ShopsCrrouselProps {
   shops: ShopsType[] | null | undefined
   index:number
   setIdx: React.Dispatch<React.SetStateAction<number>>
}

export const ShopsCrrousel: React.FC<ShopsCrrouselProps> = ({shops,index,setIdx}) => {

return (
 <div className='w-full h-full bg-purple-300 
       flex items-center justify-center'>
      <button 
      className='p-1 bg-slate-900 '
      onClick={() => setIdx(prev => {
         if(prev && prev >= 0 ){
            return prev - 1
         }
          return prev
         })}>
         prev
      </button>
   <div className='w-full bg-purple-700 rounded-xl text-xlfirst-letter:
      flex items-center justify-center
      '>
         ID
      {shops&&shops[index].id}
   </div>
      <button
         className='p-1 bg-slate-900'
         disabled={!(shops && (index < shops?.length - 1))}
         onClick={() => setIdx(prev => {
            if (shops && (prev < shops?.length - 1 )) {
              return prev + 1
            }
            return prev
         })}>
      next
   </button>
 </div>
);
}
