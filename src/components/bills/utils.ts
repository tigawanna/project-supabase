
import { ModeType } from '../../pages/bills/Bills';
import {  UpdateMutationProps } from './BillsTable';
import { addBills, updateTable } from '../../supa/mutations';
import { RequiredBillFields } from '../../supa/query-types';

export const saveBills = async (
  values: UpdateMutationProps,
  mode: ModeType,

) => {
    const date = new Date();
    const this_year = date.getFullYear();
    const this_month = date.getMonth() + 1;
    const {after_edit,before_edit} = values
 try {
   if (mode === "new") {
     console.log("adding new bill", after_edit);
     // payload is the alterd fields ,prev is the values before editing started ,we;re checking if the fields have changed
     if (
       before_edit.curr_elec !==
         after_edit.curr_elec ||
       before_edit.curr_water !==
         after_edit.curr_water
     ) {
       const item: RequiredBillFields = {
         shop: after_edit.shop_id,
         elec_readings: after_edit.curr_elec,
         water_readings: after_edit.curr_water,
         month: this_month,
         year: this_year,
       };
       return await addBills(item);
     }
   }
   if (mode === "pre_add") {
     // payload is the alterd fields ,prev is the values before editing started ,we;re checking if the fields have changed
     if (
       before_edit.curr_elec !==
         after_edit.curr_elec ||
       before_edit.curr_water !==
         after_edit.curr_water
     ) {
       if (this_month === 12) {
         console.log(
           `pre saving to janaury while still in december ${this_year}`
         );
         const item: RequiredBillFields = {
           shop: after_edit.shop_id,
           elec_readings: after_edit.curr_elec,
           water_readings: after_edit.curr_water,
           month: 1,
           year: this_year + 1,
         };
         return await addBills(item);
       }

       console.log(
         `presaving to ${
           this_month + 1
         } ${this_year} `
       );
       const item: RequiredBillFields = {
         shop: after_edit.shop_id,
         elec_readings: after_edit.curr_elec,
         water_readings: after_edit.curr_water,
         month: this_month + 1,
         year: this_year,
       };
       return await addBills(item);
     }
   }
   if (mode === "view") {
     if (
       before_edit.prev_elec !==
         after_edit.prev_elec ||
       before_edit.prev_water !==
         after_edit.prev_water
     ) {
       const item: RequiredBillFields = {
         shop: after_edit.shop_id,
         elec_readings: after_edit.prev_elec,
         water_readings: after_edit.prev_water,
         month: after_edit.previous_month,
         year: after_edit.previous_year,
       };
       return await updateTable({
         new_values: item,
         row_id: after_edit.prev_bill_id,
         table: "bills",
       });
     }
     if (
       before_edit.curr_elec !==
         after_edit.curr_elec ||
       before_edit.curr_water !==
         after_edit.curr_water
     ) {
       const item: RequiredBillFields = {
         shop: after_edit.shop_id,
         elec_readings: after_edit.curr_elec,
         water_readings: after_edit.curr_water,
         month: after_edit.current_month,
         year: after_edit.current_year,
       };
       return await updateTable({
         new_values: item,
         row_id: after_edit.current_bill_id,
         table: "bills",
       });
     }
   }
 } catch (e) {
   throw e;
 }

     


};


  export const computePeriod = (
    date: Date,
    mode: ModeType
  ) => {
    const this_month = date.getMonth() + 1;
    const this_year = date.getFullYear();
    if (mode === "view") {
      if (this_month === 1) {
        console.log("january view mode");
        return {
          curr_month: this_month,
          prev_month: 12,
          curr_year: this_year,
          prev_year: this_year - 1,
        };
      }
      console.log("not january view  mode ");
      return {
        curr_month: this_month,
        prev_month: this_month - 1,
        curr_year: this_year,
        prev_year: this_year,
      };
    }

    if (mode === "new") {
      if (this_month === 1) {
        console.log("january new entry mode ");
        return {
          curr_month: 12,
          prev_month: 12,
          curr_year: this_year - 1,
          prev_year: this_year - 1,
        };
      }
      console.log("new entry mode ");

      return {
        curr_month: this_month - 1,
        prev_month: this_month - 1,
        curr_year: this_year,
        prev_year: this_year,
      };
    }

    if (mode === "pre_add") {
      console.log("pre add   mode ");
      return {
        curr_month: this_month,
        prev_month: this_month,
        curr_year: this_year,
        prev_year: this_year,
      };
    }
    console.log("default   mode ");
    return {
      curr_month: this_month,
      prev_month: this_month - 1,
      curr_year: this_year,
      prev_year: this_year,
    };
  };


  export const computeShopCarouselPeriod = (date: Date,mode: ModeType) => {
      const this_month = date.getMonth() + 1;
      const this_year = date.getFullYear();

    if (mode === "pre_add") {
      if (this_month === 12) {
        console.log("january new entry mode ");
        return {
          curr_month: 1,
          prev_month: 12,
          curr_year: this_year + 1,
          prev_year: this_year,
        };
      }
      console.log("new entry mode ");

      return {
        curr_month: this_month + 1,
        prev_month: this_month,
        curr_year: this_year,
        prev_year: this_year,
      };
    }
      if (this_month === 1) {
        console.log("january new entry mode ");
        return {
          curr_month: 1,
          prev_month: 12,
          curr_year: this_year,
          prev_year: this_year -1 ,
        };
      }
    return {
      curr_month: this_month,
      prev_month: this_month - 1 ,
      curr_year: this_year,
      prev_year: this_year,
    };
  };

  export const carousselFormSaveBills = async (
    values:RequiredBillFields,
    mode: ModeType
  ) => {
if(mode === "new"){
  const item: RequiredBillFields = {
      shop: values.shop,
      elec_readings:values.elec_readings,
      water_readings:values.water_readings,
      month:values.month,
      year:values.year,
      };
  return await addBills(item);
}
if (mode === "update") {
  const item: RequiredBillFields = {
    id:values.id,
    shop: values.shop,
    elec_readings: values.elec_readings,
    water_readings: values.water_readings,
    month: values.month,
    year: values.year,
  };
  return await updateTable({row_id:item.id as string,table:"bills",new_values:item});
}
  };
