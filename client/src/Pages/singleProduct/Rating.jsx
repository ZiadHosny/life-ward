import "./index.css";
import React, { useState } from "react";

export default function Rating({ id, setRating, totalRating }) {
  const [hover, setHover] = useState(null);
  const [totalStars, setTotalStars] = useState(5);

  const handleChange = (e) => {
    setTotalStars(parseInt(Boolean(e.target.value, 10) ? e.target.value : 5));
  };
  console.log(totalRating, 'totalRating')
  return (
    <div className="App">

      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index} style={{
          }}>
            <input
              key={star}
              type="radio"
              name="rating"
              value={totalRating}

              onChange={() => setRating(id, currentRating)}
            />
            <span
              className="star"
              style={{
                color:
                  currentRating <= (hover || totalRating) ? "#ffc107" : "#e4e5e9",
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
        );
      })}

    </div>
  );
}
