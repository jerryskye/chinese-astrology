import styles from "./page.module.css";
import CalendarYear from "../CalendarYear.js";
import { CalendarChinese }from "date-chinese";

const calculateYearTable = function () {
  const cal = new CalendarChinese()
  return [...Array(40).keys()].map((i) => {
    const newYear = cal.newYear(1984 + i);
    cal.fromJDE(newYear);
    const date = cal.toDate();
    return {
      year: date.getFullYear(),
      from: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      signs: ["Pig", "Rat"],
      elements: ["Wood", "Fire"]
    };
  });
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
