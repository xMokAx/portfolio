import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
import Head from "../components/head"
import TagsList from "../components/tagsList"
import Email from "../images/social/email.svg"
import AboutIcon from "../images/menu/about.svg"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      slug
      title
      description
      publishDate(formatString: "MMMM Do, YYYY")
      updatedAt(formatString: "MMMM Do, YYYY")
      publishDateISO: publishDate
      createdAtISO: createdAt
      updatedAtISO: updatedAt
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
        ogImage: fixed(width: 1200, height: 628) {
          src
        }
      }
      body {
        childMarkdownRemark {
          wordCount {
            words
          }
          timeToRead
          html
        }
      }
    }
  }
`

const BlogPost = ({ data, pageContext }) => {
  const {
    slug,
    title,
    publishDate,
    updatedAt,
    body,
    featuredImage,
    tags,
  } = data.contentfulBlogPost
  const { html, timeToRead } = body.childMarkdownRemark
  const { prev, next } = pageContext
  const isPaginated = prev || next
  return (
    <Layout>
      <Head
        customTitle={`${title} by`}
        pageType="blogPost"
        post={data.contentfulBlogPost}
      />
      <Link className="button is-primary fixed-right-button" to="/blog/">
        All Posts
      </Link>
      <section className="section">
        <div className="container">
          <article className="content">
            <h1>{title}</h1>
            <div className="is-flex flex-wrap">
              <p style={{ margin: "0 8px 0 0" }}>
                <span role="img" aria-label="publish date">
                  📅
                </span>{" "}
                {publishDate}
              </p>
              <p style={{ marginBottom: "1em" }}>
                <span role="img" aria-label="time to read">
                  ⏱️
                </span>{" "}
                {timeToRead} min read
              </p>
            </div>
            <TagsList tags={tags} />
            <p>Updated: {updatedAt}</p>
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
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </article>
          <hr />
          <nav
            className="pagination is-centered"
            role="navigation"
            aria-label="pagination"
          >
            {isPaginated &&
              (prev ? (
                <Link
                  to={`/blog/${prev.slug}/`}
                  className="pagination-previous"
                >
                  &larr; Prev Post
                </Link>
              ) : (
                <span className="pagination-previous" disabled>
                  &larr; Prev Post
                </span>
              ))}

            {isPaginated &&
              (next ? (
                <Link to={`/blog/${next.slug}/`} className="pagination-next">
                  Next Post &rarr;
                </Link>
              ) : (
                <span className="pagination-next" disabled>
                  Next Post &rarr;
                </span>
              ))}
          </nav>

          <form
            method="POST"
            action="https://ahmedmokhtar-staticman.herokuapp.com/v2/entry/xMokAx/portfolio/master/comments"
          >
            <input
              name="options[redirect]"
              type="hidden"
              value="https://ahmedmokhtar.dev/"
            />
            <input name="fields[slug]" type="hidden" value={slug} />
            <div className="field">
              <p className="control has-icons-left">
                <input
                  name="fields[name]"
                  className="input"
                  type="text"
                  placeholder="Name"
                  required
                />
                <span className="icon is-small is-left">
                  <AboutIcon className="form-icon" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  name="fields[email]"
                  className="input"
                  type="email"
                  placeholder="Email"
                  required
                />
                <span className="icon is-small is-left">
                  <Email className="form-icon" />
                </span>
              </p>
            </div>
            <div className="field">
              <div className="control">
                <textarea
                  name="fields[comment]"
                  className="textarea"
                  placeholder="Comment"
                  required
                ></textarea>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" type="submit">
                  Submit
                </button>
              </div>
              <div className="control">
                <button className="button is-text" type="reset">
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  )
}

export default BlogPost
