import { useNavigate } from 'react-router-dom';
import { TheTable } from './table';
import { TheIcon } from './TheIcon';
import { FaPrint, FaRegEdit } from 'react-icons/fa';
import { useState } from 'react';

interface TableWrapperProps {

    rows: any[];
    header: {
        name: string;
        prop: string;
        type: string;
        editable: boolean;
    }[];
    loading?: boolean;
    print_msg: string;
    loadingError?: string
    sort?: boolean
    error?: { name: string, error: string }
    validate?: (prev: any, current: any) => boolean
    saveChanges?: (prev: any, current: any) => void
    deleteRow?: (current: any) => void
    clearError?: () => void
}

export const TableWrapper: React.FC<TableWrapperProps> = (
    { header, rows, loading, print_msg,

        loadingError,
        sort,
        error,
        validate,
        clearError,
        deleteRow,
        saveChanges
    }) => {
    const navigate = useNavigate()
    const [update, setUpdate] = useState(true);
  
    return (
        <div className="w-full p-4 overflow-scroll">
            <div
                className=" w-fit p-2  bg-slate-900 text-white flex gap-2 
               left-[45%] right-[45%] rounded-xl sticky top-0 z-40">
                <TheIcon Icon={FaPrint}
                    size='20'
                    iconAction={() => {
                        navigate("/print-preview", {
                            state: {
                                rows: rows,
                                header,
                                title: print_msg
                            },
                        })
                    }} />
                <TheIcon Icon={FaRegEdit} size='20'
                    iconAction={() => setUpdate(prev => !prev)} />
            </div>

            <TheTable

                rows={rows}
                header={header}
                loading={loading}
                error={error}
                sort={sort}
                update={update}
                validate={validate}
                saveChanges={saveChanges}
                deleteRow={deleteRow}
                clearError={clearError}
            />

            <div className="p-2 mb-2 min-w-20"></div>
        </div>
    );
}
