<script lang="ts">
  import quotes from '../anegtoti/quotes.json';
  import type { Quote } from './types';

  let { onHome }: { onHome: () => void } = $props();

  let selectedQuote = $state<Quote | null>(null);

  const base = import.meta.env.BASE_URL;

  function openQuote(quote: Quote) {
    selectedQuote = quote;
  }

  function closeQuote() {
    selectedQuote = null;
  }
</script>

{#if selectedQuote}
  <section
    class="quote-detail"
    style={`--quote-image: url("${base}${selectedQuote.image}")`}
  >
    <button class="close-detail" onclick={closeQuote} aria-label="Close quote">
      &times;
    </button>

    <div class="detail-content">
      {#if selectedQuote.category}
        <p class="detail-category">{selectedQuote.category}</p>
      {/if}

      <h1 class="detail-quote">“{selectedQuote.text}”</h1>

      <p class="detail-author">— {selectedQuote.author}</p>

      <div class="detail-divider"></div>

      <h2>About this quote</h2>
      <p class="detail-description">{selectedQuote.description}</p>
    </div>
  </section>

  <div class="choices">
    <button class="secondary" onclick={closeQuote}>Back to quotes</button>
    <button class="secondary" onclick={onHome}>Home</button>
  </div>
{:else}
  <div class="quotes-header">
    <h1>Quotes</h1>
    <p>Words to think about.</p>
  </div>

  <div class="quotes-grid">
    {#each quotes as quote, i (i)}
      <button
        class="quote-card"
        style={`--quote-image: url("${base}${quote.image}")`}
        onclick={() => openQuote(quote)}
        aria-label={`Read quote by ${quote.author}`}
      >
        <span class="quote-mark">“</span>
        <span class="quote-text">{quote.text}</span>
        <span class="quote-author">— {quote.author}</span>
        <span class="quote-open">Read more ↗</span>
      </button>
    {/each}
  </div>

  <div class="choices">
    <button class="secondary" onclick={onHome}>Back home</button>
  </div>
{/if}
