import mainStyles from "../../page.module.css";
import styles from "./page.module.css";

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

  return (
    <div className={mainStyles.page}>
      <main className={mainStyles.main}>
        
        <h1>{capitalizedElement} {capitalizedAnimal}</h1>
        
        <div className={styles.elementAnimalContent}>
          <section>
            <h2>Personality Traits</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </section>

          <section>
            <h2>Career Prospects</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </section>

          <section>
            <h2>Relationships</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
              totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </section>

          <section>
            <h2>Health and Wellness</h2>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores 
              eos qui ratione voluptatem sequi nesciunt.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
} 