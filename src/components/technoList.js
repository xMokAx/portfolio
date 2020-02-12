import React from "react"

import Techno from "./techno"

const TechnoList = ({ allSkills, svgs }) =>
  Object.entries(allSkills).map(([category, skills]) => {
    return (
      <div key={category} className="box is-flex flex-wrap">
        {skills.map(tech => {
          const mySvg = svgs.find(s => {
            return s.svg.absolutePath.includes(
              `${tech.toLowerCase().replace(/[^a-zA-Z]+/g, "")}.svg`
            )
          })
          return <Techno key={tech} icon={mySvg.svg.content} title={tech} />
        })}
      </div>
    )
  })

export default TechnoList
