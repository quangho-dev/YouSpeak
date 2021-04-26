import User from '../models/userModel.js'

const setUser = async (req, res, next) => {
  const userId = req.user.id
  try {
    const foundUser = await User.findById(userId)
    req.user = foundUser
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }

  next()
}

export default setUser
