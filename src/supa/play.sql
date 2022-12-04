
CREATE OR REPLACE FUNCTION get_bills (curr_month INT, prev_month INT, curr_year INT,prev_year INT) 
RETURNS TABLE (
 tenant_id uuid,
 shop_id uuid,
 current_bill_id uuid,
 prev_bill_id uuid,

 shop_number varchar,
 shop_name varchar,
 list_order numeric,

  prev_elec  numeric,
  curr_elec numeric,
  elec_diff numeric,

  prev_water numeric,
  curr_water numeric,
  water_diff numeric,

  current_month numeric,
  previous_month numeric,
  current_year numeric,
  previous_year numeric
) 


AS 

$$
BEGIN
RETURN QUERY 

SELECT

te.id tenant_id,
sh.id shop_id,
curr.id current_bill_id,
previ.id prev_bill_id,

sh.shop_number shop_number,
te.tenant_name shop_name,
sh.order list_order,

previ.elec_readings prev_elec,
curr.elec_readings curr_elec,
(curr.elec_readings - previ.elec_readings) elec_diff,

previ.water_readings prev_water,
curr.water_readings curr_water,
(curr.water_readings - previ.water_readings) water_diff,

curr.month current_month,
previ.month previous_month,
curr.year current_year,
previ.year previous_year

FROM shops sh
LEFT JOIN bills curr ON curr.shop = sh.id AND curr.month = curr_month AND curr.year = curr_year
LEFT JOIN bills previ ON previ.shop = sh.id AND previ.month = prev_month AND previ.year = prev_year
LEFT JOIN tenants te ON sh.tenant= te.id

ORDER BY sh.order;

END; 

$$ 

LANGUAGE 'plpgsql';
