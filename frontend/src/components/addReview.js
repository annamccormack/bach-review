import React, { useState } from "react"
import BachDataService from "../services/bachDataService"
import { Link } from "react-router-dom"

function AddReview(props) {
  let editing = false
  let initialReviewState = ""
  
  if (props.location.state && props.location.state.currentReview) {
    editing = true
    initialReviewState = props.location.state.currentReview.text
  }

  const [review, setReview] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = event => {
    setReview(event.target.value)
  }

  function saveReview() {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      _id: props.match.params.id
    }

    if (editing) {
      data.review_id = props.location.state.currentReview._id
      BachDataService.updateReview(data)
        .then(res => {
          setSubmitted(true)
          console.log(res.data)
        })
        .catch(e => {
          console.log(e)
        })
    } else {
      BachDataService.createReview(data)
        .then(res => {
          setSubmitted(true)
          console.log(res.data)
        })
        .catch(e => {
          console.log(e)
        })
    }

  }

  return (
    <div>
      {props.user ? (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/Bach/" + props.match.params.id} className="btn btn-success">
              Back to Bach
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="description">{ editing ? "Edit" : "Create" } Review</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={review}
                onChange={handleInputChange}
                name="text"
              />
            </div>
            <button onClick={saveReview} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>

      ) : (
      <div>
        Please log in.
      </div>
      )}

    </div>
  )
}

export default AddReview