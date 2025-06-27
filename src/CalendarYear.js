'use client';

import { calculateSigns, calculateElements } from './helpers/zodiac';
import { useRouter } from 'next/navigation';
import styles from './app/page.module.css';
import { useState } from 'react';

const CalendarYear = ({ date, selectedAnimal, previousAnimal, currentAnimal, onCellClick }) => {
  const router = useRouter();
  const dateYear = date.getFullYear();
  const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const dateDayAhead = new Date(date);
  dateDayAhead.setDate(dateDayAhead.getDate() + 1);
  const dateDayAheadString = dateDayAhead.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const signs = calculateSigns(dateYear);
  const elements = calculateElements(dateYear);

  const isFirstRowGreyedOut = selectedAnimal && previousAnimal !== selectedAnimal;
  const isSecondRowGreyedOut = selectedAnimal && currentAnimal !== selectedAnimal;

  return (
    <tbody>
      <tr className={styles.clickableRow}>
        <th className={styles.yearCell} rowSpan="2">{dateYear}</th>
        <td className={isFirstRowGreyedOut ? styles.greyedOut : ''} onClick={() => onCellClick(0, 0, signs[0], elements[0])}>
          Jan 1 - {dateString}
        </td>
        <td className={isFirstRowGreyedOut ? styles.greyedOut : ''} onClick={() => onCellClick(0, 1, signs[0], elements[0])}>
          {elements[0]}
        </td>
        <td className={isFirstRowGreyedOut ? styles.greyedOut : ''} onClick={() => onCellClick(0, 2, signs[0], elements[0])}>
          {signs[0]}
        </td>
      </tr>
      <tr className={styles.clickableRow}>
        <td className={isSecondRowGreyedOut ? styles.greyedOut : ''} onClick={() => onCellClick(1, 0, signs[1], elements[1])}>
          {`${dateDayAheadString} - Dec 31`}
        </td>
        <td className={isSecondRowGreyedOut ? styles.greyedOut : ''} onClick={() => onCellClick(1, 1, signs[1], elements[1])}>
          {elements[1]}
        </td>
        <td className={isSecondRowGreyedOut ? styles.greyedOut : ''} onClick={() => onCellClick(1, 2, signs[1], elements[1])}>
          {signs[1]}
        </td>
      </tr>
    </tbody>
  );
};

export default CalendarYear;
