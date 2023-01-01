
import React, { ChangeEvent } from 'react'

import { useQuery } from '@tanstack/react-query';
import { getMostPreviousBill } from '../../supa/operations';
import { useForm } from "react-hook-form";
import { RequiredBillFields, ShopsType } from './../../supa/query-types';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { Loading } from './../../shared/extra/Loading';
import { QueryStateWrapper } from '../../shared/extra/QueryStateWrapper';
import { computePeriod } from '../bills/utils';
import { ModeType } from '../../pages/bills/Bills';
import { computeShopCarouselPeriod } from './../bills/utils';
import Select  from 'react-select';


interface ShopsCarouselFormProps {
    shop: ShopsType | null | undefined
}

interface BillsResponse {
    id: string
    created_at: string
    shop: string
    elec_readings: number
    water_readings: number
    month: number
    year: number
}




export const ShopsCarouselForm: React.FC<ShopsCarouselFormProps> = ({ shop }) => {
    const query = useQuery < BillsResponse[], unknown, BillsResponse[], (string | ShopsType | null | undefined)[]>(
    ['latest-bill', shop], () => getMostPreviousBill(shop?.id as string))
    const date = new Date();
    const [mode, setMode] = React.useState<ModeType>("new");

    const form_stuff = useForm<RequiredBillFields>();

    const [period, setPeriod] = React.useState(() => computePeriod(date, mode));
    React.useEffect(() => { setPeriod(computeShopCarouselPeriod(date, mode))}, [mode]);

    const onSubmit = (data: RequiredBillFields, event?: React.BaseSyntheticEvent<object, any, any>) => {
        console.log("handle submit data === ",data)
    };
    
    const data = query?.data

    const [vals, setVals] = React.useState(data && data[0])
      React.useEffect(() => {
        if(data){
            form_stuff.reset()
            setVals(data[0])
            setMode('new')
        }
      },[shop,data])
      
    // console.log("data === ", data && data[0])
    return (
 <div className='w-full h-full flex flex-col items-center  overflow-y-scroll'>

<div className='w-full flex md:flex-row flex-col items-center '>
    <div className='w-full flex md:flex-col justify-center p-2'>
        <div className=' md:text-2xl font-bold w-[30%]'>{shop?.shop_number}</div>
        <div className='text-[10px] md:text-xl md:font-bold truncate w-[60%] '>{shop?.tenants.tenant_name}</div>
        <div className='font bold text-xl w-[20%] '>{shop?.order}</div>
   </div>

    <div className='w-full flex flex-col justify-center p-2'>
     {
        data&&data.map((bill,idx)=>{
            return(
                <div key={bill.id} 
                className='w-full m-1 px-1 p-[1px] md:py-1 md:px-2 text-[9px] 
                md:text-[14px] gap-[1px]
                flex justify-center bg-slate-800  rounded-xl'>
                <div className='w-full'>mo:{bill.month}</div>
                <div className='w-full'>yr:{bill.year}</div>
                <div className='w-full '>elec:{bill.elec_readings}</div>
                <div>{ }</div>
                <div className='w-full'>wtr:{bill.water_readings}</div>
               </div>
            )
        })
     }
    </div>
</div>
<div className='w-full  '>
{data&&data[0].month === period.curr_month?<ShopModeSelect setMode={setMode}/>:
null}
</div>
   <QueryStateWrapper
   data={query.data}
   isLoading={query.isLoading}
   isError={query.isError}
   error={query.error}
   >
    {vals &&<form 
     className='w-full h-full flex  flex-col items-center justify-center gap-2'
    onSubmit={form_stuff.handleSubmit(onSubmit)}>
    <FormInput
    styles={{width:'80%',padding:0,margin:0,display:'none'}} 
    label='shop' form_stuff={form_stuff} defaultValue={vals?.shop} readOnly />
    <FormInput
    styles={{ width: '80%', padding: 0, margin: 0, display: 'none' }}
    label='id' form_stuff={form_stuff} defaultValue={vals?.id} readOnly />
    <div className='w-full flex  flex-wrap items-center justify-center'>
    <FormInput label='year' form_stuff={form_stuff} defaultValue={period.curr_year} valueAsNumber/>
    <FormInput label='month' form_stuff={form_stuff} defaultValue={period.curr_month} valueAsNumber/>
    
    <FormInput label='elec_readings' form_stuff={form_stuff} 
    defaultValue={vals?.elec_readings??0} valueAsNumber/>
  
    <FormInput label='water_readings' form_stuff={form_stuff} 
    defaultValue={vals?.water_readings??0} valueAsNumber/>
   </div>

     <FormButton form_stuff={form_stuff}/>
    </form>
    }
    </QueryStateWrapper>
        </div>
    );
}




