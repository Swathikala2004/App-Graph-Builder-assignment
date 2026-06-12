import type { Edge, Node } from '@xyflow/react';

export type ServiceStatus = 'Healthy' | 'Degraded' | 'Down';

export interface AppSummary {
  id: string;
  name: string;
  iconTone: 'blue' | 'violet' | 'red' | 'pink' | 'green';
}

export interface ServiceNodeData extends Record<string, unknown> {
  label: string;
  description: string;
  service: 'postgres' | 'redis' | 'mongodb' | 'worker' | 'api';
  status: ServiceStatus;
  cpuLimit: number;
  memoryGb: number;
  diskGb: number;
  regionCount: number;
  hourlyCost: string;
}

export type ServiceNode = Node<ServiceNodeData, 'service'>;
export type ServiceEdge = Edge;

export interface AppGraph {
  nodes: ServiceNode[];
  edges: ServiceEdge[];
}