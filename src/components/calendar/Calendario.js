import { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendario.css'

function Calendario({ selectedDate, setSelectedDate}) {
  const [date, setDate] = useState(new Date());

  return (
    <div className='calendario'>
      <div className='calendar-container'>
      <Calendar locale='es' onChange={setSelectedDate} value={selectedDate} />
      </div>
    </div>
  );
}

export default Calendario;