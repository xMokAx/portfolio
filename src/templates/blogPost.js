import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
import Head from "../components/head"
import TagsList from "../components/tagsList"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      tags {
        name
        slug
      }
      featuredImage {
        title
        description
        fluid {
          ...GatsbyContentfulFluid_withWebp
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

const BlogPost = ({ data, pageContext }) => {
  const {
    title,
    publishDate,
    body,
    featuredImage,
    tags,
  } = data.contentfulBlogPost
  const { html, timeToRead } = body.childMarkdownRemark
  const { prev, next } = pageContext
  return (
    <Layout>
      <Head title={`${title} by`} />
      <Link className="button is-primary fixed-right-button" to="/blog/">
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
            <TagsList tags={tags} />
            <div className="is-flex">
              <p>
                <span role="img" aria-label="publish date">
                  📅
                </span>{" "}
                {publishDate}
              </p>
              <span style={{ margin: "0 8px" }}>•</span>
              <p>
                <span role="img" aria-label="time to read">
                  ⏱️
                </span>{" "}
                {timeToRead} min read
              </p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </article>
          <hr />
          <nav
            className="pagination is-centered"
            role="navigation"
            aria-label="pagination"
          >
            {prev ? (
              <Link to={`/blog/${prev.slug}/`} className="pagination-previous">
                &larr; Prev Post
              </Link>
            ) : (
              <span className="pagination-previous" disabled>
                &larr; Prev Post
              </span>
            )}

            {next ? (
              <Link to={`/blog/${next.slug}/`} className="pagination-next">
                Next Post &rarr;
              </Link>
            ) : (
              <span className="pagination-next" disabled>
                Next Post &rarr;
              </span>
            )}
          </nav>
        </div>
      </section>
    </Layout>
  )
}

export default BlogPost
