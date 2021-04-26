import User from '../models/userModel.js'

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
const getUserByToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

export { getUserByToken }
