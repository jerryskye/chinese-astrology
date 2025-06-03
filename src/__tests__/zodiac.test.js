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
