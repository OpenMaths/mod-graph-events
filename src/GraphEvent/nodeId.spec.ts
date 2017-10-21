import { ActionType } from "./events"
import NodeId, { Prefix } from "./nodeId"

describe("NodeId", () => {
  describe("gen", () => {
    it("generates appropriate nodeId for Graph", () => {
      const nodeId = NodeId.gen(ActionType.CreateGraph)
      expect(nodeId.substring(0, Prefix.GraphNodeIdPrefix.length)).toEqual(
        Prefix.GraphNodeIdPrefix,
      )
    })

    it("generates appropriate nodeId for Container", () => {
      const nodeId = NodeId.gen(ActionType.CreateContainer)
      expect(nodeId.substring(0, Prefix.ContainerNodeIdPrefix.length)).toEqual(
        Prefix.ContainerNodeIdPrefix,
      )
    })

    it("generates appropriate nodeId for Row", () => {
      const nodeId = NodeId.gen(ActionType.CreateRow)
      expect(nodeId.substring(0, Prefix.RowNodeIdPrefix.length)).toEqual(
        Prefix.RowNodeIdPrefix,
      )
    })

    it("generates appropriate nodeId for Column", () => {
      const nodeId = NodeId.gen(ActionType.CreateColumn)
      expect(nodeId.substring(0, Prefix.ColumnNodeIdPrefix.length)).toEqual(
        Prefix.ColumnNodeIdPrefix,
      )
    })

    it("generates appropriate nodeId for ContentHolder", () => {
      const nodeId = NodeId.gen(ActionType.CreateContentHolder)
      expect(
        nodeId.substring(0, Prefix.ContentHolderNodeIdPrefix.length),
      ).toEqual(Prefix.ContentHolderNodeIdPrefix)
    })
  })
})
