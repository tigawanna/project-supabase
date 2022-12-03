import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { FormOptions,SetInput, Country } from './types';



interface CountrySelectProps {
setInput: (props: SetInput) => void
form_options: FormOptions
}

export const TheCountrySelect: React.FC<CountrySelectProps> = ({setInput,form_options}) => {

  const [keyword, setKeyword] = React.useState({ word:form_options.default_value as string??"" })
 const getCountries = async () => {
    return fetch('https://restcountries.com/v3.1/all').then((response) => response.json())
  }
  const query =useQuery(['countries',keyword.word],
    getCountries,
    {
      select: (data: Country[]) => {
        if (keyword.word !== "" && keyword.word.length > 1) {
          return data.filter((item) => item.name.common.toLowerCase().includes(keyword.word.toLowerCase()))
        }
        // console.log("data", data)
        return data
      },
      enabled: keyword.word.length > 1

    })

const handleChange = (e:any) => {
  const { value } = e.target;
  setKeyword({ ...keyword, [e.target.id]: value});

};

const finishSearch=(item:Country)=>{
  if(form_options.editing){
    setKeyword({ word: item.name.common })
    setInput({ item_key: "country", item: item.name.common })
    setInput({ item_key: "phone", item: item.idd.root + item.idd.suffixes[0] })
  }
}

// console.log(" form_options ",form_options)

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

return (
 <div className='w-full min-h-[150px] h-full cursor-pointer flex flex-col items-center justify-start '>
    <label className="font-bold  text-md capitalize  w-[90%] flex items-start">
      {form_options.required && form_options.editing ? <div className='text-red-300 mr-1'>*</div>:null}
      {form_options.field_name}
    </label>
    {form_options.editing?
      <input
      className='w-[90%] p-2 m-1 text-white   border border-black 
      dark:border-white h-10 text-base rounded-sm   dark:bg-slate-700'
      id="word"
      autoComplete='off'
      value={keyword.word}
      onChange={handleChange}
      placeholder={"search for "+form_options.field_name}
      />:null
    }
  {data&&data?.length < 1 ?
  <div className="w-[70%] h-full cursor-pointer flex flex-col items-center justify-center
    text-sm text-red-400 break-inside-auto 
    ">0 results found </div>:null
  }
    <div className='w-[90%]  rounded-lg flex flex-wrap items-center justify-start '>
      {data?.slice(0, 10).map((item, idx:number) => {
         return (
            <div key={item.name.official + idx}
              onClick={() => finishSearch(item)}
              className="m-1 py-1 px-2 border-2 text-center min-w-fit rounded-lg hover:bg-slate-600
              ease-in duration-100 flex items-center justify-center
            ">
              <div> {item.name.common} </div>
              <img className='w-5 h-3 mx-1' src={item.flags.svg} />

            </div>
          )
        
     
      })}


    </div>
 </div>
);
}



