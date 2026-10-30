<script lang="ts">
  import Home from './lib/Home.svelte';
  import Jokes from './lib/Jokes.svelte';
  import Quotes from './lib/Quotes.svelte';
  import Poems from './lib/Poems.svelte';
  import type { Section } from './lib/types';

  let section = $state<Section | null>(null);

  const goHome = () => (section = null);
</script>

<main>
  {#if section === null}
    <Home onOpen={(s) => (section = s)} />
  {:else if section === 'anegtoti'}
    <Jokes onHome={goHome} />
  {:else if section === 'quotes'}
    <Quotes onHome={goHome} />
  {:else if section === 'poems'}
    <Poems onHome={goHome} />
  {/if}
</main>
