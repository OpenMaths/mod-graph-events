import * as Event from './GraphEvent'

describe('Models/Grid/GraphEvent', () => {
  describe('generateNodeId', () => {
    it('generates appropriate nodeId for Graph', () => {
      const nodeId = Event.generateNodeId(Event.Action.CreateGraph)
      expect(nodeId.substring(0, Event.GraphNodeIdPrefix.length)).toEqual(
        Event.GraphNodeIdPrefix,
      )
    })

    it('generates appropriate nodeId for Container', () => {
      const nodeId = Event.generateNodeId(Event.Action.CreateContainer)
      expect(nodeId.substring(0, Event.ContainerNodeIdPrefix.length)).toEqual(
        Event.ContainerNodeIdPrefix,
      )
    })

    it('generates appropriate nodeId for Row', () => {
      const nodeId = Event.generateNodeId(Event.Action.CreateRow)
      expect(nodeId.substring(0, Event.RowNodeIdPrefix.length)).toEqual(
        Event.RowNodeIdPrefix,
      )
    })

    it('generates appropriate nodeId for Column', () => {
      const nodeId = Event.generateNodeId(Event.Action.CreateColumn)
      expect(nodeId.substring(0, Event.ColumnNodeIdPrefix.length)).toEqual(
        Event.ColumnNodeIdPrefix,
      )
    })

    it('generates appropriate nodeId for ContentHolder', () => {
      const nodeId = Event.generateNodeId(Event.Action.CreateContentHolder)
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
      expect(event.actionType).toEqual(Event.Action.CreateGraph)
      expect(event.timestamp instanceof Date).toEqual(true)
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
      expect(event.actionType).toEqual(Event.Action.CreateContainer)
      expect(event.timestamp instanceof Date).toEqual(true)
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
      expect(event.actionType).toEqual(Event.Action.CreateRow)
      expect(event.timestamp instanceof Date).toEqual(true)
      expect(event.insertIndex).toEqual(1)
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
      expect(event.actionType).toEqual(Event.Action.CreateColumn)
      expect(event.timestamp instanceof Date).toEqual(true)
      expect(event.insertIndex).toEqual(0)
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
      expect(event.actionType).toEqual(Event.Action.CreateContentHolder)
      expect(event.timestamp instanceof Date).toEqual(true)
      expect(event.rawUoIConstructor).toEqual('UoIConstructDefinition')
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
      expect(event.actionType).toEqual(Event.Action.RemoveContainer)
      expect(event.timestamp instanceof Date).toEqual(true)
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
      expect(event.actionType).toEqual(Event.Action.RemoveRow)
      expect(event.timestamp instanceof Date).toEqual(true)
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
      expect(event.actionType).toEqual(Event.Action.RemoveColumn)
      expect(event.timestamp instanceof Date).toEqual(true)
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
      expect(event.actionType).toEqual(Event.Action.RemoveContentHolder)
      expect(event.timestamp instanceof Date).toEqual(true)
    })
  })
})
