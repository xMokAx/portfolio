import React from "react"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"

import Layout from "../components/layout"
import Head from "../components/head"
import ProjectsRoll from "../components/projectsRoll"
import PostsRoll from "../components/postsRoll"
import FeaturedTitle from "../components/featuredTitle"

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    file(relativePath: { eq: "moon.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 4160) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    allContentfulBlogPost(
      filter: { featured: { eq: true } }
      sort: { fields: [publishDate], order: DESC }
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
    allContentfulProject(
      filter: { featured: { eq: true } }
      sort: { fields: [publishDate], order: DESC }
    ) {
      edges {
        node {
          id
          title
          description
          featuredImage {
            title
            description
            fluid {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          source
          website
          featured
          technologies
          slug
        }
      }
    }
  }
`

const IndexPage = ({ data }) => (
  <Layout>
    <Head
      pageType="home"
      projects={data.allContentfulProject.edges}
      posts={data.allContentfulBlogPost.edges}
    />
    <BackgroundImage
      fluid={data.file.childImageSharp.fluid}
      className="home-image has-background-black"
      backgroundColor="#00171f"
    >
      <div style={{ marginBottom: "10vh" }}>
        <h1 className="title home-title has-text-light">Hi, I'm Ahmed,</h1>
        <h2 className="subtitle home-subtitle has-text-grey-lighter is-capitalized">
          a self-taught self-motivated{" "}
          <strong className="has-text-grey-lighter">
            {data.site.siteMetadata.title}
          </strong>
          .
        </h2>
      </div>
      <h2 className="title home-subtitle has-text-grey-lighter is-flex flex-vertical">
        <span>
          <span className="has-text-primary">F</span>ollow
        </span>
        <span>
          <span className="has-text-primary">O</span>ne
        </span>
        <span>
          <span className="has-text-primary">C</span>ourse
        </span>
        <span>
          <span className="has-text-primary">U</span>ntil
        </span>
        <span>
          <span className="has-text-primary">S</span>uccess
        </span>
      </h2>
    </BackgroundImage>
    <section>
      <FeaturedTitle title="Featured Projects" />
      <ProjectsRoll projects={data.allContentfulProject.edges} homePage />
    </section>
    <section>
      <FeaturedTitle title="Featured Posts" />
      <PostsRoll posts={data.allContentfulBlogPost.edges} homePage />
    </section>
  </Layout>
)

export default IndexPage
