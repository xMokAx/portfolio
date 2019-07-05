import React from "react"
import { Link } from "gatsby"

const TagsList = ({ tags, className }) => (
  <div className={`buttons ${className ? className : ""}`}>
    {tags.map(({ name, slug }) => (
      <Link key={slug} className="button is-light" to={`/tag/${slug}/`}>
        {name}
      </Link>
    ))}
  </div>
)

export default TagsList
