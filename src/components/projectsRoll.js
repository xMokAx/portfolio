import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import ProjectCard from "../components/projectCard"

const ProjectsRoll = ({ showFeaturedOnly }) => {
  const data = useStaticQuery(graphql`
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
                ...GatsbyContentfulFluid_withWebp_noBase64
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
  `)
  return (
    <div className="section">
      <div className="container">
        <div className="columns is-centered is-multiline">
          {data.allContentfulProject.edges.map(({ node: project }) => {
            const {
              id,
              title,
              description,
              technologies,
              website,
              source,
              slug,
              featured,
              featuredImage,
            } = project
            if (showFeaturedOnly) {
              if (!featured) {
                return null
              }
            }
            return (
              <div
                className="column is-12 is-6-desktop is-4-widescreen"
                key={id}
              >
                <ProjectCard
                  title={title}
                  description={description}
                  technologies={technologies}
                  website={website}
                  source={source}
                  slug={slug}
                  featuredImage={featuredImage}
                  featured={featured}
                  showFeaturedOnly={showFeaturedOnly}
                />
              </div>
            )
          })}

          {showFeaturedOnly && (
            <div className="column is-12 is-flex flex-justify-center">
              <Link className="button is-primary is-large" to="/projects">
                All Projects
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectsRoll
