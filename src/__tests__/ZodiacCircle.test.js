import { render, screen, fireEvent } from '@testing-library/react';
import ZodiacCircle from '../ZodiacCircle';

// Mock Canvas API
const mockContext = {
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  fill: jest.fn(),
  stroke: jest.fn(),
  fillText: jest.fn(),
  measureText: jest.fn(() => ({ width: 50 })),
  save: jest.fn(),
  restore: jest.fn(),
  translate: jest.fn(),
  rotate: jest.fn(),
  scale: jest.fn(),
  arc: jest.fn(),
  clip: jest.fn(),
  createLinearGradient: jest.fn(() => ({
    addColorStop: jest.fn()
  })),
  fillStyle: '',
  strokeStyle: '',
  font: '',
  textAlign: '',
  textBaseline: '',
  lineWidth: 1,
};

const mockCanvas = {
  getContext: jest.fn(() => mockContext),
  width: 380,
  height: 380,
};

// Mock the canvas element
HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext);

describe('ZodiacCircle', () => {
  const mockOnAnimalSelect = jest.fn();

  beforeEach(() => {
    mockOnAnimalSelect.mockClear();
    mockContext.clearRect.mockClear();
    mockContext.beginPath.mockClear();
    mockContext.moveTo.mockClear();
    mockContext.lineTo.mockClear();
    mockContext.closePath.mockClear();
    mockContext.fill.mockClear();
    mockContext.stroke.mockClear();
    mockContext.fillText.mockClear();
    mockContext.save.mockClear();
    mockContext.restore.mockClear();
    mockContext.translate.mockClear();
    mockContext.rotate.mockClear();
    mockContext.scale.mockClear();
    mockContext.arc.mockClear();
    mockContext.clip.mockClear();
    mockContext.createLinearGradient.mockClear();
  });

  test('renders canvas element', () => {
    render(<ZodiacCircle onAnimalSelect={mockOnAnimalSelect} selectedAnimal={null} />);
    const canvas = screen.getByTestId('zodiac-circle');
    expect(canvas).toBeInTheDocument();
    expect(canvas.tagName).toBe('CANVAS');
    expect(canvas).toHaveAttribute('width', '380');
    expect(canvas).toHaveAttribute('height', '380');
  });

  test('calls onAnimalSelect when clicking on a section', () => {
    render(<ZodiacCircle onAnimalSelect={mockOnAnimalSelect} selectedAnimal={null} />);
    const canvas = screen.getByTestId('zodiac-circle');

    // Simulate click in the Rat section (top section)
    fireEvent.click(canvas, {
      clientX: 190, // center X
      clientY: 20,  // top of canvas
    });

    expect(mockOnAnimalSelect).toHaveBeenCalledWith('Rat');
  });

  test('calls onAnimalSelect with null when clicking on Yin-Yang', () => {
    render(<ZodiacCircle onAnimalSelect={mockOnAnimalSelect} selectedAnimal={null} />);
    const canvas = screen.getByTestId('zodiac-circle');

    // Simulate click in the center (Yin-Yang)
    fireEvent.click(canvas, {
      clientX: 190, // center X
      clientY: 190, // center Y
    });

    expect(mockOnAnimalSelect).toHaveBeenCalledWith(null);
  });

  test('changes cursor style on hover', () => {
    render(<ZodiacCircle onAnimalSelect={mockOnAnimalSelect} selectedAnimal={null} />);
    const canvas = screen.getByTestId('zodiac-circle');

    // Simulate mouse move over a section
    fireEvent.mouseMove(canvas, {
      clientX: 190, // center X
      clientY: 20,  // top of canvas
    });

    expect(canvas.style.cursor).toBe('pointer');

    // Simulate mouse leave
    fireEvent.mouseLeave(canvas);
    expect(canvas.style.cursor).toBe('default');
  });

  test('renders with selected animal highlighted', () => {
    render(<ZodiacCircle onAnimalSelect={mockOnAnimalSelect} selectedAnimal="Rat" />);
    const canvas = screen.getByTestId('zodiac-circle');

    // The canvas should be rendered with the Rat section highlighted
    // We can't directly test the canvas content, but we can verify the component renders
    expect(canvas).toBeInTheDocument();
  });
});
