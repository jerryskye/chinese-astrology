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
