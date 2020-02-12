import React, { Fragment } from "react"
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { graphql } from "gatsby"

import Head from "../components/head"
import FeaturedTitle from "../components/featuredTitle"
import TechnoList from "../components/technoList"

export const query = graphql`
  query {
    contentfulAboutPage {
      title
      description {
        childMarkdownRemark {
          html
        }
      }
      mainSkills {
        id
        name
        color
        level
      }
      allSkills {
        languages
        frameworks
        databases
        tools
        hosting
        cms
      }
      personality
      hobbies
    }
    allContentfulAsset {
      nodes {
        svg {
          content
          dataURI
          absolutePath
          relativePath
        }
      }
    }
  }
`

const AboutPage = ({ location, data }) => {
  const {
    title,
    description,
    mainSkills,
    allSkills,
    personality,
    hobbies,
  } = data.contentfulAboutPage
  const svgs = data.allContentfulAsset.nodes.filter(s => s.svg)
  const html = description.childMarkdownRemark.html

  return (
    <Fragment>
      <Head customTitle="About" pageType="about" pathname={location.pathname} />
      <section>
        <FeaturedTitle title={title} />
        <div className="section">
          <div className="container">
            <article className="content">
              <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </article>
          </div>
        </div>

        <div className="section">
          <div className="container">
            <article className="content">
              <h2 className="secondary-title has-text-black has-background-primary">
                Skills
              </h2>
              <h3>Main</h3>
              <div style={{ maxWidth: "900px" }}>
                <ResponsiveContainer
                  aspect={4 / 3}
                  minWidth="272px"
                  className="is-size-7-mobile has-text-weight-semibold"
                >
                  <BarChart
                    data={mainSkills}
                    margin={{ top: 5, right: 5, bottom: 5, left: 16 }}
                  >
                    <CartesianGrid />
                    <XAxis dataKey="name" tick={false} />
                    <YAxis
                      domain={[0, 100]}
                      tickLine={false}
                      tickFormatter={value => {
                        switch (value) {
                          case 100:
                            return "Pro."
                          case 75:
                            return "Expert"
                          case 50:
                            return "Medium"
                          case 25:
                            return "Beginner"
                          default:
                            return ""
                        }
                      }}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="level"
                      unit="%"
                      fill="#00A8E8"
                      label={({ value, index, x, y, width, height }) => (
                        <text
                          x={x + width / 2}
                          y={y + height - 60}
                          textAnchor="middle"
                          className="has-text-weight-semibold"
                          fill="#00171F"
                        >
                          <tspan
                            x={x + width / 2}
                            dy="10"
                            opacity="0.4"
                            className="is-size-5-mobile is-size-2-tablet is-size-1-desktop"
                          >
                            {value}
                            <tspan className="is-size-6">%</tspan>
                          </tspan>
                          <tspan
                            x={x + width / 2}
                            dy="30"
                            className="is-size-6-tablet is-size-7-mobile is-size-5-desktop"
                          >
                            {mainSkills[index].name}
                          </tspan>
                        </text>
                      )}
                    >
                      {mainSkills.map(({ color }) => {
                        return <Cell key={color} fill={color} />
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <h3>All</h3>
              <TechnoList allSkills={allSkills} svgs={svgs} />
            </article>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="content">
              <div className="columns">
                <article className="column">
                  <h2 className="secondary-title has-text-black has-background-primary">
                    Personality
                  </h2>
                  <ul>
                    {personality.map(p => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
                <article className="column">
                  <h2 className="secondary-title has-text-black has-background-primary">
                    Hobbies
                  </h2>
                  <ul>
                    {hobbies.map(h => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default AboutPage
