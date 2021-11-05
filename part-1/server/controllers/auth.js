const bcrypt = require('bcryptjs')

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body


      for (let i = 0; i < users.length; i++) {
        const passwordCompare = bcrypt.compareSync(password, users[i].password)
  
        if (users[i].username === username && passwordCompare) {
          return res.status(200).send(users[i])
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        // res.status(200).send(req.body)

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
      res.status(200).send(newUserObject)
      console.log(users)
    }
}