import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { GiElectric, GiWaterDrop } from "react-icons/gi";
import { ReactModalWrapper } from "../../shared/extra/ReactModalWrapper";
import { TheIcon } from "../../shared/extra/TheIcon";
import { ShopsType } from "../../supa/query-types";
import { EditShopForm } from "./OneShopForms";

interface OneShopInfoProps {
    the_shops?: ShopsType[] | null
}

export const OneShopInfo: React.FC<OneShopInfoProps> = ({ the_shops }) => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const shop = the_shops && the_shops[0]
    return (
        <div className='w-full border p-2 flex flex-col items-center justify-start'>
            <div className='w-full flex items-center justify-center p-2 '>
                <div className='text-6xl font-bold w-full'>{shop?.shop_number}</div>
                <div className='flex flex-col justify-center items-center gap-2'>

                    {shop?.has_elec ? <TheIcon Icon={GiElectric} color="gold" size='30' /> : null}
                    {shop?.has_water ? < TheIcon Icon={GiWaterDrop} color="blue" size='30' /> : null}


                </div>
            </div>
            <ReactModalWrapper
                isOpen={modalOpen}
                closeModal={() => setModalOpen(prev => !prev)}
                child={<EditShopForm shop={shop} />}
            />
            <div className='w-full flex items-center justify-center truncate p-2 gap-2'>

                <div className='text-2xl font-mono w-full'>{shop?.tenants.tenant_name}</div>
                {/* <div className='font-bold'>{shop?.order}</div> */}
                <TheIcon Icon={FaRegEdit} size='20'
                    iconAction={() => setModalOpen(prev => !prev)} />
            </div>

        </div>
    );
}
