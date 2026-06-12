import { Menu, PanelRightClose } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useEdgesState, useNodesState } from '@xyflow/react';
import { useGraph } from '../../hooks/useGraph';
import { useUiStore } from '../../store/useUiStore';
import type { ServiceEdge, ServiceNode, ServiceNodeData } from '../../types';
import { GraphCanvas } from '../graph/GraphCanvas';
import { Button } from '../ui/button';
import { LeftRail } from './LeftRail';
import { RightPanel } from './RightPanel';
import { TopBar } from './TopBar';

export function AppShell() {
  const selectedAppId = useUiStore((state) => state.selectedAppId);
  const selectedNodeId = useUiStore((state) => state.selectedNodeId);
  const isMobilePanelOpen = useUiStore((state) => state.isMobilePanelOpen);
  const setMobilePanelOpen = useUiStore((state) => state.setMobilePanelOpen);
  const mockErrorEnabled = useUiStore((state) => state.mockErrorEnabled);

  const graphQuery = useGraph(selectedAppId, mockErrorEnabled);

  const [nodes, setNodes, onNodesChange] = useNodesState<ServiceNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<ServiceEdge>([]);

  useEffect(() => {
    if (!graphQuery.data) {
      return;
    }

    setNodes(graphQuery.data.nodes);
    setEdges(graphQuery.data.edges);
  }, [graphQuery.data, setEdges, setNodes]);

  const selectedNode = useMemo<ServiceNode | null>(() => {
    return nodes.find((node) => node.id === selectedNodeId) ?? null;
  }, [nodes, selectedNodeId]);

  function patchNodeData(
    nodeId: string,
    patch: Partial<ServiceNodeData>
  ) {
    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                ...patch,
              },
            }
          : node
      )
    );
  }

  function deleteNode(nodeId: string) {
    setNodes((currentNodes) =>
      currentNodes.filter((node) => node.id !== nodeId)
    );

    setEdges((currentEdges) =>
      currentEdges.filter(
        (edge) =>
          edge.source !== nodeId &&
          edge.target !== nodeId
      )
    );
  }

  // DEBUG LOGS
  console.log('selectedNodeId:', selectedNodeId);
  console.log('selectedNode:', selectedNode);
  console.log('nodes:', nodes);

  return (
    <div className="app-shell">
      <TopBar />
      <LeftRail />

      <main
        className="workspace"
        aria-label="Application graph workspace"
      >
        <GraphCanvas
          graphQuery={graphQuery}
          nodes={nodes}
          edges={edges}
          setEdges={setEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        />
      </main>

      <aside className="desktop-panel">
        <RightPanel
          selectedNode={selectedNode}
          onPatchNodeData={patchNodeData}
          onDeleteNode={deleteNode}
        />
      </aside>

      <Button
        className="mobile-panel-trigger"
        variant="primary"
        type="button"
        aria-label="Open application panel"
        onClick={() => setMobilePanelOpen(true)}
      >
        <Menu size={18} />
      </Button>

      <div
        className={
          isMobilePanelOpen
            ? 'mobile-panel mobile-panel--open'
            : 'mobile-panel'
        }
      >
        <div className="mobile-panel__header">
          <span>Application</span>

          <Button
            variant="icon"
            type="button"
            aria-label="Close application panel"
            onClick={() => setMobilePanelOpen(false)}
          >
            <PanelRightClose size={18} />
          </Button>
        </div>

        <RightPanel
          selectedNode={selectedNode}
          onPatchNodeData={patchNodeData}
          onDeleteNode={deleteNode}
        />
      </div>

      {isMobilePanelOpen ? (
        <button
          className="mobile-panel-backdrop"
          aria-label="Close panel"
          onClick={() => setMobilePanelOpen(false)}
        />
      ) : null}
    </div>
  );
}