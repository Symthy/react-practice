import React, { VFC } from 'react';
import { Star } from './Star';


type StarRatingProps = {
  totalStars?: number,
  selectedStars: number,
  style?: {},
  onUpdateRate: (rate: number) => void
}

export const StarRating: VFC<StarRatingProps> = ({
  totalStars = 5,
  selectedStars = 0,
  style = {},
  onUpdateRate = fn => fn,
  ...props
}) => {
  return (
    <>
      <div style={{ padding: "5px", ...style }} {...props}>
        {[...Array(totalStars)].map((n, i) => (
          <Star
            key={i}
            selected={selectedStars > i}
            onSelect={() => onUpdateRate(i + 1)}
          />
        ))}
        <p>{selectedStars} of {totalStars} stars </p>
      </div>
    </>
  )
}
