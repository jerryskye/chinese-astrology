import { getCompanionshipText } from './helpers/companionSignData';
import styles from './app/[element]/[animal]/page.module.css';

export default function CompanionInfo({ zodiacSign, companionSign }) {
  const compatibilityText = getCompanionshipText(zodiacSign, companionSign);

  return (
    <div>
      <h1>{zodiacSign} with a {companionSign} Companion</h1>
      <div className={styles.elementAnimalContent}>
        <section>
          {compatibilityText.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>
      </div>
    </div>
  );
}
