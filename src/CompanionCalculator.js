'use client';

import { useState, useEffect } from 'react';
import styles from './app/page.module.css';
import { calculateChineseZodiac, calculateCompanionSign } from './helpers/zodiac';
import CompanionInfo from './CompanionInfo';

export default function CompanionCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('12:00');
  const [timezone, setTimezone] = useState('UTC');
  const [timezones, setTimezones] = useState(['UTC']);
  const [companionSign, setCompanionSign] = useState(null);
  const [zodiacSign, setZodiacSign] = useState(null);

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

    if (savedBirthDate && savedBirthTime) {
      calculateSigns(savedBirthDate, savedBirthTime, savedTimezone);
    }
  }, []);

  const calculateSigns = (date, time, selectedTimezone) => {
    if (!date) return;

    const zodiacResult = calculateChineseZodiac(date, time, selectedTimezone);
    const companionResult = calculateCompanionSign(date, time, selectedTimezone);

    setZodiacSign(zodiacResult.sign);
    setCompanionSign(companionResult);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setBirthDate(date);
    localStorage.setItem('birthDate', date);
    calculateSigns(date, birthTime, timezone);
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setBirthTime(time);
    localStorage.setItem('birthTime', time);
    if (birthDate) {
      calculateSigns(birthDate, time, timezone);
    }
  };

  const handleTimezoneChange = (e) => {
    const newTimezone = e.target.value;
    setTimezone(newTimezone);
    localStorage.setItem('timezone', newTimezone);
    if (birthDate) {
      calculateSigns(birthDate, birthTime, newTimezone);
    }
  };

  return (
    <>
      <div className={styles.calculator}>
        <h2>Find Your Companion Sign</h2>
        <div className={styles.datePickerContainer}>
          <div className={styles.inputGroup}>
            <label htmlFor="companionBirthDate">Birth Date:</label>
            <input
              id="companionBirthDate"
              type="date"
              value={birthDate}
              onChange={handleDateChange}
              className={styles.datePicker}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="companionBirthTime">Birth Time:</label>
            <input
              id="companionBirthTime"
              type="time"
              value={birthTime}
              onChange={handleTimeChange}
              className={styles.timePicker}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="companionTimezone">Timezone:</label>
            <select
              id="companionTimezone"
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
        {companionSign && (
          <div className={styles.result}>
            <p>Your Chinese Zodiac Sign: {zodiacSign}</p>
            <p>Your Companion Sign: {companionSign}</p>
          </div>
        )}
      </div>
      
      {zodiacSign && companionSign && (
        <CompanionInfo 
          zodiacSign={zodiacSign}
          companionSign={companionSign}
        />
      )}
      <a href="#" className={styles.backLink} onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}>
        ↑ Back to top
      </a>
    </>
  );
} 