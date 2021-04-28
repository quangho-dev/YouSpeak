import React from 'react'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'

const Rating = ({ englishLevel, color, rating }) => {
  return (
    <span>
      {englishLevel === 1 || rating === 1 ? (
        <>
          <StarIcon color={color} />
          <StarBorderIcon color={color} />
          <StarBorderIcon color={color} />
          <StarBorderIcon color={color} />
          <StarBorderIcon color={color} />
        </>
      ) : englishLevel === 2 || rating === 2 ? (
        <>
          <StarIcon color={color} />
          <StarIcon color={color} />
          <StarBorderIcon color={color} />
          <StarBorderIcon color={color} />
          <StarBorderIcon color={color} />
        </>
      ) : englishLevel === 3 || rating === 3 ? (
        <>
          <StarIcon color={color} />
          <StarIcon color={color} />
          <StarIcon color={color} />
          <StarBorderIcon color={color} />
          <StarBorderIcon color={color} />
        </>
      ) : englishLevel === 4 || rating === 4 ? (
        <>
          <StarIcon color={color} />
          <StarIcon color={color} />
          <StarIcon color={color} />
          <StarIcon color={color} />
          <StarBorderIcon color={color} />
        </>
      ) : englishLevel === 5 || rating === 5 ? (
        <>
          <StarIcon color={color} />
          <StarIcon color={color} />
          <StarIcon color={color} />
          <StarIcon color={color} />
          <StarIcon color={color} />
        </>
      ) : (
        <>
          <StarBorderIcon color={color} />
          <StarBorderIcon color={color} />
          <StarBorderIcon color={color} />
          <StarBorderIcon color={color} />
          <StarBorderIcon color={color} />
        </>
      )}
    </span>
  )
}

Rating.defaultProps = {
  color: 'primary',
}

export default Rating
