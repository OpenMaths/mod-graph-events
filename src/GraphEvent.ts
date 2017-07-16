import * as ShortId from 'shortid'

export enum Action {
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

export const GraphNodeIdPrefix = 'g_'
export const ContainerNodeIdPrefix = 'c_'
export const RowNodeIdPrefix = 'r_'
export const ColumnNodeIdPrefix = 'col_'
export const ContentHolderNodeIdPrefix = 'ch_'

export const generateNodeId = (action: Action): string => {
  switch (action) {
    case Action.CreateGraph:
      return GraphNodeIdPrefix + ShortId.generate()
    case Action.CreateContainer:
      return ContainerNodeIdPrefix + ShortId.generate()
    case Action.CreateRow:
      return RowNodeIdPrefix + ShortId.generate()
    case Action.CreateColumn:
      return ColumnNodeIdPrefix + ShortId.generate()
    case Action.CreateContentHolder:
      return ContentHolderNodeIdPrefix + ShortId.generate()
    default:
      throw new Error('Action ' + action + ' not recognised')
  }
}

export class GraphEvent {
  graphId: string
  parentId: string
  nodeId: string
  actionType: Action
  timestamp: Date
  insertIndex: number | null
  rawUoIConstructor: string | null

  constructor(
    graphId: string,
    parentId: string | null,
    nodeId: string,
    actionType: Action,
    insertIndex?: number,
    rawUoIConstructor?: string,
  ) {
    this.graphId = graphId
    this.parentId = parentId || ''
    this.nodeId = nodeId
    this.actionType = actionType
    this.timestamp = new Date()
    this.insertIndex = insertIndex == null ? null : insertIndex as number
    this.rawUoIConstructor =
      rawUoIConstructor == null ? null : rawUoIConstructor as string
  }
}

export class CreateGraphEvent extends GraphEvent {
  constructor() {
    const graphId = generateNodeId(Action.CreateGraph)
    super(graphId, null, graphId, Action.CreateGraph)
  }
}

export class CreateContainerEvent extends GraphEvent {
  constructor(graphId: string, parentId: string) {
    const nodeId = generateNodeId(Action.CreateContainer)
    super(graphId, parentId, nodeId, Action.CreateContainer)
  }
}

export class CreateRowEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, insertIndex: number) {
    const nodeId = generateNodeId(Action.CreateRow)
    super(graphId, parentId, nodeId, Action.CreateRow, insertIndex)
  }
}

export class CreateColumnEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, insertIndex: number) {
    const nodeId = generateNodeId(Action.CreateColumn)
    super(graphId, parentId, nodeId, Action.CreateColumn, insertIndex)
  }
}

export class CreateContentHolderEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, rawUoIConstructor: string) {
    const nodeId = generateNodeId(Action.CreateContentHolder)
    super(
      graphId,
      parentId,
      nodeId,
      Action.CreateContentHolder,
      undefined,
      rawUoIConstructor,
    )
  }
}

export class RemoveContainerEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, nodeId: string) {
    super(graphId, parentId, nodeId, Action.RemoveContainer)
  }
}

export class RemoveRowEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, nodeId: string) {
    super(graphId, parentId, nodeId, Action.RemoveRow)
  }
}

export class RemoveColumnEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, nodeId: string) {
    super(graphId, parentId, nodeId, Action.RemoveColumn)
  }
}

export class RemoveContentHolderEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, nodeId: string) {
    super(graphId, parentId, nodeId, Action.RemoveContentHolder)
  }
}
