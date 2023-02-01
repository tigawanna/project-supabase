
import { supabase } from './config';
import { monthValues } from './../backup/backup1';

    interface NewBillT {
      shop: string;
      elec_readings: number;
      water_readings: number;
      month: number;
      year: number;
    }
    interface ShopUpdate {
      has_elec:boolean;
      has_water:boolean;
      is_vavcant:boolean
      order:number
      tenant:string
      shop_number:string
    }
    interface UpdateTable{
      table:string;
      row_id:string;
      new_values:any;

    }

export const addBills=async(new_bill:NewBillT)=>{
 //console.log("adding bills === ",new_bill)
    try{
        const { data, error } = await supabase

          .from("bills")
          .insert([new_bill])
          .select()
          if(error){
            //console.log("error == ",error)
            throw new Error(error.message)
          }
          // //console.log("data ==== >",data)
          return data

    }catch(e){
       throw e
    }
}


 export const updateShop = async (
   updated_shop: ShopUpdate,shop_id:string
 ) => {
  //console.log('updating shop === ',updated_shop,shop_id)
   try {

    const { data, error } = await supabase
     .from("shops")
     .update(updated_shop)
     .eq("id",shop_id);


     if (error) {
       //console.log("error == ", error);
       throw new Error(error.message);
     }
     //console.log("data ==== >", data);
     return data;
   } catch (e) {
     throw e;
   }
 };

 
 export const updateTable = async ({row_id,table,new_values}:UpdateTable) => {
  try {
     const { data, error } = await supabase
       .from(table)
       .update(new_values)
       .eq("id", row_id)
       .select()

     if (error) {
       //console.log("error == ", error);
       throw new Error(error.message);
     }
     //console.log("data ==== >", data);
     return data;
   } catch (e) {
     throw e;
   }
 };


