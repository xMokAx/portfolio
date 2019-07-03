import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
import Head from "../components/head"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      tags
      featuredImage {
        title
        description
        fluid {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
      body {
        childMarkdownRemark {
          timeToRead
          html
        }
      }
    }
  }
`

const Blog = props => {
  const {
    title,
    publishDate,
    body,
    featuredImage,
    tags,
  } = props.data.contentfulBlogPost
  const { html, timeToRead } = body.childMarkdownRemark

  return (
    <Layout>
      <Head title={`${title} by`} />
      <Link className="button is-primary fixed-right-button" to="/blog">
        All Posts
      </Link>
      <section className="section">
        <div className="container">
          <article className="content">
            <h1>{title}</h1>
            {featuredImage && (
              <Image
                fluid={featuredImage.fluid}
                alt={`${
                  featuredImage.description
                    ? featuredImage.description
                    : featuredImage.title
                }`}
                className="has-shadow"
                style={{ marginBottom: "16px" }}
              />
            )}
            <div className="buttons">
              {tags.map(tag => (
                <Link
                  key={tag}
                  className="button is-light"
                  to={`/blog/tag/${tag}`}
                >
                  {tag}
                </Link>
              ))}
            </div>
            <div className="is-flex">
              <p>
                <span role="img" aria-label="publish date">
                  📅
                </span>{" "}
                {publishDate}
              </p>
              <span style={{ margin: "0 8px" }}>•</span>
              <p>
                <span role="img" aria-label="publish date">
                  ⏱️
                </span>{" "}
                {timeToRead} min read
              </p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </article>
        </div>
      </section>
    </Layout>
  )
}

export default Blog
