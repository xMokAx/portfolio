import React, { Component } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

// import FacebookIcon from "../images/social/facebook.svg"
// import TwitterIcon from "../images/social/twitter.svg"
import GithubIcon from "../images/social/github-circle.svg"
import LinkedinIcon from "../images/social/linkedin.svg"
import Email from "../images/social/email.svg"
import HomeIcon from "../images/menu/home.svg"
import AboutIcon from "../images/menu/about.svg"
import ProjectsIcon from "../images/menu/projects.svg"
import BlogIcon from "../images/menu/blog.svg"
import CvIcon from "../images/menu/cv.svg"

import NavLink from "./navLink"

class Nav extends Component {
  state = {
    isMenuActive: false,
  }

  onMenuButtonClick = () => {
    this.setState(prevState => ({
      isMenuActive: !prevState.isMenuActive,
    }))
  }

  onNavLinkClick = () => {
    if (this.state.isMenuActive) {
      this.setState({
        isMenuActive: false,
      })
    }
  }

  render() {
    const author = this.props.data.site.siteMetadata.author
    return (
      <nav className="nav-container has-background-black is-flex flex-vertical">
        <div className="nav-bar is-flex flex-justify-center flex-align-center is-hidden-desktop">
          <Link to="/">
            <Image
              fluid={this.props.data.file.childImageSharp.fluid}
              className="logo-image is-circle"
              alt="Ahmed Mokhtar Photo"
            />
          </Link>
          <Link
            to="/"
            className="has-text-centered"
            style={{ margin: "0 auto" }}
          >
            <h1 className="title is-size-4-tablet is-size-5-mobile has-text-primary">
              {author}
            </h1>
            <h2 className="subtitle is-size-5-tablet is-size-6-mobile has-text-grey-lighter">
              Front End Developer
            </h2>
          </Link>

          <button
            onClick={this.onMenuButtonClick}
            className={`navbar-burger button is-black ${
              this.state.isMenuActive ? "is-active" : ""
            }`}
            id="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div
          id="nav-menu"
          className={`menu nav-menu has-text-centered ${
            this.state.isMenuActive ? "" : "is-hidden-touch"
          }`}
        >
          <ul className="menu-list">
            <NavLink to="/" onClick={this.onNavLinkClick}>
              <HomeIcon className="menu-icon" />
              Home
            </NavLink>
            <NavLink to="/about/" onClick={this.onNavLinkClick}>
              <AboutIcon className="menu-icon" />
              About
            </NavLink>
            <NavLink
              to="/projects/"
              onClick={this.onNavLinkClick}
              partiallyActive
            >
              <ProjectsIcon className="menu-icon" />
              Projects
            </NavLink>
            <NavLink to="/blog/" onClick={this.onNavLinkClick} partiallyActive>
              <BlogIcon className="menu-icon" />
              Blog
            </NavLink>
            <li>
              {/* https://1drv.ms/b/s!AsXcHhRznIWpiiFpakzHkf9tBkOG */}
              {/* https://www.dropbox.com/s/x4iv66w1ujiglde/ahmed-mokhtar-resume.pdf?dl=0 */}
              <a
                href="https://drive.google.com/file/d/1I4u9A2sYyqn8Xv0dZSagragJspo1zrsa/view?usp=sharing"
                onClick={this.onNavLinkClick}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p
                  className="is-flex flex-align-center"
                  style={{ width: "92px", margin: "auto" }}
                >
                  <CvIcon className="menu-icon" />
                  Resume
                </p>
              </a>
            </li>
          </ul>
          <div className="contact-container is-flex flex-justify-center flex-align-center">
            {/* <a
            href="https://www.facebook.com/ahmedmokka"
            target="_blank"
            rel="noopener noreferrer"
            className="contact shadow"
            aria-label={`${author}'s facebook`}
          >
            <FacebookIcon /> */}
            <a
              href="mailto:ahmedmokhtar11j@gmail.com"
              className="contact shadow"
              aria-label={`${author}'s email`}
            >
              <Email />
            </a>
            {/* <a
              href="https://twitter.com/A_Moka_"
              target="_blank"
              rel="noopener noreferrer"
              className="contact shadow"
              aria-label={`${author}'s twitter`}
            >
              <TwitterIcon />
            </a> */}
            <a
              href="https://github.com/xMokAx"
              target="_blank"
              rel="noopener noreferrer"
              className="contact shadow"
              aria-label={`${author}'s github`}
            >
              <GithubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmed-mokhtar-a363b818a/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact shadow"
              aria-label={`${author}'s linkedin`}
            >
              <LinkedinIcon />
            </a>
          </div>
          <p className="has-text-grey is-size-7 has-text-centered">
            Created by {author}, © 2019
          </p>
        </div>
      </nav>
    )
  }
}

const NavBar = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
      file(relativePath: { eq: "ahmed-mokhtar.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 128, maxHeight: 128) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return <Nav data={data} />
}

export default NavBar
