
import { supabase } from './config';

    interface NewBillT {
      shop: string;
      elec_readings: number;
      water_readings: number;
      month: number;
      year: number;
    }

  export const addBills=async(new_bill:NewBillT)=>{

    try{
        const { data, error } = await supabase

          .from("bills")
          .insert([new_bill])
          .select()
          if(error){
            throw new Error(error.message)
          }
          return data

    }catch(e){
       throw e
    }


  }
