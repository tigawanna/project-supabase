import dayjs from 'dayjs';
import React from 'react'
import { ShopsType } from '../../supa/query-types';

interface DivListProps {
    list?:ShopsType[]|null
    header: {
        name: string;
        prop: string;
        type: string;
    }[]
}

export const DivList: React.FC<DivListProps> = ({header,list}) => {
return (
 <div className='w-full h-[80%] flex flex-col items-center overflow-scroll'>
{
    list&&list.map((item,index)=>{
        return(
            <DivListRows item={item} header={header} key={item.id + index}/>
        )
    })
}
 </div>
);
}
interface DivListRowsProps {
    item: ShopsType
    header: {
        name: string;
        prop: string;
        type: string;
    }[]
}
export const DivListRows: React.FC<DivListRowsProps> = ({item,header}) => {
    const mapToCurrent = (
        prop: string | number,
        type: string,
        item: any
    ): string | number => {

        //checking for firebase timestamp object to convert it to date string
        // if (type === "date" && (item[prop] as Tyme)?.seconds) {
        //     return tymeToDate(item[prop] as Tyme)
        // }

        //checking for javascript date object to convert it to date string

      
        if(type === 'sub-text'  && typeof prop === 'string' ){
        const args = prop.split('.')
           return item[args[0]][args[1]]
        }
        if (type === "date" && item[prop] instanceof Date) {
            return dayjs(item[prop]).format("DD/MM/YYYY")
        }
        if (type === "boolean" ) {
            return item[prop]?"yes":"no"
        }
        return item[prop];
    };
    return (
        <div className='w-full p-1 border rounded-md flex justify-center items-center flex-1'>
            {
            header&&header.map((head,index)=>{
                return(
                    <div 
                    key={head.prop + index}
                    className='w-full m-2 border-r'>
                    {mapToCurrent(head.prop,head.type,item)}

                    </div>
                )
            })
            }

        </div>
    );
}


