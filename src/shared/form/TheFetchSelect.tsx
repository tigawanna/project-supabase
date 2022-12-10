import React from 'react'
import { FormOptions, SetInput } from './types';



interface FetchSelectProps {
setInput: (props: SetInput) => void
form_options: FormOptions
}

export const TheFetchSelect: React.FC<FetchSelectProps> = ({setInput,form_options}) => {

  // head = collection.name
  // const args = head.prop.split('.')
  const [keyword, setKeyword] = React.useState({ word:"" })
  React.useEffect(()=>{
    setInput({
      item_key: form_options.fetch_select_options?.form_field as string,
      item:form_options.fetch_select_options?.default_value_to_save as string,
    })
  },[])
//  console.log("args ,keyword.word",args,keyword.word)

  let query
 if (form_options?.queryFn) {
   query = form_options?.queryFn(keyword.word)
  }

const handleChange = (e:any) => {
  const { value } = e.target;
  setKeyword({ ...keyword, [e.target.id]: value});
};

const finishSearch=(item:any)=>{
  setKeyword({word: item[form_options?.fetch_select_options?.keyword_field as string]})
  setInput({
    item_key: form_options.fetch_select_options?.form_field as string,
    item: item[form_options?.fetch_select_options?.field_to_save as string], 
    })
}



if (query?.error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[80%] h-full flex justify-center items-center  text-red-600 text-sm">
          {/* @ts-expect-error */}
          {query.error.message}
        </div>
   
      </div>);
  }

const data = query?.data
// console.log("data in fetch sellect === ",data)
return (
 <div className='w-full min-h-[150px] h-full cursor-pointer flex flex-col items-center justify-start '>
    <label className="font-bold  text-md  w-[90%] flex items-start">
      {form_options.required && form_options.editing ? <div className='text-red-300 mr-1'>*</div>:null}
      {form_options.fetch_select_options?.form_field}
    </label>
    <input
      className='w-[90%] p-2 m-1 dark:text-white   border border-black 
      dark:border-white h-10 text-base rounded-sm   dark:bg-slate-700'
    id="word"
    autoComplete='off'
    value={keyword.word}
    onChange={handleChange}
    placeholder={"search for "+form_options.field_name}

    />
  {data?.length < 1 ?
  <div className="w-[70%] h-full cursor-pointer flex flex-col items-center justify-center
    text-sm text-red-400 break-inside-auto 
    ">0 results found </div>:null
  }
    <div  className='w-[90%]  rounded-lg flex flex-wrap items-center justify-center overflow-scroll scroll-bar'>
      {data?.map((item: any, idx:number) => {
        // console.log("item === ",item)
         return (
          <div key={item[form_options?.fetch_select_options?.keyword_field as string] + idx}
            onClick={() => finishSearch(item)}
            className="m-1 py-1 px-2 text-[12px] border-2 text-center max-w-[30%] truncate rounded-lg 
             hover:bg-slate-400 dark:hover:bg-slate-600
         
            ">
            {/* {item[form_options?.filter_key as string]['common']} */}
            <div className='w-full text-bold '>
            { item[form_options?.fetch_select_options?.keyword_field as string]}
             </div>
             <div className='w-full text-[10px]'>
               {item[form_options?.fetch_select_options?.field_to_save as string]}
             </div>
          </div>
        )
      })}
    </div>
 </div>
);
}




