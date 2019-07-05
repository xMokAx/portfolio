import React from "react"
import { Link } from "gatsby"

const NavLink = ({ to, onClick, children, partiallyActive = false }) => (
  <li>
    <Link
      to={to}
      activeClassName="is-active"
      onClick={onClick}
      partiallyActive={partiallyActive}
    >
      <p
        className="is-flex flex-align-center"
        style={{ width: "92px", margin: "auto" }}
      >
        {children}
      </p>
    </Link>
  </li>
)

export default NavLink
