import React from "react"
import { Link } from "gatsby"

const Pagination = ({ currentPage, numPages, basePath }) => {
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === numPages
  const isNotPaginated = isFirstPage && isLastPage

  if (isNotPaginated) {
    return null
  }

  const prevPage =
    currentPage === 2 ? basePath : `${basePath}${currentPage - 1}/`
  const nextPage = `${basePath}${currentPage + 1}/`

  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      {isFirstPage ? (
        <span className="pagination-previous" disabled>
          &larr; Prev Page
        </span>
      ) : (
        <Link to={prevPage} className="pagination-previous">
          &larr; Prev Page
        </Link>
      )}

      {isLastPage ? (
        <span className="pagination-next" disabled>
          Next page &rarr;
        </span>
      ) : (
        <Link to={nextPage} className="pagination-next">
          Next page &rarr;
        </Link>
      )}

      <ul className="pagination-list">
        {Array.from({ length: numPages }).map((_, i) => {
          const page = i + 1
          const isCurrent = page === currentPage
          const path = page === 1 ? basePath : `${basePath}${page}/`
          if (isCurrent) {
            return (
              <li key={i}>
                <Link
                  to={path}
                  className="pagination-link is-current"
                  aria-label={`page ${i + 1}`}
                  aria-current="Page"
                >
                  {i + 1}
                </Link>
              </li>
            )
          } else {
            return (
              <li key={i}>
                <Link
                  to={path}
                  className="pagination-link"
                  aria-label={`Go to page ${i + 1}`}
                >
                  {i + 1}
                </Link>
              </li>
            )
          }
        })}
      </ul>
    </nav>
  )
}

export default Pagination
