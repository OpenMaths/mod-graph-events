import * as ShortId from 'shortid'

import * as Event from './events'
import NodeId, { Prefix } from './nodeId'

describe('Events', () => {
  beforeEach(() => {
    this.graphId = Prefix.GraphNodeIdPrefix + ShortId.generate()
    this.containerId = Prefix.ContainerNodeIdPrefix + ShortId.generate()
    this.rowId = Prefix.RowNodeIdPrefix + ShortId.generate()
    this.columnId = Prefix.ColumnNodeIdPrefix + ShortId.generate()
    this.contentHolderId = Prefix.ContentHolderNodeIdPrefix + ShortId.generate()
  })

  afterEach(() => {
    this.graphId = null
    this.containerId = null
    this.rowId = null
    this.columnId = null
    this.contentHolderId = null
  })

  describe('CreateGraphEvent', () => {
    it('returns appropriate GraphEvent', () => {
      jest
        .spyOn(NodeId, 'gen' as any)
        .mockImplementationOnce(() => this.graphId)

      const event = new Event.CreateGraphEvent()

      expect(event instanceof Event.GraphEvent).toEqual(true)
      expect(event.graphId).toEqual(this.graphId)
      expect(event.parentId).toEqual(this.graphId)
      expect(event.nodeId).toEqual(this.graphId)
      expect(event.actionType).toEqual(Event.ActionType.CreateGraph)
      expect(event.createdAt instanceof Date).toEqual(true)
      expect(event.insertIndex).toEqual(0)
    })
  })

  describe('CreateContainerEvent', () => {
    it('returns appropriate GraphEvent', () => {
      jest
        .spyOn(NodeId, 'gen' as any)
        .mockImplementationOnce(() => this.containerId)

      const event = new Event.CreateContainerEvent(this.graphId, this.graphId)

      expect(event instanceof Event.GraphEvent).toEqual(true)
      expect(event.graphId).toEqual(this.graphId)
      expect(event.parentId).toEqual(this.graphId)
      expect(event.nodeId).toEqual(this.containerId)
      expect(event.actionType).toEqual(Event.ActionType.CreateContainer)
      expect(event.createdAt instanceof Date).toEqual(true)
      expect(event.insertIndex).toEqual(0)
    })
  })

  describe('CreateRowEvent', () => {
    it('returns appropriate GraphEvent', () => {
      jest.spyOn(NodeId, 'gen' as any).mockImplementationOnce(() => this.rowId)

      const event = new Event.CreateRowEvent(this.graphId, this.containerId, 1)

      expect(event instanceof Event.GraphEvent).toEqual(true)
      expect(event.graphId).toEqual(this.graphId)
      expect(event.parentId).toEqual(this.containerId)
      expect(event.nodeId).toEqual(this.rowId)
      expect(event.actionType).toEqual(Event.ActionType.CreateRow)
      expect(event.createdAt instanceof Date).toEqual(true)
      expect(event.insertIndex).toEqual(1)
    })
  })

  describe('CreateColumnEvent', () => {
    it('returns appropriate GraphEvent', () => {
      jest
        .spyOn(NodeId, 'gen' as any)
        .mockImplementationOnce(() => this.columnId)

      const event = new Event.CreateColumnEvent(this.graphId, this.rowId, 0)

      expect(event instanceof Event.GraphEvent).toEqual(true)
      expect(event.graphId).toEqual(this.graphId)
      expect(event.parentId).toEqual(this.rowId)
      expect(event.nodeId).toEqual(this.columnId)
      expect(event.actionType).toEqual(Event.ActionType.CreateColumn)
      expect(event.createdAt instanceof Date).toEqual(true)
      expect(event.insertIndex).toEqual(0)
    })
  })

  describe('CreateContentHolderEvent', () => {
    it('returns appropriate GraphEvent', () => {
      jest
        .spyOn(NodeId, 'gen' as any)
        .mockImplementationOnce(() => this.contentHolderId)

      const event = new Event.CreateContentHolderEvent(
        this.graphId,
        this.columnId,
        'UoIConstructDefinition',
      )

      expect(event instanceof Event.GraphEvent).toEqual(true)
      expect(event.graphId).toEqual(this.graphId)
      expect(event.parentId).toEqual(this.columnId)
      expect(event.nodeId).toEqual(this.contentHolderId)
      expect(event.actionType).toEqual(Event.ActionType.CreateContentHolder)
      expect(event.createdAt instanceof Date).toEqual(true)
      expect(event.insertIndex).toEqual(0)
      expect(event.rawUoIConstructor).toEqual('UoIConstructDefinition')
    })
  })

  describe('RemoveContainerEvent', () => {
    it('returns appropriate GraphEvent', () => {
      const event = new Event.RemoveContainerEvent(
        this.graphId,
        this.graphId,
        this.containerId,
      )

      expect(event instanceof Event.GraphEvent).toEqual(true)
      expect(event.graphId).toEqual(this.graphId)
      expect(event.parentId).toEqual(this.graphId)
      expect(event.nodeId).toEqual(this.containerId)
      expect(event.actionType).toEqual(Event.ActionType.RemoveContainer)
      expect(event.createdAt instanceof Date).toEqual(true)
      expect(event.insertIndex).toEqual(0)
    })
  })

  describe('RemoveRowEvent', () => {
    it('returns appropriate GraphEvent', () => {
      const event = new Event.RemoveRowEvent(
        this.graphId,
        this.containerId,
        this.rowId,
      )

      expect(event instanceof Event.GraphEvent).toEqual(true)
      expect(event.graphId).toEqual(this.graphId)
      expect(event.parentId).toEqual(this.containerId)
      expect(event.nodeId).toEqual(this.rowId)
      expect(event.actionType).toEqual(Event.ActionType.RemoveRow)
      expect(event.createdAt instanceof Date).toEqual(true)
      expect(event.insertIndex).toEqual(0)
    })
  })

  describe('RemoveColumnEvent', () => {
    it('returns appropriate GraphEvent', () => {
      const event = new Event.RemoveColumnEvent(
        this.graphId,
        this.rowId,
        this.columnId,
      )

      expect(event instanceof Event.GraphEvent).toEqual(true)
      expect(event.graphId).toEqual(this.graphId)
      expect(event.parentId).toEqual(this.rowId)
      expect(event.nodeId).toEqual(this.columnId)
      expect(event.actionType).toEqual(Event.ActionType.RemoveColumn)
      expect(event.createdAt instanceof Date).toEqual(true)
      expect(event.insertIndex).toEqual(0)
    })
  })

  describe('RemoveContentHolderEvent', () => {
    it('returns appropriate GraphEvent', () => {
      const event = new Event.RemoveContentHolderEvent(
        this.graphId,
        this.columnId,
        this.contentHolderId,
      )

      expect(event instanceof Event.GraphEvent).toEqual(true)
      expect(event.graphId).toEqual(this.graphId)
      expect(event.parentId).toEqual(this.columnId)
      expect(event.nodeId).toEqual(this.contentHolderId)
      expect(event.actionType).toEqual(Event.ActionType.RemoveContentHolder)
      expect(event.createdAt instanceof Date).toEqual(true)
      expect(event.insertIndex).toEqual(0)
    })
  })
})
