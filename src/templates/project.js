import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Layout from "../components/layout"
import Head from "../components/head"

export const query = graphql`
  query($slug: String!) {
    contentfulProject(slug: { eq: $slug }) {
      title
      description
      featuredImage {
        description
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      source
      website
      technologies
      body {
        json
      }
    }
  }
`

const Project = props => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img alt={alt} src={url} />
      },
    },
  }
  const {
    title,
    description,
    source,
    website,
    technologies,
    body,
    featuredImage,
  } = props.data.contentfulProject

  return (
    <Layout>
      <Head title={`${title} by`} />
      <Link className="button is-primary fixed-right-button" to="/projects/">
        All Projects
      </Link>
      <section className="section">
        <div className="container">
          <article className="content">
            <h1>{title}</h1>
            <Image
              fluid={featuredImage.fluid}
              alt={`${
                featuredImage.description
                  ? featuredImage.description
                  : featuredImage.title
              }`}
              style={{ marginBottom: "16px" }}
              className="has-shadow"
            />
            <div className="buttons is-centered">
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button is-primary"
                >
                  View Online
                </a>
              )}
              {source && (
                <a
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button is-primary"
                >
                  View Source
                </a>
              )}
            </div>
            <h2>{description}</h2>
            <h3>Technologies</h3>
            <ul className="techno-list">
              {technologies.map(tech => (
                <li key={tech} className="is-captalized">
                  {tech}
                </li>
              ))}
            </ul>
            {documentToReactComponents(body.json, options)}
          </article>
        </div>
      </section>
    </Layout>
  )
}

export default Project
