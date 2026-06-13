import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import GameRules from '../components/GameRules.jsx';
import CoinAmount from '../components/icons/CoinAmount.jsx';
import { RankPlace } from '../components/ranking/RankingIcons.jsx';
import { useAuth } from '../auth/useAuth.js';

const PHASES = [
  {
    num: 1,
    title: 'Study',
    badge: 'Full map',
    text: 'Review the full metro map, including all lines and connections, before planning your route.',
  },
  {
    num: 2,
    title: 'Plan',
    badge: '90 seconds',
    text: 'A random start and destination are assigned. Build a route between them within 90 seconds.',
  },
  {
    num: 3,
    title: 'Travel',
    badge: 'Random events',
    text: 'Each segment of your route triggers a random event that may increase or decrease your coins.',
  },
  {
    num: 4,
    title: 'Score',
    badge: 'Coins left',
    text: 'Keep as many coins as possible. Your best score is recorded on the leaderboard.',
  },
];

const UNLOCK_ITEMS = [
  'Full metro map and segment list',
  'Route planning with a 90-second timer',
  'Leaderboard with your best score',
];

/** Static example from seed — Francesca best game (22 coins). No API data. */
const EXAMPLE_LEGS = [
  {
    from: 'Covent Garden',
    to: 'Tower of London',
    event: 'Quiet journey',
    effect: 0,
    before: 20,
    after: 20,
  },
  {
    from: 'Tower of London',
    to: 'Southwark',
    event: 'Kind passenger',
    effect: 1,
    before: 20,
    after: 21,
  },
  {
    from: 'Southwark',
    to: 'Notting Hill',
    event: 'Wrong platform',
    effect: -2,
    before: 21,
    after: 19,
  },
  {
    from: 'Notting Hill',
    to: 'Kensington Palace',
    event: 'Delay bonus',
    effect: 2,
    before: 19,
    after: 21,
  },
  {
    from: 'Kensington Palace',
    to: 'Harrods',
    event: 'Kind passenger',
    effect: 1,
    before: 21,
    after: 22,
  },
];

function formatEffect(value) {
  if (value > 0) return `+${value}`;
  return String(value);
}

/**
 * Public instructions — exam: anonymous visitors see rules only.
 * No network/map API calls on this page.
 */
export default function InstructionsPage() {
  const { user } = useAuth();

  return (
    <div className="page instructions-page">
      <div className="instructions-layout">
        <section className="instructions-main">
          <header className="instructions-hero">
            <h1>Your Last Race</h1>
            <p className="instructions-hero-hook">The metro is closing.</p>
            <p className="lead instructions-hero-lead">
              You have 90 seconds to plan a route and reach your destination with
              as many coins as possible. Every leg can help or hurt you.
            </p>
          </header>

          <div className="phase-track" aria-label="Game phases">
            {PHASES.map((phase, index) => (
              <Fragment key={phase.num}>
                <article className="phase-card">
                  <span className="phase-card-num">{phase.num}</span>
                  <h2 className="phase-card-title">{phase.title}</h2>
                  <span className="phase-card-badge">{phase.badge}</span>
                  <p className="phase-card-text">{phase.text}</p>
                </article>
                {index < PHASES.length - 1 ? (
                  <span className="phase-connector" aria-hidden="true">
                    <span className="phase-connector-dot" />
                    <span className="phase-connector-line" />
                    <span className="phase-connector-dot" />
                  </span>
                ) : null}
              </Fragment>
            ))}
          </div>

          <details className="example-race">
            <summary className="example-race-summary">
              <span className="example-race-summary-title">Example race</span>
              <span className="example-race-summary-meta">
                Covent Garden → Harrods · start <CoinAmount value={20} size={18} />
              </span>
            </summary>
            <div className="example-race-body">
              <ol className="example-legs">
                {EXAMPLE_LEGS.map((leg) => (
                  <li key={`${leg.from}-${leg.to}`} className="example-leg">
                    <span className="example-leg-route">
                      {leg.from} → {leg.to}
                    </span>
                    <div className="example-leg-event-row">
                      <span className="example-leg-event">{leg.event}</span>
                      <span
                        className={`example-leg-effect${
                          leg.effect > 0
                            ? ' example-leg-effect--pos'
                            : leg.effect < 0
                              ? ' example-leg-effect--neg'
                              : ''
                        }`}
                      >
                        {formatEffect(leg.effect)}
                      </span>
                    </div>
                    <div className="example-leg-coins">
                      <span className="example-leg-coins-label">Coins</span>
                      <span className="example-leg-coins-flow">
                        <CoinAmount value={leg.before} size={16} />
                        <span className="example-leg-coins-arrow" aria-hidden="true">
                          →
                        </span>
                        <CoinAmount value={leg.after} size={16} />
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="example-race-finish">
                Finish: <CoinAmount value={22} size={20} />
              </p>
            </div>
          </details>

          <div className="unlock-card">
            <div className="champion-teaser">
              <span className="champion-teaser-label">Current best score</span>
              <p className="champion-teaser-score">
                <RankPlace place={1} />
                <span>
                  Francesca — <CoinAmount value={22} size={20} />
                </span>
              </p>
              <p className="champion-teaser-hook">Think you can beat that?</p>
            </div>

            {!user ? (
              <>
                <p className="unlock-card-title">Metro network hidden</p>
                <p className="unlock-card-sub">Log in to access:</p>
                <ul className="unlock-checklist">
                  {UNLOCK_ITEMS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link to="/login" className="btn-primary unlock-card-btn">
                  Log in to play
                </Link>
              </>
            ) : (
              <>
                <p className="unlock-card-sub">Ready for your next race?</p>
                <div className="unlock-card-actions">
                  <Link to="/game" className="btn-primary unlock-card-btn">
                    Go to Play
                  </Link>
                  <Link to="/ranking" className="btn-secondary unlock-card-btn">
                    View ranking
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>

        <GameRules />
      </div>
    </div>
  );
}
