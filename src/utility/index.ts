export const getLocalStorageData = <T = any>(key: string): T | null => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      try {
        return JSON.parse(storedData) as T;
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
        return null;
      }
    }
  }
  return null;
};

export const getEncodedUserAgent = (): string => {
  if (typeof window !== "undefined") {
    // Encode userAgent and replace % with _
    return encodeURIComponent(window.navigator.userAgent).replace(/%/g, "_");
  }
  return "Server-Side"; // Fallback for SSR or non-browser env
};

export const Slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

export const Deslugify = (slug: string): string => {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};
