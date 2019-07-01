import React from "react"

import Layout from "../components/layout"
import Head from "../components/head"
import PostsRoll from "../components/postsRoll"
import FeaturedTitle from "../components/featuredTitle"

const BlogPage = () => (
  <Layout>
    <Head title="Blog of" />
    <section>
      <FeaturedTitle title="Blog" />
      <PostsRoll />
    </section>
  </Layout>
)

export default BlogPage
