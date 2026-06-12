import { Focus, RefreshCcw, Share2, SlidersHorizontal } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';
import { useQueryClient } from '@tanstack/react-query';
import { useUiStore } from '../../store/useUiStore';
import { Button } from '../ui/button';

export function TopBar() {
  const { fitView } = useReactFlow();
  const queryClient = useQueryClient();
  const selectedAppId = useUiStore((state) => state.selectedAppId);
  const mockErrorEnabled = useUiStore((state) => state.mockErrorEnabled);
  const setMockErrorEnabled = useUiStore((state) => state.setMockErrorEnabled);

  return (
    <header className="top-bar">
      <div className="brand-mark" aria-hidden="true" />
      <div className="app-icon app-icon--blue">A</div>
      <div className="top-bar__title">
        <span>App Graph Builder</span>
        <strong>{selectedAppId}</strong>
      </div>
      <div className="top-bar__actions">
        <Button variant="icon" type="button" aria-label="Fit graph view" onClick={() => fitView({ padding: 0.16, duration: 400 })}>
          <Focus size={18} />
        </Button>
        <Button
          variant="icon"
          type="button"
          aria-label="Refresh graph data"
          onClick={() => void queryClient.invalidateQueries({ queryKey: ['apps'] })}
        >
          <RefreshCcw size={17} />
        </Button>
        <Button variant="icon" type="button" aria-label="Share graph">
          <Share2 size={17} />
        </Button>
        <Button
          className={mockErrorEnabled ? 'is-active' : undefined}
          variant="icon"
          type="button"
          aria-label="Toggle mock API error"
          aria-pressed={mockErrorEnabled}
          onClick={() => setMockErrorEnabled(!mockErrorEnabled)}
        >
          <SlidersHorizontal size={17} />
        </Button>
      </div>
    </header>
  );
}