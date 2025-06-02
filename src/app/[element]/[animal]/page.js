import mainStyles from "../../page.module.css";
import styles from "./page.module.css";
import elementAnimalData from "../../../helpers/elementAnimalData";
import Link from "next/link";

const elements = ["wood", "fire", "earth", "metal", "water"];
const animals = [
  "rat", "ox", "tiger", "rabbit", "dragon", "snake",
  "horse", "goat", "monkey", "rooster", "dog", "pig"
];

export function generateStaticParams() {
  return elements.flatMap(element =>
    animals.map(animal => ({
      element,
      animal
    }))
  );
}

export default async function ElementAnimalPage({ params }) {
  const { element, animal } = await params;
  const capitalizedElement = element.charAt(0).toUpperCase() + element.slice(1);
  const capitalizedAnimal = animal.charAt(0).toUpperCase() + animal.slice(1);

  const animalData = elementAnimalData[element]?.[animal] || {};

  return (
    <div className={mainStyles.page}>
      <main className={mainStyles.main}>
        <Link href="/" className={styles.backLink}>
          ← Back to homepage
        </Link>

        <h1>{capitalizedElement} {capitalizedAnimal}</h1>

        <div className={styles.elementAnimalContent}>
          {Object.entries(animalData).map(([category, paragraphs]) => (
            <section key={category}>
              <h2>{category}</h2>
              {Array.isArray(paragraphs) ? (
                paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p>{paragraphs}</p>
              )}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
