import { useRouter } from "next/router"

const LoginPage = () => {
  const router = useRouter()
  const [loginFail, setLoginFail] = React.useState(false)
  const email = React.useRef(null)
  const password = React.useRef(null)

  const handleSubmit = React.useCallback(async (e) => {
    const fetchParams = {
      method: "post",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },

      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      }),
    }

    const res = await fetch("/api/login", fetchParams)
    try {
      const json = await res.json()
      console.log(json, fetchParams.body)
      if (json.error_message) {
        setLoginFail(true)
        return
      }
      localStorage.setItem("token", JSON.stringify(json))
      router.push("/home")
    } catch (e) {
      console.log("Error : ", e)
    }
    console.log(res)
    e.preventDefault()
  }, [])

  return (
    <div className="w-full max-w-xs">
      <div>
        {loginFail && (
          <div className="alert alert-danger" role="alert">
            Fail to login
          </div>
        )}

        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                ref={email}
              />
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                  ref={password}
                />
                
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSubmit}
                >
                  Sign In
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
