import { toggleEditMode } from "./modules/editPartner.js";
import { exit } from "./modules/exit.js";
import { fillPartnerData, getPartnerData } from "./modules/getPartnersData.js";
import { closePartnerScreen, openPartnerScreen } from "./modules/partnerScreen.js";
import { scrollbarInit } from "./modules/scrollBarInit.js";

scrollbarInit()

$('.exit__content').click(exit)

start()

async function start() {
    const [{partner}] = await getPartnerData()
    fillPartnerData(partner)
}

$('.edit__btn').click(toggleEditMode)

$(document).on('click', '.list__btn:not(.--grey)', openPartnerScreen)
$('.back-to-profile').click(closePartnerScreen)