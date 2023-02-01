import React from "react";
import { useQuery } from "@tanstack/react-query";
import { get_bills_rpc } from "../../supa/operations";
import { User } from "../../supa/user-types";
import { BillsTable } from "../../components/bills/BillsTable";
import Select from "react-select";
import { computePeriod } from "../../components/bills/utils";

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
  const [year, setYear] = React.useState(date.getFullYear());

 const [period, setPeriod] = React.useState(() =>
    computePeriod(date, mode)
  );
  React.useEffect(() => {
    setPeriod(computePeriod(date, mode));
  }, [mode]);


  const query = useQuery(["billsfromrpc", period, mode],
    () => {
      const { curr_month,prev_month,curr_year,prev_year} = period;
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

  // //console.log("bills ==>>",query.data)
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
