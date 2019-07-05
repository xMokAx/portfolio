import React from "react"

const FeaturedTitle = ({ title, children }) => (
  <div className="featured-title-container has-background-black">
    <h1
      className={`title featured-title is-size-4-mobile has-text-primary is-inline`}
    >
      {title}
    </h1>
    {children && children}
  </div>
)

export default FeaturedTitle
