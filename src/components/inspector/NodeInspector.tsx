import { Activity, Cpu, Info, ServerCog } from 'lucide-react';
import { useUiStore } from '../../store/useUiStore';
import type { ServiceNode, ServiceNodeData } from '../../types';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';

interface NodeInspectorProps {
  selectedNode: ServiceNode | null;
  onPatchNodeData: (
    nodeId: string,
    patch: Partial<ServiceNodeData>
  ) => void;
  onDeleteNode: (nodeId: string) => void;
}

function statusTone(status: ServiceNodeData['status']) {
  if (status === 'Healthy') {
    return 'success';
  }

  if (status === 'Degraded') {
    return 'warning';
  }

  return 'danger';
}

export function NodeInspector({
  selectedNode,
  onPatchNodeData,
  onDeleteNode,
}: NodeInspectorProps) {
  const activeTab = useUiStore((state) => state.activeInspectorTab);
  const setActiveTab = useUiStore(
    (state) => state.setActiveInspectorTab
  );

  function patchNodeData(patch: Partial<ServiceNodeData>) {
    if (!selectedNode) {
      return;
    }

    onPatchNodeData(selectedNode.id, patch);
  }

  if (!selectedNode) {
    return (
      <section
        className="inspector inspector--empty"
        aria-label="Node inspector"
      >
        <Info size={22} />
        <h2>Service Node</h2>
        <p>
          Select a node on the canvas to inspect configuration and
          runtime controls.
        </p>
      </section>
    );
  }

  const cpuLimit = Number(selectedNode.data.cpuLimit);

  return (
    <section className="inspector" aria-label="Node inspector">
      <div className="inspector__title-row">
        <div>
          <span className="eyebrow">Service Node</span>
          <h2>{selectedNode.data.label}</h2>
        </div>

        <Badge tone={statusTone(selectedNode.data.status)}>
          {selectedNode.data.status}
        </Badge>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as 'config' | 'runtime')
        }
      >
        <TabsList>
          <TabsTrigger value="config">
            <ServerCog size={15} /> Config
          </TabsTrigger>

          <TabsTrigger value="runtime">
            <Activity size={15} /> Runtime
          </TabsTrigger>
        </TabsList>

        <TabsContent value="config">
          <label className="field">
            <span>Node name</span>

            <Input
              value={selectedNode.data.label}
              onChange={(event) =>
                patchNodeData({
                  label: event.target.value,
                })
              }
            />
          </label>

          <label className="field">
            <span>Description</span>

            <Textarea
              value={selectedNode.data.description}
              rows={4}
              onChange={(event) =>
                patchNodeData({
                  description: event.target.value,
                })
              }
            />
          </label>

          <div className="field">
            <div className="field__label-row">
              <span>CPU limit</span>
              <Cpu size={16} />
            </div>

            <div className="slider-input-row">
              <Slider
                min={0}
                max={100}
                step={1}
                value={[cpuLimit]}
                onValueChange={([value]) =>
                  patchNodeData({
                    cpuLimit: value ?? 0,
                  })
                }
              />

              <Input
                type="number"
                min={0}
                max={100}
                value={cpuLimit}
                onChange={(event) =>
                  patchNodeData({
                    cpuLimit: Math.min(
                      100,
                      Math.max(
                        0,
                        Number(event.target.value)
                      )
                    ),
                  })
                }
              />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              marginTop: '12px',
            }}
          >
            <Button variant="primary" type="button">
              Save configuration
            </Button>

            <Button
              variant="secondary"
              type="button"
              onClick={() => onDeleteNode(selectedNode.id)}
            >
              Delete Node
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="runtime">
          <div className="runtime-grid">
            <span>Memory</span>
            <strong>
              {selectedNode.data.memoryGb.toFixed(2)} GB
            </strong>

            <span>Disk</span>
            <strong>
              {selectedNode.data.diskGb.toFixed(2)} GB
            </strong>

            <span>Regions</span>
            <strong>{selectedNode.data.regionCount}</strong>

            <span>Cost</span>
            <strong>{selectedNode.data.hourlyCost}</strong>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}