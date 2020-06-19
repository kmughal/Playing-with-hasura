import { useMutation } from "urql"

const CreateTodo = `
  mutation CreateTodo($text:String!,$owner:Int!){
    insert_Todo(objects :{
      owner :$owner,
      text :$text
    }) {
      returning {
        id
        Person {
          id
        }
        text
      }
    }
  }
`

const InputTodo = ({ cookies }) => {
  const todo = React.useRef(null)

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

  const [_, createTodo] = useMutation(CreateTodo)
  const todoAddHandler = React.useCallback(async (e) => {
    await createTodo(
      { text: todo.current.value, owner: +cookies["user-id"] },
      context
    )
  }, [])

  return (
    <div className="w-full max-w-sm border border-silver-400 p-4">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            htmlFor="todo"
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          >
            Todo :
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            ref={todo}
          />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          onClick={todoAddHandler}
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default InputTodo
