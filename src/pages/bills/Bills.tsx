import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { FaPlus, FaRegCreditCard, FaTimes, FaPrint, FaRegEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useMeasure from 'react-use-measure';
import { TheTable } from '../../shared/table';
import { TheIcon } from '../../shared/TheIcon';
import { get_bills_rpc } from '../../supa/operations';
import { User } from '../../supa/user-types';
import { mockdata } from './../../shared/data';

interface BillsProps {
    user?: User | null
}
interface BillsT{
        id: number;
        name: string;
        email: string;
        gender: string;
        date: string;
        amount: number
}

export const Bills: React.FC<BillsProps> = ({user}) => {

    // const onAmountChanged = React.useMemo(() => debounce(changeAmount, 500), [changeAmount]);

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [input, setInput] = React.useState<BillsT>({
      amount:0,
      date:"",
      email:"",
      gender:"",
      id:0,
      name:""
    });

    const [update, setUpdate] = React.useState(true);
    const [error, setError] = React.useState({ name: "", error: "" });
    const [mainH, setMainH] = React.useState(window?.innerHeight ?? 0);
    const [ref, top] = useMeasure();
      interface BillFromRPC {
        tenant_id: string;
        shop_id: string;
        current_bill_id?: string;
        prev_bill_id?: string;
        shop_number: string;
        shop_name: string;
        list_order: number;
        prev_elec?: number;
        curr_elec?: number;
        elec_diff?: number;
        prev_water?: number;
        curr_water?: number;
        water_diff?: number;
        current_month?: number;
        previous_month?: number;
        current_year?: number;
        previous_year?: number;
    }


    const header = [
        { name: "SHOP ID", prop: "shop_id", type: "id", editable: false },
        { name: "SHOP NAME", prop: "shop_name", type: "text", editable: false },
        { name: "PREV WTR", prop: "prev_water", type: "number", editable: true },
        { name: "CURR WTR", prop: "curr_water", type: "number", editable: true },
        { name: "PREV EL", prop: "prev_elec", type: "number", editable: true },
        { name: "CURR EL", prop: "curr_elec", type: "number", editable: true },

    ]


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
        console.log("saving ...", current);
        const item:BillsT = {
            amount: current.amount,
            date: current.date,
            email: current.email,
            gender: current.gender,
            id: current.id,
            name: current.name
        };

    };

    const deleteRow = (current: any) => {
        // console.log("delteing current ,",current)
        // deletePayment(current, shop.shopfloor, shop.shopnumber, queryClient);
    };

   

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
  
    };

    const clearError = () => {
    setError({ name: "", error: "" });
    };

    const query = useQuery(['billsfromrpc', 12, 10], () => get_bills_rpc(12, 11, 2022, 2022))
    const bills = query.data
    console.log("bills ==>>",bills)    

  return (
      <div className='w-full h-full flex flex-col items-center overflow-y-scroll'>
          

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
                // error={error}
                // sort={false}
                update={update}
                // validate={validate}
                // saveChanges={saveChanges}
                // deleteRow={deleteRow}
                // clearError={clearError}
            />
      
            <div className="p-2 mb-2 min-w-20"></div>
        </div>
 </div>
)
}

