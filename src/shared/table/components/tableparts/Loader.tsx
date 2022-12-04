import React from 'react'

interface LoaderProps {

}

export const Loader: React.FC<LoaderProps> = ({}) => {
return (
 <div className='w-full h-full border flex justify-center items-center '>
<div className="lds-ellipsis">
    <div></div>
     <div></div>
    <div></div>
    </div>
 </div>
);
}
