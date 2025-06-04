import { render, screen } from '@testing-library/react';
import CompanionInfo from '../CompanionInfo';

describe('CompanionInfo', () => {
  test('displays correct compatibility text for Rat and Dragon', () => {
    render(<CompanionInfo zodiacSign="Rat" companionSign="Dragon" />);

    // Check the heading
    expect(screen.getByText('Rat with a Dragon Companion')).toBeInTheDocument();

    // Check the content - Dragon is an excellent companion for the Rat
    expect(screen.getByText(/This is a lucky combination, for the Dragon is an excellent companion for the Rat/)).toBeInTheDocument();
    expect(screen.getByText(/The voyage will be magical/)).toBeInTheDocument();
    expect(screen.getByText(/In deepest harmony with himself, the Rat will leave his bottomless depths and will ride his scaled companion across the Milky Way/)).toBeInTheDocument();
  });

  test('all zodiac sign combinations have valid compatibility data', () => {
    const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    const fallbackMessage = 'The data for this combination is not available. Please email me at jarek@siedlarz.com';

    // Test each combination
    zodiacSigns.forEach(zodiacSign => {
      zodiacSigns.forEach(companionSign => {
        const { container } = render(
          <CompanionInfo
            zodiacSign={zodiacSign}
            companionSign={companionSign}
          />
        );

        // Check that the fallback message is not displayed
        expect(container.textContent).not.toContain(fallbackMessage);

        // Clean up after each render
        container.remove();
      });
    });
  });
});
