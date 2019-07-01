import React from "react"

import Layout from "../components/layout"
import Head from "../components/head"
import ProjectsRoll from "../components/projectsRoll"
import FeaturedTitle from "../components/featuredTitle"

const ProjectsPage = () => (
  <Layout>
    <Head title="Portfolio of" />
    <section>
      <FeaturedTitle title="Projects" />
      <ProjectsRoll />
    </section>
  </Layout>
)

export default ProjectsPage
