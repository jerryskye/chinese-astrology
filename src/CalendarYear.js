import { calculateSigns, calculateElements } from './helpers/zodiac';

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
