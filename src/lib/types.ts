export type Section = 'poems' | 'quotes' | 'anegtoti';

export type Joke = { setup: string; punchline?: string };

export type Quote = {
  text: string;
  author: string;
  image: string;
  category?: string;
  description: string;
};

export type Poem = {
  title: string;
  author: string;
  year?: string;
  /** Separate stanzas with a blank line ("\n\n"), lines with "\n" */
  text: string;
  /** Optional short note shown under the poem */
  note?: string;
};