interface FormInputProps {
    form_stuff: UseFormReturn<RequiredBillFields, any>
    label: keyof RequiredBillFields
    valueAsNumber?:boolean
    defaultValue: RequiredBillFields[keyof RequiredBillFields]
    readOnly?:boolean
    styles?:React.CSSProperties
}


export const FormInput: React.FC<FormInputProps> = (
    { form_stuff, label, defaultValue,readOnly=false,valueAsNumber,styles }) => {
    const { register, formState: { errors } } = form_stuff
    const [diff,setDiff] = React.useState(defaultValue)
    const isError = (err: typeof errors) => {
        if (err[label]) {
            return true
        }
        return false
    }
   const customHandleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setDiff(e.target.value )
    }
    const calcDiff=()=>{
        if(isNaN(parseInt(diff as string) - parseInt(defaultValue as string))){
            return 0
        }
     return (parseInt(diff as string) - parseInt(defaultValue as string))
    }
    return (
      <div 
      style={styles}
      className="flex flex-col items-center justify-center  ">
        <label className="font-bold  text-md capitalize  w-[90%] flex items-start">
          {label}
        </label>
        <input
          style={{borderColor: isError(errors)? "red": "",...styles}}
          className="w-[90%] p-1 border border-black 
      dark:border-white h-10 text-base rounded-sm   dark:bg-slate-700
        focus:border-2 dark:focus:border-4 focus:border-purple-700 dark:focus:border-purple-600 "
          defaultValue={defaultValue}
            readOnly={readOnly}
                {...register(label, { valueAsNumber})}
                onChange={customHandleChange}
        />
        {(label ==="elec_readings" || label==="water_readings")? 
        <div className='
        w-[80%] bg-slate-800 rounded-lg flex items-center jusify-center m-1'>diff: { calcDiff() }</div>
        :null}
        {isError(errors) ? (
          <div className="text-base  text-red-600">
            {errors[label]?.message}
          </div>
        ) : null}
      </div>
    );
}


interface FormButtonProps {
  form_stuff: UseFormReturn<RequiredBillFields,any>;
}

export const FormButton: React.FC<FormButtonProps> = ({ form_stuff }) => {
  return (
    <button
    type={'submit'}
      className="p-2 w-[70%] md:w-[30%]
            border-2 dark:border border-slate-700 dark:border-slate-400 dark:bg-slate-800
            flex items-center justify-center m-2 rounded-lg 
            hover:shadow-slate-900 dark:hover:shadow-slate-50 
            hover:shadow-lg dark:hover:shadow
            hover:scale-105"
    >
      {form_stuff.formState.isSubmitting ? (
        <div className="h-full w-[60%] flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="text-lg font-bold dark:font-normal ">
          submit
        </div>
      )}
    </button>
  );
};

interface ShopModeSelectProps {
setMode:React.Dispatch<React.SetStateAction<ModeType>>
}

export const ShopModeSelect: React.FC<ShopModeSelectProps> = ({setMode}) => {
const options = [
{ value: "update", label: "Edit the readings" },
{ value: "new", label: "Add for next month", },
];
return (
  <div
className="w-full h-full flex flex-col justify-center items-center
 rounded-xl"
  >
        <div className=" w-full flex flex-col justify-center items-center">
            <div className=" w-[90%] p-2
            bg-red-100 border-2 border-red-800 text-red-900  rounded-xl">
                This month's readngs for this shop already exist,
                 do you want to 
            </div>

      <div className="p-2 rounded-full w-[90%]">
        <Select
          options={options}
          defaultValue={options[0]}
          // @ts-expect-error
          onChange={(e) =>setMode(e?.value ?? "new")}
        />
      </div>
    </div>
  </div>
);
}
