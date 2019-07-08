import React from "react"
import { Link, graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"

import Layout from "../components/layout"
import Head from "../components/head"
import ProjectsRoll from "../components/projectsRoll"
import PostsRoll from "../components/postsRoll"
import FeaturedTitle from "../components/featuredTitle"

const IndexPage = ({ data }) => (
  <Layout>
    <Head />
    <BackgroundImage
      fluid={data.file.childImageSharp.fluid}
      className="home-image"
      backgroundColor="#00171f"
    >
      <div style={{ marginBottom: "10vh" }}>
        <h1 className="title home-title has-text-light">Hi, I'm Ahmed,</h1>
        <h2 className="subtitle home-subtitle has-text-grey-lighter is-capitalized">
          a self-taught self-motivated{" "}
          <strong className="has-text-grey-lighter">
            front end web developer
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
      <ProjectsRoll showFeaturedOnly />
      <div className="column is-12 is-flex flex-justify-center">
        <Link className="button is-primary is-large" to="/projects/">
          All Projects
        </Link>
      </div>
    </section>
    <section>
      <FeaturedTitle title="Featured Posts" />
      <PostsRoll posts={data.allContentfulBlogPost.edges} homePage />
      <div className="column is-12 is-flex flex-justify-center">
        <Link className="button is-primary is-large" to="/blog/">
          All Posts
        </Link>
      </div>
    </section>
  </Layout>
)

export const query = graphql`
  query {
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
  }
`

export default IndexPage
