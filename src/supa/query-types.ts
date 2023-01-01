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

export interface ShopsType {
  id: string;
  created_at: string;
  tenant: string;
  shop_number: string;
  order: number;
  has_water: boolean;
  has_elec: boolean;
  is_vacant: boolean;
  tenants: Tenants;
}
export type ParamsT = {
  shop: string;
};
export type ShopModetType = "view" | "add";
export interface Tenants {
  tenant_name: string;
}

export interface ShopBills {
  id: string;
  created_at: string;
  shop: string;
  elec_readings: number;
  water_readings: number;
  month: number;
  year: number;
}

export interface RequiredBillFields {
  id?:string
  shop: string;
  elec_readings: number;
  water_readings: number;
  month: number;
  year: number;
}
