import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  type Connection,
  type OnEdgesChange,
  type OnNodesChange,
  type NodeMouseHandler,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  useCallback,
  useMemo,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useUiStore } from '../../store/useUiStore';
import type {
  AppGraph,
  ServiceEdge,
  ServiceNode,
} from '../../types';
import { Skeleton } from '../ui/skeleton';
import { ServiceNodeCard } from './ServiceNodeCard';

const nodeTypes: NodeTypes = {
  service: ServiceNodeCard,
};

interface GraphCanvasProps {
  graphQuery: UseQueryResult<AppGraph, Error>;
  nodes: ServiceNode[];
  edges: ServiceEdge[];
  setEdges: Dispatch<SetStateAction<ServiceEdge[]>>;
  onNodesChange: OnNodesChange<ServiceNode>;
  onEdgesChange: OnEdgesChange<ServiceEdge>;
}

export function GraphCanvas({
  graphQuery,
  nodes,
  edges,
  setEdges,
  onNodesChange,
  onEdgesChange,
}: GraphCanvasProps) {
  const selectedNodeId = useUiStore(
    (state) => state.selectedNodeId
  );

  const setSelectedNodeId = useUiStore(
    (state) => state.setSelectedNodeId
  );

  const highlightedNodes = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      selected: node.id === selectedNodeId,
    }));
  }, [nodes, selectedNodeId]);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((currentEdges) =>
        addEdge(connection, currentEdges)
      ),
    [setEdges]
  );

  const onNodeClick = useCallback<
    NodeMouseHandler<ServiceNode>
  >(
    (_event, node) => {
      console.log('NODE CLICKED:', node.id);
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  return (
    <div className="canvas-wrap">
      {graphQuery.isLoading ? (
        <div className="canvas-state">
          <Skeleton className="canvas-state__card" />
          <Skeleton className="canvas-state__card canvas-state__card--wide" />
          <Skeleton className="canvas-state__card" />
        </div>
      ) : null}

      {graphQuery.isError ? (
        <div className="canvas-error">
          Graph request failed. Toggle the mock error
          control in the top bar to recover.
        </div>
      ) : null}

      <ReactFlow
        nodes={highlightedNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={() => setSelectedNodeId(null)}
        fitView
        deleteKeyCode={['Backspace', 'Delete']}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          color="#2c3442"
          gap={26}
          size={1.8}
          variant={BackgroundVariant.Dots}
        />

        <Controls showInteractive={false} />

        <MiniMap
          pannable
          zoomable
          nodeStrokeWidth={3}
        />
      </ReactFlow>
    </div>
  );
}