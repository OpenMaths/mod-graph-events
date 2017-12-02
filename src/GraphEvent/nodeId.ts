import * as ShortId from "shortid"

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
        return Prefix.GraphNodeIdPrefix + ShortId.generate()
      case "Container":
        return Prefix.ContainerNodeIdPrefix + ShortId.generate()
      case "Row":
        return Prefix.RowNodeIdPrefix + ShortId.generate()
      case "Column":
        return Prefix.ColumnNodeIdPrefix + ShortId.generate()
      case "ContentHolder":
        return Prefix.ContentHolderNodeIdPrefix + ShortId.generate()
      default:
        throw new Error(`Action "${type}" not recognised`);
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

export { NodeType, NodeIdPrefix, NodeId, Prefix }
export default NodeId
