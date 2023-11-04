export type GraphSetting = PositionGraph | MultipleAxisGraph | RotationPolarGraph | DifferenceGraph;
export type GraphPart = "head" | "left_hand" | "right_hand"
export type GraphType = "position" | "position-differential" | "position-heatmap" | "rotation" | "rotation-polar"
export type Axis = "x" | "y" | "z";


export type PositionGraph = {
  type: "position" | "position-heatmap"
  part: GraphPart
  display: boolean
}

export type MultipleAxisGraph = {
  type: "rotation"
  part: GraphPart
  display: boolean
  axis: {
    x: boolean
    y: boolean
    z: boolean
  }
}

export type DifferenceGraph = {
  type: "position-differential"
  part: GraphPart
  diff: "absolute" | "avg"
  display: boolean
  axis: {
    x: boolean
    y: boolean
    z: boolean
  }
}

export type RotationPolarGraph = {
  type: "rotation-polar"
  part: GraphPart
  display: boolean
  axis: Axis
}
