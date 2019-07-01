import React from "react"

const Techno = ({ Icon, title }) => (
  <div className="is-flex flex-vertical flex-align-center flex-justify-center techno-icon-container">
    <Icon className="techno-icon" />
    <span className="has-text-weight-semibold is-size-7-mobile">{title}</span>
  </div>
)

export default Techno
