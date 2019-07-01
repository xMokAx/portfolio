import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import PostCard from "../components/postCard"

const PostsRoll = ({ showFeaturedOnly }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
        edges {
          node {
            id
            title
            description
            featured
            publishDate(formatString: "MMMM Do, YYYY")
            tags
            slug
            featuredImage {
              fixed(width: 100, height: 100) {
                ...GatsbyContentfulFixed_withWebp_noBase64
              }
            }
            body {
              childMarkdownRemark {
                timeToRead
                excerpt(pruneLength: 320)
              }
            }
          }
        }
      }
    }
  `)
  return (
    <div className="section">
      <div className="container">
        <div className="columns is-centered is-multiline">
          {data.allContentfulBlogPost.edges.map(({ node: post }) => {
            const { id, title, publishDate, slug, featured, body, tags } = post
            const featuredImage = post.featuredImage.fixed
            const { excerpt, timeToRead } = body.childMarkdownRemark
            if (showFeaturedOnly) {
              if (!featured) {
                return null
              }
            }
            return (
              <div className="column is-12 is-6-widescreen" key={id}>
                <PostCard
                  title={title}
                  publishDate={publishDate}
                  timeToRead={timeToRead}
                  excerpt={excerpt}
                  tags={tags}
                  slug={slug}
                  featuredImage={featuredImage}
                  featured={featured}
                  showFeaturedOnly={showFeaturedOnly}
                />
              </div>
            )
          })}

          {showFeaturedOnly && (
            <div className="column is-12 is-flex flex-justify-center">
              <Link className="button is-primary is-large" to="/blog">
                All Posts
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostsRoll
