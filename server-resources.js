import { vmDetails } from "./vm-details.js";
import { serverDetails } from "./server-details.js";

export const findUsedResources = async (uri) => {
    try {
        const vms = await vmDetails(uri);
        let usedResources = 0;
        for (let x in vms.data.vms) {
            usedResources += vms.data.vms[x]['vmMips'];
        }
        return usedResources;

    }
    catch (error) {
        return error;
    }
}

export const findRemainingResources = async (uri) =>{
    try{
    const serverDetail = await serverDetails(uri);

    let usedResources = await findUsedResources(uri);
   
    return serverDetail.data.server_details.total_mips-usedResources;
    }
    catch(error){
        return error;
    }
}


export const findWeight = async (uri) => {
    try {
        const serverDetail = await serverDetails(uri);

        let usedResources = await findUsedResources(uri);
       
        if (usedResources == 0)
            usedResources = 1;
        const weightOfServer = usedResources * serverDetail.data.server_details.unit_power_cost;
        return weightOfServer;

    }
    catch (error) {
        return error;
    }
}

const uri = 'http://localhost:4000';
console.log(await findWeight(uri));
console.log(await findRemainingResources(uri));
console.log(await findUsedResources(uri));
