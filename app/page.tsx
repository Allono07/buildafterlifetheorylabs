'use client';

import { FormEvent, useMemo, useState } from 'react';

export default function Home() {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const letters = useMemo(() => description.trim().length, [description]);
  const canSubmit = letters >= 50 && status !== 'sending';

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    try {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: String(data.get('name') ?? ''), description }),
      });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
      setDescription('');
      setName('');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <header className="topbar">
        <a className="wordmark" href="https://afterlifetheorylabs.com" aria-label="Afterlife Theory Labs home">
          <span>AFTERLIFE</span><span className="wordmark-accent"> THEORY LABS</span>
        </a>
        <a className="top-link" href="https://afterlifetheorylabs.com">MAIN SITE</a>
      </header>

      <section className="intro" aria-labelledby="headline">
        <p className="eyebrow">A NOTE TO THE STUDIO</p>
        <h1 id="headline">What should<br />we <span>build next?</span></h1>
        <p className="lede">Every useful thing starts with a question.<br className="desktop-break" /> Tell us the one you can’t stop thinking about.</p>
      </section>

      <section className="form-panel" aria-label="Share your idea">
        <div className="form-heading"><span>THE IDEA BOX</span><span className="form-rule" /></div>
        {status === 'success' ? (
          <div className="success-state" role="status" aria-live="polite">
            <h2>Idea received.</h2>
            <p>Thanks for giving this thought a place to go. We’ll read it with care.</p>
            <button className="text-button" onClick={() => setStatus('idle')}>SEND ANOTHER IDEA</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <label className="field-label" htmlFor="name">YOUR NAME <span>(OPTIONAL)</span></label>
            <input id="name" name="name" type="text" autoComplete="name" maxLength={120} placeholder="What should we call you?" value={name} onChange={event => setName(event.target.value)} />

            <div className="description-label-row">
              <label className="field-label" htmlFor="description">THE THING WE SHOULD BUILD</label>
              <span className={`word-count${letters >= 50 ? ' is-ready' : ''}`} aria-live="polite">{letters} / 50 CHARACTERS</span>
            </div>
            <textarea id="description" name="description" required minLength={1} maxLength={8000} rows={7} placeholder="Describe the thing you wish existed. What would it do? Who would it help? Why does it matter?" value={description} onChange={event => { setDescription(event.target.value); if (status !== 'idle') setStatus('idle'); }} aria-describedby="word-help" />
            <p id="word-help" className="field-hint">A minimum of 50 characters helps us understand your idea.</p>

            <div className="submit-row">
              <p className="privacy-note">Your idea goes directly to our team.</p>
              <button className="submit-button" type="submit" disabled={!canSubmit}>
                <span>{status === 'sending' ? 'SENDING…' : 'SUBMIT'}</span>
              </button>
            </div>
            {status === 'error' && <p className="error-message" role="alert">That didn’t go through. Please try again in a moment.</p>}
          </form>
        )}
      </section>

      <footer className="footer"><span>SMALL THOUGHTS. BIG AFTERLIVES.</span><span>AFTERLIFE THEORY LABS <i>© 2026</i></span></footer>
    </main>
  );
}
