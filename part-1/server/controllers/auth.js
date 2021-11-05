const bcrypt = require('bcryptjs')

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body


      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          console.log(users[i])
          res.status(200).send(users[i])
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')

        const { username, email, firstName, lastName, password } = req.body
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUserObject = {
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: hash
      }

      users.push(newUserObject)
      res.status(200).send('User Registered')
      console.log(users)
    }
}