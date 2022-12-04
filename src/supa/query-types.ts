export interface BillFromRPC {
  tenant_id: string;
  shop_id: string;
  current_bill_id?: string;
  prev_bill_id?: string;
  shop_number: string;
  shop_name: string;
  list_order: number;
  prev_elec?: number;
  curr_elec?: number;
  elec_diff?: number;
  prev_water?: number;
  curr_water?: number;
  water_diff?: number;
  current_month?: number;
  previous_month?: number;
  current_year?: number;
  previous_year?: number;
}