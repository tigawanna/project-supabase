import React from 'react'
import { Loading } from './Loading';

interface QueryStateProps {
isLoading:boolean;
isError:boolean;
error:any;
data?:any[];
children: React.ReactNode;
loader?: React.ReactNode;
}

export const QueryStateWrapper: React.FC<QueryStateProps> = (
    {isLoading,isError,error,data,children,loader}) => {
    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center ">
                <div className="w-[100%] h-full flex items-center justify-center  ">
                   {loader?loader:<Loading/>}
                </div>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="w-full h-screen flex items-center justify-center  ">
                <div className="max-w-[90%] w-fit h-fit p-2 flex items-center justify-center 
                 text-red-700 bg-red-100 border border-red-900  text-base rounded-lg">
                   {error?.message}
                </div>
            </div>
        );
    }
    if(data&&data?.length<1){
        <div className="w-full h-screen flex items-center justify-center ">
            <div className="max-w-[90%] w-fit h-fit p-2 flex items-center justify-center 
                 text-red-700 bg-red-100 border border-red-900  text-base rounded-lg">
                Something went wrong , no records to show
            </div>
        </div>
    }
return (
<>{children}</>
);
}
