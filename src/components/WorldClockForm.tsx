import { useState } from 'react';

interface WorldClockFormProps {
  onAdd: (name: string, timezoneOffset: number) => void;
}

/** Компонент формы для добавления новых часов с полями названия и временной зоны. */
const WorldClockForm = ({ onAdd }: WorldClockFormProps) => {
  const [name, setName] = useState('');
  const [timezoneOffset, setTimezoneOffset] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !timezoneOffset.trim()) {
      return;
    }

    const offset = parseFloat(timezoneOffset);
    if (isNaN(offset)) {
      return;
    }

    onAdd(name.trim(), offset);
    setName('');
    setTimezoneOffset('');
  };

  return (
    <form className="world-clock-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Название</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Moscow"
        />
      </div>
      <div className="form-group">
        <label htmlFor="timezone">Временная зона</label>
        <input
          type="text"
          id="timezone"
          value={timezoneOffset}
          onChange={(e) => setTimezoneOffset(e.target.value)}
          placeholder="3"
        />
      </div>
      <button type="submit" className="add-button">Добавить</button>
    </form>
  );
};

export default WorldClockForm;
