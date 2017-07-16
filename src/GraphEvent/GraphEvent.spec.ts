import * as Event from './GraphEvent'

describe('Models/Grid/GraphEvent', () => {
  describe('generateNodeId', () => {
    it('generates appropriate nodeId for Graph', () => {
      const nodeId = Event.generateNodeId(Event.ActionType.CreateGraph)
      expect(nodeId.substring(0, Event.GraphNodeIdPrefix.length)).toEqual(
        Event.GraphNodeIdPrefix,
      )
    })

    it('generates appropriate nodeId for Container', () => {
      const nodeId = Event.generateNodeId(Event.ActionType.CreateContainer)
      expect(nodeId.substring(0, Event.ContainerNodeIdPrefix.length)).toEqual(
        Event.ContainerNodeIdPrefix,
      )
    })

    it('generates appropriate nodeId for Row', () => {
      const nodeId = Event.generateNodeId(Event.ActionType.CreateRow)
      expect(nodeId.substring(0, Event.RowNodeIdPrefix.length)).toEqual(
        Event.RowNodeIdPrefix,
      )
    })

    it('generates appropriate nodeId for Column', () => {
      const nodeId = Event.generateNodeId(Event.ActionType.CreateColumn)
      expect(nodeId.substring(0, Event.ColumnNodeIdPrefix.length)).toEqual(
        Event.ColumnNodeIdPrefix,
      )
    })

    it('generates appropriate nodeId for ContentHolder', () => {
      const nodeId = Event.generateNodeId(Event.ActionType.CreateContentHolder)
      expect(
        nodeId.substring(0, Event.ContentHolderNodeIdPrefix.length),
      ).toEqual(Event.ContentHolderNodeIdPrefix)
    })
  })

  describe('CreateGraphEvent', () => {
    it('returns appropriate GraphEvent', () => {
      const event = new Event.CreateGraphEvent()

      expect(event instanceof Event.GraphEvent).toEqual(true)
      expect(
        event.graphId.substring(0, Event.GraphNodeIdPrefix.length),
      ).toEqual(Event.GraphNodeIdPrefix)
      expect(event.parentId).toEqual('')
      expect(event.nodeId.substring(0, Event.GraphNodeIdPrefix.length)).toEqual(
        Event.GraphNodeIdPrefix,
      )
      expect(event.actionType).toEqual(Event.ActionType.CreateGraph)
      expect(event.timestamp instanceof Date).toEqual(true)
      expect(event.insertIndex.is_none()).toEqual(true)
      expect(event.rawUoIConstructor.is_none()).toEqual(true)
    })
  })

  describe('CreateContainerEvent', () => {
    const graphId = 'graphId'

    it('returns appropriate GraphEvent', () => {
      const event = new Event.CreateContainerEvent(graphId, graphId)

      expect(event instanceof Event.GraphEvent).toEqual(true)
      expect(event.graphId).toEqual(graphId)
      expect(event.parentId).toEqual(graphId)
      expect(
        event.nodeId.substring(0, Event.ContainerNodeIdPrefix.length),
      ).toEqual(Event.ContainerNodeIdPrefix)
      expect(event.actionType).toEqual(Event.ActionType.CreateContainer)
      expect(event.timestamp instanceof Date).toEqual(true)
      expect(event.insertIndex.is_none()).toEqual(true)
      expect(event.rawUoIConstructor.is_none()).toEqual(true)
    })
  })

  describe('CreateRowEvent', () => {
    const graphId = 'graphId'

    it('returns appropriate GraphEvent', () => {
      const event = new Event.CreateRowEvent(graphId, 'parentId', 1)

      expect(event instanceof Event.GraphEvent).toEqual(true)
      expect(event.graphId).toEqual(graphId)
      expect(event.parentId).toEqual('parentId')
      expect(event.nodeId.substring(0, Event.RowNodeIdPrefix.length)).toEqual(
        Event.RowNodeIdPrefix,
      )
      expect(event.actionType).toEqual(Event.ActionType.CreateRow)
      expect(event.timestamp instanceof Date).toEqual(true)
      expect(event.insertIndex.unwrap_or(NaN)).toEqual(1)
      expect(event.rawUoIConstructor.is_none()).toEqual(true)
    })
  })

  describe('CreateColumnEvent', () => {
    const graphId = 'graphId'

    it('returns appropriate GraphEvent', () => {
      const event = new Event.CreateColumnEvent(graphId, 'parentId', 0)

      expect(event instanceof Event.GraphEvent).toEqual(true)
      expect(event.graphId).toEqual(graphId)
      expect(event.parentId).toEqual('parentId')
      expect(
        event.nodeId.substring(0, Event.ColumnNodeIdPrefix.length),
      ).toEqual(Event.ColumnNodeIdPrefix)
      expect(event.actionType).toEqual(Event.ActionType.CreateColumn)
      expect(event.timestamp instanceof Date).toEqual(true)
      expect(event.insertIndex.unwrap_or(NaN)).toEqual(0)
      expect(event.rawUoIConstructor.is_none()).toEqual(true)
    })
  })

  describe('CreateContentHolderEvent', () => {
    const graphId = 'graphId'

    it('returns appropriate GraphEvent', () => {
      const event = new Event.CreateContentHolderEvent(
        graphId,
        'parentId',
        'UoIConstructDefinition',
      )

      expect(event instanceof Event.GraphEvent).toEqual(true)
      expect(event.graphId).toEqual(graphId)
      expect(event.parentId).toEqual('parentId')
      expect(
        event.nodeId.substring(0, Event.ContentHolderNodeIdPrefix.length),
      ).toEqual(Event.ContentHolderNodeIdPrefix)
      expect(event.actionType).toEqual(Event.ActionType.CreateContentHolder)
      expect(event.timestamp instanceof Date).toEqual(true)
      expect(event.insertIndex.is_none()).toEqual(true)
      expect(event.rawUoIConstructor.unwrap_or('')).toEqual(
        'UoIConstructDefinition',
      )
    })
  })

  describe('RemoveContainerEvent', () => {
    const graphId = 'graphId'

    it('returns appropriate GraphEvent', () => {
      const event = new Event.RemoveContainerEvent(
        graphId,
        'parentId',
        'nodeId',
      )

      expect(event instanceof Event.GraphEvent).toEqual(true)
      expect(event.graphId).toEqual(graphId)
      expect(event.parentId).toEqual('parentId')
      expect(event.nodeId).toEqual('nodeId')
      expect(event.actionType).toEqual(Event.ActionType.RemoveContainer)
      expect(event.timestamp instanceof Date).toEqual(true)
      expect(event.insertIndex.is_none()).toEqual(true)
      expect(event.rawUoIConstructor.is_none()).toEqual(true)
    })
  })

  describe('RemoveRowEvent', () => {
    const graphId = 'graphId'

    it('returns appropriate GraphEvent', () => {
      const event = new Event.RemoveRowEvent(graphId, 'parentId', 'nodeId')

      expect(event instanceof Event.GraphEvent).toEqual(true)
      expect(event.graphId).toEqual(graphId)
      expect(event.parentId).toEqual('parentId')
      expect(event.nodeId).toEqual('nodeId')
      expect(event.actionType).toEqual(Event.ActionType.RemoveRow)
      expect(event.timestamp instanceof Date).toEqual(true)
      expect(event.insertIndex.is_none()).toEqual(true)
      expect(event.rawUoIConstructor.is_none()).toEqual(true)
    })
  })

  describe('RemoveColumnEvent', () => {
    const graphId = 'graphId'

    it('returns appropriate GraphEvent', () => {
      const event = new Event.RemoveColumnEvent(graphId, 'parentId', 'nodeId')

      expect(event instanceof Event.GraphEvent).toEqual(true)
      expect(event.graphId).toEqual(graphId)
      expect(event.parentId).toEqual('parentId')
      expect(event.nodeId).toEqual('nodeId')
      expect(event.actionType).toEqual(Event.ActionType.RemoveColumn)
      expect(event.timestamp instanceof Date).toEqual(true)
      expect(event.insertIndex.is_none()).toEqual(true)
      expect(event.rawUoIConstructor.is_none()).toEqual(true)
    })
  })

  describe('RemoveContentHolderEvent', () => {
    const graphId = 'graphId'

    it('returns appropriate GraphEvent', () => {
      const event = new Event.RemoveContentHolderEvent(
        graphId,
        'parentId',
        'nodeId',
      )

      expect(event instanceof Event.GraphEvent).toEqual(true)
      expect(event.graphId).toEqual(graphId)
      expect(event.parentId).toEqual('parentId')
      expect(event.nodeId).toEqual('nodeId')
      expect(event.actionType).toEqual(Event.ActionType.RemoveContentHolder)
      expect(event.timestamp instanceof Date).toEqual(true)
      expect(event.insertIndex.is_none()).toEqual(true)
      expect(event.rawUoIConstructor.is_none()).toEqual(true)
    })
  })
})
