import React, { useState, Fragment, useLayoutEffect } from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"

import Head from "../components/head"
import TagsList from "../components/tagsList"
import Comment from "../components/comment"
import NestedComment from "../components/nestedComment"
import CommentForm from "../components/commentForm"
import ArrowUpward from "../images/arrow_upward.svg"
import { useWindowHeight } from "../hooks"

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
    allCommentsYaml(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          id
          name
          email
          comment
          replyTo
          date(formatString: "ddd, MMM D, YYYY, H:mm")
        }
      }
    }
  }
`
// date(formatString: "dddd, MMMM Do, YYYY - hh:mm z")
const BlogPost = ({ data, pageContext, location }) => {
  const [replyingTo, setReplyingTo] = useState("")
  const [scrollTop, setScrollTop] = useState(0)
  const windowHeight = useWindowHeight()
  useLayoutEffect(() => {
    const cb = function(e) {
      setScrollTop(document.documentElement.scrollTop)
    }
    document.addEventListener("scroll", cb)
    return () => {
      document.removeEventListener("scroll", cb)
    }
  }, [])

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
  const comments = data.allCommentsYaml && data.allCommentsYaml.edges
  return (
    <Fragment>
      <Head
        customTitle={`${title} by`}
        pageType="blogPost"
        post={data.contentfulBlogPost}
        pathname={location.pathname}
      />
      <Link className="button is-link fixed-right-button" to="/blog/">
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
          {comments && comments.length ? (
            <React.Fragment>
              <h3 className="title is-4">Comments ({comments.length})</h3>
              {comments.map(({ node: commentData }) => {
                if (commentData.replyTo) {
                  return null
                } else {
                  const replies = comments.filter(
                    ({ node: comment }) => commentData.name === comment.replyTo
                  )
                  return (
                    <Comment
                      key={commentData.id}
                      {...commentData}
                      replyingTo={replyingTo}
                      setReplyingTo={setReplyingTo}
                      slug={slug}
                    >
                      {replies.length
                        ? replies.map(({ node: reply }) => (
                            <NestedComment key={reply.id} {...reply} />
                          ))
                        : null}
                    </Comment>
                  )
                }
              })}
            </React.Fragment>
          ) : (
            <h3 className="title is-4">Be the First to Leave a Comment!</h3>
          )}
          <CommentForm slug={slug} title="Leave a Comment" />

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
        </div>
      </section>
      {scrollTop > windowHeight * 2 && (
        <button
          onClick={() => {
            document.documentElement.scroll({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }}
          className="button is-circle is-danger arrowup-btn"
          aria-label="scroll to top"
        >
          <span className="icon">
            <ArrowUpward />
          </span>
        </button>
      )}
    </Fragment>
  )
}

export default BlogPost
