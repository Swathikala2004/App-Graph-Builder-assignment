import type { AppGraph, AppSummary } from '../types';

const apps: AppSummary[] = [
  { id: 'supertokens-golang', name: 'supertokens-golang', iconTone: 'blue' },
  { id: 'supertokens-java', name: 'supertokens-java', iconTone: 'violet' },
  { id: 'supertokens-python', name: 'supertokens-python', iconTone: 'red' },
  { id: 'supertokens-ruby', name: 'supertokens-ruby', iconTone: 'pink' },
  { id: 'supertokens-go', name: 'supertokens-go', iconTone: 'green' },
];

const graphByApp: Record<string, AppGraph> = {
  'supertokens-golang': {
    nodes: [
      {
        id: 'api',
        type: 'service',
        position: { x: 120, y: 80 },
        data: {
          label: 'API Gateway',
          description: 'Ingress layer for public authentication requests.',
          service: 'api',
          status: 'Healthy',
          cpuLimit: 42,
          memoryGb: 0.25,
          diskGb: 10,
          regionCount: 2,
          hourlyCost: '$0.03/HR',
        },
      },
      {
        id: 'postgres',
        type: 'service',
        position: { x: 560, y: 140 },
        data: {
          label: 'Postgres',
          description: 'Primary relational store for tenants, sessions, and metadata.',
          service: 'postgres',
          status: 'Healthy',
          cpuLimit: 62,
          memoryGb: 0.5,
          diskGb: 10,
          regionCount: 1,
          hourlyCost: '$0.03/HR',
        },
      },
      {
        id: 'redis',
        type: 'service',
        position: { x: 260, y: 430 },
        data: {
          label: 'Redis',
          description: 'Low-latency token cache and rate-limit coordinator.',
          service: 'redis',
          status: 'Down',
          cpuLimit: 36,
          memoryGb: 0.5,
          diskGb: 5,
          regionCount: 1,
          hourlyCost: '$0.03/HR',
        },
      },
      {
        id: 'mongodb',
        type: 'service',
        position: { x: 780, y: 500 },
        data: {
          label: 'Mongodb',
          description: 'Document archive for audit payloads and workflow snapshots.',
          service: 'mongodb',
          status: 'Degraded',
          cpuLimit: 48,
          memoryGb: 0.75,
          diskGb: 12,
          regionCount: 1,
          hourlyCost: '$0.03/HR',
        },
      },
    ],
    edges: [
      { id: 'api-postgres', source: 'api', target: 'postgres', animated: true },
      { id: 'api-redis', source: 'api', target: 'redis', animated: true },
      { id: 'postgres-mongodb', source: 'postgres', target: 'mongodb' },
    ],
  },
  'supertokens-java': {
    nodes: [
      {
        id: 'gateway',
        type: 'service',
        position: { x: 160, y: 180 },
        data: {
          label: 'Java API',
          description: 'Spring service receiving auth traffic.',
          service: 'api',
          status: 'Healthy',
          cpuLimit: 55,
          memoryGb: 1,
          diskGb: 8,
          regionCount: 2,
          hourlyCost: '$0.05/HR',
        },
      },
      {
        id: 'queue-worker',
        type: 'service',
        position: { x: 520, y: 110 },
        data: {
          label: 'Worker',
          description: 'Background event processor.',
          service: 'worker',
          status: 'Degraded',
          cpuLimit: 28,
          memoryGb: 0.75,
          diskGb: 6,
          regionCount: 1,
          hourlyCost: '$0.02/HR',
        },
      },
      {
        id: 'postgres',
        type: 'service',
        position: { x: 500, y: 420 },
        data: {
          label: 'Postgres',
          description: 'Tenant and session database.',
          service: 'postgres',
          status: 'Healthy',
          cpuLimit: 70,
          memoryGb: 1.5,
          diskGb: 20,
          regionCount: 2,
          hourlyCost: '$0.08/HR',
        },
      },
    ],
    edges: [
      { id: 'gateway-worker', source: 'gateway', target: 'queue-worker' },
      { id: 'gateway-postgres', source: 'gateway', target: 'postgres', animated: true },
    ],
  },
};

function cloneGraph(graph: AppGraph): AppGraph {
  return {
    nodes: graph.nodes.map((node) => ({ ...node, data: { ...node.data }, position: { ...node.position } })),
    edges: graph.edges.map((edge) => ({ ...edge })),
  };
}

function wait<T>(value: T, shouldFail = false): Promise<T> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Mock API failure enabled for review.'));
        return;
      }

      resolve(value);
    }, 550);
  });
}

export function getApps(shouldFail = false): Promise<AppSummary[]> {
  return wait(apps, shouldFail);
}

export function getAppGraph(appId: string, shouldFail = false): Promise<AppGraph> {
  const graph = graphByApp[appId] ?? graphByApp['supertokens-golang'];
  return wait(cloneGraph(graph), shouldFail);
}