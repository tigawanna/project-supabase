import { supabase } from "./config";

export const get_all_shops=async()=>{
  try{
   let { data: shops, error } = await supabase
     .from("bills")
     .select(
       `
     id,bills(
      id
    )
     `
     )
     .eq("month", 1)
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



