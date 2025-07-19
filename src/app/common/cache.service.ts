import { inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE } from "./injection-tokens";

@Injectable({ providedIn: "root" })
export class CacheService {
  private readonly storage = inject(LOCAL_STORAGE);

  getItem<T>(key: string) {
    const data = localStorage.getItem(key);
    if (data != null) {
      try {
        return JSON.parse(data) as T;
      } catch (error) {
        console.error("Parsing error:", error);
        return null;
      }
    }
    return null;
  }

  setItem(key: string, data: object | string) {
    if (typeof data === "string") localStorage.setItem(key, data);
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
