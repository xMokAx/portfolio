import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Head from "../components/head"

const NotFound = () => (
  <Layout>
    <Head>
      <title>404 | Page Not Found</title>
    </Head>
    <section
      className="is-flex flex-justify-center flex-align-center flex-vertical"
      style={{ height: "100%" }}
    >
      <h1 className="title is-size-4-mobile">404 | Page not found</h1>
      <p>
        <Link className="button is-primary" to="/">
          Home page
        </Link>
      </p>
    </section>
  </Layout>
)

export default NotFound
