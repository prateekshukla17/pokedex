import { LargeNumberLike } from 'node:crypto';

export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #Cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, value: T) {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: value,
    };
    this.#Cache.set(key, entry);
  }

  get<T>(key: string) {
    const entry = this.#Cache.get(key);
    if (entry !== undefined) {
      return entry.val as T;
    }
    return undefined;
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  #reap() {
    const now = Date.now();
    for (const [key, entry] of this.#Cache) {
      if (now - entry.createdAt > this.#interval) {
        this.#Cache.delete(key);
      }
    }
  }
  stopReapLoop() {
    if (this.#reapIntervalId) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }
}
