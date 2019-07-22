import React from "react"

import Email from "../images/social/email.svg"
import AboutIcon from "../images/menu/about.svg"

class CommentForm extends React.Component {
  formRef = React.createRef()

  componentDidMount() {
    if (this.props.replyingTo) {
      window.scrollTo({
        left: 0,
        top: this.formRef.current.offsetTop,
        behavior: "smooth",
      })
    }
  }

  render() {
    const { slug, replyingTo, onReplyClick } = this.props
    return (
      <form
        ref={this.formRef}
        id={`${replyingTo ? replyingTo : "comment"}-form`}
        method="POST"
        action="https://ahmedmokhtar-staticman.herokuapp.com/v2/entry/xMokAx/portfolio/master/comments"
      >
        <h3 className="title is-4">
          {replyingTo ? `Reply to ${replyingTo}` : "Say Something"}
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
                onClick={() => onReplyClick("")}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    )
  }
}

export default CommentForm
