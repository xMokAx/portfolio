import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

// import FacebookIcon from "../images/social/facebook.svg"
import TwitterIcon from "../images/social/twitter.svg"
import GithubIcon from "../images/social/github.svg"
import LinkedinIcon from "../images/social/linkedin.svg"
import Email from "../images/social/email.svg"
import HomeIcon from "../images/menu/home.svg"
import AboutIcon from "../images/menu/about.svg"
import ProjectsIcon from "../images/menu/projects.svg"
import BlogIcon from "../images/menu/blog.svg"
import CvIcon from "../images/menu/cv.svg"
import Logo from "../images/logo.svg"

import NavLink from "./navLink"

const NavBar = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
          title
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

  const [isMenuActive, setIsMenuActive] = useState(false)

  const onMenuButtonClick = () => {
    setIsMenuActive(!isMenuActive)
  }

  const onNavLinkClick = () => {
    if (isMenuActive) {
      setIsMenuActive(false)
    }
  }

  const { author, title } = data.site.siteMetadata
  return (
    <nav id="#header" className="nav-container is-flex flex-vertical">
      <div className="nav-bar has-background-black is-flex flex-justify-center flex-align-center is-hidden-desktop">
        <Link to="/">
          <Image
            fluid={data.file.childImageSharp.fluid}
            className="logo-image is-circle"
            alt="Ahmed Mokhtar Photo"
          />
        </Link>
        <Link to="/" className="has-text-centered" style={{ margin: "0 auto" }}>
          <h1 className="title is-size-4-tablet is-size-5-mobile has-text-primary">
            {author}
          </h1>
          <h2 className="subtitle is-size-5-tablet is-size-6-mobile has-text-grey-lighter">
            {title}
          </h2>
        </Link>

        <button
          onClick={onMenuButtonClick}
          className={`navbar-burger button is-black ${
            isMenuActive ? "is-active" : ""
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
        className={`menu nav-menu has-background-black has-text-centered ${
          isMenuActive ? "expand-menu" : "collapse-menu"
        }`}
      >
        <ul className="menu-list">
          <NavLink to="/" onClick={onNavLinkClick}>
            <HomeIcon className="menu-icon" />
            Home
          </NavLink>
          <NavLink to="/about/" onClick={onNavLinkClick}>
            <AboutIcon className="menu-icon" />
            About
          </NavLink>
          <NavLink to="/projects/" onClick={onNavLinkClick} partiallyActive>
            <ProjectsIcon className="menu-icon" />
            Projects
          </NavLink>
          <NavLink to="/blog/" onClick={onNavLinkClick} partiallyActive>
            <BlogIcon className="menu-icon" />
            Blog
          </NavLink>
          <li>
            <a
              href="https://drive.google.com/file/d/1GyyJtCCOFWvNP5fO38axAcYBMiEX-zyl/view?usp=sharing"
              onClick={onNavLinkClick}
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
            className="contact scale"
            aria-label={`${author}'s facebook`}
          >
            <FacebookIcon />
          </a> */}
          <a
            href="mailto:ahmedmokhtar11j@gmail.com"
            className="contact scale"
            aria-label={`${author}'s email`}
          >
            <Email />
          </a>
          <a
            href="https://twitter.com/ahmedmokhtardev"
            target="_blank"
            rel="noopener noreferrer"
            className="contact scale"
            aria-label={`${author}'s twitter`}
          >
            <TwitterIcon />
          </a>
          <a
            href="https://github.com/xMokAx"
            target="_blank"
            rel="noopener noreferrer"
            className="contact scale"
            aria-label={`${author}'s github`}
          >
            <GithubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/ahmedmokhtar-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact scale"
            aria-label={`${author}'s linkedin`}
          >
            <LinkedinIcon />
          </a>
        </div>
        <footer id="#footer">
          <p className="is-flex flex-align-center flex-justify-center has-text-grey has-text-centered">
            <Logo className="logo" />
            <small>© 2019 {author}.</small>
          </p>
        </footer>
      </div>
    </nav>
  )
}

export default NavBar
