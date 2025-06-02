import { getCompanionshipText } from './helpers/companionSignData';
import styles from './app/[element]/[animal]/page.module.css';

export default function CompanionInfo({ zodiacSign, companionSign }) {
  const compatibilityText = getCompanionshipText(zodiacSign, companionSign);

  return (
    <div>
      <h1>{zodiacSign} with a {companionSign} companion</h1>
      <div className={styles.elementAnimalContent}>
        <p>{compatibilityText}</p>
      </div>
    </div>
  );
}
