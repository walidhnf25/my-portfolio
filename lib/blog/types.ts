// Blog types. Content is split in two: PostMeta is shared by every locale,
// PostContent is the translatable text (lib/blog/content/<locale>.ts).

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  /** Short labelled facts: a title, a sentence, and optionally bullet points. */
  | { type: "cards"; items: { title: string; text?: string; points?: string[] }[] }
  | {
      type: "code";
      code: string;
      label?: string;
      /** bad = what to avoid, good = the improved version. Colours the label. */
      tone?: "bad" | "good";
      lang?: string;
    }
  | { type: "note"; text: string }
  | { type: "quote"; text: string };

export type PostSection = {
  /** Slide kicker, e.g. "Readability". */
  kicker: string;
  heading: string;
  blocks: Block[];
};

export type PostMeta = {
  slug: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  tags: string[];
};

export type PostContent = {
  title: string;
  excerpt: string;
  /** The caption that opens the article. */
  intro: Block[];
  sections: PostSection[];
  takeaway: { heading: string; blocks: Block[] };
  /** The question the post closes with. */
  closingQuestion: string;
};

export type Post = PostMeta & PostContent;
