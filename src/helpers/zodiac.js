export function calculateSigns(year) {
  switch (year % 12) {
    case 0:
        return ['Goat 🐐', 'Monkey 🐒'];
    case 1:
        return ['Monkey 🐒', 'Rooster 🐓'];
    case 2:
        return ['Rooster 🐓', 'Dog 🐶'];
    case 3:
        return ['Dog 🐶', 'Pig 🐷'];
    case 4:
        return ['Pig 🐷', 'Rat 🐀'];
    case 5:
        return ['Rat 🐀', 'Ox 🐂'];
    case 6:
        return ['Ox 🐂', 'Tiger 🐯'];
    case 7:
        return ['Tiger 🐯', 'Rabbit 🐰'];
    case 8:
        return ['Rabbit 🐰', 'Dragon 🐉'];
    case 9:
        return ['Dragon 🐉', 'Snake 🐍'];
    case 10:
        return ['Snake 🐍', 'Horse 🐴'];
    case 11:
        return ['Horse 🐴', 'Goat 🐐'];
  }
}

export function calculateElements(year) {
  switch (year % 10) {
    case 0:
      return ['Earth ⛰️', 'Metal ⛓'];
    case 1:
       return ['Metal ⛓', 'Metal ⛓'];
    case 2:
      return ['Metal ⛓', 'Water 🌊'];
    case 3:
      return ['Water 🌊', 'Water 🌊'];
    case 4:
      return ['Water 🌊', 'Wood 🪵'];
    case 5:
      return ['Wood 🪵', 'Wood 🪵'];
    case 6:
      return ['Wood 🪵', 'Fire 🔥'];
    case 7:
      return ['Fire 🔥', 'Fire 🔥'];
    case 8:
      return ['Fire 🔥', 'Earth ⛰️'];
    case 9:
      return ['Earth ⛰️', 'Earth ⛰️'];
  }
}
