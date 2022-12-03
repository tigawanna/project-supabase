import React from 'react'

interface LoadingProps {
size:number
}

export const Loading: React.FC<LoadingProps> = ({size}) => {

return (
  <div className="flex justify-center items-center h-full">
    <div
      style={{ width:`${size}px`, height:`${size}px` }}
      className="animate-spin">
      <div
      className="border-4 border-t-slate-800 dark:border-t-slate-400 
      border-r-slate-700 dark:border-r-slate-500 
      border-b-slate-600 dark:border-b-slate-600 
      rounded-[50%] w-full h-full">
      </div>
    </div>
  </div>
);
}
