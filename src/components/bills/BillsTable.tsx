import {
  UseMutationResult,
  useMutation,
  UseQueryResult,
} from "@tanstack/react-query";
import React from "react";
import { concatErrors } from "../../shared/utils/utils";
import { useNavigate } from "react-router-dom";
import {
  FaPrint,
  FaRegEdit,
} from "react-icons/fa";
import { ReactModalWrapper } from "../../shared/extra/ReactModalWrapper";
import { TheIcon } from "../../shared/extra/TheIcon";
import { TheTable } from "../../shared/table";
import { LoaderElipse } from "./../../shared/loaders/Loaders";
import { BillFromRPC } from "./../../supa/query-types";
import { ModeType } from "../../pages/bills/Bills";
import { PeriodType } from "./../../pages/bills/Bills";
import { saveBills } from "./utils";

interface BillsTableProps {
  query: UseQueryResult<BillFromRPC[], unknown>;
  period: PeriodType;
  setPeriod: React.Dispatch<
    React.SetStateAction<PeriodType>
  >;
  mode: ModeType;
  setMode: React.Dispatch<
    React.SetStateAction<ModeType>
  >;
}

export interface BillsT {
  tenant_id: string;
  shop_id: string;
  current_bill_id: string;
  prev_bill_id: string;
  shop_number: string;
  shop_name: string;
  list_order: number;
  prev_elec: number;
  curr_elec: number;
  elec_diff: number;
  prev_water: number;
  curr_water: number;
  water_diff: number;
  current_month: number;
  previous_month: number;
  current_year: number;
  previous_year: number;
  id: string;
}

export interface UpdateMutationProps {
  after_edit: BillsT;
  before_edit: BillsT;
}
export const BillsTable: React.FC<
  BillsTableProps
> = ({ query, period, setPeriod, mode }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] =
    React.useState(false);
  const [error, setError] = React.useState({
    name: "",
    error: "",
  });
  const [mainH, setMainH] = React.useState(
    window?.innerHeight ?? 0
  );
  const [update, setUpdate] =
    React.useState(true);

  const header = [
    {
      name: "SHOP ID",
      prop: "shop_id",
      type: "id",
      editable: false,
    },
    {
      name: "SHOP NAME",
      prop: "shop_name",
      type: "text",
      editable: false,
    },
    {
      name: "PREV WTR",
      prop: "prev_water",
      type: "number",
      editable: true,
    },
    {
      name: "CURR WTR",
      prop: "curr_water",
      type: "number",
      editable: true,
    },
    {
      name: "PREV EL",
      prop: "prev_elec",
      type: "number",
      editable: true,
    },
    {
      name: "CURR EL",
      prop: "curr_elec",
      type: "number",
      editable: true,
    },
    // {name: "CURR MOn", prop: "current_month", type: "number", editable: false },
    // { name: "PREV MOn", prop: "previous_month", type: "number", editable: false },
  ];
  const updateBillMutation = useMutation(
    async ({
      after_edit,
      before_edit,
    }: UpdateMutationProps) => {
      try {
        return await saveBills(
          { after_edit, before_edit },
          mode
        );
      } catch (e) {
        throw e;
      }
    },
    {
      onSettled: () => {
        //   queryClient.invalidateQueries(['shops-bills',shop_id as string]);
        setOpenModal(false);
      },
      onError: (err: any) => {
        console.log(
          "errror logging in ",
          err.data
        );
        setError({
          name: "main",
          error: concatErrors(err),
        });
      },
    }
  );

  const validate = (
    prev: BillsT,
    current: BillsT
  ) => {
    setError({ name: "", error: "" });
    return true;
  };

  const saveChanges = (
    prev: BillsT,
    current: BillsT
  ) => {
    setOpenModal(true);
    updateBillMutation.mutate({
      after_edit: current,
      before_edit: prev,
    });
  };

  const deleteRow = (current: any) => {};

  const clearError = () => {
    setError({ name: "", error: "" });
  };

  const bills = query.data;

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col ">
        <ReactModalWrapper
          child={
            <BillsSaving
              updateBillMutation={
                updateBillMutation
              }
            />
          }
          isOpen={openModal}
          closeModal={() => setOpenModal(false)}
          closeAfterDelay={3000}
          styles={{
            parent_top: "70%",
            parent_bottom: "10%",
            parent_left: "2%",
            parent_right: "50%",
            content_right: "0",
            content_left: "0",
            content_top: "0",
            content_bottom: "0",
          }}
        />

        <div className="w-full p-4">
          <div
            className=" w-fit p-2  bg-slate-900 text-white flex gap-2 
               left-[45%] right-[45%] rounded-xl sticky top-0 z-40"
          >
            <TheIcon
              Icon={FaPrint}
              size="20"
              iconAction={() => {
                navigate("/print-preview", {
                  state: {
                    rows: bills,
                    header,
                    title: `payments for ${
                      bills &&
                      bills[0]?.current_month
                    }`,
                  },
                });
              }}
            />
            <TheIcon
              Icon={FaRegEdit}
              size="20"
              iconAction={() =>
                setUpdate((prev) => !prev)
              }
            />
          </div>
          <div className="w-full h-[40%] ">
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
          </div>

          <div className="p-2  min-w-20"></div>
          <div className="p-2 w-full fixed bottom-0 bg-slate-600">
            <BillsPeriodPicker
              period={period}
              setPeriod={setPeriod}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface BillsSavingProps {
  updateBillMutation: UseMutationResult<
    any[] | undefined,
    any,
    UpdateMutationProps,
    unknown
  >;
}
export interface ResponseData {
  id: string;
  created_at: string;
  shop: string;
  elec_readings: number;
  water_readings: number;
  month: number;
  year: number;
}
const BillsSaving: React.FC<BillsSavingProps> = ({
  updateBillMutation,
}) => {
  // console.log("updte mutation  === ",updateBillMutation)
  const data =
    updateBillMutation.data &&
    (updateBillMutation.data[0] as ResponseData);
  return (
    <div className="w-full h-full ">
      {updateBillMutation.isLoading ? (
        <LoaderElipse />
      ) : null}
      {data ? (
        <div
          className="bg-green-600 w-full h-full text-xl font-bold  p-2
        flex items-center justify-center rounded-xl"
        >
          success
        </div>
      ) : null}
      {updateBillMutation.isError ? (
        <div
          className="bg-red-700  border h-full w-full p-2
                 flex items-center justify-center rounded-xl
                        "
        >
          {updateBillMutation.error.message}
        </div>
      ) : null}
    </div>
  );
};

interface BillsPeriodPickerProps {
  period: PeriodType;
  setPeriod: React.Dispatch<
    React.SetStateAction<PeriodType>
  >;
}

const BillsPeriodPicker: React.FC<
  BillsPeriodPickerProps
> = ({ period, setPeriod }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-1">
      {months.map((month, idx) => {
        return (
          <div
            onClick={() =>
              setPeriod((prev) => {
                return {
                  curr_month: idx + 1,
                  prev_month: idx,
                  curr_year: prev.curr_year,
                  prev_year: prev.curr_year,
                };
              })
            }
            key={idx}
            style={{
              backgroundColor:
                period.curr_month === idx + 1
                  ? `purple`
                  : "",
            }}
            className="py-1 px-2 rounded-lg border-2 cursor-pointer
    border-slate-400 bg-slate-900 text-slate-200
    hover:bg-slate-700

    "
          >
            {idx + 1} : {month}
          </div>
        );
      })}
    </div>
  );
};
