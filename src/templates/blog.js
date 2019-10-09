import React, { Fragment } from "react"
import { graphql } from "gatsby"

import Head from "../components/head"
import PostsRoll from "../components/postsRoll"
import FeaturedTitle from "../components/featuredTitle"
import TagsList from "../components/tagsList"

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
      sort: { fields: [publishDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
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
    allContentfulTag(sort: { fields: name, order: ASC }) {
      nodes {
        name
        slug
      }
    }
  }
`

const Blog = ({ data, pageContext, location }) => {
  const posts = data.allContentfulBlogPost.edges
  const tags = data.allContentfulTag.nodes
  const { currentPage, numPages } = pageContext
  const isFirstPage = currentPage === 1
  return (
    <Fragment>
      <Head
        customTitle={`${isFirstPage ? "" : `Page ${currentPage} | `}Blog of`}
        posts={posts}
        pageType="blog"
        pathname={location.pathname}
      />
      <section>
        <FeaturedTitle title="Blog">
          <p className="is-inline has-text-grey-lighter">
            <span role="img" aria-label="Page">
              📄
            </span>{" "}
            {currentPage}
          </p>
        </FeaturedTitle>
        <div style={{ padding: "1.5rem 1.5rem 0" }}>
          <div className="container">
            <TagsList tags={tags} className="flex-justify-center" />
          </div>
        </div>
        <PostsRoll
          posts={posts}
          paginationProps={{ currentPage, numPages, basePath: "/blog/" }}
        />
      </section>
    </Fragment>
  )
}

export default Blog
