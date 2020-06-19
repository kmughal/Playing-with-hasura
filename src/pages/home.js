import UserDetail from "../components/UserDetail"
import { parseCookies } from "nookies"
import InputTodo from "../components/InputTodo"
import Todos from "../components/Todo"

const HomePage = ({ cookies }) => {
  return (
    <>
      <UserDetail cookies={cookies} />
      <InputTodo cookies={cookies} />
      <Todos cookies={cookies} />
    </>
  )
}

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx)
  return {
    props: {
      cookies,
    },
  }
}

export default HomePage
