import { useState, useEffect } from 'react';
import WorldClockForm from './components/WorldClockForm';
import WorldClockList from './components/WorldClockList';
import type { Clock } from './types';
import './App.css';

/** Главный компонент приложения для управления мировыми часами. */
function App() {
  const [clocks, setClocks] = useState<Clock[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('world-clocks');
    if (saved) {
      setClocks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('world-clocks', JSON.stringify(clocks));
  }, [clocks]);

  const handleAdd = (name: string, timezoneOffset: number) => {
    const newClock: Clock = {
      id: Date.now().toString(),
      name,
      timezoneOffset,
    };
    setClocks((prev) => [...prev, newClock]);
  };

  const handleDelete = (id: string) => {
    setClocks((prev) => prev.filter((clock) => clock.id !== id));
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="app-title">Мировые часы</h1>
        <WorldClockForm onAdd={handleAdd} />
        <WorldClockList clocks={clocks} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
