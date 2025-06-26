import React from 'react';
import { render, act } from '@testing-library/react';
import ScrollToTop from '../ScrollToTop';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock window.scrollTo and timers
global.scrollTo = jest.fn();
jest.useFakeTimers();

describe('ScrollToTop', () => {
  let mockUsePathname;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    mockUsePathname = require('next/navigation').usePathname;
  });

  afterAll(() => {
    jest.useRealTimers(); // Restore real timers
  });

  test('should scroll to top on initial render', () => {
    mockUsePathname.mockReturnValue('/initial-path');
    render(<ScrollToTop />);

    act(() => {
      jest.runAllTimers(); // Fast-forward all timers
    });

    expect(global.scrollTo).toHaveBeenCalledTimes(1);
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  test('should scroll to top when pathname changes', () => {
    mockUsePathname.mockReturnValue('/initial-path');
    const { rerender } = render(<ScrollToTop />);

    act(() => {
      jest.runAllTimers();
    });
    expect(global.scrollTo).toHaveBeenCalledTimes(1);
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);

    // Change the pathname
    mockUsePathname.mockReturnValue('/new-path');
    rerender(<ScrollToTop />); // Rerender with new pathname from mock

    act(() => {
      jest.runAllTimers();
    });

    // Should be called again for the new path, plus the initial call
    expect(global.scrollTo).toHaveBeenCalledTimes(2);
    expect(global.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });

  test('should not scroll if pathname has not changed', () => {
    mockUsePathname.mockReturnValue('/initial-path');
    const { rerender } = render(<ScrollToTop />);

    act(() => {
      jest.runAllTimers();
    });
    expect(global.scrollTo).toHaveBeenCalledTimes(1);

    // Rerender with the same pathname
    rerender(<ScrollToTop />);
    act(() => {
      jest.runAllTimers();
    });

    // Should not be called again
    expect(global.scrollTo).toHaveBeenCalledTimes(1);
  });

  test('should clear timer on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    mockUsePathname.mockReturnValue('/some-path');
    const { unmount } = render(<ScrollToTop />);

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
  });
});
