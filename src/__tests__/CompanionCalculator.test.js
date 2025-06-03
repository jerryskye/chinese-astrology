import { render, screen, fireEvent } from '@testing-library/react';
import CompanionCalculator from '../CompanionCalculator';
import { calculateChineseZodiac, calculateCompanionSign } from '../helpers/zodiac';

// Mock the zodiac helper functions
jest.mock('../helpers/zodiac', () => ({
  calculateChineseZodiac: jest.fn(() => ({ sign: 'Dragon' })),
  calculateCompanionSign: jest.fn(() => 'Tiger'),
}));

describe('CompanionCalculator', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset mock function calls
    jest.clearAllMocks();
  });

  test('renders calculator form with all inputs', () => {
    render(<CompanionCalculator />);

    expect(screen.getByLabelText(/birth date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/birth time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/timezone/i)).toBeInTheDocument();
  });

  test('updates birth date and calculates signs', () => {
    render(<CompanionCalculator />);

    const dateInput = screen.getByLabelText(/birth date/i);
    fireEvent.change(dateInput, { target: { value: '2024-01-01' } });

    expect(calculateChineseZodiac).toHaveBeenCalledWith('2024-01-01', '12:00', expect.any(String));
    expect(calculateCompanionSign).toHaveBeenCalledWith('2024-01-01', '12:00', expect.any(String));
    expect(screen.getByText(/your companion sign: tiger/i)).toBeInTheDocument();
  });

  test('updates birth time and recalculates signs', () => {
    render(<CompanionCalculator />);

    // Set a date first
    const dateInput = screen.getByLabelText(/birth date/i);
    fireEvent.change(dateInput, { target: { value: '2024-01-01' } });

    // Update time
    const timeInput = screen.getByLabelText(/birth time/i);
    fireEvent.change(timeInput, { target: { value: '15:30' } });

    expect(calculateChineseZodiac).toHaveBeenCalledWith('2024-01-01', '15:30', expect.any(String));
    expect(calculateCompanionSign).toHaveBeenCalledWith('2024-01-01', '15:30', expect.any(String));
  });

  test('loads saved values from localStorage on mount', () => {
    // Set some values in localStorage
    localStorage.setItem('birthDate', '2024-02-01');
    localStorage.setItem('birthTime', '14:00');
    localStorage.setItem('timezone', 'America/New_York');

    render(<CompanionCalculator />);

    expect(screen.getByLabelText(/birth date/i)).toHaveValue('2024-02-01');
    expect(screen.getByLabelText(/birth time/i)).toHaveValue('14:00');
    expect(screen.getByLabelText(/timezone/i)).toHaveValue('America/New_York');
  });
});
