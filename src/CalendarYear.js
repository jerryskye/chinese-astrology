function calculateSigns(year) {
  switch (year % 12) {
    case 0:
        return ['Goat', 'Monkey'];
        break;
    case 1:
        return ['Monkey', 'Rooster'];
        break;
    case 2:
        return ['Rooster', 'Dog'];
        break;
    case 3:
        return ['Dog', 'Pig'];
        break;
    case 4:
        return ['Pig', 'Rat'];
        break;
    case 5:
        return ['Rat', 'Ox'];
        break;
    case 6:
        return ['Ox', 'Tiger'];
        break;
    case 7:
        return ['Tiger', 'Rabbit'];
        break;
    case 8:
        return ['Rabbit', 'Dragon'];
        break;
    case 9:
        return ['Dragon', 'Snake'];
        break;
    case 10:
        return ['Snake', 'Horse'];
        break;
    case 11:
        return ['Horse', 'Goat'];
        break;
  }
}

function calculateElements(year) {
  switch (year % 10) {
    case 0:
      return ['Earth', 'Metal'];
      break;
    case 1:
      return ['Metal', 'Metal'];
      break;
    case 2:
      return ['Metal', 'Water'];
      break;
    case 3:
      return ['Water', 'Water'];
      break;
    case 4:
      return ['Water', 'Wood'];
      break;
    case 5:
      return ['Wood', 'Wood'];
      break;
    case 6:
      return ['Wood', 'Fire'];
      break;
    case 7:
      return ['Fire', 'Fire'];
      break;
    case 8:
      return ['Fire', 'Earth'];
      break;
    case 9:
      return ['Earth', 'Earth'];
      break;
  }
}

export default function CalendarYear({ date }) {
  const dateYear = date.getFullYear();
  const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const dateDayAhead = new Date(date);
  dateDayAhead.setDate(dateDayAhead.getDate() + 1);
  const dateDayAheadString = dateDayAhead.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const signs = calculateSigns(dateYear);
  const elements = calculateElements(dateYear);
  return (
    <tbody>
      <tr>
        <th rowSpan="2">{dateYear}</th>
        <td>Jan 1 - {dateString}</td>
        <td>{elements[0]}</td>
        <td>{signs[0]}</td>
      </tr>
      <tr>
        <td>{dateDayAheadString} - Dec 31</td>
        <td>{elements[1]}</td>
        <td>{signs[1]}</td>
      </tr>
    </tbody>
  );
}
