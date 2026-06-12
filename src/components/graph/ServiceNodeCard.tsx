import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import {
  Cpu,
  Database,
  HardDrive,
  MemoryStick,
  Settings,
} from 'lucide-react';

import { useUiStore } from '../../store/useUiStore';
import type { ServiceNode } from '../../types';
import { Badge } from '../ui/badge';

const serviceGlyph: Record<
  ServiceNode['data']['service'],
  string
> = {
  api: 'A',
  worker: 'W',
  postgres: 'P',
  redis: 'R',
  mongodb: 'M',
};

function statusTone(status: ServiceNode['data']['status']) {
  if (status === 'Healthy') {
    return 'success';
  }

  if (status === 'Degraded') {
    return 'warning';
  }

  return 'danger';
}

export function ServiceNodeCard({
  id,
  data,
  selected,
}: NodeProps<ServiceNode>) {
  const setSelectedNodeId = useUiStore(
    (state) => state.setSelectedNodeId
  );

  return (
    <article
      onClick={() => {
        console.log('CARD CLICKED:', id);
        setSelectedNodeId(id);
      }}
      className={
        selected
          ? 'service-node service-node--selected'
          : 'service-node'
      }
    >
      <Handle
        className="service-handle"
        type="target"
        position={Position.Left}
      />

      <header className="service-node__header">
        <span
          className={`service-node__glyph service-node__glyph--${data.service}`}
        >
          {serviceGlyph[data.service]}
        </span>

        <strong>{data.label}</strong>

        <Badge tone="success" className="cost-badge">
          {data.hourlyCost}
        </Badge>

        <button
          className="node-settings"
          type="button"
          aria-label="Node settings"
        >
          <Settings size={17} />
        </button>
      </header>

      <div className="service-node__metrics">
        <span>{data.cpuLimit / 100}</span>
        <span>{data.memoryGb.toFixed(2)} GB</span>
        <span>{data.diskGb.toFixed(2)} GB</span>
        <span>{data.regionCount}</span>
      </div>

      <div className="service-node__tabs" aria-hidden="true">
        <span className="service-node__tab service-node__tab--active">
          <Cpu size={14} /> CPU
        </span>

        <span className="service-node__tab">
          <MemoryStick size={14} /> Memory
        </span>

        <span className="service-node__tab">
          <HardDrive size={14} /> Disk
        </span>

        <span className="service-node__tab">
          <Database size={14} /> Region
        </span>
      </div>

      <div className="service-node__control-row">
        <span className="node-gradient" />

        <span className="node-input-preview">
          {(data.cpuLimit / 100).toFixed(2)}
        </span>
      </div>

      <footer className="service-node__footer">
        <Badge tone={statusTone(data.status)}>
          {data.status}
        </Badge>

        <span className="aws-mark">aws</span>
      </footer>

      <Handle
        className="service-handle"
        type="source"
        position={Position.Right}
      />
    </article>
  );
}