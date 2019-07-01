import React from "react"

const FeaturedTitle = ({ title }) => (
  <div className="is-flex flex-align-center featured-title has-background-black">
    <h1 className={`title is-size-4-mobile has-text-primary`}>{title}</h1>
  </div>
)

export default FeaturedTitle
