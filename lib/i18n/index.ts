import { type Locale } from "./config";
import en, { type Dictionary } from "./dictionaries/en";
import id from "./dictionaries/id";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { en, id };

/** Both dictionaries are small, so they are imported statically — no async load. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
