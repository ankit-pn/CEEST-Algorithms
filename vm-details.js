import pkg from '@apollo/client';
const { ApolloClient, InMemoryCache, gql } = pkg;

export const getVM = async (uri) => {
    const client = new ApolloClient({
        uri: uri,
        cache: new InMemoryCache()
    });

    const GET_VM = gql`query Query {
        vms {
          server_id
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


