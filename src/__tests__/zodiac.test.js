import { calculateSigns, calculateElements, calculateChineseZodiac, calculateCompanionSign } from '../helpers/zodiac';

describe('zodiac calculations', () => {
  describe('calculateSigns', () => {
    test('returns correct signs for different years', () => {
      expect(calculateSigns(2024)).toEqual(['Rabbit 🐰', 'Dragon 🐉']); // 2024 % 12 = 8
      expect(calculateSigns(2025)).toEqual(['Dragon 🐉', 'Snake 🐍']); // 2025 % 12 = 9
      expect(calculateSigns(2026)).toEqual(['Snake 🐍', 'Horse 🐴']); // 2026 % 12 = 10
    });
  });

  describe('calculateElements', () => {
    test('returns correct elements for different years', () => {
      expect(calculateElements(2024)).toEqual(['Water 🌊', 'Wood 🪵']); // 2024 % 10 = 4
      expect(calculateElements(2025)).toEqual(['Wood 🪵', 'Wood 🪵']); // 2025 % 10 = 5
      expect(calculateElements(2026)).toEqual(['Wood 🪵', 'Fire 🔥']); // 2026 % 10 = 6
    });
  });

  describe('calculateChineseZodiac', () => {
    const mockTimezone = 'UTC';

    test('returns correct zodiac sign and element before Chinese New Year', () => {
      // February 9, 2024 (before Chinese New Year on February 10, 2024)
      const result = calculateChineseZodiac('2024-02-09', '12:00', mockTimezone);
      expect(result.sign).toBe('Rabbit 🐰');
      expect(result.element).toBe('Water 🌊');
    });

    test('returns correct zodiac sign and element after Chinese New Year', () => {
      // February 11, 2024 (after Chinese New Year)
      const result = calculateChineseZodiac('2024-02-11', '12:00', mockTimezone);
      expect(result.sign).toBe('Dragon 🐉');
      expect(result.element).toBe('Wood 🪵');
    });

    test('returns null for invalid date', () => {
      const result = calculateChineseZodiac(null, '12:00', mockTimezone);
      expect(result).toBeNull();
    });

    describe('historical figures zodiac signs', () => {
      test('Charlotte Brontë (born April 21, 1816) should be Rat with Fire element', () => {
        const result = calculateChineseZodiac('1816-04-21', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
        expect(result.element).toBe('Fire 🔥');
      });

      test('Beethoven (born December 16, 1770) should be Tiger with Metal element', () => {
        const result = calculateChineseZodiac('1770-12-16', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Emily Brontë (born July 30, 1818) should be Tiger with Earth element', () => {
        const result = calculateChineseZodiac('1818-07-30', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Earth ⛰️');
      });

      test('Queen Christina of Sweden (born December 8, 1626) should be Tiger with Fire element', () => {
        const result = calculateChineseZodiac('1626-12-08', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Fire 🔥');
      });

      test('Charles de Gaulle (born November 22, 1890) should be Tiger with Metal element', () => {
        const result = calculateChineseZodiac('1890-11-22', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Isadora Duncan (born May 26, 1877) should be Ox with Fire element', () => {
        const result = calculateChineseZodiac('1877-05-26', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Fire 🔥');
      });

      test('Dwight D. Eisenhower (born October 14, 1890) should be Tiger with Metal element', () => {
        const result = calculateChineseZodiac('1890-10-14', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Elizabeth II (born April 21, 1926) should be Tiger with Fire element', () => {
        const result = calculateChineseZodiac('1926-04-21', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Fire 🔥');
      });

      test('Francisco Goya (born March 30, 1746) should be Tiger with Fire element', () => {
        const result = calculateChineseZodiac('1746-03-30', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Fire 🔥');
      });

      test('Ho Chi Minh (born May 19, 1890) should be Tiger with Metal element', () => {
        const result = calculateChineseZodiac('1890-05-19', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Wassily Kandinsky (born December 16, 1866) should be Tiger with Fire element', () => {
        const result = calculateChineseZodiac('1866-12-16', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Fire 🔥');
      });

      test('Jerry Lewis (born March 16, 1926) should be Tiger with Fire element', () => {
        const result = calculateChineseZodiac('1926-03-16', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Fire 🔥');
      });

      test('Charles Lindbergh (born February 4, 1902) should be Ox with Metal element', () => {
        const result = calculateChineseZodiac('1902-02-04', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Louis XIV (born September 5, 1638) should be Tiger with Earth element', () => {
        const result = calculateChineseZodiac('1638-09-05', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Earth ⛰️');
      });

      test('Karl Marx (born May 5, 1818) should be Tiger with Earth element', () => {
        const result = calculateChineseZodiac('1818-05-05', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Earth ⛰️');
      });

      test('Marilyn Monroe (born June 1, 1926) should be Tiger with Fire element', () => {
        const result = calculateChineseZodiac('1926-06-01', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Fire 🔥');
      });

      test('Lola Montez (born February 17, 1821) should be Snake with Metal element', () => {
        const result = calculateChineseZodiac('1821-02-17', '12:00', mockTimezone);
        expect(result.sign).toBe('Snake 🐍');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Paganini (born October 27, 1782) should be Tiger with Water element', () => {
        const result = calculateChineseZodiac('1782-10-27', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Water 🌊');
      });

      test('Pergolese (born January 4, 1710) should be Ox with Earth element', () => {
        const result = calculateChineseZodiac('1710-01-04', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Earth ⛰️');
      });

      test('Robespierre (born May 6, 1758) should be Tiger with Earth element', () => {
        const result = calculateChineseZodiac('1758-05-06', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Earth ⛰️');
      });

      test('John Steinbeck (born February 27, 1902) should be Tiger with Water element', () => {
        const result = calculateChineseZodiac('1902-02-27', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Water 🌊');
      });

      test('Mary, Queen of Scots (born December 8, 1542) should be Tiger with Water element', () => {
        const result = calculateChineseZodiac('1542-12-08', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Water 🌊');
      });

      test('Sun Yat-sen (born November 12, 1866) should be Tiger with Fire element', () => {
        const result = calculateChineseZodiac('1866-11-12', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Fire 🔥');
      });

      test('H. G. Wells (born September 21, 1866) should be Tiger with Fire element', () => {
        const result = calculateChineseZodiac('1866-09-21', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Fire 🔥');
      });

      test('Oscar Wilde (born October 16, 1854) should be Tiger with Wood element', () => {
        const result = calculateChineseZodiac('1854-10-16', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Wood 🪵');
      });

      test('Vyacheslav Molotov (born March 9, 1890) should be Tiger with Metal element', () => {
        const result = calculateChineseZodiac('1890-03-09', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Simón Bolívar (born July 24, 1783) should be Rabbit with Water element', () => {
        const result = calculateChineseZodiac('1783-07-24', '12:00', mockTimezone);
        expect(result.sign).toBe('Rabbit 🐰');
        expect(result.element).toBe('Water 🌊');
      });

      test('Alec Guinness (born April 2, 1914) should be Tiger with Wood element', () => {
        const result = calculateChineseZodiac('1914-04-02', '12:00', mockTimezone);
        expect(result.sign).toBe('Tiger 🐯');
        expect(result.element).toBe('Wood 🪵');
      });

      test('Luis Buñuel (born February 22, 1900) should be Rat with Metal element', () => {
        const result = calculateChineseZodiac('1900-02-22', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
        expect(result.element).toBe('Metal ⛓');
      });

      test('François-René de Chateaubriand (born September 4, 1768) should be Rat with Earth element', () => {
        const result = calculateChineseZodiac('1768-09-04', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
        expect(result.element).toBe('Earth ⛰️');
      });

      test('Henrik Ibsen (born March 20, 1828) should be Rat with Earth element', () => {
        const result = calculateChineseZodiac('1828-03-20', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
        expect(result.element).toBe('Earth ⛰️');
      });

      test('Eugène Ionesco (born November 26, 1909) should be Rooster with Earth element', () => {
        const result = calculateChineseZodiac('1909-11-26', '12:00', mockTimezone);
        expect(result.sign).toBe('Rooster 🐓');
        expect(result.element).toBe('Earth ⛰️');
      });

      test('Jack London (born January 12, 1876) should be Pig with Fire element', () => {
        const result = calculateChineseZodiac('1876-01-12', '12:00', mockTimezone);
        expect(result.sign).toBe('Pig 🐷');
        expect(result.element).toBe('Wood 🪵');
      });

      test('Claude Monet (born November 14, 1840) should be Rat with Metal element', () => {
        const result = calculateChineseZodiac('1840-11-14', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Wolfgang Amadeus Mozart (born January 27, 1756) should be Pig with Fire element', () => {
        const result = calculateChineseZodiac('1756-01-27', '12:00', mockTimezone);
        expect(result.sign).toBe('Pig 🐷');
        expect(result.element).toBe('Wood 🪵');
      });

      test('Auguste Rodin (born November 12, 1840) should be Rat with Metal element', () => {
        const result = calculateChineseZodiac('1840-11-12', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
        expect(result.element).toBe('Metal ⛓');
      });

      test('William Shakespeare (baptized April 26, 1564) should be Rat with Wood element', () => {
        const result = calculateChineseZodiac('1564-04-26', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
        expect(result.element).toBe('Wood 🪵');
      });

      test('Percy Bysshe Shelley (born August 4, 1792) should be Rat with Water element', () => {
        const result = calculateChineseZodiac('1792-08-04', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
        expect(result.element).toBe('Water 🌊');
      });

      test('Johann Strauss II (born October 25, 1825) should be Rooster with Wood element', () => {
        const result = calculateChineseZodiac('1825-10-25', '12:00', mockTimezone);
        expect(result.sign).toBe('Rooster 🐓');
        expect(result.element).toBe('Wood 🪵');
      });

      test('Pyotr Ilyich Tchaikovsky (born May 7, 1840) should be Rat with Metal element', () => {
        const result = calculateChineseZodiac('1840-05-07', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Leo Tolstoy (born September 9, 1828) should be Rat with Earth element', () => {
        const result = calculateChineseZodiac('1828-09-09', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
        expect(result.element).toBe('Earth ⛰️');
      });

      test('Henri de Toulouse-Lautrec (born November 24, 1864) should be Rat with Wood element', () => {
        const result = calculateChineseZodiac('1864-11-24', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
        expect(result.element).toBe('Wood 🪵');
      });

      test('Émile Zola (born April 2, 1840) should be Rat with Metal element', () => {
        const result = calculateChineseZodiac('1840-04-02', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Antoine de Saint-Exupéry (born June 29, 1900) should be Rat with Metal element', () => {
        const result = calculateChineseZodiac('1900-06-29', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Louis Lumière (born October 5, 1864) should be Rat with Wood element', () => {
        const result = calculateChineseZodiac('1864-10-05', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
        expect(result.element).toBe('Wood 🪵');
      });

      test('Konrad Adenauer (born January 5, 1876) should be Pig with Fire element', () => {
        const result = calculateChineseZodiac('1876-01-05', '12:00', mockTimezone);
        expect(result.sign).toBe('Pig 🐷');
        expect(result.element).toBe('Wood 🪵');
      });

      test('Lucrezia Borgia (born April 18, 1480) should be Rat with Metal element', () => {
        const result = calculateChineseZodiac('1480-04-18', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Jimmy Carter (born October 1, 1924) should be Rat with Wood element', () => {
        const result = calculateChineseZodiac('1924-10-01', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
        expect(result.element).toBe('Wood 🪵');
      });

      test('Charles I (born November 19, 1600) should be Rat with Metal element', () => {
        const result = calculateChineseZodiac('1600-11-19', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Charles I (born November 19, 1600) should have correct element', () => {
        const result = calculateChineseZodiac('1600-11-19', '12:00', mockTimezone);
        expect(result.element).toBe('Metal ⛓');
      });

      test('Carl von Clausewitz (born July 1, 1780) should be Rat', () => {
        const result = calculateChineseZodiac('1780-07-01', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
      });

      test('Benjamin Disraeli (born December 21, 1804) should be Rat', () => {
        const result = calculateChineseZodiac('1804-12-21', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
      });

      test('Heinrich Himmler (born October 7, 1900) should be Rat', () => {
        const result = calculateChineseZodiac('1900-10-07', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
      });

      test('Lawrence of Arabia (born August 16, 1888) should be Rat', () => {
        const result = calculateChineseZodiac('1888-08-16', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
      });

      test('Mata Hari (born August 7, 1876) should be Rat', () => {
        const result = calculateChineseZodiac('1876-08-07', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
      });

      test('Peter the Great (born June 9, 1672) should be Rat', () => {
        const result = calculateChineseZodiac('1672-06-09', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
      });

      test('Chiang Kai-shek (born October 31, 1887) should be Pig', () => {
        const result = calculateChineseZodiac('1887-10-31', '12:00', mockTimezone);
        expect(result.sign).toBe('Pig 🐷');
      });

      test('George Washington (born February 22, 1732) should be Rat', () => {
        const result = calculateChineseZodiac('1732-02-22', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
      });

      test('Werner von Braun (born March 23, 1912) should be Rat', () => {
        const result = calculateChineseZodiac('1912-03-23', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
      });

      test('Pablo Casals (born December 29, 1876) should be Rat', () => {
        const result = calculateChineseZodiac('1876-12-29', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
      });

      test('Maurice Chevalier (born September 12, 1888) should be Rat', () => {
        const result = calculateChineseZodiac('1888-09-12', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
      });

      test('Manuel de Falla (born November 23, 1876) should be Rat', () => {
        const result = calculateChineseZodiac('1876-11-23', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
      });

      test('Galileo Galilei (born February 15, 1564) should be Rat', () => {
        const result = calculateChineseZodiac('1564-02-15', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
      });

      test('Joseph Haydn (born March 31, 1732) should be Rat', () => {
        const result = calculateChineseZodiac('1732-03-31', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
      });

      test('Gioachino Rossini (born February 29, 1792) should be Rat', () => {
        const result = calculateChineseZodiac('1792-02-29', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
      });

      test('Johann Sebastian Bach (born March 31, 1685) should be Ox with Wood element', () => {
        const result = calculateChineseZodiac('1685-03-31', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Wood 🪵');
      });

      test('William Blake (born November 28, 1757) should be Ox with Fire element', () => {
        const result = calculateChineseZodiac('1757-11-28', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Fire 🔥');
      });

      test('Richard Burton (born November 10, 1925) should be Ox with Wood element', () => {
        const result = calculateChineseZodiac('1925-11-10', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Wood 🪵');
      });

      test('Albert Camus (born November 7, 1913) should be Ox with Water element', () => {
        const result = calculateChineseZodiac('1913-11-07', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Water 🌊');
      });

      test('Charlie Chaplin (born April 16, 1889) should be Ox with Earth element', () => {
        const result = calculateChineseZodiac('1889-04-16', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Earth ⛰️');
      });

      test('Georges Clemenceau (born September 28, 1841) should be Ox with Metal element', () => {
        const result = calculateChineseZodiac('1841-09-28', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Jean Cocteau (born July 5, 1889) should be Ox with Earth element', () => {
        const result = calculateChineseZodiac('1889-07-05', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Earth ⛰️');
      });

      test('Dante Alighieri (born May 21, 1265) should be Ox with Wood element', () => {
        const result = calculateChineseZodiac('1265-05-21', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Wood 🪵');
      });

      test('Walt Disney (born December 5, 1901) should be Ox with Metal element', () => {
        const result = calculateChineseZodiac('1901-12-05', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Jean Dubuffet (born July 31, 1901) should be Ox with Metal element', () => {
        const result = calculateChineseZodiac('1901-07-31', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Antonín Dvořák (born September 8, 1841) should be Ox with Metal element', () => {
        const result = calculateChineseZodiac('1841-09-08', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Geronimo (born June 1829) should be Ox with Earth element', () => {
        const result = calculateChineseZodiac('1829-06-15', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Earth ⛰️');
      });

      test('Alberto Giacometti (born October 10, 1901) should be Ox with Metal element', () => {
        const result = calculateChineseZodiac('1901-10-10', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Martin Heidegger (born September 26, 1889) should be Ox with Earth element', () => {
        const result = calculateChineseZodiac('1889-09-26', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Earth ⛰️');
      });

      test('Adolf Hitler (born April 20, 1889) should be Ox with Earth element', () => {
        const result = calculateChineseZodiac('1889-04-20', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Earth ⛰️');
      });

      test('Rudyard Kipling (born December 30, 1865) should be Ox with Wood element', () => {
        const result = calculateChineseZodiac('1865-12-30', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Wood 🪵');
      });

      test('Marquis de Lafayette (born September 6, 1757) should be Ox with Fire element', () => {
        const result = calculateChineseZodiac('1757-09-06', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Fire 🔥');
      });

      test('Vivien Leigh (born November 5, 1913) should be Ox with Water element', () => {
        const result = calculateChineseZodiac('1913-11-05', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Water 🌊');
      });

      test('Ferdinand de Lesseps (born November 19, 1805) should be Ox with Wood element', () => {
        const result = calculateChineseZodiac('1805-11-19', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Wood 🪵');
      });

      test('André Malraux (born November 3, 1901) should be Ox with Metal element', () => {
        const result = calculateChineseZodiac('1901-11-03', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Napoléon Bonaparte (born August 15, 1769) should be Ox with Earth element', () => {
        const result = calculateChineseZodiac('1769-08-15', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Earth ⛰️');
      });

      test('Jawaharlal Nehru (born November 14, 1889) should be Ox with Earth element', () => {
        const result = calculateChineseZodiac('1889-11-14', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Earth ⛰️');
      });

      test('Richard Nixon (born January 9, 1913) should be Rat with Water element', () => {
        const result = calculateChineseZodiac('1913-01-09', '12:00', mockTimezone);
        expect(result.sign).toBe('Rat 🐀');
        expect(result.element).toBe('Water 🌊');
      });

      test('Pierre-Auguste Renoir (born February 25, 1841) should be Ox with Metal element', () => {
        const result = calculateChineseZodiac('1841-02-25', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Cecil Rhodes (born July 5, 1853) should be Ox with Water element', () => {
        const result = calculateChineseZodiac('1853-07-05', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Water 🌊');
      });

      test('Richard the Lionheart (born September 8, 1157) should be Ox with Fire element', () => {
        const result = calculateChineseZodiac('1157-09-08', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Fire 🔥');
      });

      test('Peter Paul Rubens (born June 28, 1577) should be Ox with Fire element', () => {
        const result = calculateChineseZodiac('1577-06-28', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Fire 🔥');
      });

      test('Vincent van Gogh (born March 30, 1853) should be Ox with Water element', () => {
        const result = calculateChineseZodiac('1853-03-30', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Water 🌊');
      });

      test('Peter Sellers (born September 8, 1925) should be Ox with Wood element', () => {
        const result = calculateChineseZodiac('1925-09-08', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Wood 🪵');
      });

      test('Arthur Wellesley, 1st Duke of Wellington (born May 1, 1769) should be Ox with Earth element', () => {
        const result = calculateChineseZodiac('1769-05-01', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Earth ⛰️');
      });

      test('William Butler Yeats (born June 13, 1865) should be Ox with Wood element', () => {
        const result = calculateChineseZodiac('1865-06-13', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Wood 🪵');
      });

      test('Hans Christian Andersen (born April 2, 1805) should be Ox with Wood element', () => {
        const result = calculateChineseZodiac('1805-04-02', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Wood 🪵');
      });

      test('Desiderius Erasmus (born around October 28, 1466) should be Dog with Fire element', () => {
        const result = calculateChineseZodiac('1466-10-28', '12:00', mockTimezone);
        expect(result.sign).toBe('Dog 🐶');
        expect(result.element).toBe('Fire 🔥');
      });

      test('Niccolò Machiavelli (born May 3, 1469) should be Ox with Earth element', () => {
        const result = calculateChineseZodiac('1469-05-03', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Earth ⛰️');
      });

      test('Madame de Pompadour (born December 29, 1721) should be Ox with Metal element', () => {
        const result = calculateChineseZodiac('1721-12-29', '12:00', mockTimezone);
        expect(result.sign).toBe('Ox 🐂');
        expect(result.element).toBe('Metal ⛓');
      });

      test('Emiliano Zapata (born August 8, 1879) should be Rabbit with Earth element', () => {
        const result = calculateChineseZodiac('1879-08-08', '12:00', mockTimezone);
        expect(result.sign).toBe('Rabbit 🐰');
        expect(result.element).toBe('Earth ⛰️');
      });
    });
  });

  describe('calculateCompanionSign', () => {
    const mockTimezone = 'UTC';

    test('returns Rat for midnight hour', () => {
      expect(calculateCompanionSign('2024-01-01', '23:30', mockTimezone)).toBe('Rat 🐀');
    });

    test('returns Ox for early morning', () => {
      expect(calculateCompanionSign('2024-01-01', '01:30', mockTimezone)).toBe('Ox 🐂');
    });

    test('returns Tiger for early morning', () => {
      expect(calculateCompanionSign('2024-01-01', '03:30', mockTimezone)).toBe('Tiger 🐯');
    });

    test('returns Rabbit for dawn', () => {
      expect(calculateCompanionSign('2024-01-01', '05:30', mockTimezone)).toBe('Rabbit 🐰');
    });

    test('returns Dragon for morning', () => {
      expect(calculateCompanionSign('2024-01-01', '07:30', mockTimezone)).toBe('Dragon 🐉');
    });

    test('returns Snake for late morning', () => {
      expect(calculateCompanionSign('2024-01-01', '09:30', mockTimezone)).toBe('Snake 🐍');
    });

    test('returns Horse for noon', () => {
      expect(calculateCompanionSign('2024-01-01', '11:30', mockTimezone)).toBe('Horse 🐴');
    });

    test('returns Goat for early afternoon', () => {
      expect(calculateCompanionSign('2024-01-01', '13:30', mockTimezone)).toBe('Goat 🐐');
    });

    test('returns Monkey for afternoon', () => {
      expect(calculateCompanionSign('2024-01-01', '15:30', mockTimezone)).toBe('Monkey 🐒');
    });

    test('returns Rooster for late afternoon', () => {
      expect(calculateCompanionSign('2024-01-01', '17:30', mockTimezone)).toBe('Rooster 🐓');
    });

    test('returns Dog for evening', () => {
      expect(calculateCompanionSign('2024-01-01', '19:30', mockTimezone)).toBe('Dog 🐶');
    });

    test('returns Pig for late evening', () => {
      expect(calculateCompanionSign('2024-01-01', '21:30', mockTimezone)).toBe('Pig 🐷');
    });

    test('returns null for invalid date', () => {
      expect(calculateCompanionSign(null, '12:00', mockTimezone)).toBeNull();
    });

    test('handles timezone conversion correctly', () => {
      // Test that 8:00 AM in New York (13:00 UTC) gives a different result than 8:00 AM UTC
      const resultNY = calculateCompanionSign('2024-01-01', '08:00', 'America/New_York');
      const resultUTC = calculateCompanionSign('2024-01-01', '08:00', 'UTC');
      expect(resultNY).not.toBe(resultUTC);
    });
  });
});
