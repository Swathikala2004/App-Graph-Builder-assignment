import {
  Blocks,
  Box,
  Database,
  GitBranch,
  Layers3,
  Leaf,
  Server,
  Code,
} from 'lucide-react';

const navItems = [Code, Database, Server, Leaf, Box, Layers3, GitBranch];

export function LeftRail() {
  return (
    <nav className="left-rail" aria-label="Primary navigation">
      {navItems.map((Icon, index) => (
        <button
          key={index}
          className={
            index === 0
              ? 'left-rail__item left-rail__item--active'
              : 'left-rail__item'
          }
          type="button"
        >
          <Icon size={22} />
        </button>
      ))}

      <button
        className="left-rail__item left-rail__item--accent"
        type="button"
      >
        <Blocks size={22} />
      </button>
    </nav>
  );
}