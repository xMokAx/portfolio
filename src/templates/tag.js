import React, { Fragment } from "react"
import { graphql, Link } from "gatsby"

import Head from "../components/head"
import PostsRoll from "../components/postsRoll"
import FeaturedTitle from "../components/featuredTitle"

export const query = graphql`
  query($slug: String!) {
    contentfulTag(slug: { eq: $slug }) {
      name
      slug
      blog_post {
        id
        title
        description
        featured
        publishDate(formatString: "MMMM Do, YYYY")
        tags {
          name
          slug
        }
        slug
        featuredImage {
          title
          description
          fixed(width: 100, height: 100) {
            ...GatsbyContentfulFixed_withWebp
          }
        }
        body {
          childMarkdownRemark {
            timeToRead
          }
        }
      }
    }
  }
`

const Tag = ({ data, pageContext, location }) => {
  const posts = data.contentfulTag.blog_post
  const { currentPage, numPages, skip, limit } = pageContext
  const { name, slug } = data.contentfulTag
  const isFirstPage = currentPage === 1
  return (
    <Fragment>
      <Head
        customTitle={`Tag: ${name}${
          isFirstPage ? "" : ` | Page ${currentPage}`
        } | Blog of`}
        pageType="tag"
        tag={name}
        posts={posts.slice(skip, limit * currentPage)}
        pathname={location.pathname}
      />
      <section>
        <FeaturedTitle title={name}>
          <p className="is-inline has-text-grey-lighter">
            <span role="img" aria-label="Page">
              📄
            </span>{" "}
            {currentPage}
          </p>
          <Link
            className="button is-link fixed-right-button tag-page-button"
            to="/blog/"
          >
            All Posts
          </Link>
        </FeaturedTitle>
        <PostsRoll
          posts={posts.slice(skip, limit * currentPage)}
          paginationProps={{
            currentPage,
            numPages,
            basePath: `/blog/tag/${slug}/`,
          }}
        />
      </section>
    </Fragment>
  )
}

export default Tag
