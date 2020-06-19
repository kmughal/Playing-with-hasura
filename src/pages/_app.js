import { Provider } from "urql"
import client from "../client"
import "../styles/index.css"

function MyApp({ Component, pageProps }) {
  console.log("gner")
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
