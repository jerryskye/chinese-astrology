import { render, screen } from '@testing-library/react';
import CompanionInfo from '../CompanionInfo';
import { getCompanionshipText } from '../helpers/companionSignData';

// Mock the companionSignData helper
jest.mock('../helpers/companionSignData', () => ({
  getCompanionshipText: jest.fn()
}));

describe('CompanionInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders zodiac and companion sign in heading', () => {
    getCompanionshipText.mockReturnValue(['Test compatibility text']);

    render(<CompanionInfo zodiacSign="Dragon" companionSign="Tiger" />);

    expect(screen.getByText('Dragon with a Tiger Companion')).toBeInTheDocument();
  });

  test('displays compatibility text from helper', () => {
    const mockCompatibilityText = ['This is a powerful combination of strong personalities. Both signs are confident and capable, creating a dynamic partnership full of passion and ambition.'];
    getCompanionshipText.mockReturnValue(mockCompatibilityText);

    render(<CompanionInfo zodiacSign="Dragon" companionSign="Tiger" />);

    expect(screen.getByText(mockCompatibilityText[0])).toBeInTheDocument();
  });

  test('calls getCompanionshipText with correct parameters', () => {
    render(<CompanionInfo zodiacSign="Dragon" companionSign="Tiger" />);

    expect(getCompanionshipText).toHaveBeenCalledWith('Dragon', 'Tiger');
  });

  test('handles missing compatibility data', () => {
    const fallbackMessage = ['The data for this combination is not available. Please email me at jarek@siedlarz.com'];
    getCompanionshipText.mockReturnValue(fallbackMessage);

    render(<CompanionInfo zodiacSign="Invalid" companionSign="Sign" />);

    expect(screen.getByText(fallbackMessage[0])).toBeInTheDocument();
  });

  test('displays multiple paragraphs when provided', () => {
    const mockCompatibilityText = [
      'First paragraph of compatibility text.',
      'Second paragraph with additional details.',
      'Third paragraph with concluding thoughts.'
    ];
    getCompanionshipText.mockReturnValue(mockCompatibilityText);

    render(<CompanionInfo zodiacSign="Dragon" companionSign="Tiger" />);

    mockCompatibilityText.forEach(paragraph => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });
});
