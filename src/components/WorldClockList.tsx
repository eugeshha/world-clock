import WorldClock from './WorldClock';
import type { Clock } from '../types';

interface WorldClockListProps {
  clocks: Clock[];
  onDelete: (id: string) => void;
}

/** Компонент списка мировых часов, отображающий все добавленные часы. */
const WorldClockList = ({ clocks, onDelete }: WorldClockListProps) => {
  return (
    <div className="world-clock-list">
      {clocks.map((clock) => (
        <WorldClock
          key={clock.id}
          id={clock.id}
          name={clock.name}
          timezoneOffset={clock.timezoneOffset}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default WorldClockList;
