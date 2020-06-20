import React, { createRef } from "react"
import { CSSTransition } from "react-transition-group"

import CommentForm from "./commentForm"

const formElementRef = createRef()

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
  const isReplying = replyingTo === name
  return (
    <article className="box comment flex flex-vertical" key={id}>
      <div className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img
              className="is-rounded"
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
      {children && (
        <div className="box nested-comments has-background-light">
          {children}
        </div>
      )}
      <button
        className="button is-link"
        style={{ marginTop: !children && "16px" }}
        onClick={() => {
          setReplyingTo(name)
          window.scrollTo({
            left: 0,
            top: formElementRef.current.offsetTop,
            behavior: "smooth",
          })
        }}
      >
        Reply
      </button>
      <CSSTransition in={isReplying} timeout={315} classNames="slide">
        <CommentForm
          className="slide-enter"
          ref={formElementRef}
          slug={slug}
          replyingTo={replyingTo}
          setReplyingTo={setReplyingTo}
          title={`Reply to ${name}`}
        />
      </CSSTransition>
    </article>
  )
}

export default Comment
