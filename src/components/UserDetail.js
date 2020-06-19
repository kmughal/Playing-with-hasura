import { useQuery } from "urql"

const PeopleQuery = `
query {
  People {
    email
    id
    password
    name
  }
}
`
const UserDetail = ({ cookies }) => {
  const context = React.useMemo(() => {
    return {
      fetchOptions: () => {
        const token = cookies["hasura-token"]
        return {
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        }
      },
    }
  }, [cookies])
  const [result] = useQuery({
    query: PeopleQuery,
    context,
  })

  const { data, fetching, error } = result
  if (fetching) {
    return <p>Please wait....</p>
  }
  if (error) {
    return (
      <p>
        Something went wrong <pre>{JSON.stringify(error, null, 2)}</pre>
      </p>
    )
  }
  const record = data?.People?.[0]

  return (
    <div className="container mx-auto">
      <h1 className="text-6xl text-red-800">Welcome {record.name}</h1>
      <p>Email address is {record.email}</p>
    </div>
  )
}

export default UserDetail
