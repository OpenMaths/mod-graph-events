import NodeId, { Prefix } from "./nodeId"

describe("NodeId", () => {
  describe("gen", () => {
    it("generates appropriate nodeId for Graph", () => {
      const nodeId = NodeId.gen("Graph")
      expect(nodeId.substring(0, Prefix.GraphNodeIdPrefix.length)).toEqual(Prefix.GraphNodeIdPrefix)
    })

    it("generates appropriate nodeId for Container", () => {
      const nodeId = NodeId.gen("Container")
      expect(nodeId.substring(0, Prefix.ContainerNodeIdPrefix.length)).toEqual(
        Prefix.ContainerNodeIdPrefix,
      )
    })

    it("generates appropriate nodeId for Row", () => {
      const nodeId = NodeId.gen("Row")
      expect(nodeId.substring(0, Prefix.RowNodeIdPrefix.length)).toEqual(Prefix.RowNodeIdPrefix)
    })

    it("generates appropriate nodeId for Column", () => {
      const nodeId = NodeId.gen("Column")
      expect(nodeId.substring(0, Prefix.ColumnNodeIdPrefix.length)).toEqual(
        Prefix.ColumnNodeIdPrefix,
      )
    })

    it("generates appropriate nodeId for ContentHolder", () => {
      const nodeId = NodeId.gen("ContentHolder")
      expect(nodeId.substring(0, Prefix.ContentHolderNodeIdPrefix.length)).toEqual(
        Prefix.ContentHolderNodeIdPrefix,
      )
    })
  })
})
