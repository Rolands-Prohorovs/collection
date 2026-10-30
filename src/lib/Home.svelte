<script lang="ts">
  import type { Section } from './types';

  let { onOpen }: { onOpen: (s: Section) => void } = $props();
</script>

<div class="tiles">
  <button class="tile poems" onclick={() => onOpen('poems')}>Poems</button>
  <button class="tile quotes" onclick={() => onOpen('quotes')}>Quotes</button>
  <button class="tile anegtoti" onclick={() => onOpen('anegtoti')}>Anegtots</button>
</div>
