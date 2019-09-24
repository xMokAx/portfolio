import React, { Fragment } from "react"
import { Link } from "gatsby"

import Head from "../components/head"

const NotFound = ({ location }) => (
  <Fragment>
    <Head pathname={location.pathname}>
      <title>404 | Page Not Found</title>
    </Head>
    <section className="is-flex flex-justify-center flex-align-center flex-vertical full-height">
      <h1 className="title is-size-4-mobile">404 | Page not found</h1>
      <p>
        <Link className="button is-primary" to="/">
          Home page
        </Link>
      </p>
    </section>
  </Fragment>
)

export default NotFound
