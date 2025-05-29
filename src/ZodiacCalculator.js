'use client';

import { useState, useEffect } from 'react';
import styles from './app/page.module.css';
import { calculateSigns, calculateElements } from './helpers/zodiac';
import { CalendarChinese } from 'date-chinese';
import { useRouter } from 'next/navigation';

export default function ZodiacCalculator() {
  const router = useRouter();
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('12:00');
  const [timezone, setTimezone] = useState('UTC');
  const [timezones, setTimezones] = useState(['UTC']);
  const [zodiacInfo, setZodiacInfo] = useState(null);

  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const availableTimezones = Intl.supportedValuesOf('timeZone');
    setTimezones(availableTimezones);

    const savedBirthDate = localStorage.getItem('birthDate') || '';
    const savedBirthTime = localStorage.getItem('birthTime') || '12:00';
    const savedTimezone = localStorage.getItem('timezone') || userTimezone;

    setBirthDate(savedBirthDate);
    setBirthTime(savedBirthTime);
    setTimezone(savedTimezone);

    if (savedBirthDate) {
      calculateZodiac(savedBirthDate, savedBirthTime, savedTimezone);
    }
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
    localStorage.setItem('birthDate', date);
    calculateZodiac(date, birthTime, timezone);
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setBirthTime(time);
    localStorage.setItem('birthTime', time);
    if (birthDate) {
      calculateZodiac(birthDate, time, timezone);
    }
  };

  const handleTimezoneChange = (e) => {
    const newTimezone = e.target.value;
    setTimezone(newTimezone);
    localStorage.setItem('timezone', newTimezone);
    calculateZodiac(birthDate, birthTime, newTimezone);
  };

  const handleLearnMore = () => {
    if (zodiacInfo) {
      const element = zodiacInfo.element.split(' ')[0].toLowerCase();
      const sign = zodiacInfo.sign.split(' ')[0].toLowerCase();
      router.push(`/${element}/${sign}`);
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
          <button 
            onClick={handleLearnMore}
            className={styles.learnMoreButton}
          >
            Learn more about {zodiacInfo.element.split(' ')[0]} {zodiacInfo.sign.split(' ')[0]}
          </button>
        </div>
      )}
    </div>
  );
}