import React from "react"
import { Link } from "gatsby"

import PostCard from "../components/postCard"
import Pagination from "../components/pagination"

const PostsRoll = ({ homePage, posts, paginationProps }) => {
  return (
    <div className="section">
      <div className="container">
        <div className="columns is-centered is-multiline">
          {posts.map(post => {
            post = post.node ? post.node : post
            const {
              id,
              title,
              publishDate,
              slug,
              featured,
              body,
              tags,
              featuredImage,
              description,
            } = post
            const { timeToRead } = body.childMarkdownRemark
            return (
              <div className="column is-12 is-6-widescreen" key={id}>
                <PostCard
                  homePage={homePage}
                  title={title}
                  publishDate={publishDate}
                  timeToRead={timeToRead}
                  description={description}
                  tags={tags}
                  slug={slug}
                  featuredImage={featuredImage}
                  featured={featured}
                />
              </div>
            )
          })}
        </div>
        {homePage && (
          <div className="column is-12 is-flex flex-justify-center">
            <Link className="button is-primary is-large" to="/blog/">
              All Posts
            </Link>
          </div>
        )}
        {paginationProps && (
          <Pagination
            currentPage={paginationProps.currentPage}
            numPages={paginationProps.numPages}
            basePath={paginationProps.basePath}
          />
        )}
      </div>
    </div>
  )
}

export default PostsRoll
