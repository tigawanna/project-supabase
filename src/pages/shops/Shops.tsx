import React from 'react'
import { supabase } from './../../supa/config';
import { QueriesObserver, useQuery } from '@tanstack/react-query';
import { get_shops } from './../../supa/operations';
import { QueryStateWrapper } from '../../shared/QueryStateWrapper';
import { LoaderSpinner, LoaderElipse } from './../../shared/loaders/Loaders';
import { ShopsType } from '../../supa/query-types';
import { DivList } from '../../shared/lists/DivList';
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

const header = [
   {name:'ID',prop:'id',type:'text'},
   { name: 'Created At', prop: 'created_at', type: 'text' },
   { name: 'Shop Name', prop: 'tenants.tenant_name', type: 'sub-text' },
   { name: 'Water', prop: 'has_water', type: 'boolean' },
   { name: 'Elec', prop: 'has_elec', type: 'boolean' },
   { name: 'Vacant', prop: 'is_vacant', type:'boolean' },
]

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
<DivList header={header} list={shops}/>
</QueryStateWrapper>

 </div>
);
}

