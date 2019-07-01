import React from "react"

import Layout from "../components/layout"
import Head from "../components/head"
import ProjectsRoll from "../components/projectsRoll"
import PostsRoll from "../components/postsRoll"
import FeaturedTitle from "../components/featuredTitle"

const IndexPage = () => (
  <Layout>
    <Head title="" />
    <section>
      <FeaturedTitle title="Featured Projects" />
      <ProjectsRoll showFeaturedOnly />
    </section>
    <section>
      <FeaturedTitle title="Featured Posts" />
      <PostsRoll showFeaturedOnly />
    </section>
  </Layout>
)

export default IndexPage
