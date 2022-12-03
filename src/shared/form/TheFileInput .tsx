import React from 'react'
import { FormOptions } from './types';
import { TheIcon } from './../TheIcon';
import { AiOutlineCamera } from 'react-icons/ai'

interface TheFileInputProps {
  handleChange(event: React.ChangeEvent<HTMLInputElement>): Promise<void>;
  item:FormOptions
  input: { name: string };
  error: {
    name: string;
    message: string;
  };
}

export const TheFileInput: React.FC<TheFileInputProps> = ({
  handleChange,
  error,
  input,
  item
}) => {

  const fileInput = React.useRef<HTMLInputElement | null>(null);
  // const [pic, setPic] = React.useState<FileState>({ file: null, file_url: null })
  // const nameRef = React.useRef("")

  const enableFileInput = () => {
    fileInput.current?.click();
  }

  const isError = () => {
    if (error.message != "" && error.name === item.field_name) {
      return true;
    }
    return false;
  };
   // @ts-expect-error
  const img_url_or_file = input[item.field_name]
  const calcDims = (blob: any, border?:boolean)=>{
   if(border && blob ){
    return "0.3rem solid"
   }
  if (blob){

     return "8rem"
  }
    return '2rem'
  }
  return (
    <div 
     className="flex flex-col items-center justify-center w-full ">
      <label className="font-bold  text-md capitalize  w-[90%] flex items-start">
        {item.required && item.editing ? <div className='text-red-300 mr-1'>*</div> : null}
        {item.field_name}
      </label>
      <div
        onClick={() => enableFileInput()}
        style={{ borderColor: isError() ? "red" : "", 
          height: calcDims(img_url_or_file), width: calcDims(img_url_or_file), 
          border: calcDims(img_url_or_file,true) }}
        className='rounded-lg  flex-center hover:scale-105'>
        {
          /* @ts-expect-error */
          !input[item.field_name] ? <TheIcon Icon={AiOutlineCamera} color="black" size='50' /> :
            // <img src={pic.file_url as string} className="h-full w-full rounded-full" />
            <div className='w-full h-full'>
              {img_url_or_file.type?
                <img src={URL.createObjectURL(img_url_or_file)} className="h-full w-full rounded-lg" />:
                <img src={img_url_or_file} className="h-full w-full rounded-lg" />
          }
            </div>
  
        }

      </div>

      <input
   
        ref={fileInput}
        style={{ display: 'none' }}
        className="w-[90%] p-2 m-1 text-white   border border-black 
      dark:border-white h-10 text-base rounded-sm   dark:bg-slate-700"
        id={item.field_name}
        type={item.field_type}
        placeholder={"enter " + item.field_name}
        onChange={handleChange}
        autoComplete={"off"}
       
        // value={input[item.field_name]}
      />


      {isError() ? (
        <div className="text-base  text-red-600">{error.message}</div>
      ) : null}
    </div>
  );
}
