import React from 'react'

interface LoadingProps {

}

export const Loading: React.FC<LoadingProps> = ({}) => {

return (
  <div className='flex justify-center items-center '>
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
}
