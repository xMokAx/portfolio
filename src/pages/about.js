import React from "react"
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

import Layout from "../components/layout"
import Head from "../components/head"
import FeaturedTitle from "../components/featuredTitle"
import Techno from "../components/techno"

import Html from "../images/technologies/html.svg"
import Css from "../images/technologies/css.svg"
import Sass from "../images/technologies/sass.svg"
import Materialize from "../images/technologies/materialize.svg"
import Bulma from "../images/technologies/bulma.svg"
import Bootstrap from "../images/technologies/bootstrap.svg"
import Javascript from "../images/technologies/javascript.svg"
import ReactIcon from "../images/technologies/reactjs.svg"
import Redux from "../images/technologies/redux.svg"
import Next from "../images/technologies/next.svg"
import Gatsby from "../images/technologies/gatsby.svg"
import GraphQL from "../images/technologies/graphQL.svg"
import Express from "../images/technologies/express.svg"
import ReactNative from "../images/technologies/reactnative.svg"
import Node from "../images/technologies/node.svg"
import JQuery from "../images/technologies/jquery.svg"
import Redis from "../images/technologies/redis.svg"
import Firebase from "../images/technologies/firebase.svg"
import Git from "../images/technologies/git.svg"
import Github from "../images/technologies/github.svg"
import Webpack from "../images/technologies/webpack.svg"
import Babel from "../images/technologies/babel.svg"
import Gulp from "../images/technologies/gulp.svg"
import Aws from "../images/technologies/aws.svg"
import Netlify from "../images/technologies/netlify.svg"
import Heroku from "../images/technologies/heroku.svg"
import GithubPages from "../images/technologies/githubpages.svg"

const chartData = [
  { name: "HTML5", level: 90, color: "#E44D26" },
  { name: "CSS3", level: 80, color: "#42A5F5" },
  { name: "JS", level: 80, color: "#FFCA28" },
  { name: "React", level: 85, color: "#00BCD4" },
]

const AboutPage = () => (
  <Layout>
    <Head title="About" />
    <section>
      <FeaturedTitle title="About me" />
      <div className="section">
        <div className="container">
          <article className="content">
            <blockquote>
              <h2 className="has-text-black has-text-weight-bold">
                Hi, i'm Ahmed Mokhtar, a self-taught self-motivated front end
                web developer.
              </h2>
            </blockquote>
            <p className="has-text-weight-semibold">
              I enjoy programming, solving problems and learning new
              technologies. I give a great attention to details. The sense of
              achievment is the thing that keeps me going and makes me happy the
              most.
            </p>
            <h3>Current status</h3>
            <p className="has-text-weight-semibold">
              <em>
                I am available for hire and open to any ideas of cooperation.
              </em>
            </p>
            <h3>Current work</h3>
            <p className="has-text-weight-semibold">
              <em>I'm currently building a website for a small company.</em>
            </p>
            <h3>Todos</h3>
            <ul>
              <li>Learn Vue.js.</li>
              <li>Learn more about Webpack.</li>
              <li>Learn more about TypeScript.</li>
              <li>Learn more about node.js or learn Go lang.</li>
            </ul>
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
                  data={chartData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 12 }}
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
                          {chartData[index].name}
                        </tspan>
                      </text>
                    )}
                  >
                    {chartData.map(({ color }) => {
                      return <Cell key={color} fill={color} />
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <h3>All</h3>
            <div className="box is-flex flex-wrap">
              <Techno Icon={Html} title="HTML5" />
            </div>
            <div className="box is-flex flex-wrap">
              <Techno Icon={Css} title="CSS3" />
              <Techno Icon={Sass} title="Sass" />
              <Techno Icon={Bulma} title="Bulma" />
              <Techno Icon={Materialize} title="Materialize" />
              <Techno Icon={Bootstrap} title="Bootstrap" />
            </div>
            <div className="box is-flex flex-wrap">
              <Techno Icon={Javascript} title="JavaScript" />
              <Techno Icon={ReactIcon} title="React" />
              <Techno Icon={Redux} title="Redux" />
              <Techno Icon={Next} title="Next.js" />
              <Techno Icon={Gatsby} title="Gatsby" />
              <Techno Icon={GraphQL} title="GraphQL" />
              <Techno Icon={ReactNative} title="React Native" />
              <Techno Icon={Express} title="Express.js" />
              <Techno Icon={Node} title="Node.js" />
              <Techno Icon={JQuery} title="jQuery" />
            </div>
            <div className="box is-flex flex-wrap">
              <Techno Icon={Redis} title="Redis" />
              <Techno Icon={Firebase} title="Firebase" />
            </div>
            <div className="box is-flex flex-wrap">
              <Techno Icon={Git} title="Git" />
              <Techno Icon={Github} title="Github" />
              <Techno Icon={Webpack} title="Webpack" />
              <Techno Icon={Babel} title="Babel" />
              <Techno Icon={Gulp} title="Gulp" />
            </div>
            <div className="box is-flex flex-wrap">
              <Techno Icon={Aws} title="Aws" />
              <Techno Icon={Netlify} title="Netlify" />
              <Techno Icon={Heroku} title="Heroku" />
              <Techno Icon={GithubPages} title="Github Pages" />
            </div>
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
                  <li>Dedication</li>
                  <li>Fast Learner</li>
                  <li>Self-motivated</li>
                  <li>Confidence</li>
                  <li>integrity</li>
                </ul>
              </article>
              <article className="column">
                <h2 className="secondary-title has-text-black has-background-primary">
                  Hobbies
                </h2>
                <ul>
                  <li>
                    <span role="img" aria-label="Football">
                      ⚽️
                    </span>{" "}
                    Football
                  </li>
                  <li>
                    <span role="img" aria-label="Workout">
                      🏋🏾‍♂️
                    </span>{" "}
                    Workout
                  </li>
                  <li>
                    <span role="img" aria-label="Video Games">
                      🎮
                    </span>{" "}
                    Video Games
                  </li>
                  <li>
                    <span role="img" aria-label="Reading">
                      📚
                    </span>{" "}
                    Reading
                  </li>
                  <li>
                    <span role="img" aria-label="Drinking Coffe">
                      ☕️
                    </span>{" "}
                    Drinking Coffe
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default AboutPage
