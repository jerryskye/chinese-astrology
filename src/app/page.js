'use client';
import styles from "./page.module.css";
import CalendarYear from "../CalendarYear.js";
import { CalendarChinese } from "date-chinese";
import ZodiacCalculator from "../ZodiacCalculator";
import ZodiacCircle from "../ZodiacCircle";
import animals from "../helpers/animals";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const getAnimalForYear = (year) => {
  const startYear = 1900; // Rat year
  const offset = (year - startYear) % 12;
  return animals[offset].name;
};

const calculateYearTable = function (selectedAnimal = null, loading = false, onCellClick = null) {
  const cal = new CalendarChinese();
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 7;
  const endYear = startYear - 69;

  return [...Array(70).keys()].map((i) => {
    const year = endYear + i;
    // Get lunar new year date for this year
    const newYear = cal.newYear(year);
    cal.fromJDE(newYear);
    const lunarNewYear = cal.toDate();

    // Get the animals for both parts of the year
    const previousAnimal = getAnimalForYear(year - 1); // For Jan 1 to Lunar New Year
    const currentAnimal = getAnimalForYear(year);      // For Lunar New Year onwards

    // If we're filtering by animal, check if either this year or previous year matches
    if (selectedAnimal &&
        currentAnimal !== selectedAnimal &&
        previousAnimal !== selectedAnimal) {
      return null;
    }

    return (
      <CalendarYear
        key={year}
        date={lunarNewYear}
        previousAnimal={previousAnimal}
        currentAnimal={currentAnimal}
        selectedAnimal={selectedAnimal}
        onCellClick={onCellClick}
      />
    );
  }).filter(Boolean);
};

export default function Home() {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef(null);
  const router = useRouter();

  const handleAnimalSelect = (animal) => {
    setSelectedAnimal(animal);
    setTimeout(() => {
      tableRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCellClick = (rowIdx, colIdx, sign, element) => {
    if (loading) return;
    setLoading(true);
    router.push(`/${element.split(' ')[0].toLowerCase()}/${sign.split(' ')[0].toLowerCase()}`);
    window.scrollTo(0, 0);
  };

  const years = calculateYearTable(selectedAnimal, loading, handleCellClick);
  const tableTitle = selectedAnimal
    ? `Years of the ${selectedAnimal}`
    : "Find your lunar birth year";

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.zodiacCircle}>
          <ZodiacCircle onAnimalSelect={handleAnimalSelect} selectedAnimal={selectedAnimal} spinning={loading} />
        </div>
        <ZodiacCalculator />
        <table className={styles.table} ref={tableRef}>
          <thead>
            <tr>
              <th colSpan="4">{tableTitle}</th>
            </tr>
            <tr>
              <th>Year</th>
              <th>Date</th>
              <th>Element</th>
              <th>Animal Sign</th>
            </tr>
          </thead>
          {years}
        </table>
        <a href="#" className={styles.link} onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          ↑ Back to top
        </a>
      </main>
    </div>
  );
}
