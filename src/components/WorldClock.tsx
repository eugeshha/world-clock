import { Component } from 'react';

interface WorldClockProps {
  id: string;
  name: string;
  timezoneOffset: number;
  onDelete: (id: string) => void;
}

interface WorldClockState {
  time: Date;
}

/** Компонент одного мирового часа с аналоговым циферблатом, обновляющийся каждую секунду. */
class WorldClock extends Component<WorldClockProps, WorldClockState> {
  private intervalId: number | null = null;

  constructor(props: WorldClockProps) {
    super(props);
    this.state = {
      time: this.getCityTime(),
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({
        time: this.getCityTime(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getCityTime = (): Date => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const cityTime = new Date(utc + this.props.timezoneOffset * 3600000);
    return cityTime;
  };

  render() {
    const { name, id, onDelete } = this.props;
    const { time } = this.state;

    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const hourAngle = (hours * 30 + minutes * 0.5) % 360;
    const minuteAngle = (minutes * 6 + seconds * 0.1) % 360;
    const secondAngle = (seconds * 6) % 360;

    return (
      <div className="world-clock">
        <div className="clock-header">
          <div className="clock-name">{name}</div>
          <button className="delete-button" onClick={() => onDelete(id)}>
            ✕
          </button>
        </div>
        <div className="clock-face">
          <div className="clock-hand hour-hand" style={{ transform: `rotate(${hourAngle}deg)` }} />
          <div className="clock-hand minute-hand" style={{ transform: `rotate(${minuteAngle}deg)` }} />
          <div className="clock-hand second-hand" style={{ transform: `rotate(${secondAngle}deg)` }} />
          <div className="clock-center" />
        </div>
        <div className="clock-time">
          {time.toLocaleTimeString('ru-RU', { hour12: false })}
        </div>
      </div>
    );
  }
}

export default WorldClock;
