const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const reviewModel = require('../../models/Review')
const User = require('../../models/userModel')
const ProfileStudent = require('../../models/ProfileStudent')
const { userAuth } = require('../../utils/authPassport')
const Review = require('../../models/Review')
const checkObjectId = require('../../middleware/checkObjectId')

//  @route   POST api/reviews
//  @desc    Create a review
//  @access  Private
router.post(
  '/',
  userAuth,
  check('teacher', 'Teacher is required').notEmpty(),
  check('content', 'Content is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')

      const profileStudent = await ProfileStudent.findOne({ user: req.user.id })

      const newReview = new Review({
        student: req.user.id,
        studentName: user.name,
        studentAvatar: profileStudent.imageAvatar,
        teacher: req.body.teacher,
        rating: req.body.rating,
        content: req.body.content,
      })

      const review = await newReview.save()

      res.json(review)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

//  @route   POST api/reviews/:reviewId
//  @desc    Update a review by id
//  @access  Private
router.post(
  '/:reviewId',
  checkObjectId('reviewId'),
  userAuth,
  async (req, res) => {
    try {
      const { rating, content } = req.body

      const reviewFields = {
        rating,
        content,
        date: new Date(),
        isUpdated: true,
      }

      const review = await Review.findByIdAndUpdate(
        req.params.reviewId,
        { $set: reviewFields },
        { new: true }
      )

      res.json(review)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

//  @route   GET api/reviews/:teacherId
//  @desc    Get all reviews by teacher's id
//  @access  Private
router.get('/:teacherId', userAuth, async (req, res) => {
  try {
    const reviews = await Review.find({ teacher: req.params.teacherId }).sort({
      date: -1,
    })

    res.json(reviews)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//  @route   DELETE api/reviews/:id
//  @desc    Delete a review
//  @access  Private
router.delete('/:id', userAuth, checkObjectId('id'), async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)

    if (!review) {
      return res.status(404).json({ msg: 'Review not found' })
    }

    // Check student
    if (review.student.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Student not authorized' })
    }

    await review.remove()

    res.json({ msg: 'Review removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route    PUT api/reviews/vote/:id
// @desc     Vote a review for helpfulness
// @access   Private
router.put('/vote/:id', userAuth, checkObjectId('id'), async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)

    // Check if the review has already been voted
    if (review.votes.some((vote) => vote.student.toString() === req.user.id)) {
      return res.status(400).json({
        msg: 'Review already voted',
      })
    }

    review.votes.unshift({ student: req.user.id })

    await review.save()

    return res.json(review.votes)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route    PUT api/reviews/unvote/:id
// @desc     Unvote a review for helpfulness
// @access   Private
router.put('/unvote/:id', userAuth, checkObjectId('id'), async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)

    // Check if the review has not been voted
    if (!review.votes.some((vote) => vote.student.toString() === req.user.id)) {
      return res.status(400).json({
        msg: 'Review has not been voted yet',
      })
    }

    review.votes = review.votes.filter(
      ({ student }) => student.toString() !== req.user.id
    )

    await review.save()

    return res.json(review.votes)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
