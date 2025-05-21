import styles from "./page.module.css";
import CalendarYear from "../CalendarYear.js";
import { CalendarChinese } from "date-chinese";

const calculateYearTable = function () {
  const cal = new CalendarChinese()
  return [...Array(40).keys()].map((i) => {
    const newYear = cal.newYear(1984 + i);
    cal.fromJDE(newYear);
    const date = cal.toDate();
    return {
      date: date,
      signs: ["Pig", "Rat"],
      elements: ["Wood", "Fire"]
    };
  });
};

export default function Home() {
  const years = calculateYearTable().map(({ date, signs, elements }) => {
    return <CalendarYear key={date} date={date} signs={signs} elements={elements} />;
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
