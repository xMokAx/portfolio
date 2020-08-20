import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const Head = ({
  customTitle,
  children,
  pageType,
  projects,
  project,
  posts,
  post,
  tag,
  pathname,
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

  let {
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
  siteUrl += "/"
  const ogUrl = `${siteUrl.slice(0, -1)}${pathname}`
  let ogImage = image
  let ogDescription = description
  const schemaJSON = [
    {
      "@context": "http://www.schema.org",
      "@type": "Person",
      "@id": `${siteUrl}#person`,
      name: author,
      alternateName: altAuthor,
      email,
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
      sameAs: contact,
    },
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}#site`,
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
        "styled components",
        "Bulma",
        "Materialize",
        "Bootstrap",
        "Javascript",
        "TypeScript",
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
          copyrightYear: "2020",
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
        description: ogDescription,
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
      //     url: `${siteUrl}projects/${project.slug}/`,
      //   })),
      // },
      // {
      //   "@context": "http://schema.org",
      //   "@type": "ItemList",
      //   name: "Featured Posts",
      //   itemListElement: posts.map(({ node: post }, i) => ({
      //     "@type": "ListItem",
      //     position: String(i + 1),
      //     url: `${siteUrl}blog/${post.slug}/`,
      //   })),
      // }
    )
  } else if (pageType === "about") {
    ogDescription = myDescription
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
            name: author,
            item: {
              "@id": siteUrl,
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: {
              "@id": ogUrl,
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
      description: ogDescription,
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
    ogDescription =
      "Here you can find some of the projects made by Ahmed Mokhtar using the latest technologies and their brief descriptions"
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
            name: author,
            item: {
              "@id": siteUrl,
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: {
              "@id": ogUrl,
            },
          },
        ],
      },
      headline: pageTitle,
      specialty: title,
      url: ogUrl,
      name: pageTitle,
      description: ogDescription,
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
          url: `${siteUrl}projects/${project.slug}/`,
        })),
      },
    })
  } else if (pageType === "project") {
    ogDescription = `${project.title} | ${project.description} | Created by ${author}`
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
            name: author,
            item: {
              "@id": siteUrl,
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: {
              "@id": `${siteUrl}projects/`,
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: {
              "@id": ogUrl,
            },
          },
        ],
      },
      headline: pageTitle,
      specialty: title,
      url: ogUrl,
      name: pageTitle,
      description: ogDescription,
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
    ogDescription = `Personal blog of ${author} where he writes about his personal thoughts, his learning journey and modern Web Development technologies`
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
                  name: author,
                  item: {
                    "@id": siteUrl,
                  },
                },
                {
                  "@type": "ListItem",
                  name: "Blog",
                  position: 2,
                  item: {
                    "@id": `${siteUrl}blog/`,
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: tag,
                  item: {
                    "@id": ogUrl,
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
                  name: author,
                  item: {
                    "@id": siteUrl,
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Blog",
                  item: {
                    "@id": ogUrl,
                  },
                },
              ],
            },
      headline: pageTitle,
      specialty: title,
      url: ogUrl,
      name: pageTitle,
      description: ogDescription,
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
            url: `${siteUrl}blog/${post.slug}/`,
          }
        }),
      },
    })
  } else if (pageType === "blogPost") {
    ogDescription = `${post.description}`
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
            name: author,
            item: {
              "@id": siteUrl,
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: {
              "@id": `${siteUrl}blog/`,
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: {
              "@id": ogUrl,
            },
          },
        ],
      },
      headline: pageTitle,
      specialty: title,
      url: ogUrl,
      name: pageTitle,
      description: ogDescription,
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
      <meta name="description" content={ogDescription} />

      <script type="application/ld+json">{JSON.stringify(schemaJSON)}</script>

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="628" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={ogDescription} />
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

// const HeadWithLocation = props => (
//   <Location>
//     {({ location }) => <Head location={location} {...props} />}
//   </Location>
// )

export default Head
