import * as ShortId from "shortid"

import { ActionType } from "./events"

interface NodeIdPrefix {
  GraphNodeIdPrefix: string
  ContainerNodeIdPrefix: string
  RowNodeIdPrefix: string
  ColumnNodeIdPrefix: string
  ContentHolderNodeIdPrefix: string
}

const Prefix: NodeIdPrefix = {
  GraphNodeIdPrefix: "gph_",
  ContainerNodeIdPrefix: "con_",
  RowNodeIdPrefix: "row_",
  ColumnNodeIdPrefix: "col_",
  ContentHolderNodeIdPrefix: "cth_",
}

class NodeId {
  static gen(action: ActionType): string {
    switch (action) {
      case ActionType.CreateGraph:
        return Prefix.GraphNodeIdPrefix + ShortId.generate()
      case ActionType.CreateContainer:
        return Prefix.ContainerNodeIdPrefix + ShortId.generate()
      case ActionType.CreateRow:
        return Prefix.RowNodeIdPrefix + ShortId.generate()
      case ActionType.CreateColumn:
        return Prefix.ColumnNodeIdPrefix + ShortId.generate()
      case ActionType.CreateContentHolder:
        return Prefix.ContentHolderNodeIdPrefix + ShortId.generate()
      default:
        throw new Error("Action " + action + " not recognised")
    }
  }

  static throwIfNotValid(val: string) {
    const prefixes = Object.keys(Prefix).map(
      (key: keyof NodeIdPrefix) => Prefix[key],
    )

    const prefix = val.substr(0, 4)
    const rest = val.substr(4)

    const hasPrefix = prefixes.indexOf(prefix) !== -1
    const isValidShortId = ShortId.isValid(rest)

    if (!hasPrefix || !isValidShortId) {
      throw new Error(`"${val}" is an invalid nodeId`)
    }
  }
}

export { NodeIdPrefix, NodeId, Prefix }
export default NodeId
