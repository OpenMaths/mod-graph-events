import NodeId from './nodeId'

// @TODO import from utils
const throwIfNegativeInteger = (...args: any[]) => true
const throwIfInvalidNodeId = NodeId.throwIfNotValid

enum ActionType {
  CreateGraph = 'CreateGraph',
  CreateContainer = 'CreateContainer',
  CreateRow = 'CreateRow',
  CreateColumn = 'CreateColumn',
  CreateContentHolder = 'CreateContentHolder',
  RemoveContainer = 'RemoveContainer',
  RemoveRow = 'RemoveRow',
  RemoveColumn = 'RemoveColumn',
  RemoveContentHolder = 'RemoveContentHolder',
}

class GraphEvent {
  actionType: ActionType
  readonly createdAt: Date
  graphId: string
  insertIndex: number
  nodeId: string
  parentId: string

  constructor(
    graphId: string,
    parentId: string,
    nodeId: string,
    actionType: ActionType,
    insertIndex: number = 0,
  ) {
    throwIfInvalidNodeId(graphId)
    throwIfInvalidNodeId(parentId)
    throwIfInvalidNodeId(nodeId)
    throwIfNegativeInteger(insertIndex)

    this.actionType = actionType
    this.createdAt = new Date()
    this.graphId = graphId
    this.insertIndex = insertIndex
    this.nodeId = nodeId
    this.parentId = parentId
  }
}

class CreateGraphEvent extends GraphEvent {
  constructor() {
    const graphId = NodeId.gen(ActionType.CreateGraph)
    super(graphId, graphId, graphId, ActionType.CreateGraph)
  }
}

class CreateContainerEvent extends GraphEvent {
  constructor(graphId: string, parentId: string) {
    const nodeId = NodeId.gen(ActionType.CreateContainer)
    super(graphId, parentId, nodeId, ActionType.CreateContainer)
  }
}

class CreateRowEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, insertIndex: number = 0) {
    const nodeId = NodeId.gen(ActionType.CreateRow)
    super(graphId, parentId, nodeId, ActionType.CreateRow, insertIndex)
  }
}

class CreateColumnEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, insertIndex: number = 0) {
    const nodeId = NodeId.gen(ActionType.CreateColumn)
    super(graphId, parentId, nodeId, ActionType.CreateColumn, insertIndex)
  }
}

class CreateContentHolderEvent extends GraphEvent {
  rawUoIConstructor: string

  constructor(graphId: string, parentId: string, rawUoIConstructor: string) {
    const nodeId = NodeId.gen(ActionType.CreateContentHolder)
    super(graphId, parentId, nodeId, ActionType.CreateContentHolder)
    this.rawUoIConstructor = rawUoIConstructor
  }
}

class RemoveContainerEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, nodeId: string) {
    super(graphId, parentId, nodeId, ActionType.RemoveContainer)
  }
}

class RemoveRowEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, nodeId: string) {
    super(graphId, parentId, nodeId, ActionType.RemoveRow)
  }
}

class RemoveColumnEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, nodeId: string) {
    super(graphId, parentId, nodeId, ActionType.RemoveColumn)
  }
}

class RemoveContentHolderEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, nodeId: string) {
    super(graphId, parentId, nodeId, ActionType.RemoveContentHolder)
  }
}

export {
  ActionType,
  GraphEvent,
  CreateGraphEvent,
  CreateContainerEvent,
  CreateRowEvent,
  CreateColumnEvent,
  CreateContentHolderEvent,
  RemoveContainerEvent,
  RemoveRowEvent,
  RemoveColumnEvent,
  RemoveContentHolderEvent,
}
export default GraphEvent
