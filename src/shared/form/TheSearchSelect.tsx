import React from 'react'
import { UseQueryResult } from '@tanstack/react-query';
import { FormOptions, QueryFnProps, SetInput } from './types';



type FilterFnProps = { list: any[],field_key:string}
interface SearchSelectProps {
setInput: (props: SetInput) => void
form_options: FormOptions
}

export const TheSearchSelect: React.FC<SearchSelectProps> = ({setInput,form_options}) => {
const [keyword, setKeyword] = React.useState({ word:"" })

const handleChange = (e:any) => {
  const { value } = e.target;
  setKeyword({ ...keyword, [e.target.id]: value});
};

const finishSearch=(item:any)=>{
  setKeyword({ word: item[form_options?.filter_key as string] })
  setInput({ item: item[form_options?.filter_key as string], item_key:form_options.field_name})
}

const filterArray =({list,field_key}:FilterFnProps)=>{
  return list.filter((item:any)=>{
    return item[field_key].toLowerCase().includes(keyword.word.toLowerCase())}
 )
}
  const data = filterArray({ field_key: form_options?.filter_key as string, 
    list: form_options?.filter_list as any[]})

return (
 <div className='w-full h-full cursor-pointer flex flex-col items-center justify-center'>
    <label className="font-bold text-white text-md  w-[90%] flex items-start">
      {form_options.required && form_options.editing ? <div className='text-red-300 mr-1'>*</div>:null}
      {form_options?.filter_key as string}
    </label>
    <input
      className='w-[90%] p-2 m-1 border border-black 
      dark:border-white h-10 text-base rounded-sm   dark:bg-slate-700
        focus:border-2 dark:focus:border-4 focus:border-purple-700 dark:focus:border-purple-600 '
    id="word"
    autoComplete='off'
    value={keyword.word}
    onChange={handleChange}

    />
  {data?.length < 1 ?
  <div className="w-[70%] h-full cursor-pointer flex flex-col items-center justify-center
    text-sm text-red-400 break-inside-auto
    ">0 results found </div>:null
  }
    <div className='w-[90%]  rounded-lg flex flex-wrap items-center justify-center'>
    {data?.slice(0,10).map((item:any,idx)=>{
    return (
      <div key={item[form_options?.filter_key as string] + idx} 
         onClick={()=>finishSearch(item)}
        className="m-1 py-1 px-2 border-2 text-center min-w-fit rounded-lg hover:bg-slate-400">
        {item[form_options?.filter_key as string]} 
        </div>
      )
    })}
    </div>
 </div>
);
}



