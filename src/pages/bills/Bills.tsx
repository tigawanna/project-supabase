import { useQuery, useQueryClient, useMutation, UseMutationResult } from '@tanstack/react-query';
import React from 'react'
import { FaPrint, FaRegEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useMeasure from 'react-use-measure';
import { TheIcon } from '../../shared/extra/TheIcon';
import { TheTable } from '../../shared/table';
import { get_bills_rpc } from '../../supa/operations';
import { User } from '../../supa/user-types';
import { updateTable } from './../../supa/mutations';
import { concatErrors } from './../../shared/utils/utils';
import { ReactModalWrapper } from '../../shared/extra/ReactModalWrapper';
import { LoaderElipse } from './../../shared/loaders/Loaders';


interface BillsProps {
    user?: User | null
}
interface BillsT{
    tenant_id: string
    shop_id: string
    current_bill_id: string
    prev_bill_id: string
    shop_number: string
    shop_name: string
    list_order: number
    prev_elec: number
    curr_elec: number
    elec_diff: number
    prev_water: number
    curr_water: number
    water_diff: number
    current_month: number
    previous_month: number
    current_year: number
    previous_year: number
    id: string
}

interface RequiredBillFields{
    shop:string;
    elec_readings:number;
    water_readings:number;
    month:number;
    year:number
}
interface UpdateMutationProps {
    payload: BillsT;
    prev: BillsT;
}

export const Bills: React.FC<BillsProps> = ({user}) => {

    // const onAmountChanged = React.useMemo(() => debounce(changeAmount, 500), [changeAmount]);

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const date = new Date()
    const [period, setPeriod] = React.useState({month:date.getMonth()+1,year:date.getFullYear()})
    const [input, setInput] = React.useState<BillsT>({
        id: "",
        curr_elec:0,
        curr_water:0,
        current_bill_id:"",
        current_month:date.getMonth()+2,
        current_year:date.getFullYear(),
        previous_month: date.getMonth() - 1,
        previous_year: date.getFullYear(),
        elec_diff:0,
        list_order:0,
        prev_bill_id:"",
        prev_elec:0,
        prev_water:0,
        shop_id:"",
        shop_name:"",
        shop_number:'',
        tenant_id:"",
        water_diff:0
    });

    const [openModal, setOpenModal] = React.useState(false)

    const [update, setUpdate] = React.useState(true);
    const [error, setError] = React.useState({ name: "", error: "" });
    const [mainH, setMainH] = React.useState(window?.innerHeight ?? 0);
  
    const [ref, top] = useMeasure();

    const header = [
        { name: "SHOP ID", prop: "shop_id", type: "id", editable: false },
        { name: "SHOP NAME", prop: "shop_name", type: "text", editable: false },
        { name: "PREV WTR", prop: "prev_water", type: "number", editable: true },
        { name: "CURR WTR", prop: "curr_water", type: "number", editable: true },
        { name: "PREV EL", prop: "prev_elec", type: "number", editable: true },
        { name: "CURR EL", prop: "curr_elec", type: "number", editable: true },

    ]



    const updateBillMutation = useMutation(async ({payload,prev}:UpdateMutationProps) => {

        try {
        if (prev.prev_elec !== payload.prev_elec || prev.prev_water !== payload.prev_water){
            const item: RequiredBillFields = {
                shop: payload.shop_id,
                elec_readings: payload.prev_elec,
                water_readings: payload.prev_water,
                month: payload.previous_month,
                year: payload.previous_year
            };
        return await updateTable({ new_values: item, row_id: payload.prev_bill_id, table: "bills" })
        } 
        if (prev.curr_elec !== payload.curr_elec || prev.curr_water !== payload.curr_water) {
                const item: RequiredBillFields = {
                    shop: payload.shop_id,
                    elec_readings: payload.curr_elec,
                    water_readings: payload.curr_water,
                    month: payload.current_month,
                    year: payload.current_year
         };
            return await updateTable({ new_values: item, row_id: payload.current_bill_id, table: "bills" })
        }    
   
        }
        catch (e) {
            throw e
        }
    },
        {
            onSettled: () => {
                //   queryClient.invalidateQueries(['shops-bills',shop_id as string]);
                setOpenModal(false)
            },
            onError: (err: any) => {
                console.log("errror logging in ", err.data)
                setError({ name: "main", error: concatErrors(err) })
            }

    
        })

    
    const topHeight = (top.height / mainH) * 100;
    const bottomHeight = 100 - (topHeight );

    const validate = (prev: BillsT, current: BillsT) => {
        // if (current.payment < 1000) {
        //     setError({ name: "payment", error: "payment seems too low, 1k minimun" });
        //     return false;
        // }

        setError({ name: "", error: "" });
        return true;
    };

    const saveChanges = (prev:BillsT, current:BillsT) => {
        console.log("saving ... current ", current);
        console.log("saving ... previous ", prev);
        setOpenModal(true)
        updateBillMutation.mutate({payload:current,prev})
  };

    const deleteRow = (current: any) => {
        // console.log("delteing current ,",current)
        // deletePayment(current, shop.shopfloor, shop.shopnumber, queryClient);
    };

   const clearError = () => {
    setError({ name: "", error: "" });
    };

    const prevPeriod = (period: {
        month: number;
        year: number;
    })=>{
      if(period.month === 1){
       return {month:12, year:period.year - 1}
      }
      return {month:period.month -1 ,year:period.year}
     }

    const query = useQuery(['billsfromrpc', 12, 10], () => get_bills_rpc(period.month,
    prevPeriod(period).month,period.year,prevPeriod(period).year))
    const bills = query.data
    // console.log("bills ==>>",bills)    
    // console.log("updte mutation  === ", updateBillMutation)
  return (
      <div className='w-full h-full flex flex-col items-center overflow-y-scroll'>
      <ReactModalWrapper
      child={<BillsSaving updateBillMutation={updateBillMutation}/>}
      isOpen={openModal}
      closeModal={()=>setOpenModal(false)}
      closeAfterDelay={3000}
      styles={{
       parent_top:"80%",
       parent_bottom:"10%",
       parent_left:"5%",
       parent_right:"60%",
       content_right:'0',
       content_left:'0',
       content_top:'0',
       content_bottom:'0'
      }}
      />     

        <div className="w-full p-4">
              <div
                  className=" w-fit p-2  bg-slate-900 text-white flex gap-2 
               left-[45%] right-[45%] rounded-xl sticky top-0 z-40">
                  <TheIcon Icon={FaPrint} 
                  size='20'
                  iconAction={() => {
                      navigate("/print-preview", {
                          state: {
                              rows: bills,
                              header,
                              title: `payments for ${bills&&bills[0]?.current_month}`
                          },
                      })
                  }} />
                  <TheIcon Icon={FaRegEdit} size='20' 
                  iconAction={() => setUpdate(prev => !prev)} />
              </div>
     
            <TheTable

                rows={bills}
                header={header}
                loading={query.isLoading}
                top={20}
                error={error}
                // sort={false}
                update={update}
                validate={validate}
                saveChanges={saveChanges}
                // deleteRow={deleteRow}
                clearError={clearError}
            />
      
            <div className="p-2 mb-2 min-w-20"></div>
        </div>
 </div>
)
}




interface BillsSavingProps {
updateBillMutation: UseMutationResult<any[] | undefined, any, UpdateMutationProps, unknown>
}
export interface ResponseData {
    id: string
    created_at: string
    shop: string
    elec_readings: number
    water_readings: number
    month: number
    year: number
}
export const BillsSaving: React.FC<BillsSavingProps> = ({updateBillMutation}) => {
// console.log("updte mutation  === ",updateBillMutation)
const data = updateBillMutation.data && updateBillMutation.data[0] as ResponseData
return (
 <div className='w-full h-full '>
    {updateBillMutation.isLoading ? <LoaderElipse/>:null}
    {data?
            (<div className='bg-green-600 w-full h-full text-xl font-bold  p-2
        flex items-center justify-center rounded-xl'>success</div>
        )
    :null}
{updateBillMutation.isError?(
<div className='bg-red-700 text-white border h-full w-full p-2
 flex items-center justify-center rounded-xl
'>
   {updateBillMutation.error.message}
</div>
):null}

</div>
);
}
