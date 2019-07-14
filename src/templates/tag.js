import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
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

const Tag = ({ data, pageContext }) => {
  const posts = data.contentfulTag.blog_post
  const { currentPage, numPages, skip, limit } = pageContext
  const { name, slug } = data.contentfulTag
  const isFirstPage = currentPage === 1
  return (
    <Layout>
      <Head
        customTitle={`Tag: ${name}${
          isFirstPage ? "" : ` | Page ${currentPage}`
        } | Blog of`}
        pageType="tag"
        tag={name}
        posts={posts.slice(skip, limit * currentPage)}
      />
      <section>
        <FeaturedTitle title={name}>
          <p className="is-inline has-text-grey-lighter">
            <span role="img" aria-label="Page">
              📄
            </span>{" "}
            Page {currentPage}
          </p>
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
    </Layout>
  )
}

export default Tag
