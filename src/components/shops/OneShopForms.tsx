import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import TheForm from "../../shared/form/TheForm";
import { FormOptions } from "../../shared/form/types";
import { concatErrors } from "../../shared/utils/utils";
import { addBills, updateShop } from "../../supa/mutations";
import { searchSupabase } from "../../supa/operations";
import { ShopsType } from "../../supa/query-types";

interface OneShopFormProps {
    shop_id?: string
}
interface FormInput {
    shop: string;
    elec_readings: number;
    water_readings: number;
    month: number;
    year: number;
}

export const OneShopForm: React.FC<OneShopFormProps> = ({ shop_id }) => {
    const date = new Date()
    const editing = true

    interface Validate {
        input: FormInput;
        setError: (error: { name: string; message: string }) => void;
    }

    const validate = ({ input, setError }: Validate) => {
        const assertNotNull = () => {
            for (const item in input) {
                console.log("input.item", input[item as keyof typeof input])
            }
        }
        // console.log("input === ",input)
        // const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        // if (input.shop === "") {
        //     setError({ name: "shop", message: "email field required" })
        //     return false
        // }
        // if (!input.elec_readings) {
        //     setError({ name: "email", message: "invalid email pattern" })
        //     return false
        // }
        // if (input.) {
        //     setError({ name: "password", message: "password minimun length is 1" })
        //     return false
        // }

        setError({ name: "", message: "" })
        return true
    }
    const form_input: FormOptions[] = [
        { field_name: "elec_readings", field_type: "number", default_value: 0, editing },
        { field_name: "water_readings", field_type: "number", default_value: 0, editing },
        { field_name: "month", field_type: "number", default_value: date.getMonth() + 1, editing },
        { field_name: "year", field_type: "number", default_value: date.getFullYear(), editing },
    ]
    const [error, setError] = React.useState({ name: "", message: "" })
    const queryClient = useQueryClient();

    const addBillMutation = useMutation(async (vars: { coll_name: string, payload: FormData }) => {

        const new_bill = {
            shop: shop_id,
            elec_readings: vars.payload.get('elec_readings'),
            water_readings: vars.payload.get('elec_readings'),
            month: vars.payload.get('month'),
            year: vars.payload.get('year'),
        }

        try {
            return await addBills(new_bill as any)
        }
        catch (e) {
            throw e
        }
    },
        {
            onSettled: () => {
                //   queryClient.invalidateQueries(['shops-bills',shop_id as string]);
            },
            onError: (err: any) => {
                console.log("errror logging in ", err.data)
                setError({ name: "main", message: concatErrors(err) })
            }
        })

    const handleSubmit = async (data: FormData) => {
        await addBillMutation.mutate({ coll_name: 'user', payload: data })
    };

    return (
        <div className='w-full h-full border p-2 flex flex-col items-center justify-start
         bg-slate-900'>
            <TheForm
                form_title='Login'
                fields={form_input}
                validate={validate}
                submitFn={handleSubmit}
                is_submitting={addBillMutation.isLoading}
                error={error}
                editing={editing}
            />

        </div>
    );
}


interface EditShopFormProps {
    shop: ShopsType | null | undefined
}
interface FormInput {
    has_vacant: boolean
    has_water: boolean;
    is_elec: boolean;
    order: number;
    tenant: string;
}
interface QueryFnProps {
    keyword: string
    key: string[]
}

export const EditShopForm: React.FC<EditShopFormProps> = ({ shop }) => {
    const editing = true
    interface Validate {
        input: FormInput;
        setError: (error: { name: string; message: string }) => void;
    }
    const queryFn = (keyword: string) => {
        return useQuery(['tenants', keyword], () =>
            searchSupabase({ keyword, table: 'tenants', column: 'tenant_name' }),
            { enabled: keyword.length > 1 }
        )
    }

    const validate = ({ input, setError }: Validate) => {
        const assertNotNull = () => {
            for (const item in input) {
                console.log("input.item", input[item as keyof typeof input])
            }
        }
        setError({ name: "", message: "" })
        return true
    }

    const form_input: FormOptions[] = [
        { field_name: "has_elec", field_type: "checkbox", default_value: shop?.has_elec, editing },
        { field_name: "has_water", field_type: "checkbox", default_value: shop?.has_water, editing },
        { field_name: "is_vacant", field_type: "checkbox", default_value: shop?.is_vacant, editing, },
        {
            field_name: "tenant", field_type: "fetchselect", default_value: shop?.tenants.tenant_name,
            editing,
            queryFn,
            fetch_select_options: {
                form_field: 'tenant',
                field_to_save: 'id',
                table: 'tenants',
                keyword_field: "tenant_name",
                default_value_to_save: shop?.tenant as string
            }
        },
        { field_name: "order", field_type: "number", default_value: shop?.order, editing },

    ]
    const [error, setError] = React.useState({ name: "", message: "" })

    const queryClient = useQueryClient();

    const updateShopMutation = useMutation(async (vars: { coll_name: string, payload: FormData }) => {
        const updated_shop = {
            has_elec: vars.payload.get('has_elec') === "true" ? true : false,
            has_water: vars.payload.get('has_water') === "true" ? true : false,
            is_vacant: vars.payload.get('is_vacant') === "true" ? true : false,
            order: parseInt(vars.payload.get('order') as string),
            tenant: vars.payload.get('tenant'),
            shop_number: shop?.shop_number
        }
        try {
        return await updateShop(updated_shop as any, shop?.id as string)
        }
        catch (e) {
        throw e
        }
    },
        {
            onSettled: () => {
                //   queryClient.invalidateQueries(['shops-bills',shop_id as string]);
            },
            onError: (err: any) => {
                console.log("errror logging in ", err.data)
                setError({ name: "main", message: concatErrors(err) })
            }
        })

    const handleSubmit = async (data: FormData) => {
        await updateShopMutation.mutate({ coll_name: 'user', payload: data })
    };
 

    return (
        <div className='w-full h-full border p-2 flex flex-col items-center justify-start
         bg-slate-900'>
            <TheForm
                form_title='Edit Shop'
                fields={form_input}
                validate={validate}
                submitFn={handleSubmit}
                is_submitting={updateShopMutation.isLoading}
                error={error}
                editing={editing}

            />

        </div>
    );
}

