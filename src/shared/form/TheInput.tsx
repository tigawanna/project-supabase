import React from 'react'
import { FormOptions, InputTypes } from './types';



interface TheInputProps {
  handleChange(event: React.ChangeEvent<HTMLInputElement>): Promise<void>;
  form_options:FormOptions
  input: { name: string };
  error: {
    name: string;
    message: string;
  };
 }

export const TheInput: React.FC<TheInputProps> = ({
    handleChange,
    error,
    input,
    form_options: item
}) => {


const isError = () => {
  if (error.message != "" && error.name === item.field_name) {
    return true;
  }
  return false;
};

  const value = input[item.field_name as keyof typeof input]

return (
  <div className="flex flex-col items-center justify-center w-full ">
    <label className="font-bold  text-md capitalize  w-[90%] flex items-start">
      {item.required && item.editing ?<div className='text-red-300 mr-1'>*</div>:null}
      {item.field_name}
    </label>
  {item.editing?
      <input
      style={{ borderColor: isError() ? "red" : "" }}
      className="w-[90%] p-2 m-1 border border-black 
      dark:border-white h-10 text-base rounded-sm   dark:bg-slate-700
        focus:border-2 dark:focus:border-4 focus:border-purple-700 dark:focus:border-purple-600 
      "
      id={item.field_name}
      type={item.field_type}
      placeholder={item.placeholder??"enter " + item.field_name}
      onChange={handleChange}
      autoComplete={"off"}
      value={value}
   
    />
    :<TheInputAlt label={value} type={item.field_type}/>
      }
    {isError() ? (
      <div className="text-base  text-red-600">{error.message}</div>
    ) : null}
  </div>
);
}




interface TheInputAltProps {
 label:string
 type:InputTypes
}

export const TheInputAlt: React.FC<TheInputAltProps> = ({label,type}) => {
return (
  <div
    className="w-[90%]  p-2 m-1 min-h-10 text-base border-b rounded-sm   
    focus:border-2 dark:focus:border-4 focus:border-purple-700 dark:focus:border-purple-600">
    {
    type ==="url"?<a
    target="_blank"
    className='text-blue-600 truncate ' 
    href={label}>{label}</a>
    :<div>{label}</div>
    }
  

 </div>
);
}
