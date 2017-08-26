import { Option, Some, None } from '@threestup/monads'
import * as ShortId from 'shortid'

export enum ActionType {
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

export const GraphNodeIdPrefix = 'gph_'
export const ContainerNodeIdPrefix = 'cont_'
export const RowNodeIdPrefix = 'row_'
export const ColumnNodeIdPrefix = 'col_'
export const ContentHolderNodeIdPrefix = 'cttHdr_'

export const generateNodeId = (action: ActionType): string => {
  switch (action) {
    case ActionType.CreateGraph:
      return GraphNodeIdPrefix + ShortId.generate()
    case ActionType.CreateContainer:
      return ContainerNodeIdPrefix + ShortId.generate()
    case ActionType.CreateRow:
      return RowNodeIdPrefix + ShortId.generate()
    case ActionType.CreateColumn:
      return ColumnNodeIdPrefix + ShortId.generate()
    case ActionType.CreateContentHolder:
      return ContentHolderNodeIdPrefix + ShortId.generate()
    default:
      throw new Error('Action ' + action + ' not recognised')
  }
}

export class GraphEvent {
  graphId: string
  parentId: string
  nodeId: string
  actionType: ActionType
  readonly createdAt: string
  insertIndex: Option<number>
  rawUoIConstructor: Option<string>

  constructor(
    graphId: string,
    parentId: string,
    nodeId: string,
    actionType: ActionType,
    insertIndex: Option<number> = None,
    rawUoIConstructor: Option<string> = None,
  ) {
    this.graphId = graphId
    this.parentId = parentId
    this.nodeId = nodeId
    this.actionType = actionType
    this.createdAt = new Date().toISOString()
    this.insertIndex = insertIndex
    this.rawUoIConstructor = rawUoIConstructor
  }
}

export class CreateGraphEvent extends GraphEvent {
  constructor() {
    const graphId = generateNodeId(ActionType.CreateGraph)
    super(graphId, '', graphId, ActionType.CreateGraph)
  }
}

export class CreateContainerEvent extends GraphEvent {
  constructor(graphId: string, parentId: string) {
    const nodeId = generateNodeId(ActionType.CreateContainer)
    super(graphId, parentId, nodeId, ActionType.CreateContainer)
  }
}

export class CreateRowEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, insertIndex: number) {
    const nodeId = generateNodeId(ActionType.CreateRow)
    super(graphId, parentId, nodeId, ActionType.CreateRow, Some(insertIndex))
  }
}

export class CreateColumnEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, insertIndex: number) {
    const nodeId = generateNodeId(ActionType.CreateColumn)
    super(graphId, parentId, nodeId, ActionType.CreateColumn, Some(insertIndex))
  }
}

export class CreateContentHolderEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, rawUoIConstructor: string) {
    const nodeId = generateNodeId(ActionType.CreateContentHolder)
    super(
      graphId,
      parentId,
      nodeId,
      ActionType.CreateContentHolder,
      None,
      Some(rawUoIConstructor),
    )
  }
}

export class RemoveContainerEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, nodeId: string) {
    super(graphId, parentId, nodeId, ActionType.RemoveContainer)
  }
}

export class RemoveRowEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, nodeId: string) {
    super(graphId, parentId, nodeId, ActionType.RemoveRow)
  }
}

export class RemoveColumnEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, nodeId: string) {
    super(graphId, parentId, nodeId, ActionType.RemoveColumn)
  }
}

export class RemoveContentHolderEvent extends GraphEvent {
  constructor(graphId: string, parentId: string, nodeId: string) {
    super(graphId, parentId, nodeId, ActionType.RemoveContentHolder)
  }
}
