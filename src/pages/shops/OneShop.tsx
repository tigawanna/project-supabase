import React from 'react'
import { TheIcon } from '../../shared/TheIcon';
import { ShopBills, ShopsType } from '../../supa/query-types';
import { GiElectric, GiWaterDrop } from 'react-icons/gi'
import { useNavigate, useParams } from 'react-router-dom';
import {  useQuery } from '@tanstack/react-query';
import { get_one_shop, get_shops } from '../../supa/operations';
import { QueryStateWrapper } from './../../shared/QueryStateWrapper';
import { LoaderElipse } from '../../shared/loaders/Loaders';
import { TheTable } from '../../shared/table';
import { FaPrint, FaRegEdit, FaPlus } from 'react-icons/fa';
import useMeasure from 'react-use-measure';
import { ReactModalWrapper } from '../../shared/ReactModalWrapper';
import { useCheckMobileView } from './../../shared/hooks/random';

interface OneShopProps {

}
type ParamsT = {
    shop: string
}



// id: string
// created_at: string
// shop: string
// elec_readings: number
// water_readings: number
// month: number
// year: number

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

console.log("params === ",top)
console.log("bills === ",query.data)

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
    
    child={<OneShopForm/>}
    />
    <div className="w-full px-5">
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

            <div className="p-2 mb-2 min-w-20"></div>
        </div>
  

  </div>
);
}



interface OneShopInfoProps {
the_shops?:ShopsType[] | null
}

export const OneShopInfo: React.FC<OneShopInfoProps> = ({the_shops}) => {
const shop = the_shops&&the_shops[0]
return (
 <div className='w-full border p-2 flex flex-col items-center justify-start'>
        <div className='w-full flex items-center justify-center p-2 '>
            <div className='text-xl font-bold w-full'>{shop?.shop_number}</div>


            <div className='flex justify-center items-center '>
                {shop?.has_elec ? <TheIcon Icon={GiElectric} color="gold" size='20' /> : null}
                {shop?.has_water ? < TheIcon Icon={GiWaterDrop} color="blue" size='20' /> : null}

            </div>
        </div>
        <div className='w-full flex items-center justify-center truncate p-2'>
            <div className='text-base font-mono w-full'>{shop?.tenants.tenant_name}</div>
            <div className='font boldl'>{shop?.order}</div>
        </div>

 </div>
);
}



interface OneShopFormProps {
    the_shops?: ShopsType[] | null
}

export const OneShopForm: React.FC<OneShopFormProps> = ({ the_shops }) => {
    const shop = the_shops && the_shops[0]
    return (
        <div className='w-full h-full border p-2 flex flex-col items-center justify-start
         bg-slate-900'>
            <div className='w-full flex items-center justify-center p-2 '>
                <div className='text-xl font-bold w-full'>{shop?.shop_number}</div>


                <div className='flex justify-center items-center '>
                    {shop?.has_elec ? <TheIcon Icon={GiElectric} color="gold" size='20' /> : null}
                    {shop?.has_water ? < TheIcon Icon={GiWaterDrop} color="blue" size='20' /> : null}

                </div>
            </div>
            <div className='w-full flex items-center justify-center truncate p-2'>
                <div className='text-base font-mono w-full'>{shop?.tenants.tenant_name}</div>
                <div className='font boldl'>{shop?.order}</div>
            </div>

        </div>
    );
}




