import { useState } from 'react';
import { ChevronRight, Plus, Search } from 'lucide-react';
import { useApps } from '../../hooks/useApps';
import { useUiStore } from '../../store/useUiStore';
import type { ServiceNode, ServiceNodeData } from '../../types';
import { NodeInspector } from '../inspector/NodeInspector';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';

interface RightPanelProps {
  selectedNode: ServiceNode | null;
  onPatchNodeData: (
    nodeId: string,
    patch: Partial<ServiceNodeData>
  ) => void;
  onDeleteNode: (nodeId: string) => void;
}

export function RightPanel({
  selectedNode,
  onPatchNodeData,
  onDeleteNode,
}: RightPanelProps) {
  const selectedAppId = useUiStore((state) => state.selectedAppId);
  const setSelectedAppId = useUiStore((state) => state.setSelectedAppId);
  const mockErrorEnabled = useUiStore((state) => state.mockErrorEnabled);

  const appsQuery = useApps(mockErrorEnabled);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredApps =
    appsQuery.data?.filter((app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="right-panel">
      <section className="apps-panel" aria-label="Application selector">
        <div className="panel-heading">
          <h2>Application</h2>

          <Button
            variant="primary"
            type="button"
            aria-label="Add application"
          >
            <Plus size={17} />
          </Button>
        </div>

        <label className="search-field">
          <span className="sr-only">Search applications</span>

          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Search size={18} />
        </label>

        {appsQuery.isLoading ? (
          <div className="stack">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : null}

        {appsQuery.isError ? (
          <div className="panel-error">
            Unable to load apps. Disable the mock error toggle and refresh.
          </div>
        ) : null}

        {!appsQuery.isLoading &&
          !appsQuery.isError &&
          filteredApps.length === 0 && (
            <div className="panel-empty">
              No applications found.
            </div>
          )}

        <div className="app-list">
          {filteredApps.map((app) => (
            <button
              key={app.id}
              type="button"
              className={
                app.id === selectedAppId
                  ? 'app-list__item app-list__item--active'
                  : 'app-list__item'
              }
              onClick={() => setSelectedAppId(app.id)}
            >
              <span className={`app-icon app-icon--${app.iconTone}`}>
                {app.name.charAt(0).toUpperCase()}
              </span>

              <span>{app.name}</span>

              <ChevronRight size={17} />
            </button>
          ))}
        </div>
      </section>

      <NodeInspector
        selectedNode={selectedNode}
        onPatchNodeData={onPatchNodeData}
        onDeleteNode={onDeleteNode}
      />
    </div>
  );
}