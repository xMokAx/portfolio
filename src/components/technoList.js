import React from "react"

import Techno from "./techno"

const TechnoList = ({ icons }) => (
  <div className="box is-flex flex-wrap">
    {icons.map(({ Icon, title }) => (
      <Techno key={title} Icon={Icon} title={title} />
    ))}
  </div>
)

export default TechnoList
