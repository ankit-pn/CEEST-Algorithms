import pkg from '@apollo/client';
const { ApolloClient, InMemoryCache, gql } = pkg;

export const vmDetails = async (uri) => {
    const client = new ApolloClient({
        uri: uri,
        cache: new InMemoryCache()
    });

    const GET_VM = gql`query Query {
        vms {
          server_id
          task {
            server_id
            task_id
            taskLength
            taskDeadline
            communicationCost
            taskName
            vm_id
          }
          vmMips
          vmName
          vm_id
        }
      }`

    try {
        const result = await client.query({
            query: GET_VM
        });
        return result;
    } catch (error) {
        return error;
    }

}


