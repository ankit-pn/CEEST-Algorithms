

// Fetching Servers details 

import servers from './servers.json' assert {type: 'json'};
import vm from './test-vm.json' assert {type:"json"};
import { findWeight, findRemainingResources} from './server-resources.js';
import { serverDetails } from './server-details.js';
// console.log(servers)

export const findOptimalServer = async (vm,servers) => {
    const Servers = servers.servers;
    // console.log(Servers);
    let optimalServer = { uri:null, server_id:null,weight:null };
    let requiredResources = vm.vmMips;
    for(let server of Servers){
        let weightOfServer = await findWeight(server);
        let remainingResources = await findRemainingResources(server);
        if(remainingResources>=requiredResources){
            if(!optimalServer['uri']){
                optimalServer['uri']=server,
                optimalServer['weight']=weightOfServer;
            }
            else{
                if(weightOfServer<optimalServer['weight']){
                    optimalServer['uri']=server;
                    optimalServer['weight']=weightOfServer; 
                }
            }
        }
    }

    if(optimalServer['uri']){
    let serverDetail = await serverDetails(optimalServer['uri'])
    let serverId = serverDetail.data.server_details.server_id ;
    optimalServer['server_id'] = serverId;
    return optimalServer;
    }
    else
    return {msg :"No Server Found on which we can put out virtual machine"};
}


// Calculating weight

