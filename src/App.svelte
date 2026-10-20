<script lang="ts">
  import adultJokes from './anegtoti/18plus_anegtoti.json';
  import regularJokes from './anegtoti/anegtoti.json';
  import quotes from './anegtoti/quotes.json';


  type Quote = {
    text: string;
    author: string;
    image: string;
    category?: string;
    description: string;
  };

  let selectedQuote = $state<Quote | null>(null);

  function openQuote(quote: Quote) {
    selectedQuote = quote;
  }

  function closeQuote() {
    selectedQuote = null;
  }

  type Joke = { setup: string; punchline?: string };
  type Section = 'poems' | 'quotes' | 'anegtoti';
  type Category = 'adult' | 'regular';

  const categories: Record<Category, { label: string; jokes: Joke[] }> = {
    adult: { label: '18+', jokes: adultJokes },
    regular: { label: 'regular', jokes: regularJokes }

  };

  let section = $state<Section | null>(null);
  let category = $state<Category | null>(null);
  let joke = $state<Joke | null>(null);

  function openSection(s: Section) {
    section = s;
  }

  function goHome() {
    section = null;
    category = null;
    joke = null;
  }

  function pickCategory(c: Category) {
    category = c;
    joke = null;
    showJoke();
  }

  function showJoke() {
    if (!category) return;
    const list = categories[category].jokes;
    let next: Joke;
    do {
      next = list[Math.floor(Math.random() * list.length)];
    } while (next === joke && list.length > 1);
    joke = next;
  }

  function changeCategory() {
    category = null;
    joke = null;
  }
</script>

<main>
  {#if !section}
    <div class="tiles">
      <button class="tile poems" onclick={() => openSection('poems')}>Poems</button>
      <button class="tile quotes" onclick={() => openSection('quotes')}>Quotes</button>
      <button class="tile anegtoti" onclick={() => openSection('anegtoti')}>Anegtots</button>
    </div>

  {:else if section === 'anegtoti'}
    {#if !category}
      <div class="joke-box prompt">
        <p>What kind of jokes do you want to hear?</p>
      </div>

      <div class="choices">
        {#each Object.entries(categories) as [key, cat]}
          <button onclick={() => pickCategory(key as Category)}>{cat.label}</button>
        {/each}
        <button class="secondary" onclick={goHome}>Back</button>
      </div>
    {:else}
      <div class="joke-box">
        {#if joke}
          <p>{joke.setup}</p>
          {#if joke.punchline}
            <p class="punchline">{joke.punchline}</p>
          {/if}
        {/if}
      </div>

      <div class="choices">
        <button onclick={showJoke}>Show another joke</button>
        <button class="secondary" onclick={changeCategory}>Change category</button>
        <button class="secondary" onclick={goHome}>Home</button>
      </div>
    {/if}
    
    {:else if section === 'quotes'}
      {#if selectedQuote}
        <section
          class="quote-detail"
          style={`--quote-image: url("${selectedQuote.image}")`}
        >
          <button
            class="close-detail"
            onclick={closeQuote}
            aria-label="Close quote"
          >
            &times;
          </button>

          <div class="detail-content">
            {#if selectedQuote.category}
              <p class="detail-category">{selectedQuote.category}</p>
            {/if}

            <h1 class="detail-quote">
              “{selectedQuote.text}”
            </h1>

            <p class="detail-author">
              — {selectedQuote.author}
            </p>

            <div class="detail-divider"></div>

            <h2>About this quote</h2>
            <p class="detail-description">
              {selectedQuote.description}
            </p>
          </div>
        </section>

        <div class="choices">
          <button class="secondary" onclick={closeQuote}>
            Back to quotes
          </button>
          <button class="secondary" onclick={goHome}>
            Home
          </button>
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
          style={`--quote-image: url("${quote.image}")`}
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
      <button class="secondary" onclick={goHome}>Back home</button>
    </div>
  {/if}


    {:else}
      <div class="joke-box prompt">
        <p>Poems are coming soon.</p>
      </div>

      <div class="choices">
        <button class="secondary" onclick={goHome}>Back</button>
      </div>
    {/if}

</main>