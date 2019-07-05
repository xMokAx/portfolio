import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"

import "./all.scss"
import Nav from "./nav"

const Layout = props => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
      file(relativePath: { eq: "ahmed-mokhtar.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 512, maxHeight: 512) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <div className="wrapper">
      <aside className="is-flex flex-vertical has-background-black sidebar">
        <div className="profile is-hidden-touch has-text-centered is-flex flex-vertical flex-justify-center flex-align-center">
          <Image
            fluid={data.file.childImageSharp.fluid}
            className="pulse profile-image is-circle"
            alt="Ahmed Mokhtar Photo"
          />
          <h1 className="title has-text-primary">
            {data.site.siteMetadata.author}
          </h1>
          <h2 className="subtitle has-text-grey-lighter">
            Front End Developer
          </h2>
        </div>
        <Nav />
      </aside>
      <main className="main-container is-flex-touch flex-vertical flex-justify-center flex-align-center">
        {props.children}
      </main>
    </div>
  )
}

export default Layout
