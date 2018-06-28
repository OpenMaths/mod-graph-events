import { generateId, isValidId } from "@openmaths/utils"

type NodeType = "Graph" | "Container" | "Row" | "Column" | "ContentHolder"

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
  static gen(type: NodeType): string {
    switch (type) {
      case "Graph":
        return Prefix.GraphNodeIdPrefix + generateId()
      case "Container":
        return Prefix.ContainerNodeIdPrefix + generateId()
      case "Row":
        return Prefix.RowNodeIdPrefix + generateId()
      case "Column":
        return Prefix.ColumnNodeIdPrefix + generateId()
      case "ContentHolder":
        return Prefix.ContentHolderNodeIdPrefix + generateId()
      default:
        throw new Error(`Action "${type}" not recognised`)
    }
  }

  static throwIfNotValid(val: string) {
    const prefixes = Object.keys(Prefix).map((key: keyof NodeIdPrefix) => Prefix[key])

    const prefix = val.substr(0, 4)
    const rest = val.substr(4)

    const hasPrefix = prefixes.indexOf(prefix) !== -1
    const isValidShortId = isValidId(rest)

    if (!hasPrefix || !isValidShortId) {
      throw new Error(`"${val}" is an invalid nodeId`)
    }
  }
}

export { NodeType, NodeIdPrefix, NodeId, Prefix }
export default NodeId
