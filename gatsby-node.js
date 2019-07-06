const path = require("path")

const postsPerPage = 6

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  createRedirect({
    fromPath: "https://optimistic-brattain-d29c19.netlify.com/*",
    toPath: "https://ahmedmokhtar.dev/:splat",
    isPermanent: true,
    force: true,
  })

  createRedirect({
    fromPath: "http://optimistic-brattain-d29c19.netlify.com/*",
    toPath: "https://ahmedmokhtar.dev/:splat",
    isPermanent: true,
    force: true,
  })

  const blogTemplate = path.resolve("./src/templates/blog.js")
  const tagTemplate = path.resolve("./src/templates/tag.js")
  const blogPostTemplate = path.resolve("./src/templates/blogPost.js")
  const projectTemplate = path.resolve("./src/templates/project.js")

  const res = await graphql(`
    query {
      allContentfulBlogPost(
        sort: { fields: [publishDate], order: DESC }
        limit: 10000
      ) {
        edges {
          node {
            slug
          }
        }
      }
      allContentfulTag {
        edges {
          node {
            slug
            name
            blog_post {
              id
            }
          }
        }
      }
      allContentfulProject(sort: { fields: [publishDate], order: DESC }) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  const blogPosts = res.data.allContentfulBlogPost.edges
  const tags = res.data.allContentfulTag.edges
  const projects = res.data.allContentfulProject.edges
  const numPages = Math.ceil(blogPosts.length / postsPerPage)

  Array.from({ length: numPages }).forEach(async (_, i) => {
    const path = i === 0 ? "/blog/" : `/blog/${i + 1}/`
    await createPage({
      path,
      component: blogTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  tags.forEach(({ node: tag }) => {
    const totalPosts = tag.blog_post !== null ? tag.blog_post.length : 0
    const numPages = Math.ceil(totalPosts / postsPerPage)
    Array.from({ length: numPages }).forEach(async (_, i) => {
      const path = i === 0 ? `/tag/${tag.slug}/` : `/tag/${tag.slug}/${i + 1}/`
      await createPage({
        path,
        component: tagTemplate,
        context: {
          slug: tag.slug,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages: numPages,
          currentPage: i + 1,
        },
      })
    })
  })

  blogPosts.forEach(async ({ node: blogPost }, i, blogPosts) => {
    const prev = i === 0 ? null : blogPosts[i - 1].node
    const next = i === blogPosts.length - 1 ? null : blogPosts[i + 1].node
    await createPage({
      component: blogPostTemplate,
      path: `/blog/${blogPost.slug}/`,
      context: {
        slug: blogPost.slug,
        prev,
        next,
      },
    })
  })

  projects.forEach(async ({ node: project }) => {
    await createPage({
      component: projectTemplate,
      path: `/projects/${project.slug}/`,
      context: {
        slug: project.slug,
      },
    })
  })
}
