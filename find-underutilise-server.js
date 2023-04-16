import { findRemainingResources, findUsedResources } from "./server-resources.js";

import servers from './servers.json' assert {type:'json'};

export const findUnderUtilise = async (servers) => {

    try {
        let under_utilise_servers = [];
        let normal_servers = [];
        const Servers = servers.servers;
        for(let server of Servers){
            let remainingResources = await findRemainingResources(server);
            let usedResources = await findUsedResources(server);
            if(remainingResources>2*usedResources){
                under_utilise_servers.push(server);
            }
            else{
                normal_servers.push(server);
            }
        }
        return {under_utilise_servers,normal_servers};
    }
    catch(error){
        return error;
    }
} 

// console.log(await findUnderUtilise(servers));