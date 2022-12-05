import { supabase } from "./config";
import { BillFromRPC } from "./query-types";

export const gets=async()=>{
  try{
   let { data: shops, error } = await supabase
     .from("shops")
     .select(
       ` id,
        bills(
          shop
       )
     `
     )
  
     .range(0, 9);
  
  ;
  if(error){
    throw error
  }
   return shops
  } 
  catch(e){
    console.log("error fetching shops ==== ",e)
   throw e
  } 

}



export const get_bills_rpc = async (
      curr_month: number,
      prev_month: number,
      curr_year:number,
      prev_year:number
      
    ) => {
      // const [_, curr_month, prev_month] = queryKey;
      try {
        let { data, error } = await supabase.rpc(
          "get_bills",
          {
            curr_month,
            curr_year,
            prev_month,
            prev_year,
          }
        );
        if (error) {
          throw error;
        }
        return data as BillFromRPC[];
      } catch (e) {
        console.log(
          "error fetching shops ==== ",
          e
        );
        throw e;
      }
    }; 



    export const get_shops = async () => {
      try {
        let { data: shops, error } =
          await supabase
            .from("shops")
            .select(
              ` *,
              tenants(
                  tenant_name
                )
             `
            )
            .order("order");
        if (error) {
          throw error;
        }
        return shops;
      } catch (e) {
        console.log(
          "error fecthing shops === ",
          e
        );
        throw e;
      }
    };
