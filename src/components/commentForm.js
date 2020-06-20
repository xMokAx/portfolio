import React, { forwardRef } from "react"

import Email from "../images/social/email.svg"
import AboutIcon from "../images/menu/about.svg"

// TODO: Maybe convert it to a controlled form.
// using forwardRef to pass ref recieved from Comment Component to form element.
const CommentForm = forwardRef(
  ({ slug, replyingTo, setReplyingTo, title, className }, ref) => {
    return (
      <form
        className={`comment-form ${className}`}
        ref={ref}
        id={`${replyingTo ? replyingTo : "comment"}-form`}
        method="POST"
        action="https://ahmedmokhtar-staticman.herokuapp.com/v2/entry/xMokAx/portfolio/master/comments"
      >
        <h3 className="title is-4">
          {title}{" "}
          <span role="img" aria-label={title}>
            💬
          </span>
        </h3>
        <input
          name="options[redirect]"
          type="hidden"
          value={`https://ahmedmokhtar.dev/blog/${slug}/`}
        />
        <input name="fields[slug]" type="hidden" value={slug} />
        {replyingTo && (
          <input name="fields[replyTo]" type="hidden" value={replyingTo} />
        )}
        <div className="field">
          <p className="control has-icons-left">
            <input
              name="fields[name]"
              className="input"
              type="text"
              placeholder="Name"
              aria-label="Name"
              required
            />
            <span className="icon is-small is-left">
              <AboutIcon className="form-icon" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              name="fields[email]"
              className="input"
              type="email"
              placeholder="Email"
              aria-label="Email"
              required
            />
            <span className="icon is-small is-left">
              <Email className="form-icon" />
            </span>
          </p>
        </div>
        <div className="field">
          <div className="control">
            <textarea
              name="fields[comment]"
              className="textarea"
              placeholder="Comment"
              aria-label="Comment"
              required
            ></textarea>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">
              Submit
            </button>
          </div>
          <div className="control">
            <button className="button is-text" type="reset">
              Reset
            </button>
          </div>
          {replyingTo && (
            <div className="control">
              <button
                className="button is-danger"
                type="button"
                onClick={() => setReplyingTo("")}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    )
  }
)

export default CommentForm
