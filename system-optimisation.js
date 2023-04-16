import { normalizeConfig } from "@apollo/client/cache/inmemory/helpers";
import { findUnderUtilise } from "./find-underutilise-server.js";
import servers from './servers.json' assert {type:'json'}

export const systemOptimisation = (servers) =>{
    const server_list = findUnderUtilise(servers);
    if(server_list['normal_servers'].length == 0){
        return {msg: "There is no normal server exist, So system optimsation Not Possible"};
    }
    else{
        for(let under_utilise_server of server_list['under_utilise_servers']){
            return {msg: "All relocation of virtul machines in this under utlize server is not possible"};
        }
    }
}
