const jwt = require("jsonwebtoken")
const privateKey = "This_is_a_fake_key_which_you_can_put_h"

const users = [
  {
    id: "1",
    email: "test@test.com",
    password: "123",
  },
  {
    id: "2",
    email: "other@mail.com",
    password: "321",
  },
]

const cookies = require("connect-cookies")()

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async (req, res) => {
  const { email, password } = req.body

  const searchResult = users.find(
    (u) => u.email === email && u.password === password
  )
  
  if (searchResult) {
    const resposeObject = {
      ...searchResult,
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-default-role": "user",
        "x-hasura-user-email": searchResult.email,
        "x-hasura-user-id": searchResult.id,
      },
    }

    const token = jwt.sign(resposeObject, privateKey, { algorithm: "HS256" })

    await runMiddleware(req, res, cookies)
    res.cookies.set("hasura-token", token)
    res.cookies.set("user-id" , resposeObject.id)
    res.status(200).json(JSON.stringify(token))
    return
  }

  res.status(401).json(JSON.stringify({ error_message: "record not found" }))
}
