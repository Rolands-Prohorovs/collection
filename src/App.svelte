<script lang="ts">
  import aiJokes from './anegtoti/AI_anegtoti.json';
  import adultJokes from './anegtoti/18plus_anegtoti.json';
  import regularJokes from './anegtoti/anegtoti.json';

  type Joke = { setup: string; punchline?: string };
  type Section = 'poems' | 'quotes' | 'anegtoti';
  type Category = 'ai' | 'adult' | 'regular';

  const categories: Record<Category, { label: string; jokes: Joke[] }> = {
    ai: { label: 'AI', jokes: aiJokes },
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
  <h1>Anegtoti</h1>

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

  {:else}
    <div class="joke-box prompt">
      <p>{section === 'poems' ? 'Poems' : 'Quotes'} are coming soon.</p>
    </div>

    <div class="choices">
      <button class="secondary" onclick={goHome}>Back</button>
    </div>
  {/if}
</main>