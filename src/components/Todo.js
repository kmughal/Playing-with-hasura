import { useQuery } from "urql"

const GetTodos = `
{
    Todo {
      text
    }
  }
`

const Todos = ({ cookies }) => {
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
    query: GetTodos,
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

  const record = data?.Todo

  if (!record) return <p>No todos found!</p>
  return (
    <ul className="list-disc">
      {record.map((t, i) => (
        <li key={i}>{t.text}</li>
      ))}
    </ul>
  )
}

export default Todos
