import React from 'react'
import { ShopBills, ShopsType } from '../../supa/query-types';
import { GiElectric, GiWaterDrop } from 'react-icons/gi'
import { useNavigate, useParams } from 'react-router-dom';
import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { get_one_shop, get_shops } from '../../supa/operations';
import { LoaderElipse } from '../../shared/loaders/Loaders';
import { TheTable } from '../../shared/table';
import { FaPrint, FaRegEdit, FaPlus } from 'react-icons/fa';
import useMeasure from 'react-use-measure';
import { FormOptions } from '../../shared/form/types';
import TheForm from '../../shared/form/TheForm';
import { addBills, updateShop } from './../../supa/mutations';
import { concatErrors } from '../../shared/utils/utils';
import { QueryStateWrapper } from './../../shared/extra/QueryStateWrapper';
import { ReactModalWrapper } from './../../shared/extra/ReactModalWrapper';
import { TheIcon } from './../../shared/extra/TheIcon';
import { searchSupabase } from './../../supa/operations';

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
const [modalOpen, setModalOpen] = React.useState(false);
const shop = the_shops&&the_shops[0]
return (
 <div className='w-full border p-2 flex flex-col items-center justify-start'>
        <div className='w-full flex items-center justify-center p-2 '>
         <div className='text-6xl font-bold w-full'>{shop?.shop_number}</div>
            <div className='flex flex-col justify-center items-center gap-2'>
                <TheIcon Icon={FaRegEdit} size='20'
                    iconAction={() => setModalOpen(prev => !prev)} />
                {shop?.has_elec ? <TheIcon Icon={GiElectric} color="gold" size='30' /> : null}
                {shop?.has_water ? < TheIcon Icon={GiWaterDrop} color="blue" size='30' /> : null}
               

            </div>
        </div>
        <ReactModalWrapper
            isOpen={modalOpen}
            closeModal={() => setModalOpen(prev => !prev)}
            child={<EditShopForm shop={shop} />}
        />
        <div className='w-full flex items-center justify-center truncate p-2 gap-2'>
         
            <div className='text-base font-mono w-full'>{shop?.tenants.tenant_name}</div>
            <div className='font-bold'>{shop?.order}</div>
        </div>

 </div>
);
}



interface OneShopFormProps {
    shop_id?:string
}
interface FormInput {
    shop: string;
    elec_readings: number;
    water_readings: number;
    month: number;
    year: number;
}

export const OneShopForm: React.FC<OneShopFormProps> = ({ shop_id }) => {
  const date = new Date()
    const editing = true

    interface Validate {
        input: FormInput;
        setError: (error: { name: string; message: string }) => void;
    }

  const validate = ({ input, setError }: Validate) => {
        const assertNotNull=()=>{
         for (const item in input){
         console.log("input.item",input[item as keyof typeof input])
         }
        }
        // console.log("input === ",input)
        // const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        // if (input.shop === "") {
        //     setError({ name: "shop", message: "email field required" })
        //     return false
        // }
        // if (!input.elec_readings) {
        //     setError({ name: "email", message: "invalid email pattern" })
        //     return false
        // }
        // if (input.) {
        //     setError({ name: "password", message: "password minimun length is 1" })
        //     return false
        // }

        setError({ name: "", message: "" })
        return true
    }
    const form_input: FormOptions[] = [
        { field_name: "elec_readings", field_type: "number", default_value:0, editing },
        { field_name: "water_readings", field_type: "number", default_value:0, editing },
        { field_name: "month", field_type: "number", default_value:date.getMonth()+1, editing },
        { field_name: "year", field_type: "number", default_value:date.getFullYear(), editing },
    ] 
    const [error, setError] = React.useState({ name: "", message: "" })
    const queryClient = useQueryClient();

    const addBillMutation = useMutation(async (vars: { coll_name: string, payload: FormData }) => {
      
    const new_bill={
          shop: shop_id,
          elec_readings: vars.payload.get('elec_readings'),
          water_readings: vars.payload.get('elec_readings'),
          month: vars.payload.get('month'),
          year: vars.payload.get('year'),
    }
      
      try{
        return await addBills(new_bill as any)
      }
      catch(e){
         throw e
      }
    },
      {
          onSettled: () => {
            //   queryClient.invalidateQueries(['shops-bills',shop_id as string]);
          },
          onError: (err: any) => {
              console.log("errror logging in ",err.data)
              setError({ name: "main", message: concatErrors(err) })
          }
      })
    
    const handleSubmit = async (data: FormData) => {
        await addBillMutation.mutate({ coll_name: 'user', payload: data })
    };
    
      return (
        <div className='w-full h-full border p-2 flex flex-col items-center justify-start
         bg-slate-900'>
            <TheForm
                form_title='Login'
                fields={form_input}
                validate={validate}
                submitFn={handleSubmit}
                is_submitting={addBillMutation.isLoading}
                error={error}
                editing={editing}
            />

        </div>
    );
}


