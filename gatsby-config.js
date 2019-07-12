module.exports = {
  siteMetadata: {
    title: "Front End Developer",
    author: "Ahmed Mokhtar",
    description:
      "A self-taught self-motivated front-end web developer. I enjoy programming, solving problems and learning new technologies. I give a great attention to details. The sense of achievment is the thing that keeps me going and makes me happy the most.",
    siteUrl: "https://ahmedmokhtar.dev/",
    image: "https://ahmedmokhtar.dev/img/og-image.jpg",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
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
        includeInDevelopment: true,
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
          families: ["Lato:400,600,700"],
        },
      },
    },
  ],
}
