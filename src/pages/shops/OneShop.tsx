import React from 'react'
import { ShopBills, ShopsType } from '../../supa/query-types';
import { useNavigate, useParams } from 'react-router-dom';
import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { get_one_shop, get_shops } from '../../supa/operations';
import { LoaderElipse } from '../../shared/loaders/Loaders';
import { TheTable } from '../../shared/table';
import { FaPrint, FaRegEdit, FaPlus } from 'react-icons/fa';
import useMeasure from 'react-use-measure';
import { QueryStateWrapper } from './../../shared/extra/QueryStateWrapper';
import { ReactModalWrapper } from './../../shared/extra/ReactModalWrapper';
import { TheIcon } from './../../shared/extra/TheIcon';
import { OneShopForm } from '../../components/shops/OneShopForms';
import { OneShopInfo } from '../../components/shops/OneShopInfo';

interface OneShopProps {

}
type ParamsT = {
    shop: string
}


export const OneShop: React.FC<OneShopProps> = ({}) => {
const params = useParams<ParamsT>();
const navigate = useNavigate();
const [update, setUpdate] = React.useState(true);
const [modalOpen, setModalOpen] = React.useState(false);
const [ref, top] = useMeasure();


const shopquery = useQuery<ShopsType[] | null, unknown, ShopsType[] | null, string[]>(
    ['shops'],get_shops,
{
    select:(data)=>{
     if(data){
         return data?.filter((item) => item.id === params?.shop)
        }
      return data
    }
}

)
const query = useQuery<ShopBills[] | null, unknown, ShopBills[] | null, string[]>(
['shops-bills',params.shop as string], ()=>get_one_shop(params?.shop as string))

// console.log("params === ",top)
// console.log("bills === ",query.data)

const header = [
{ name: "ID", prop: "id", type: "id", editable: false },
{ name: "DATE", prop: "created_at", type: "date", editable: false },
{ name: "ELEC", prop: "elec_readings", type: "number", editable: true },
{ name: "WATER", prop: "water_readings", type: "number", editable: true },
{ name: "MONTH", prop: "month", type: "number", editable: true },
{ name: "YEAR", prop: "year", type: "number", editable: true },
]


const bills = query.data
return (
  <div className="w-full h-full overflow-y-scroll scroll-bar">

    <QueryStateWrapper
      error={shopquery.error}
      isError={shopquery.isError}
      isLoading={shopquery.isLoading}
      loader={<LoaderElipse />}
    >
     <div 
     ref={ref}
     className="w-full   px-2 bg-slate-700
      rounded-xl sticky top-0 left-0 right-0 z-40 text-white
     ">
      <OneShopInfo the_shops={shopquery.data} />

      </div>
    </QueryStateWrapper>
    <ReactModalWrapper
    isOpen={modalOpen}
    closeModal={()=>setModalOpen(prev=>!prev)}
    child={<OneShopForm shop_id={params.shop}/>}
    />
    <div className="w-full h-full px-5 ">
            <div
                className=" w-fit p-2  bg-slate-900 text-white flex gap-2 
               left-[45%] right-[45%] rounded-xl sticky top-0 z-40">
                <TheIcon Icon={FaPrint}
                    size='20'
                    iconAction={() => {
                        navigate("/print-preview", {
                            state: {
                                rows: bills,
                                header,
                                title: `payments for ${bills && bills[0]?.month}`
                            },
                        })
                    }} />
                <TheIcon Icon={FaRegEdit} size='20'
                    iconAction={() => setUpdate(prev => !prev)} />
                <TheIcon Icon={FaPlus} size='20'
                    iconAction={() => setModalOpen(prev => !prev)} />
            </div>

            <TheTable
                rows={bills as any[]}
                header={header}
                loading={query.isLoading}
                top={top.height+19}
                // error={error}
                // sort={false}
                update={update}
            // validate={validate}
            // saveChanges={saveChanges}
            // deleteRow={deleteRow}
            // clearError={clearError}
            />

          
    </div>
  

  </div>
);
}







