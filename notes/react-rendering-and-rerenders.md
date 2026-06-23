# React Native Notes — Rendering & Re-renders

> Personal revision notes from the FinFlow project.

---

## 1. A component function *is* the render

- A React component is **just a function** that takes `props` + uses `state`/hooks and **returns JSX** (a description of the UI).
- **The entire function body re-runs from top to bottom every time the component renders.**
- So any plain variable computed inside the body is recalculated on every render — it's automatically "live".

```typescript
const InputComponent = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  // This line RUNS AGAIN on every render.
  // No useEffect needed — it just recomputes with the latest isFocused.
  const styles = getInputContainerStyles(variant, size, isFocused, ...);

  return <View style={styles}>...</View>;
};
```

**Mental model:** `UI = f(state, props)`

---

## 2. Why derived values don't need `useEffect`

- Computing a style/flag from current `state`/`props` is **derived data** (a pure calculation), **not a side effect**.
- Derived data belongs **directly in the render body**, because render already re-runs when state/props change.
- `useEffect` is for **side effects** — things that reach *outside* of rendering and/or must run *after* the screen updates:
  - timers, subscriptions/listeners
  - network calls
  - manually touching a `ref`
  - logging

### Anti-pattern (don't do this)

```typescript
// ❌ Forcing derived data through state + effect
const [styles, setStyles] = useState({});
useEffect(() => {
  setStyles(getInputContainerStyles(variant, size, isFocused, ...));
}, [isFocused, variant, size]);
```

Why it's worse:
- **Double render**: change → render (old value) → effect runs → `setState` → render again (new value). One frame can show stale UI.
- Extra state to keep in sync + a dependency array you can get wrong.
- Unnecessary — render recomputes it for free.

**Rule of thumb:**
- Can I compute it from current props/state during render? → compute it inline. ✅
- Does it touch the outside world or need to run after paint? → `useEffect`. ✅

---

## 3. What "re-render" actually means

A re-render is **the function running again to produce new JSX**. It is **NOT** the same as repainting the whole screen.

```
state/props change
      ↓
component function runs again      ← "render"
      ↓
returns new JSX
      ↓
React diffs new vs old output      ← "reconciliation"
      ↓
only the real differences applied  ← "commit" (actual screen update)
```

- Re-running the function is cheap. Updating the native UI is the costly part — React **minimizes** it by only changing what differs.
- Example: on input focus, the whole function re-runs, but React only updates the container `View`'s border color. The `TextInput`, label and icons are not re-created.

---

## 4. What triggers a re-render

A component re-renders when **any** of these happen:

1. **Its own state changes** — e.g. `setIsFocused(true)`.
2. **Its parent re-renders** — children re-render too, **even if their props did not change**. (The surprising one.)
3. **A context it consumes changes** — e.g. a `useContext` value updates.

So it is *not* only "props changed" — point 2 means a child can re-render with identical props simply because the parent rendered.

---

## 5. Re-renders cascade DOWN, not up

- A state change re-renders **that component and its descendants** (the subtree below it).
- It does **not** re-render parents or siblings.
- State "lives" where you declared it; changing it renders **from there downward**.

---

## 6. When this becomes a performance concern

- Because a parent re-render re-renders all children, large/expensive subtrees can re-render needlessly.
- Tools to *skip* unnecessary re-renders (use only when measured as a problem):
  - **`React.memo`** — skip re-rendering a child if its props are unchanged.
  - **`useMemo`** — cache an expensive computed value between renders.
  - **`useCallback`** — keep a function identity stable so memoized children don't see "new" props.
- Don't reach for these by default — correct, simple render code first; optimize only where it actually hurts.

---

## Quick Summary Table

| Concept | Key point |
| --- | --- |
| Component | A function: `UI = f(state, props)`; whole body re-runs each render. |
| Derived data | Compute inline in render (styles, flags). No `useEffect`. |
| `useEffect` | Only for side effects / after-paint work, not derived values. |
| Re-render | Function runs again → new JSX. Not a full repaint. |
| Reconciliation | React diffs new vs old and applies only real differences. |
| Triggers | Own state change, parent re-render, or consumed context change. |
| Direction | Re-renders cascade down to descendants, never up. |
| Optimization | `React.memo` / `useMemo` / `useCallback` — only when needed. |
