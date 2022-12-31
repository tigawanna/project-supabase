
import { useQuery } from '@tanstack/react-query';
import { get_shops } from '../../supa/operations';
import { ParamsT, ShopsType } from '../../supa/query-types';


export const useShop=(params?:ParamsT)=>{
return useQuery<ShopsType[] | null,unknown,ShopsType[] | null,string[]>(["shops"], 
get_shops,
{
    select:(data)=>{
        // console.log("data ,data",data)
     if(data && params){
        return data?.filter((item) => item.id === params?.shop??"")
      }
      return data
    }
}
);
}
