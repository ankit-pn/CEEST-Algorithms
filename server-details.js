import pkg from '@apollo/client';
const { ApolloClient, InMemoryCache, gql } = pkg;

export const serverDetails = async (uri) => {
    const client = new ApolloClient({
        uri: uri,
        cache: new InMemoryCache()
    });

    const GET_SERVER = gql`query Query {
        server_details {
          server_id
          server_name
          total_mips
          unit_power_cost
        }
      }`

    try {
        const result = await client.query({
            query: GET_SERVER
        });
        return result;
    } catch (error) {
        return error;
    }

}

// console.log(await serverDetails('http://localhost:4000'))

