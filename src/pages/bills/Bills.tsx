import { useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { FaPlus, FaRegCreditCard, FaTimes, FaPrint, FaRegEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useMeasure from 'react-use-measure';
import { TheTable } from '../../shared/table';
import { TheIcon } from '../../shared/TheIcon';
import { User } from '../../supa/types';
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

    const header = [
        { name: "ID", prop: "id", type: "text", editable: true },
        { name: "Name", prop: "name", type: "text", editable: true },
        { name: "Email", prop: "email", type: "text", editable: true },
        { name: "Gender", prop: "gender", type: "text", editable: true },
        { name: "Date", prop: "date", type: "date", editable: true },
        { name: "Amount", prop: "amount", type: "number", editable: true },
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
   const bills =mockdata

  return (
  <div className='w-full h-full flex flex-col items-center'>
          

        <div
            style={{
                top: `${top.height + 50}px`,
                height: `${bottomHeight}%`,
                bottom: "0px",
            }}
            className="absolute  w-[95%]  overflow-scroll left-[2%] right-[2%]
             scrollbar-thin scrollbar-thumb-purple-400 px-2 "
        >
              <div
               className=" w-fit p-2 bg-slate-900 text-white flex gap-2 left-[45%] right-[45%] rounded-xl sticky top-0 z-40">
                  <TheIcon Icon={FaPrint} 
                  size='20'
                  iconAction={() => {
                      navigate("/print-preview", {
                          state: {
                              rows: bills,
                              header,
                              title: `payments for ${bills[0]?.month}`
                          },
                      })
                  }} />
                  <TheIcon Icon={FaRegEdit} size='20' iconAction={() => setUpdate(prev => !prev)} />
              </div>
            <TheTable

                rows={mockdata}
                header={header}
                error={error}
                sort={false}
                update={update}
                validate={validate}
                saveChanges={saveChanges}
                deleteRow={deleteRow}
                clearError={clearError}
            />
            <div className="p-2 mb-2 min-w-20"></div>
        </div>
 </div>
);
}

