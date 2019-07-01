import React from "react"
import { Link, navigate } from "gatsby"
import Image from "gatsby-image"

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
      <div className="media-left">
        <Image fixed={featuredImage} />
      </div>
      <div className="media-content" style={{ paddingBottom: "8px" }}>
        <div className="content">
          <Link to={`/blog/${slug}`}>
            <h2 className="title is-size-5-mobile is-marginless is-underlined">
              {title}
            </h2>
          </Link>
          <div>
            <small className="is-block has-text-grey">{publishDate}</small>
            <small className="is-block has-text-grey">
              {timeToRead} min read
            </small>
            <div className="buttons are-small">
              {tags.map(tag => (
                <Link key={tag} className="button is-light" to={`/blog/${tag}`}>
                  {tag}
                </Link>
              ))}
            </div>
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
