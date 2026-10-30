<script lang="ts">
  import regularJokes from '../anegtoti/anegtoti.json';
  import type { Joke } from './types';

  let { onHome }: { onHome: () => void } = $props();

  type Category = 'regular';

  const categories: Record<Category, { label: string; jokes: Joke[] }> = {
    regular: { label: 'regular', jokes: regularJokes }
  };

  let category = $state<Category | null>(null);
  let joke = $state<Joke | null>(null);

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

{#if !category}
  <div class="joke-box prompt">
    <p>What kind of jokes do you want to hear?</p>
  </div>

  <div class="choices">
    {#each Object.entries(categories) as [key, cat]}
      <button onclick={() => pickCategory(key as Category)}>{cat.label}</button>
    {/each}
    <button class="secondary" onclick={onHome}>Back</button>
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
    <button class="secondary" onclick={onHome}>Home</button>
  </div>
{/if}
