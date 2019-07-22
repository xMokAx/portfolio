import React, { useEffect } from "react"

import CommentForm from "./commentForm"

const Comment = ({
  id,
  name,
  email,
  comment,
  date,
  replyingTo,
  setReplyingTo,
  children,
  slug,
}) => {
  const formElementRef = React.createRef()
  const isReplying = replyingTo === name
  // useEffect runs this function when replyingTo changes.
  useEffect(() => {
    // scroll only if replyingTo changes from false to true
    if (isReplying) {
      window.scrollTo({
        left: 0,
        top: formElementRef.current.offsetTop,
        behavior: "smooth",
      })
    }
  }, [replyingTo])
  return (
    <article className="box comment flex flex-vertical" key={id}>
      <div className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img
              alt={`${name} avatar`}
              src={`https://www.gravatar.com/avatar/${email}?s=256&r=pg&d=identicon`}
            />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{name}</strong>
              <br />
              <small className="is-size-7-mobile">{date}</small>
            </p>
          </div>
        </div>
      </div>
      <p className="comment-text">{comment}</p>
      {!children && (
        <button
          className="button is-link"
          style={{ marginTop: "16px" }}
          onClick={() => {
            // scroll only if the form is already shown.
            setReplyingTo(name)
            if (isReplying) {
              window.scrollTo({
                left: 0,
                top: formElementRef.current.offsetTop,
                behavior: "smooth",
              })
            }
          }}
        >
          Reply to {name}
        </button>
      )}
      {children && (
        <div className="box nested-comments has-background-light">
          <div className="arrow-up"></div>
          {children}
        </div>
      )}
      {children && (
        <button
          className="button is-link"
          style={{ marginBottom: `${isReplying ? "16px" : "0"}` }}
          onClick={() => {
            setReplyingTo(name)
            if (isReplying) {
              window.scrollTo({
                left: 0,
                top: formElementRef.current.offsetTop,
                behavior: "smooth",
              })
            }
          }}
        >
          Reply to Thread
        </button>
      )}
      {isReplying && (
        <CommentForm
          ref={formElementRef}
          slug={slug}
          replyingTo={replyingTo}
          setReplyingTo={setReplyingTo}
        />
      )}
    </article>
  )
}

export default Comment
