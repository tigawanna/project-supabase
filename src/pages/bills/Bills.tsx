import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { get_bills_rpc } from '../../supa/operations';
import { User } from '../../supa/user-types';
import { BillsTable } from '../../components/bills/BillsTable';
import { TheIcon } from '../../shared/extra/TheIcon';
import { FaPlus } from 'react-icons/fa';
import Select from 'react-select'

interface BillsProps {
    user?: User | null
}

export interface PeriodType{
    curr_month:number;
    prev_month:number;
    curr_year:number;
    prev_year:number
}
export type ModeType = "view" | "new" | "pre_add"

export const Bills: React.FC<BillsProps> = ({user}) => {
const date = new Date()
const [mode, setMode] = React.useState<ModeType>("view")

const computePeriod=(date:Date,mode:ModeType)=>{
const this_month=date.getMonth() + 1
const this_year = date.getFullYear()
    if(mode === "view"){
   
    if(this_month === 1){
        console.log("january view mode")
        return {
            curr_month: this_month,
            prev_month: 12,
            curr_year: this_year,
            prev_year: this_year - 1
        }
    }
    console.log("not january view  mode ")
    return {
        curr_month:this_month,
        prev_month:this_month-1,
        curr_year:this_year,
        prev_year:this_year
    }
    }
    

    if (mode === "new") {

        if (this_month === 1) {
            console.log("january new entry mode ")
            return {
                curr_month: 12,
                prev_month: 12,
                curr_year: this_year - 1,
                prev_year: this_year - 1
            }
        }
    console.log("new entry mode ")

     return {
            curr_month: this_month - 1,
            prev_month: this_month - 1,
            curr_year: this_year,
            prev_year: this_year
     }
    }

    if (mode === "pre_add") {
    console.log("pre add   mode ")
    return {
            curr_month: this_month,
            prev_month: this_month,
            curr_year: this_year,
            prev_year: this_year
    }
    }
    console.log("default   mode ")
    return {
        curr_month: this_month,
        prev_month: this_month - 1,
        curr_year: this_year,
        prev_year: this_year
    }
}



const [period, setPeriod] = React.useState(()=>computePeriod(date,mode))
React.useEffect(()=>{
setPeriod(computePeriod(date,mode))
},[mode])


// const prevPeriod = (period:PeriodType,table_mode:ModeType)=>{
//       if(period.month === 1){
//         if(table_mode === "new"){
//         return { month: period.month, year: period.year - 1 }
//         }
//         return {month:12, year:period.year - 1}
//        }
      
//       if(table_mode === "new"){
//           return { month: period.month - 1 , year: period.year }
//       }
    
//     if (table_mode === "pre_add") {
//         return { month: period.month, year: period.year }
//     }

//       return {month:period.month - 1 ,year:period.year}
// }
// const getNextPeriod = (period: PeriodType) => {
//            if(period.month === 12){
//                return { month:1, year: period.year + 1 }
//            } 
//         return { month: period.month + 1, year: period.year }
//     }
// const nextPeriod = (period: PeriodType)=>{
// //    if(period.month === 12){
// //        return { month:1, year: period.year + 1 }
// //    } 
//     return { month: period.curr_month, year: period.curr_year}
//  }
console.log("period === ",period)
const query = useQuery(['billsfromrpc', period,mode], () => {
    const { curr_month,prev_month,curr_year,prev_year}=period
    return get_bills_rpc(curr_month, prev_month, curr_year, prev_year)
        
})
    const options = [
        { value: 'view', label: 'View/Update' },
        { value: 'add', label: 'Add new' },
        { value: 'pre_add', label: 'Add for next month' }
    ]
    // console.log("bills ==>>",bills)    
    // console.log("updte mutation  === ", updateBillMutation)
  return (
<div className='w-full h-full flex flex-col items-center '>
    <div className='w-full flex items-center justify-center  '>
              <div className='flex items-center flex-center gap-1 bg-slate-800 '>
                  <div className='border p-1'>
                      <div className=''>current {period.curr_month} {period.curr_year} </div>
                  </div>
      
                  <div className='border p-1'>
                      <div className=''> prev {period.prev_month} {period.prev_year} </div>
                  </div>
             </div>
    </div>

    <div className='p-2 rounded-full fixed top-[8%] left-[5%] z-50 w-[15%]'>
      {/* <TheIcon 
        Icon={FaPlus} size={'30'}
        iconAction={()=>setMode('pre_add')}
        // iconAction={()=>setPeriod(prev=>nextPeriod(prev))}
    /> */}
    <Select options={options} defaultValue={options[0]}
    // @ts-expect-error
    onChange={(e)=>setMode(e?.value??"view")}/>
    </div>

    <BillsTable 
    query={query} 
    period={period} 
    setPeriod={setPeriod}
    mode={mode}
    setMode={setMode}
    />

 </div>
)
}










