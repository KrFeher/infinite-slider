import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://rickandmortyapi.com/graphql/",
  }),
});

const getMoreData = async (pageNumber) => {
  try {
    const result = await client.query({
      query: gql`
          {
            characters(page:${pageNumber}) {
              results {
                id
                name
                species
                image
                gender
              }
            }
          }
        `,
    });
    return result.data.characters.results;
  } catch (error) {
    return [];
  }
};

export { getMoreData };
