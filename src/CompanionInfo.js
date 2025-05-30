import styles from './app/[element]/[animal]/page.module.css';

export default function CompanionInfo({ zodiacSign, companionSign }) {
  return (
    <div>
      <h1>{zodiacSign} with a {companionSign} companion</h1>
      <div className={styles.elementAnimalContent}>
        <section>
          <h2>Relationship Dynamics</h2>
          <p>
            The {zodiacSign?.split(' ')[0]} and {companionSign?.split(' ')[0]} combination creates an interesting dynamic. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </section>
        
        <section>
          <h2>Daily Interactions</h2>
          <p>
            When these signs interact, they bring unique energies together. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident.
          </p>
        </section>

        <section>
          <h2>Potential Challenges</h2>
          <p>
            While this pairing has many strengths, there are areas to be mindful of. 
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
          </p>
        </section>
      </div>
    </div>
  );
} 