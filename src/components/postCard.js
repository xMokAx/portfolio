import React from "react"
import { Link, navigate } from "gatsby"
import Image from "gatsby-image"

import TagsList from "./tagsList"

const PostCard = ({
  title,
  publishDate,
  timeToRead,
  slug,
  featuredImage,
  featured,
  excerpt,
  tags,
  showFeaturedOnly,
}) => (
  <article
    onClick={() => {
      navigate(`/blog/${slug}`)
    }}
    className={`box is-flex flex-vertical translate-up ${
      featured && !showFeaturedOnly ? "is-featured" : ""
    }`}
    style={{ cursor: "pointer" }}
  >
    <div className="media blog-card-header">
      {featuredImage && (
        <div className="media-left has-shadow">
          <Image
            fixed={featuredImage.fixed}
            alt={`${
              featuredImage.description
                ? featuredImage.description
                : featuredImage.title
            }`}
            className=""
          />
        </div>
      )}
      <div className="media-content" style={{ paddingBottom: "8px" }}>
        <div className="content">
          <Link to={`/blog/${slug}`} className="is-underlined-hover">
            <h2 className="title is-size-5-mobile is-marginless">{title}</h2>
          </Link>
          <div>
            <small className="is-block">
              <span role="img" aria-label="publish date">
                📅
              </span>{" "}
              {publishDate}
            </small>
            <small className="is-block">
              <span role="img" aria-label="time to read">
                ⏱️
              </span>{" "}
              {timeToRead} min read
            </small>
            <TagsList tags={tags} className="are-small" />
          </div>
        </div>
      </div>
    </div>
    <div className="content">
      <p>{excerpt}</p>
      <Link to={`/blog/${slug}`} className="button is-primary is-outlined">
        Continue reading &rarr;
      </Link>
    </div>
  </article>
)

export default PostCard
