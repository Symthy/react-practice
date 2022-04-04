import React, { useState, VFC } from 'react';
import Star from './Star';


type StarRatingProps = {
  totalStars?: number
}

const StarRating: VFC<StarRatingProps> = ({ totalStars = 5 }) => {
  const [selectedStars, setSelectedStars] = useState(0);
  return (
    <>
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
      <p>{selectedStars} of {totalStars} stars </p>
    </>
  )
}


export default StarRating;
