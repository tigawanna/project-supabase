
import { supabase } from './config';

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
    }

  export const addBills=async(new_bill:NewBillT)=>{

    try{
        const { data, error } = await supabase

          .from("bills")
          .insert([new_bill])
          .select()
          if(error){
            console.log("error == ",error)
            throw new Error(error.message)
          }
          console.log("data ==== >",data)
          return data

    }catch(e){
       throw e
    }


  }
 export const updateShop = async (
   updated_shop: ShopUpdate
 ) => {
  console.log('updated shop === ',updated_shop)
//    try {
//      const { data, error } = await supabase

//        .from("shops")
//        .insert([updated_shop])
//        .select();
//      if (error) {
//        console.log("error == ", error);
//        throw new Error(error.message);
//      }
//      console.log("data ==== >", data);
//      return data;
//    } catch (e) {
//      throw e;
//    }
//  };
 }