interface EditShopFormProps {
    shop: ShopsType | null | undefined
}
interface FormInput {
  has_vacant:boolean
  has_water:boolean;
  is_elec:boolean;
  order:number;
  tenant:string;
}
interface QueryFnProps {
    keyword: string
    key: string[]
}

export const EditShopForm: React.FC<EditShopFormProps> = ({ shop }) => {
     const editing = true
    interface Validate {
        input: FormInput;
        setError: (error: { name: string; message: string }) => void;
    }
    const queryFn = (keyword:string) => {
        return useQuery(['tenants', keyword], () =>
            searchSupabase({ keyword, table: 'tenants', column: 'tenant_name' }),
            {enabled:keyword.length>1}
            )
    }

    const validate = ({ input, setError }: Validate) => {
        const assertNotNull = () => {
            for (const item in input) {
                console.log("input.item", input[item as keyof typeof input])
            }
        }
          setError({ name: "", message: "" })
        return true
    }

    const form_input: FormOptions[] = [
        { field_name: "has_elec", field_type: "checkbox", default_value: shop?.has_elec, editing },
        { field_name: "has_water", field_type: "checkbox", default_value: shop?.has_water, editing },
        { field_name: "is_vacant", field_type: "checkbox", default_value: shop?.is_vacant, editing, },
        { field_name: "tenant", field_type: "fetchselect", default_value: shop?.tenants.tenant_name, 
        editing,
        queryFn,
        fetch_select_options:{
            form_field:'tenant',
            field_to_save:'id',
            table:'tenants',
            keyword_field:"tenant_name",
            default_value_to_save:shop?.tenant as string
        }
    },
        { field_name: "order", field_type: "number", default_value: shop?.order, editing },

    ]
    const [error, setError] = React.useState({ name: "", message: "" })

    const queryClient = useQueryClient();

    const updateShopMutation = useMutation(async (vars: { coll_name: string, payload: FormData }) => {
       const new_bill = {
  
            has_elec: vars.payload.get('has_elec'),
            has_water: vars.payload.get('has_water'),
            is_vacant: vars.payload.get('is_vacant'),
            order: vars.payload.get('order'),
           tenant: vars.payload.get('tenant'),
        }
      try {
            return await updateShop(new_bill as any)
         }
        catch (e) {
            throw e
        }
    },
        {
            onSettled: () => {
                //   queryClient.invalidateQueries(['shops-bills',shop_id as string]);
            },
            onError: (err: any) => {
                console.log("errror logging in ", err.data)
                setError({ name: "main", message: concatErrors(err) })
            }
        })

    const handleSubmit = async (data: FormData) => {
        await updateShopMutation.mutate({ coll_name: 'user', payload: data })
    };

    return (
        <div className='w-full h-full border p-2 flex flex-col items-center justify-start
         bg-slate-900'>
            <TheForm
                form_title='Login'
                fields={form_input}
                validate={validate}
                submitFn={handleSubmit}
                is_submitting={updateShopMutation.isLoading}
                error={error}
                editing={editing}
                
            />

        </div>
    );
}

