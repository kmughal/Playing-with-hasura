import { createClient } from 'urql';

const client = createClient({
    url: 'http://localhost:8080/v1/graphql'
  });

  export default client