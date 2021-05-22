import React, { useState, useEffect } from 'react'
import BachDataService from '../services/bachDataService'
import { Link } from 'react-router-dom'

function Bach (props) {
  const initial = {
    id: null,
    name:"",
    description: "",
    address: {},
    reviews: []
  }
// extra details: bedrooms, roomType, propertyType, accomdates

  const [bach, setBach] = useState(initial)

  function getBach(id) {
    BachDataService.getById(id)
    .then(res => {
      setBach(res.data)
      console.log(res.data)
    })
    .catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    getBach(props.match.params.id)
  }, [props.match.params.id])

  function deleteReview (reviewId, index) {
    BachDataService.deleteReview(reviewId, props.user.id)
      .then(res => {
        setBach((prevState) => {
          prevState.reviews.splice(index, 1)
          return({...prevState})
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <div>
      {bach ? (
        <div>
          <h5>{bach.name}</h5>
          <p>
            <strong>Description: </strong>{bach.description}<br/>
            <strong>Address: </strong>{bach.address.suburb} {bach.address.market}, {bach.address.country}
          </p>
          <Link to={"/bach/" + props.match.params.id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
          <h4> Reviews </h4>
          <div className="row">
            {bach.reviews.length > 0 ? (
             bach.reviews.map((review, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card">
                     <div className="card-body">
                       <p className="card-text">
                         {review.text}<br/>
                         <strong>User: </strong>{review.name}<br/>
                         <strong>Date: </strong>{review.date}
                       </p>
                       {props.user && props.user.id === review.user_id &&
                          <div className="row">
                            <button onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</button>
                            <Link to={{
                              pathname: "/bach/" + props.match.params.id + "/review",
                              state: {
                                currentReview: review
                              }
                            }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>                   
                       }
                     </div>
                   </div>
                 </div>
               )
             })
            ) : (
            <div className="col-sm-4">
              <p>No reviews yet.</p>
            </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No bach selected.</p>
        </div>
      )}
    </div>
  )
}

export default Bach