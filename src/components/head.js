import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { Location } from "@reach/router"

const Head = ({ title, location, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          siteUrl
          description
          image
        }
      }
    }
  `)
  const { author, description, image } = data.site.siteMetadata
  const siteTitle = data.site.siteMetadata.title
  const pageTitle = `${title ? `${title} ` : ""}${author} | ${siteTitle}`
  const ogUrl = location.href
  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={pageTitle}
      defer={false}
    >
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      <meta name="msapplication-config" content="/browserconfig.xml" />
      <link
        rel="mask-icon"
        href="/img/safari-pinned-tab.svg"
        color="#00a8e8"
      ></link>

      {children && children}
    </Helmet>
  )
}

const HeadWithLocation = props => (
  <Location>
    {({ location }) => <Head location={location} {...props} />}
  </Location>
)

export default HeadWithLocation
