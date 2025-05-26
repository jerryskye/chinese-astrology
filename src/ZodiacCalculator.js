'use client';

import { useState, useEffect } from 'react';
import styles from './app/page.module.css';
import { calculateSigns, calculateElements } from './helpers/zodiac';
import { CalendarChinese } from 'date-chinese';

export default function ZodiacCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('12:00');
  const [timezone, setTimezone] = useState('UTC');
  const [timezones, setTimezones] = useState(['UTC']);
  const [zodiacInfo, setZodiacInfo] = useState(null);

  useEffect(() => {
    // Set the user's timezone and available timezones after component mounts
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const availableTimezones = Intl.supportedValuesOf('timeZone');
    setTimezones(availableTimezones);
    setTimezone(userTimezone);
  }, []);

  const calculateZodiac = (date, time, selectedTimezone) => {
    if (!date) return;
    
    const cal = new CalendarChinese();
    
    const localDate = new Date(date + 'T' + time);
    const options = { timeZone: selectedTimezone };
    const dateInTimezone = new Date(localDate.toLocaleString('en-US', options));
    
    const year = dateInTimezone.getFullYear();
    
    const newYearJDE = cal.newYear(year);
    cal.fromJDE(newYearJDE);
    const newYearDate = cal.toDate();
    
    const index = dateInTimezone < newYearDate ? 0 : 1;
    
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
    calculateZodiac(date, birthTime, timezone);
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setBirthTime(time);
    if (birthDate) {
      calculateZodiac(birthDate, time, timezone);
    }
  };

  const handleTimezoneChange = (e) => {
    const newTimezone = e.target.value;
    setTimezone(newTimezone);
    calculateZodiac(birthDate, birthTime, newTimezone);
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
        <div className={styles.inputGroup}>
          <label htmlFor="timezone">Timezone:</label>
          <select
            id="timezone"
            value={timezone}
            onChange={handleTimezoneChange}
            className={styles.timePicker}
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
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