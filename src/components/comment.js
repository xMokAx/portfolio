import React from "react"

import CommentForm from "./commentForm"

const Comment = ({
  id,
  name,
  email,
  comment,
  date,
  replyingTo,
  onReplyClick,
  children,
  slug,
}) => {
  const formComponentRef = React.createRef()
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
              <small>{date}</small>
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
            onReplyClick(name)
            if (formComponentRef.current) {
              window.scrollTo({
                left: 0,
                top: formComponentRef.current.formRef.current.offsetTop,
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
          style={{ marginBottom: `${replyingTo === name ? "16px" : "0"}` }}
          onClick={() => {
            onReplyClick(name)
            if (formComponentRef.current) {
              window.scrollTo({
                left: 0,
                top: formComponentRef.current.formRef.current.offsetTop,
                behavior: "smooth",
              })
            }
          }}
        >
          Reply to Thread
        </button>
      )}
      {replyingTo === name && (
        <CommentForm
          ref={formComponentRef}
          slug={slug}
          replyingTo={replyingTo}
          onReplyClick={onReplyClick}
        />
      )}
    </article>
  )
}

export default Comment
