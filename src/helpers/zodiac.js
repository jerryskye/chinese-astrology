import { CalendarChinese } from 'date-chinese';

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

export function calculateChineseZodiac(date, time, timezone) {
  if (!date) return null;

  const cal = new CalendarChinese();
  const localDate = new Date(`${date}T${time}`);
  const options = { timeZone: timezone };
  const dateInTimezone = new Date(localDate.toLocaleString('en-US', options));

  const year = dateInTimezone.getFullYear();
  const newYearJDE = cal.newYear(year);
  cal.fromJDE(newYearJDE);
  const newYearDate = cal.toDate();

  const index = dateInTimezone < newYearDate ? 0 : 1;
  const signs = calculateSigns(year);
  const elements = calculateElements(year);

  return {
    sign: signs[index],
    element: elements[index]
  };
}

export function calculateCompanionSign(date, time, timezone) {
  if (!date) return null;

  const localDate = new Date(`${date}T${time}`);

  let hours, minutes;

  if (timezone === 'UTC') {
    // For UTC timezone, use the time directly
    hours = localDate.getHours();
    minutes = localDate.getMinutes();
  } else {
    // For other timezones, use the existing conversion
    const options = { timeZone: timezone };
    const dateInUTC = new Date(localDate.toLocaleString('en-US', options));
    hours = dateInUTC.getUTCHours();
    minutes = dateInUTC.getUTCMinutes();
  }
  const timeInHours = hours + minutes / 60;

  if ((timeInHours >= 23 && timeInHours <= 24) || (timeInHours >= 0 && timeInHours < 1)) {
    return 'Rat 🐀';
  } else if (timeInHours >= 1 && timeInHours < 3) {
    return 'Ox 🐂';
  } else if (timeInHours >= 3 && timeInHours < 5) {
    return 'Tiger 🐯';
  } else if (timeInHours >= 5 && timeInHours < 7) {
    return 'Rabbit 🐰';
  } else if (timeInHours >= 7 && timeInHours < 9) {
    return 'Dragon 🐉';
  } else if (timeInHours >= 9 && timeInHours < 11) {
    return 'Snake 🐍';
  } else if (timeInHours >= 11 && timeInHours < 13) {
    return 'Horse 🐴';
  } else if (timeInHours >= 13 && timeInHours < 15) {
    return 'Goat 🐐';
  } else if (timeInHours >= 15 && timeInHours < 17) {
    return 'Monkey 🐒';
  } else if (timeInHours >= 17 && timeInHours < 19) {
    return 'Rooster 🐓';
  } else if (timeInHours >= 19 && timeInHours < 21) {
    return 'Dog 🐶';
  } else {
    return 'Pig 🐷';
  }
}
