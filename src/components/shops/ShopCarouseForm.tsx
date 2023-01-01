
import React from 'react'

import { useQuery } from '@tanstack/react-query';
import { getMostPreviousBill } from '../../supa/operations';
import { useForm } from "react-hook-form";
import { RequiredBillFields, ShopsType } from './../../supa/query-types';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { Loading } from './../../shared/extra/Loading';
import { QueryStateWrapper } from '../../shared/extra/QueryStateWrapper';


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
 
    const form_stuff = useForm<RequiredBillFields>();
    const onSubmit = (data: RequiredBillFields, event?: React.BaseSyntheticEvent<object, any, any>) => {
        console.log(data)
    };
    

   const data = query?.data
    const [vals, setVals] = React.useState(data && data[0])

    React.useEffect(() => {
        if(data){
            // console.log("updating valus === ",data[0])
            form_stuff.reset()
            setVals(data[0])

        }
      },[shop,data])

//    console.log("data === ",data)
    return (
 <div className='w-full h-full flex flex-col items-center  overflow-y-scroll'>

<div className='w-full flex items-center '>
    <div className='w-full flex flex-col justify-center p-2'>
        <div className='text-2xl font-bold w-full'>{shop?.shop_number}</div>
        <div className='text-xl font-bold w-full'>{shop?.tenants.tenant_name}</div>
        <div className='font bold text-xl'>{shop?.order}</div>
   </div>
    <div className='w-full flex flex-col justify-center p-2'>
     {
        data&&data.map((bill,idx)=>{
            return(
                <div key={bill.id} 
                className='w-full m-[2px] flex justify-center bg-slate-800  rounded-xl'>
               
                <div className='w-full'>month:  {bill.month}</div>
                <div className='w-full'>year:  {bill.year}</div>
                <div className='w-full '>elec: {bill.elec_readings}</div>
                <div className='w-full'>water:  {bill.water_readings}</div>
               
                </div>
            )
        })
     }
    </div>
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
    styles={{width:'80%'}} 
    label='shop' form_stuff={form_stuff} defaultValue={vals?.shop} readOnly />
    <div className='w-full flex  flex-wrap items-center justify-center'>
    <FormInput label='year' form_stuff={form_stuff} defaultValue={vals?.year} valueAsNumber/>
    <FormInput label='month' form_stuff={form_stuff} defaultValue={vals?.month} valueAsNumber/>
    <FormInput label='elec_readings' form_stuff={form_stuff} defaultValue={vals?.elec_readings} valueAsNumber/>
    <FormInput label='water_readings' form_stuff={form_stuff} defaultValue={vals?.water_readings} valueAsNumber/>
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

    const isError = (err: typeof errors) => {
        if (err[label]) {
            return true
        }
        return false
    }
    return (
      <div 
      style={styles}
      className="flex flex-col items-center justify-center  ">
        <label className="font-bold  text-md capitalize  w-[90%] flex items-start">
          {label}
        </label>
        <input
          style={{borderColor: isError(errors)? "red": ""}}
          className="w-[90%] p-1 border border-black 
      dark:border-white h-10 text-base rounded-sm   dark:bg-slate-700
        focus:border-2 dark:focus:border-4 focus:border-purple-700 dark:focus:border-purple-600 "
          defaultValue={defaultValue}
            readOnly={readOnly}
                {...register(label, { valueAsNumber})}
        />
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
