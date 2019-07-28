module.exports = {
  siteMetadata: {
    title: "Front-End Developer",
    author: "Ahmed Mokhtar",
    altAuthor: "A.Mokhtar",
    description:
      "Personal website of Ahmed Mokhtar. A self-taught self-motivated Front-End developer. He enjoys programming, solving problems and learning new technologies. He gives a great attention to details. The sense of achievement is the thing that keeps him going and makes him happy the most.",
    myDescription:
      "Ahmed Mokhtar is a self-taught self-motivated Front-End developer. He enjoys programming, solving problems and learning new technologies. He gives a great attention to details. The sense of achievement is the thing that keeps him going and makes him happy the most.",
    shortDescription: "Self-taught self-motivated Front-End developer",
    siteUrl: "https://ahmedmokhtar.dev/",
    image: "https://ahmedmokhtar.dev/img/og-image.jpg",
    schemaImage: "https://ahmedmokhtar.dev/img/ahmed-mokhtar.jpg",
    logo: "https://ahmedmokhtar.dev/img/logo.png",
    email: "ahmedmokhtar11j@gmail.com",
    contact: [
      "https://github.com/xMokAx",
      "https://www.linkedin.com/in/ahmedmokhtar-dev/",
      "https://twitter.com/ahmedmokhtardev",
      "https://www.facebook.com/ahmedmokka",
    ],
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    "gatsby-transformer-yaml",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/data/comments`,
        name: "comments",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/images`,
        name: "images",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 960,
              wrapperStyle: "margin: 1rem auto;",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/, // See below to configure properly
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GOOGLE_TAGMANAGER,
        // Include GTM in development.
        // includeInDevelopment: true,
      },
    },
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ahmed Mokhtar`,
        short_name: `A.Mokhtar`,
        description: `Ahmed Mokhtar Portfolio and Blog.`,
        display: `standalone`,
        icon: `src/images/logo.png`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#00A8E8`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
      },
    },
    // Enable HTTP/2 push for critical assets.
    "gatsby-plugin-netlify",
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Open+Sans:400,400i,600,600i,700&display=swap"],
        },
      },
    },
  ],
}
