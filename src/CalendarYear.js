export default function CalendarYear({ year, from, signs, elements }) {
  return (
    <>
      <tr>
        <th rowSpan="2">{year}</th>
        <td>Jan 1 - {from}</td>
        <td>{elements[0]}</td>
        <td>{signs[0]}</td>
      </tr>
      <tr>
        <td>{from} - Dec 31</td>
        <td>{elements[1]}</td>
        <td>{signs[1]}</td>
      </tr>
    </>
  );
}
