import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import {
  COUNTRIES_SORTED,
  flagEmoji,
  searchCountries,
  ISO_3166,
} from "@/data/iso3166";

interface Props {
  value: string;
  onChange: (iso2: string) => void;
  tokens: {
    input: string;
    border: string;
    text: string;
    muted: string;
    purple: string;
    card: string;
  };
  minWidth?: number;
}

const ROW_HEIGHT = 36;
const VIEWPORT = 320; // px
const BUFFER = 5;

export function CountrySelect({ value, onChange, tokens, minWidth = 220 }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [highlight, setHighlight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // 150ms debounce
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 150);
    return () => clearTimeout(t);
  }, [query]);

  const results = useMemo(
    () => (debounced.trim() ? searchCountries(debounced, 50) : COUNTRIES_SORTED),
    [debounced],
  );

  // Click-outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setHighlight(0);
      setScrollTop(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    setHighlight(0);
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [debounced]);

  const selected = ISO_3166.find((c) => c.iso2 === value);

  const handleSelect = (iso2: string) => {
    onChange(iso2);
    setOpen(false);
    setQuery("");
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => {
        const n = Math.min(h + 1, results.length - 1);
        ensureVisible(n);
        return n;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => {
        const n = Math.max(h - 1, 0);
        ensureVisible(n);
        return n;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      const c = results[highlight];
      if (c) handleSelect(c.iso2);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setQuery("");
    }
  };

  const ensureVisible = (idx: number) => {
    const el = listRef.current;
    if (!el) return;
    const top = idx * ROW_HEIGHT;
    const bottom = top + ROW_HEIGHT;
    if (top < el.scrollTop) el.scrollTop = top;
    else if (bottom > el.scrollTop + el.clientHeight) el.scrollTop = bottom - el.clientHeight;
  };

  // Virtualization window
  const totalHeight = results.length * ROW_HEIGHT;
  const startIdx = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);
  const endIdx = Math.min(
    results.length,
    Math.ceil((scrollTop + VIEWPORT) / ROW_HEIGHT) + BUFFER,
  );
  const visible = results.slice(startIdx, endIdx);

  return (
    <div ref={wrapRef} className="relative" style={{ minWidth }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-[13px] outline-none"
        style={{
          background: tokens.input,
          border: `1px solid ${tokens.border}`,
          color: tokens.text,
          minWidth,
        }}
      >
        <span className="flex items-center gap-2 truncate">
          {selected ? (
            <>
              <span className="text-base leading-none">{flagEmoji(selected.iso2)}</span>
              <span className="truncate">{selected.name}</span>
            </>
          ) : (
            <span style={{ color: tokens.muted }}>Select a country…</span>
          )}
        </span>
        <ChevronDown
          className="h-4 w-4 shrink-0 transition-transform"
          style={{ color: tokens.muted, transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>

      {open && (
        <div
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-[10px] shadow-2xl"
          style={{
            background: tokens.card,
            border: `1px solid ${tokens.border}`,
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            className="flex items-center gap-2 px-3 py-2"
            style={{ borderBottom: `1px solid ${tokens.border}` }}
          >
            <Search className="h-3.5 w-3.5" style={{ color: tokens.muted }} />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKey}
              placeholder="Search countries..."
              className="w-full bg-transparent text-[13px] outline-none"
              style={{ color: tokens.text }}
            />
          </div>
          {results.length === 0 ? (
            <div
              className="px-3 py-3 text-[13px]"
              style={{ color: tokens.muted }}
            >
              No countries found
            </div>
          ) : (
            <div
              ref={listRef}
              onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
              style={{ height: Math.min(VIEWPORT, results.length * ROW_HEIGHT), overflowY: "auto" }}
            >
              <div style={{ height: totalHeight, position: "relative" }}>
                {visible.map((c, i) => {
                  const idx = startIdx + i;
                  const isSelected = c.iso2 === value;
                  const isHighlight = idx === highlight;
                  return (
                    <button
                      key={c.iso2}
                      type="button"
                      onMouseEnter={() => setHighlight(idx)}
                      onClick={() => handleSelect(c.iso2)}
                      className="absolute left-0 right-0 flex items-center gap-2 px-3 text-[13px]"
                      style={{
                        top: idx * ROW_HEIGHT,
                        height: ROW_HEIGHT,
                        background: isHighlight ? "rgba(124,58,237,0.18)" : "transparent",
                        color: tokens.text,
                      }}
                    >
                      <span className="text-base leading-none">{flagEmoji(c.iso2)}</span>
                      <span className="flex-1 truncate text-left">{c.name}</span>
                      {isSelected && (
                        <Check className="h-3.5 w-3.5" style={{ color: tokens.purple }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
