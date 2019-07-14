import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { Location } from "@reach/router"

const Head = ({
  customTitle,
  location,
  children,
  pageType,
  projects,
  project,
  posts,
  post,
  tag,
}) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          altAuthor
          siteUrl
          description
          shortDescription
          image
          schemaImage
          logo
          email
          contact
          myDescription
        }
      }
    }
  `)

  const {
    title,
    author,
    altAuthor,
    siteUrl,
    description,
    shortDescription,
    image,
    schemaImage,
    logo,
    email,
    contact,
    myDescription,
  } = data.site.siteMetadata
  const pageTitle = `${
    customTitle ? `${customTitle} ` : ""
  }${author} | ${title}`
  const ogUrl = location.href
  let ogImage = image

  const schemaJSON = [
    {
      "@context": "http://www.schema.org",
      "@type": "Person",
      "@id": `${siteUrl}#person`,
      name: author,
      alternateName: altAuthor,
      email,
      nationality: "Egyptian",
      birthPlace: {
        "@type": "Place",
        address: {
          "@id": "address",
          "@type": "PostalAddress",
          addressLocality: "Port Fouad",
          addressRegion: "Port Said",
          addressCountry: "Egypt",
        },
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "Udacity",
          sameAs: "https://www.udacity.com/",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "Faculty of Science",
        },
      ],
      gender: "Male",
      Description: myDescription,
      disambiguatingDescription: shortDescription,
      jobTitle: title,
      url: siteUrl,
      image: {
        "@type": "ImageObject",
        "@id": schemaImage,
        url: schemaImage,
        height: 512,
        width: 512,
      },
      address: {
        "@id": "address",
      },
      sameAs: contact,
    },
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}site`,
      additionalType: ["CreativeWork", "Person"],
      url: siteUrl,
      name: author,
      alternateName: altAuthor,
      headline: `${author} | ${title}`,
      image: {
        "@id": schemaImage,
      },
      inLanguage: "en-US",
      author: {
        "@id": `${siteUrl}#person`,
      },
      creator: {
        "@id": `${siteUrl}#person`,
      },
      description,
      isFamilyFriendly: "http://schema.org/True",
      contentRating: "NR",
      publisher: {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: author,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          "@id": logo,
          url: logo,
          height: 512,
          width: 512,
        },
      },
      keywords: [
        "Web Developer",
        "JavaScript Developer",
        "React Developer",
        "Front-End",
        "Responsive Design",
        "HTML5",
        "CSS3",
        "Sass",
        "Bulma",
        "Materialize",
        "Bootstrap",
        "Javascript",
        "React",
        "Redux",
        "Next.js",
        "Gatsby",
        "GraphQL",
        "React Native",
        "Express.js",
        "Node.js",
        "jQuery",
        "Redis",
        "Firebase",
        "Git",
        "Github",
        "Webpack",
        "Babel",
        "Gulp",
        "AWS",
        "Netlify",
        "Heroku",
        "Github Pages",
        "Contentful",
      ],
      hasPart: [
        {
          "@context": "http://schema.org/",
          "@type": "WPHeader",
          headline: `${author} | ${title}`,
          "@id": "#header",
          cssSelector: "#header",
          "@graph": [
            {
              "@context": "https://schema.org",
              "@type": "SiteNavigationElement",
              "@id": "#header",
              name: "Home",
              url: "https://ahmedmokhtar.dev/",
            },
            {
              "@context": "https://schema.org",
              "@type": "SiteNavigationElement",
              "@id": "#header",
              name: "About",
              url: "https://ahmedmokhtar.dev/about/",
            },
            {
              "@context": "https://schema.org",
              "@type": "SiteNavigationElement",
              "@id": "#header",
              name: "Projects",
              url: "https://ahmedmokhtar.dev/projects/",
            },
            {
              "@context": "https://schema.org",
              "@type": "SiteNavigationElement",
              "@id": "#header",
              name: "Blog",
              url: "https://ahmedmokhtar.dev/blog/",
            },
          ],
        },
        {
          "@context": "http://schema.org/",
          "@type": "WPFooter",
          cssSelector: "#footer",
          "@id": "#footer",
          copyrightHolder: {
            "@id": `${siteUrl}#organization`,
          },
          publisher: {
            "@id": `${siteUrl}#organization`,
          },
          copyrightYear: "2019",
        },
      ],
    },
  ]

  if (pageType === "home") {
    schemaJSON.push(
      {
        "@context": "http://schema.org",
        "@type": "Webpage",
        "@id": ogUrl,
        additionalType: ["CollectionPage", "Blog"],
        headline: pageTitle,
        specialty: title,
        url: ogUrl,
        name: pageTitle,
        mainContentOfPage: {
          "@context": "http://schema.org/",
          "@type": "WebPageElement",
          cssSelector: ".main-container",
        },
        primaryImageOfPage: {
          "@id": schemaImage,
        },
        author: {
          "@id": `${siteUrl}#person`,
        },
        creator: {
          "@id": `${siteUrl}#person`,
        },
        publisher: {
          "@id": `${siteUrl}#organization`,
        },
      }
      // Error: Multiple ItemList markups on a page are not allowed.
      // {
      //   "@context": "http://schema.org",
      //   "@type": "ItemList",
      //   name: "Featured Projects",
      //   itemListElement: projects.map(({ node: project }, i) => ({
      //     "@type": "ListItem",
      //     position: String(i + 1),
      //     url: `${siteUrl}/projects/${project.slug}/`,
      //   })),
      // },
      // {
      //   "@context": "http://schema.org",
      //   "@type": "ItemList",
      //   name: "Featured Posts",
      //   itemListElement: posts.map(({ node: post }, i) => ({
      //     "@type": "ListItem",
      //     position: String(i + 1),
      //     url: `${siteUrl}/blog/${post.slug}/`,
      //   })),
      // }
    )
  } else if (pageType === "about") {
    schemaJSON.push({
      "@context": "http://schema.org",
      "@type": "AboutPage",
      "@id": ogUrl,
      breadcrumb: {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": siteUrl,
              name: author,
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@id": ogUrl,
              name: "About",
            },
          },
        ],
      },
      additionalType: ["Person"],
      headline: pageTitle,
      specialty: title,
      url: ogUrl,
      about: {
        "@id": `${siteUrl}#person`,
      },
      name: pageTitle,
      mainContentOfPage: {
        "@context": "http://schema.org/",
        "@type": "WebPageElement",
        cssSelector: ".main-container",
      },
      primaryImageOfPage: {
        "@id": schemaImage,
      },
      author: {
        "@id": `${siteUrl}#person`,
      },
      creator: {
        "@id": `${siteUrl}#person`,
      },
      publisher: {
        "@id": `${siteUrl}#organization`,
      },
    })
  } else if (pageType === "projects") {
    schemaJSON.push({
      "@context": "http://schema.org",
      "@type": "CollectionPage",
      "@id": ogUrl,
      breadcrumb: {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": siteUrl,
              name: author,
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@id": ogUrl,
              name: "Projects",
            },
          },
        ],
      },
      headline: pageTitle,
      specialty: title,
      url: ogUrl,
      name: pageTitle,
      mainContentOfPage: {
        "@context": "http://schema.org/",
        "@type": "WebPageElement",
        cssSelector: ".main-container",
      },
      primaryImageOfPage: {
        "@id": schemaImage,
      },
      author: {
        "@id": `${siteUrl}#person`,
      },
      creator: {
        "@id": `${siteUrl}#person`,
      },
      publisher: {
        "@id": `${siteUrl}#organization`,
      },
      mainEntity: {
        "@context": "http://schema.org",
        "@type": "ItemList",
        mainEntityOfPage: ogUrl,
        itemListElement: projects.map(({ node: project }, i) => ({
          "@type": "ListItem",
          position: String(i + 1),
          url: `${siteUrl}/projects/${project.slug}/`,
        })),
      },
    })
  } else if (pageType === "project") {
    ogImage = `https:${project.featuredImage.ogImage.src}`
    schemaJSON.push({
      "@context": "http://schema.org",
      "@type": "WebPage",
      "@id": ogUrl,
      breadcrumb: {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": siteUrl,
              name: author,
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@id": `${siteUrl}/projects/`,
              name: "Projects",
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@id": ogUrl,
              name: project.title,
            },
          },
        ],
      },
      headline: pageTitle,
      specialty: title,
      url: ogUrl,
      name: pageTitle,
      mainContentOfPage: {
        "@context": "http://schema.org/",
        "@type": "WebPageElement",
        cssSelector: ".main-container",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        "@id": ogImage,
        url: ogImage,
        width: "1200",
        height: "628",
      },
      author: {
        "@id": `${siteUrl}#person`,
      },
      creator: {
        "@id": `${siteUrl}#person`,
      },
      publisher: {
        "@id": `${siteUrl}#organization`,
      },
      mainEntity: {
        "@context": "http://schema.org",
        "@type": "Article",
        name: project.title,
        headline: project.title,
        keywords: project.technologies,
        image: {
          "@id": ogImage,
        },
        author: {
          "@id": `${siteUrl}#person`,
        },
        creator: {
          "@id": `${siteUrl}#person`,
        },
        publisher: {
          "@id": `${siteUrl}#organization`,
        },
        dateCreated: project.createdAtISO,
        datePublished: project.publishDateISO,
        dateModified: project.updatedAtISO,
        description: project.description,
        mainEntityOfPage: ogUrl,
      },
    })
  } else if (pageType === "blog" || pageType === "tag") {
    schemaJSON.push({
      "@context": "http://schema.org",
      "@type": "CollectionPage",
      additionalType: "Blog",
      "@id": ogUrl,
      breadcrumb:
        pageType === "tag"
          ? {
              "@context": "http://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@id": siteUrl,
                    name: author,
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@id": `${siteUrl}blog/`,
                    name: "Blog",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@id": ogUrl,
                    name: tag,
                  },
                },
              ],
            }
          : {
              "@context": "http://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@id": siteUrl,
                    name: author,
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@id": ogUrl,
                    name: "Blog",
                  },
                },
              ],
            },
      headline: pageTitle,
      specialty: title,
      url: ogUrl,
      name: pageTitle,
      mainContentOfPage: {
        "@context": "http://schema.org/",
        "@type": "WebPageElement",
        cssSelector: ".main-container",
      },
      primaryImageOfPage: {
        "@id": schemaImage,
      },
      author: {
        "@id": `${siteUrl}#person`,
      },
      creator: {
        "@id": `${siteUrl}#person`,
      },
      publisher: {
        "@id": `${siteUrl}#organization`,
      },
      mainEntity: {
        "@context": "http://schema.org",
        "@type": "ItemList",
        mainEntityOfPage: ogUrl,
        itemListElement: posts.map((post, i) => {
          post = post.node ? post.node : post
          return {
            "@type": "ListItem",
            position: String(i + 1),
            url: `${siteUrl}/blog/${post.slug}/`,
          }
        }),
      },
    })
  } else if (pageType === "blogPost") {
    ogImage = `https:${post.featuredImage.ogImage.src}`
    schemaJSON.push({
      "@context": "http://schema.org",
      "@type": "WebPage",
      "@id": ogUrl,
      breadcrumb: {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": siteUrl,
              name: author,
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@id": `${siteUrl}/blog/`,
              name: "Blog",
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@id": ogUrl,
              name: post.title,
            },
          },
        ],
      },
      headline: pageTitle,
      specialty: title,
      url: ogUrl,
      name: pageTitle,
      mainContentOfPage: {
        "@context": "http://schema.org/",
        "@type": "WebPageElement",
        cssSelector: ".main-container",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        "@id": ogImage,
        url: ogImage,
        width: "1200",
        height: "628",
      },
      author: {
        "@id": `${siteUrl}#person`,
      },
      creator: {
        "@id": `${siteUrl}#person`,
      },
      publisher: {
        "@id": `${siteUrl}#organization`,
      },
      mainEntity: {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        name: post.title,
        headline: post.title,
        url: ogUrl,
        keywords: post.tags.map(tag => tag.name),
        image: {
          "@id": ogImage,
        },
        author: {
          "@id": `${siteUrl}#person`,
        },
        creator: {
          "@id": `${siteUrl}#person`,
        },
        publisher: {
          "@id": `${siteUrl}#organization`,
        },
        dateCreated: post.createdAtISO,
        datePublished: post.publishDateISO,
        dateModified: post.updatedAtISO,
        description: post.description,
        wordcount: post.body.childMarkdownRemark.wordCount.words,
        mainEntityOfPage: ogUrl,
      },
    })
  }

  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={pageTitle}
      defer={false}
    >
      <meta name="description" content={description} />

      <script type="application/ld+json">{JSON.stringify(schemaJSON)}</script>

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="628" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@ahmedmokhtardev" />

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
