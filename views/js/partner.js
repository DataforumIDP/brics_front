import { toggleEditMode } from "./modules/editPartner.js";
import { exit } from "./modules/exit.js";
import { fillPartnerData, getPartnerData } from "./modules/getPartnersData.js";
import { scrollbarInit } from "./modules/scrollBarInit.js";

scrollbarInit()

$('.exit__content').click(exit)

st()

async function st() {
    const [{partner}] = await getPartnerData()
    fillPartnerData(partner)
}

$('.edit__btn').click(toggleEditMode)