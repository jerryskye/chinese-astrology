import styles from "./page.module.css";
import CalendarYear from "../CalendarYear.js";
import { CalendarChinese } from "date-chinese";
import ZodiacCalculator from "../ZodiacCalculator";

const calculateYearTable = function () {
  const cal = new CalendarChinese()
  return [...Array(40).keys()].map((i) => {
    const newYear = cal.newYear(1984 + i);
    cal.fromJDE(newYear);
    const date = cal.toDate();
    return <CalendarYear key={date} date={date} />;
  });
};

export default function Home() {
  const years = calculateYearTable();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ZodiacCalculator />
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
