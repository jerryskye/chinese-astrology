import { render, screen, fireEvent } from '@testing-library/react';
import CalendarYear from '../CalendarYear';
import { calculateSigns, calculateElements } from '../helpers/zodiac';
import { useRouter } from 'next/navigation';

// Mock the zodiac helper functions
jest.mock('../helpers/zodiac', () => ({
  calculateSigns: jest.fn(() => ['Dragon 🐉', 'Snake 🐍']),
  calculateElements: jest.fn(() => ['Wood 🪵', 'Fire 🔥'])
}));

// Mock the next/navigation router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  }))
}));

const renderWithTable = (component) => {
  return render(
    <table>
      {component}
    </table>
  );
};

describe('CalendarYear', () => {
  const mockRouter = {
    push: jest.fn()
  };
  const mockDate = new Date('2024-02-10'); // Chinese New Year 2024

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue(mockRouter);
  });

  test('renders year and dates correctly', () => {
    renderWithTable(<CalendarYear date={mockDate} />);

    // Check year is displayed
    expect(screen.getByText('2024')).toBeInTheDocument();

    // Check date ranges are displayed
    expect(screen.getByText('Jan 1 - Feb 10')).toBeInTheDocument();
    expect(screen.getByText('Feb 11 - Dec 31')).toBeInTheDocument();
  });

  test('displays zodiac signs and elements correctly', () => {
    renderWithTable(<CalendarYear date={mockDate} />);

    // First period
    expect(screen.getByText('Dragon 🐉')).toBeInTheDocument();
    expect(screen.getByText('Wood 🪵')).toBeInTheDocument();

    // Second period
    expect(screen.getByText('Snake 🐍')).toBeInTheDocument();
    expect(screen.getByText('Fire 🔥')).toBeInTheDocument();
  });

  test('calls calculateSigns and calculateElements with correct year', () => {
    renderWithTable(<CalendarYear date={mockDate} />);

    expect(calculateSigns).toHaveBeenCalledWith(2024);
    expect(calculateElements).toHaveBeenCalledWith(2024);
  });

  test('navigates to correct route when first period row is clicked', () => {
    renderWithTable(<CalendarYear date={mockDate} />);

    // Click on any cell in the first row
    fireEvent.click(screen.getByText('Dragon 🐉'));

    expect(mockRouter.push).toHaveBeenCalledWith('/wood/dragon');
  });

  test('navigates to correct route when second period row is clicked', () => {
    renderWithTable(<CalendarYear date={mockDate} />);

    // Click on any cell in the second row
    fireEvent.click(screen.getByText('Snake 🐍'));

    expect(mockRouter.push).toHaveBeenCalledWith('/fire/snake');
  });

  test('formats dates correctly for different days', () => {
    // Test February 10
    const testDate = new Date('2024-02-10');
    const { unmount } = renderWithTable(<CalendarYear date={testDate} />);
    expect(screen.getByText('Jan 1 - Feb 10')).toBeInTheDocument();
    expect(screen.getByText('Feb 11 - Dec 31')).toBeInTheDocument();
    unmount();

    // Test February 11
    const nextDay = new Date('2024-02-11');
    renderWithTable(<CalendarYear date={nextDay} />);
    expect(screen.getByText('Jan 1 - Feb 11')).toBeInTheDocument();
    expect(screen.getByText('Feb 12 - Dec 31')).toBeInTheDocument();
  });
});
