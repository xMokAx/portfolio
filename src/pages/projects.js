import React, { Fragment } from "react"
import { graphql } from "gatsby"

import Head from "../components/head"
import ProjectsRoll from "../components/projectsRoll"
import FeaturedTitle from "../components/featuredTitle"

export const query = graphql`
  query {
    allContentfulProject(sort: { fields: [publishDate], order: DESC }) {
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

const ProjectsPage = ({ data, location }) => (
  <Fragment>
    <Head
      customTitle="Portfolio of"
      pageType="projects"
      projects={data.allContentfulProject.edges}
      pathname={location.pathname}
    />
    <section>
      <FeaturedTitle title="Projects" />
      <ProjectsRoll projects={data.allContentfulProject.edges} />
    </section>
  </Fragment>
)

export default ProjectsPage
