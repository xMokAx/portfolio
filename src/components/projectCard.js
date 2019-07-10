import React from "react"
import { Link, navigate } from "gatsby"
import Image from "gatsby-image"

const ProjectCard = ({
  title,
  description,
  technologies,
  website,
  source,
  slug,
  featuredImage,
  featured,
  showFeaturedOnly,
}) => {
  return (
    <article
      className={`card translate-up cursor-pointer ${
        featured && !showFeaturedOnly ? "is-featured" : ""
      }`}
      onClick={e => {
        if (e.target.tagName !== "A") {
          navigate(`/projects/${slug}/`)
        }
      }}
    >
      <div className="card-image has-border-bottom">
        <Image
          fluid={featuredImage.fluid}
          alt={`${
            featuredImage.description
              ? featuredImage.description
              : featuredImage.title
          }`}
        />
      </div>
      <div className="card-content">
        <Link to={`/projects/${slug}/`} className="is-underlined-hover">
          <h2 className="title">{title}</h2>
        </Link>
        <h3 className="subtitle">{description}</h3>
        <div className="content">
          <p className="is-capitalized">
            <strong>Technologies: </strong>
            {technologies.join(", ")}
          </p>
        </div>
      </div>
      <footer className="card-footer">
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="card-footer-item"
          >
            View Online
          </a>
        )}
        {source && (
          <a
            href={source}
            target="_blank"
            rel="noopener noreferrer"
            className="card-footer-item"
          >
            Source
          </a>
        )}
        <Link to={`/projects/${slug}/`} className="card-footer-item">
          Read More
        </Link>
      </footer>
    </article>
  )
}

export default ProjectCard
