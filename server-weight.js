import { vmDetails } from "./vm-details.js";
import { serverDetails } from "./server-details.js";

export const calculateWeight = async (uri) => {
    try{
    const vms = await vmDetails(uri);
    const serverDetail = await serverDetails(uri);
    
    let usedResources = 0;
    for(let x in vms.data.vms){
        usedResources += vms.data.vms[x]['vmMips'];
    }
    console.log(usedResources);
    const weightOfServer = usedResources*serverDetail.data.server_details.unit_power_cost;

    return weightOfServer;

    }
    catch(error) {
        return error;
    }
}
