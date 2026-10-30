<script lang="ts">
  import poems from '../anegtoti/poems.json';
  import type { Poem } from './types';

  let { onHome }: { onHome: () => void } = $props();

  let selected = $state<number | null>(null);

  const list: Poem[] = poems;
  const current = $derived(selected === null ? null : list[selected]);
  const stanzas = $derived(
    current ? current.text.trim().split(/\n\s*\n/) : []
  );

  function firstLine(p: Poem) {
    return p.text.trim().split('\n')[0];
  }

  function open(i: number) {
    selected = i;
    window.scrollTo({ top: 0 });
  }

  function close() {
    selected = null;
  }

  function step(delta: number) {
    if (selected === null) return;
    open((selected + delta + list.length) % list.length);
  }
</script>

{#if current}
  <article class="reading">
    <header>
      <h1>{current.title}</h1>
      <p class="byline">
        {current.author}{#if current.year}, {current.year}{/if}
      </p>
    </header>

    <div class="stanzas">
      {#each stanzas as stanza}
        <p>{stanza}</p>
      {/each}
    </div>

    {#if current.note}
      <p class="note">{current.note}</p>
    {/if}
  </article>

  <div class="choices">
    {#if list.length > 1}
      <button class="secondary" onclick={() => step(-1)}>Previous poem</button>
      <button class="secondary" onclick={() => step(1)}>Next poem</button>
    {/if}
    <button class="secondary" onclick={close}>All poems</button>
    <button class="secondary" onclick={onHome}>Home</button>
  </div>
{:else}
  <div class="index-header">
    <h1>Poems</h1>
    <p>Pick one and read it slowly.</p>
  </div>

  <ul class="index">
    {#each list as poem, i (i)}
      <li>
        <button class="poem-row" onclick={() => open(i)}>
          <span class="row-title">{poem.title}</span>
          <span class="row-first">{firstLine(poem)}…</span>
          <span class="row-author">{poem.author}</span>
        </button>
      </li>
    {/each}
  </ul>

  <div class="choices">
    <button class="secondary" onclick={onHome}>Back home</button>
  </div>
{/if}

<style>
  /* Poems use a book serif so they feel different from the rounded UI font */
  .index-header,
  .index,
  .reading {
    --serif: 'Newsreader', 'Iowan Old Style', 'Palatino Linotype', Georgia, serif;
  }

  /* ---------- Index ---------- */
  .index-header {
    width: 100%;
    max-width: 640px;
    text-align: left;
  }

  .index-header h1 {
    margin: 0 0 0.4rem;
    font-family: var(--serif);
    font-size: clamp(2.2rem, 6vw, 3.2rem);
    font-weight: 500;
    letter-spacing: -0.02em;
  }

  .index-header p {
    margin: 0;
    color: var(--muted);
  }

  .index {
    width: 100%;
    max-width: 640px;
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--border);
  }

  .index li {
    border-bottom: 1px solid var(--border);
  }

  /* Reset the global button look: rows should read as a list, not as buttons */
  .poem-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.25rem 1rem;
    width: 100%;
    padding: 1.25rem 0.25rem;
    text-align: left;
    background: transparent;
    border: 0;
    border-radius: 0;
    transition: padding-left 0.2s ease, background 0.2s ease;
  }

  .poem-row:hover {
    background: transparent;
    transform: none;
    padding-left: 0.9rem;
  }

  .row-title {
    font-family: var(--serif);
    font-size: 1.5rem;
    line-height: 1.25;
  }

  .row-author {
    grid-row: 1;
    grid-column: 2;
    align-self: baseline;
    color: var(--muted);
    font-size: 0.9rem;
  }

  .row-first {
    grid-column: 1 / -1;
    color: var(--muted);
    font-family: var(--serif);
    font-style: italic;
    font-size: 1.02rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ---------- Reading view ---------- */
  .reading {
    width: 100%;
    max-width: 560px;
    text-align: left;
  }

  .reading header {
    margin-bottom: 2.5rem;
  }

  .reading h1 {
    margin: 0;
    font-family: var(--serif);
    font-size: clamp(2.4rem, 7vw, 3.6rem);
    font-weight: 500;
    line-height: 1.1;
    letter-spacing: -0.025em;
  }

  .byline {
    margin: 0.9rem 0 0;
    color: var(--muted);
  }

  /* One memorable thing: a quiet rule down the left edge of the poem */
  .stanzas {
    padding-left: clamp(1rem, 4vw, 1.75rem);
    border-left: 1px solid #4a4a4a;
  }

  .stanzas p {
    margin: 0 0 1.9rem;
    font-family: var(--serif);
    font-size: clamp(1.15rem, 3.4vw, 1.35rem);
    line-height: 1.75;
    white-space: pre-line;
    overflow-wrap: anywhere;
  }

  .stanzas p:last-child {
    margin-bottom: 0;
  }

  .note {
    margin: 2.5rem 0 0;
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.7;
  }

  @media (prefers-reduced-motion: reduce) {
    .poem-row {
      transition: none;
    }
  }
</style>
