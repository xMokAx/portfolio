import React from "react"

const NestedComment = ({ name, email, comment, date, replyTo }) => {
  return (
    <article className="comment flex flex-vertical">
      <div className="media">
        <figure className="media-left">
          <p className="image is-48x48">
            <img
              alt={`${name} avatar`}
              src={`https://www.gravatar.com/avatar/${email}?s=192&r=pg&d=identicon`}
            />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{name}</strong>
              <br />
              <small>{date}</small>
              <br />
              <small>In reply to {replyTo}</small>
            </p>
          </div>
        </div>
      </div>
      <p className="comment-text">{comment}</p>
    </article>
  )
}

export default NestedComment
