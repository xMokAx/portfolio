import React from "react"

const Techno = ({ icon, title }) => (
  <div className="is-flex flex-vertical flex-align-center flex-justify-center techno-icon-container">
    <div className="techno-icon" dangerouslySetInnerHTML={{ __html: icon }} />
    <span className="has-text-weight-semibold is-size-7-mobile techno-text">
      {title}
    </span>
  </div>
)

export default Techno
