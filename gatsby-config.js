module.exports = {
  siteMetadata: {
    title: "Portfolio",
    author: "Ahmed Mokhtar",
    description:
      "i'm a self-taught self-motivated front end web developer. I enjoy programming, solving problems and learning new technologies. I give a great attention to details. The sense of achievment is the thing that keeps me going and makes me happy the most.",
    url: "https://ahmedmokhtar.com/",
    image: "https://ahmedmokhtar.com/src/images/ahmed-mokhtar.jpg",
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
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
}