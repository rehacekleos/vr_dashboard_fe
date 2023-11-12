export type GraphSetting = PositionGraph | RotationGraph | RotationPolarGraph | DifferenceGraph | PositionHeatMapGraph;
export type GraphPart = "head" | "left_hand" | "right_hand"
export type GraphType = "position" | "position-differential" | "position-heatmap" | "rotation" | "rotation-polar"
export type Axis = "x" | "y" | "z";


export type PositionGraph = {
  type: "position"
  part: GraphPart
  display: boolean
}

export type PositionHeatMapGraph = {
  type: "position-heatmap"
  part: GraphPart
  display: boolean
  x_axis_unit?: string;
  y_axis_unit?: string
}

export type RotationGraph = {
  type: "rotation"
  part: GraphPart
  display: boolean,
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
  recommended_max?: number,
  recommended_min?: number,
  unit?: string,
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
