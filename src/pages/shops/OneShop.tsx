import React from 'react'
import { ParamsT, ShopBills, ShopsType } from '../../supa/query-types';
import { useNavigate, useParams } from 'react-router-dom';
import {  useMutation, useQuery } from '@tanstack/react-query';
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
import { updateTable } from '../../supa/mutations';
import { useShop } from './../../shared/hooks/shops';

interface OneShopProps {

}

interface BaseInput {
    id?: string;
    created_at?: string;
    elec_readings: number|string;
    water_readings: number | string;
    month: number | string;
    year: number | string;
}

interface UpdateTableArgs {
    current: BaseInput
    prev: BaseInput
}

export const OneShop: React.FC<OneShopProps> = ({}) => {
const params = useParams<ParamsT>();
const navigate = useNavigate();
const [update, setUpdate] = React.useState(true);
const [modalOpen, setModalOpen] = React.useState(false);
const [ref, top] = useMeasure();
const [error,setError]=React.useState({name:"",error:""})

// const shopquery = useQuery<ShopsType[] | null, unknown, ShopsType[] | null, string[]>(
// ['shops'],get_shops,
// {
//     select:(data)=>{
//      if(data){
//          return data?.filter((item) => item.id === params?.shop)
//         }
//       return data
//     }
// }

// )
const shopquery = useShop(params as ParamsT)

const query = useQuery<ShopBills[] | null, unknown, ShopBills[] | null, string[]>(
['shops-bills',params.shop as string], ()=>get_one_shop(params?.shop as string))

const header = [
{ name: "ID", prop: "id", type: "id", editable: false },
{ name: "DATE", prop: "created_at", type: "date", editable: false },
{ name: "ELEC", prop: "elec_readings", type: "number", editable: true },
{ name: "WATER", prop: "water_readings", type: "number", editable: true },
{ name: "MONTH", prop: "month", type: "number", editable: true },
{ name: "YEAR", prop: "year", type: "number", editable: true },

]


const updateMutation = useMutation(async({current,prev}:UpdateTableArgs)=>{
    const new_values:BaseInput={
    elec_readings:parseInt(current.elec_readings as string),
    water_readings:parseInt(current.water_readings as string),
    month:parseInt(current.month as string),
    year: parseInt(current.year as string)
   }
    try {
    return await updateTable({new_values,row_id:current.id as string,table:'bills'})
    }
    catch (e) {
    throw e
    }
})

const saveChanges = ((prev: BaseInput, current: BaseInput) => {
    updateMutation.mutate({prev,current})
})
    const validate = (prev: BaseInput, current: BaseInput) => {
        console.log("prev,curr  === ",prev,current)

        if (current.id === "") {
            setError({ name: "id", error: "valid id required" })
            return false
        }
        if (current.month < 1) {
            setError({ name: "month", error: "invalid month" })
            return false
        }
        if (current.year < 2014) {
            setError({ name: "month", error: "agrho wasn't even around then" })
            return false
        }
 
        return true
    }
const bills = query.data
return (
  <div className="w-full h-full  overflow-hidden">

    <QueryStateWrapper
      error={shopquery.error}
      isError={shopquery.isError}
      isLoading={shopquery.isLoading}
      loader={<LoaderElipse />
    }
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
            <div className="w-full h-[60%] px-5 ">
            <TheTable
                rows={bills as any[]}
                header={header}
                loading={query.isLoading}
                top={top.height - 130}
                error={error}
                // sort={false}
                update={update}
                validate={validate}
                saveChanges={saveChanges}
  
            />
            </div>

          
    </div>
  

  </div>
);
}






