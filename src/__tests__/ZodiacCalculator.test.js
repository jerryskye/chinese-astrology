import { render, screen, fireEvent } from '@testing-library/react';
import ZodiacCalculator from '../ZodiacCalculator';
import { calculateChineseZodiac } from '../helpers/zodiac';
import { useRouter } from 'next/navigation';

// Mock the zodiac helper function
jest.mock('../helpers/zodiac', () => ({
  calculateChineseZodiac: jest.fn(() => ({ sign: 'Dragon 🐉', element: 'Wood 🪵' }))
}));

// Mock the next/navigation router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  }))
}));

describe('ZodiacCalculator', () => {
  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset mock function calls
    jest.clearAllMocks();
    // Set up router mock
    useRouter.mockReturnValue(mockRouter);
  });

  test('renders calculator form with all inputs', () => {
    render(<ZodiacCalculator />);

    expect(screen.getByLabelText(/birth date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/birth time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/timezone/i)).toBeInTheDocument();
  });

  test('loads saved values from localStorage on mount', () => {
    // Set some values in localStorage
    localStorage.setItem('birthDate', '2024-02-01');
    localStorage.setItem('birthTime', '14:00');
    localStorage.setItem('timezone', 'America/New_York');

    render(<ZodiacCalculator />);

    expect(screen.getByLabelText(/birth date/i)).toHaveValue('2024-02-01');
    expect(screen.getByLabelText(/birth time/i)).toHaveValue('14:00');
    expect(screen.getByLabelText(/timezone/i)).toHaveValue('America/New_York');
  });

  test('updates birth date and calculates zodiac', () => {
    render(<ZodiacCalculator />);

    const dateInput = screen.getByLabelText(/birth date/i);
    fireEvent.change(dateInput, { target: { value: '2024-01-01' } });

    expect(calculateChineseZodiac).toHaveBeenCalledWith('2024-01-01', '12:00', expect.any(String));
    expect(screen.getByText(/your chinese zodiac sign: dragon 🐉/i)).toBeInTheDocument();
    expect(screen.getByText(/your element: wood 🪵/i)).toBeInTheDocument();
  });

  test('updates birth time and recalculates zodiac', () => {
    render(<ZodiacCalculator />);

    // Set a date first
    const dateInput = screen.getByLabelText(/birth date/i);
    fireEvent.change(dateInput, { target: { value: '2024-01-01' } });

    // Update time
    const timeInput = screen.getByLabelText(/birth time/i);
    fireEvent.change(timeInput, { target: { value: '15:30' } });

    expect(calculateChineseZodiac).toHaveBeenCalledWith('2024-01-01', '15:30', expect.any(String));
  });

  test('updates timezone and recalculates zodiac', () => {
    render(<ZodiacCalculator />);

    // Set a date first
    const dateInput = screen.getByLabelText(/birth date/i);
    fireEvent.change(dateInput, { target: { value: '2024-01-01' } });

    // Update timezone
    const timezoneSelect = screen.getByLabelText(/timezone/i);
    fireEvent.change(timezoneSelect, { target: { value: 'America/New_York' } });

    expect(calculateChineseZodiac).toHaveBeenCalledWith('2024-01-01', '12:00', 'America/New_York');
  });

  test('navigates to detail page when learn more button is clicked', () => {
    render(<ZodiacCalculator />);

    // Set a date to trigger zodiac calculation
    const dateInput = screen.getByLabelText(/birth date/i);
    fireEvent.change(dateInput, { target: { value: '2024-01-01' } });

    // Click learn more button
    const learnMoreButton = screen.getByText(/learn more about wood dragon/i);
    fireEvent.click(learnMoreButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/wood/dragon');
  });

  test('saves values to localStorage when updated', () => {
    render(<ZodiacCalculator />);

    // Update date
    const dateInput = screen.getByLabelText(/birth date/i);
    fireEvent.change(dateInput, { target: { value: '2024-01-01' } });

    // Update time
    const timeInput = screen.getByLabelText(/birth time/i);
    fireEvent.change(timeInput, { target: { value: '15:30' } });

    // Update timezone
    const timezoneSelect = screen.getByLabelText(/timezone/i);
    fireEvent.change(timezoneSelect, { target: { value: 'America/New_York' } });

    expect(localStorage.getItem('birthDate')).toBe('2024-01-01');
    expect(localStorage.getItem('birthTime')).toBe('15:30');
    expect(localStorage.getItem('timezone')).toBe('America/New_York');
  });
});
