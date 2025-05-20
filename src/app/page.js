import styles from "./page.module.css";
import CalendarYear from "../CalendarYear.js";

const calculateYearTable = function () {
  return [
    {year: 1996, from: "Feb 19", signs: ["Rat", "Pig"], elements: ["Fire", "Wood"]},
    {year: 1997, from: "Feb 07", signs: ["Ox", "Rat"], elements: ["Fire", "Earth"]},
    // Add more years as needed
  ];
};

export default function Home() {
  const years = calculateYearTable().map(({ year, from, signs, elements }) => {
    return <CalendarYear key={year} year={year} from={from} signs={signs} elements={elements} />;
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th colSpan="4">Find your lunar birth year</th>
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
      </main>
    </div>
  );
}
