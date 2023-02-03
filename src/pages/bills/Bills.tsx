import React from "react";
import { useQuery } from "@tanstack/react-query";
import { get_bills_rpc } from "../../supa/operations";
import { User } from "../../supa/user-types";
import { BillsTable } from "../../components/bills/BillsTable";
import Select from "react-select";
import { calcPeriod, computePeriod } from "../../components/bills/utils";

interface BillsProps {
  user?: User | null;
}

export interface PeriodType {
  curr_month: number;
  prev_month: number;
  curr_year: number;
  prev_year: number;
}
export type ModeType = "view" | "new" | "pre_add" |"update";

export const Bills: React.FC<BillsProps> = ({user,}) => {
  const date = new Date();
  const [mode, setMode] = React.useState<ModeType>("view");
  const years = [
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022", },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024", },
    { value: "2025", label: "2025", },
  ];
  const months = [
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3", },
    { label: "April", value: "4" },
    { label: "May", value: "5", },
    { label: "June", value: "6", },
    { label: "July", value: "7", },
    { label: "August", value: "8", },
    { label: "September", value: "9", },
    { label: "October", value: "10", },
    { label: "November", value: "11", },
    { label: "December", value: "12", },
  ];
  const [year, setYear] = React.useState(date.getFullYear());
  const [month, setMonth] = React.useState(date.getMonth()+1);

 const [period, setPeriod] = React.useState(() =>
   calcPeriod({ month, year })
  );
  React.useEffect(() => {
    // setPeriod(computePeriod(date, mode));
    setPeriod(calcPeriod({month,year}));
  }, [month,year]);

// const hard_coded_period: typeof period = {
//   curr_month:1,
//     curr_year:2023,
//     prev_month:2,
//     prev_year:2023
// }
  const query = useQuery(["billsfromrpc", period, mode],
    () => {
      const { curr_month, prev_month, curr_year, prev_year } = period;
     return get_bills_rpc(
        curr_month,
        prev_month,
        curr_year,
        prev_year
      );
    }
  );
  
  const options = [
    { value: "view", label: "View/Update" },
    { value: "nw", label: "Add new" },
    {value: "pre_add",label: "Add for next month",},
  ];
  const defaultYear=(this_year:number)=>{
     return years.filter(yr=>yr.value === this_year.toString())
  }
  const defaultMonth = (this_month: number) => {
    return months.filter(yr => yr.value === this_month.toString())
  }

  console.log("period  === >>>> ",period)
  console.log("bills ==>>",query.data)
  // //console.log("updte mutation  === ", updateBillMutation)
  //console.log("year === ",year)
  return (
    <div className="w-full h-full flex flex-col items-center ">
      <div className="w-full flex items-center justify-center  ">
        <div className="flex items-center flex-center gap-1 bg-slate-800 ">
          <div className="border p-1">
            <div className="">
              current {period.curr_month}{" "}
              {period.curr_year}{" "}
            </div>
          </div>

          <div className="border p-1">
            <div className="">
              {" "}
              prev {period.prev_month}{" "}
              {period.prev_year}{" "}
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 rounded-full flex gap-2  w-full fixed top-[8%] left-[5%] z-50">
      
      <Select
          options={options}
          defaultValue={options[0]}
          // @ts-expect-error
          onChange={(e) =>setMode(e?.value ?? "view")
          }
        />
          <Select
          options={years}
          defaultValue={defaultYear(date.getFullYear())}
          onChange={(e) =>setYear(parseInt(e?.value as string))
          }
        />
        <Select
          options={months}
          defaultValue={defaultMonth(date.getMonth()+1)}
          onChange={(e) => setMonth(parseInt(e?.value as string))
          }
        />
      </div>

      <BillsTable
        query={query}
        period={period}
        setPeriod={setPeriod}
        mode={mode}
        setMode={setMode}
      />
    </div>
  );
};
