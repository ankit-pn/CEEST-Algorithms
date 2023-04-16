import { vmDetails } from './vm-details.js';
import { populateVMWeights } from './vm-resources.js';
import servers from './servers.json' assert {type: 'json'}
import task from './task.json' assert {type: 'json'}
import { serverDetails } from './server-details.js';

const findOptimalVm = async (task, servers) => {

    try {
        let task_length = task['taskLength'];
        let communicationCost = task['communicationCost'];
        let taskDeadline = task['taskDeadline'];
        let res = { vm_id: null, weight: null };
        // console.log(servers);
        const Servers = servers.servers;
        for (let server of Servers) {
            let vms = await populateVMWeights(server);

            for (let vm of vms['vms']) {
                const currentTime = new Date();
                const deadlineTime = new Date(taskDeadline);
                // console.log(task_length);
                let execTimeOfCurrTaskinMillSecond = (task_length / vm['vmMips']) + communicationCost;
                // console.log(execTimeOfCurrTaskinMillSecond);
                if ((deadlineTime.getTime() - currentTime.getTime()) >= execTimeOfCurrTaskinMillSecond) {
                    if (!res['vm_id']) {
                        res = vm;
                    }
                    else {
                        if (vm['weight'] < res['weight']) {
                            res = vm;
                        }
                    }
                }
            }
        }
        if (res['vm_id'])
            return res;
        else {
            return { msg: "No optimal virtual machine found,Need scaling" };
        }
    }
    catch (error) {
        return error;
    }
}

console.log(await findOptimalVm(task,servers));

// export s