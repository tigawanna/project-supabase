import React from 'react'
import { FormOptions } from './types';


interface TheTextAreaProps {
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement> | undefined ;
  form_options:FormOptions
  input: { name: string };
  error: {
    name: string;
    message: string;
  };
 }

export const TheTextarea: React.FC<TheTextAreaProps> = ({
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

return (
  <div className="flex flex-col items-center justify-center w-full ">
    <label className="font-bold  text-md capitalize  w-[90%] flex items-start">
      {item.required && item.editing ? <div className='text-red-300 mr-1'>*</div> : null}
      {item.field_name}
    </label>
    {item.editing ?
    <textarea
      style={{ borderColor: isError() ? "red" : "" }}
      className="w-[90%] p-2 m-1 border border-black h-28
      dark:border-white text-base rounded-md   dark:bg-slate-700 
  focus:border-2 dark:focus:border-4 focus:border-purple-700 dark:focus:border-purple-600 
      "
      id={item.field_name}
      placeholder={"enter " + item.field_name}
      onChange={handleChange}
      autoComplete={"off"}
      // @ts-expect-error
      value={input[item.field_name]}

    />:
    <div
      className="w-[90%] p-2 m-1 min-h-10 text-base border-b rounded-sm   
        focus:border-2 dark:focus:border-4 focus:border-purple-700 dark:focus:border-purple-600 
      ">
      {/*@ts-expect-error */}
      {input[item.field_name]}</div>
      }
    {isError() ? (
      <div className="text-base  text-red-600">{error.message}</div>
    ) : null}
  </div>
);
}
