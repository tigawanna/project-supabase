import React from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { get_all_shops, get_bills_rpc } from './../../supa/operations';
import { QueryStateWrapper } from '../../shared/QueryStateWrapper';
import { BillFromRPC } from './../../supa/query-types';
import { supabase } from '../../supa/config';


interface TestProps {
    user: any
}

export const Test: React.FC<TestProps> = ({}) => {
    interface Shops {
        id: string
        created_at: string
        tenant: string
        shop_number: string
        order: number
        has_water: boolean
        has_elec: boolean
        is_vacant: boolean
        shop_name:string;
        tenants:{ tenant_name: string }
    }

//     const query = useQuery<BillFromRPC[], unknown, BillFromRPC, (string|number)[]>(['bills',12,11],
//     get_bills_rpc,{
//     // enabled:false
//     // select:(data:Shops[])=>{
//     //  return data.map((da)=>{
//     //   da['shop_name']=da.tenants.tenant_name
//     //    return da
//     //  })
//     // }
// })    



const query = useQuery(['billsfromrpc',12,10],()=>get_bills_rpc(12,11,2022,2022))
console.log("data ===>",query.data)  
// fixBills()
return (
 <QueryStateWrapper 
 error={query.error}
 isLoading={query.isFetched}
 isError={query.isError}
 >
<div>

</div>
 </QueryStateWrapper>   

);
}



{/* <TheForm
    form_title='Login'
    fields={form_input}
    validate={validate}
    submitFn={handleSubmit}
    is_submitting={addUserMutation.isLoading && !authing}
    error={error}
    editing={editing}
/> */}
export interface SignupFormInput {
    email: string
    password: string
    passwordConfirm: string
}
interface Validate {
    input: SignupFormInput;
    setError: (error: { name: string; message: string }) => void;
}




const validate = ({ input, setError }: Validate) => {
    // console.log("input === ",input)
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (input.email === "") {
        setError({ name: "email", message: "email field required" })
        return false
    }
    if (!expression.test(input.email)) {
        setError({ name: "email", message: "invalid email pattern" })
        return false
    }
    if (input.password.length < 8) {
        setError({ name: "password", message: "password minimun length is 8" })
        return false
    }

    setError({ name: "", message: "" })
    return true
}
