'use client';

import { useState } from 'react';
import styles from './app/page.module.css';
import { calculateSigns, calculateElements } from './helpers/zodiac';
import { CalendarChinese } from 'date-chinese';

export default function ZodiacCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('12:00');
  const [zodiacInfo, setZodiacInfo] = useState(null);

  const calculateZodiac = (date, time) => {
    const cal = new CalendarChinese();
    const [hours, minutes] = time.split(':').map(Number);
    const selectedDate = new Date(date);
    selectedDate.setHours(hours, minutes);
    const year = selectedDate.getFullYear();
    
    const newYearJDE = cal.newYear(year);
    cal.fromJDE(newYearJDE);
    const newYearDate = cal.toDate();
    
    const index = selectedDate < newYearDate ? 0 : 1;
    
    const signs = calculateSigns(year);
    const elements = calculateElements(year);
    
    setZodiacInfo({
      sign: signs[index],
      element: elements[index],
    });
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setBirthDate(date);
    calculateZodiac(date, birthTime);
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setBirthTime(time);
    if (birthDate) {
      calculateZodiac(birthDate, time);
    }
  };

  return (
    <div className={styles.calculator}>
      <h2>Find Your Chinese Zodiac Sign</h2>
      <div className={styles.datePickerContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="birthDate">Birth Date:</label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={handleDateChange}
            className={styles.datePicker}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="birthTime">Birth Time:</label>
          <input
            id="birthTime"
            type="time"
            value={birthTime}
            onChange={handleTimeChange}
            className={styles.timePicker}
          />
        </div>
      </div>
      {zodiacInfo && (
        <div className={styles.result}>
          <p>Your Chinese Zodiac Sign: {zodiacInfo.sign}</p>
          <p>Your Element: {zodiacInfo.element}</p>
        </div>
      )}
    </div>
  );
} 