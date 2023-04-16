import { vmDetails } from "./vm-details.js";
import { serverDetails } from "./server-details.js";
// import { findWeight } from "./server-resources.js";

export const findExecutionTime = (task, vmMips) => {
    return task['taskLength'] / vmMips + task['communicationCost'];
}


export const populateVMWeights = async (uri) => {
    try {
        const vmsData = await vmDetails(uri);
        let vms = vmsData.data.vms;
        const serverDetail = await serverDetails(uri);
        let res = [];
        let unit_power_cost = serverDetail.data.server_details.unit_power_cost;
        for (let vm of vms) {
            let sumOfExecTime = 0;
            let vmMips = vm['vmMips'];
            for (let task of vm['task']) {
                sumOfExecTime += findExecutionTime(task, vmMips);
            }
            let weight = sumOfExecTime*unit_power_cost;
            res.push({weight,...vm});
        }
       
        return {vms:res};
    }
    catch (error) {
        return error;
    }
}

// console.log(await populateVMWeights('http://localhost:4000'));