'use client';

import { calculateSigns, calculateElements } from './helpers/zodiac';
import { useRouter } from 'next/navigation';
import styles from './app/page.module.css';

const CalendarYear = ({ date, selectedAnimal, previousAnimal, currentAnimal }) => {
  const router = useRouter();
  const dateYear = date.getFullYear();
  const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const dateDayAhead = new Date(date);
  dateDayAhead.setDate(dateDayAhead.getDate() + 1);
  const dateDayAheadString = dateDayAhead.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const signs = calculateSigns(dateYear);
  const elements = calculateElements(dateYear);

  const handleRowClick = (sign, element) => {
    router.push(`/${element.split(' ')[0].toLowerCase()}/${sign.split(' ')[0].toLowerCase()}`);
  };

  const isFirstRowGreyedOut = selectedAnimal && previousAnimal !== selectedAnimal;
  const isSecondRowGreyedOut = selectedAnimal && currentAnimal !== selectedAnimal;

  return (
    <tbody>
      <tr className={styles.clickableRow}>
        <th className={styles.yearCell} rowSpan="2">{dateYear}</th>
        <td className={isFirstRowGreyedOut ? styles.greyedOut : ''} onClick={() => handleRowClick(signs[0], elements[0])}>Jan 1 - {dateString}</td>
        <td className={isFirstRowGreyedOut ? styles.greyedOut : ''} onClick={() => handleRowClick(signs[0], elements[0])}>{elements[0]}</td>
        <td className={isFirstRowGreyedOut ? styles.greyedOut : ''} onClick={() => handleRowClick(signs[0], elements[0])}>{signs[0]}</td>
      </tr>
      <tr className={styles.clickableRow}>
        <td className={isSecondRowGreyedOut ? styles.greyedOut : ''} onClick={() => handleRowClick(signs[1], elements[1])}>{dateDayAheadString} - Dec 31</td>
        <td className={isSecondRowGreyedOut ? styles.greyedOut : ''} onClick={() => handleRowClick(signs[1], elements[1])}>{elements[1]}</td>
        <td className={isSecondRowGreyedOut ? styles.greyedOut : ''} onClick={() => handleRowClick(signs[1], elements[1])}>{signs[1]}</td>
      </tr>
    </tbody>
  );
};

export default CalendarYear;
