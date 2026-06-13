/** Static rules and events — exam facts only, no API data. */
const EVENTS = [
  { name: 'Lucky find', effect: 4 },
  { name: 'Tourist tips', effect: 3 },
  { name: 'Delay bonus', effect: 2 },
  { name: 'Kind passenger', effect: 1 },
  { name: 'Quiet journey', effect: 0 },
  { name: 'Wrong platform', effect: -2 },
  { name: 'Lost ticket', effect: -3 },
  { name: 'Signal failure', effect: -4 },
];

function formatEffect(value) {
  if (value > 0) return `+${value}`;
  return String(value);
}

export default function GameRules() {
  return (
    <aside className="rules-sidebar" aria-label="Game rules">
      <h2>Route rules</h2>
      <ul className="rules-list">
        <li>Change lines only at <strong>interchange</strong> stations.</li>
        <li>Each segment at most <strong>once</strong>; stations may repeat.</li>
        <li>Incomplete or invalid routes score <strong>0</strong>.</li>
        <li>Negative totals are shown and stored as <strong>0</strong>.</li>
        <li>Play many games; your best score appears in the ranking.</li>
      </ul>

      <h2 className="rules-sidebar-sub">Possible events</h2>
      <ul className="events-list">
        {EVENTS.map((event) => (
          <li
            key={event.name}
            className={
              event.effect > 0
                ? 'events-list-item--pos'
                : event.effect < 0
                  ? 'events-list-item--neg'
                  : ''
            }
          >
            <span className="events-list-name">{event.name}</span>
            <span className="events-list-effect">{formatEffect(event.effect)}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
