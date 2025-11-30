# UI Components

Shared, reusable UI components used across the Patitas Unidas application.

## Components

### CountUp

An animated number counter component that counts from a start value to an end value with customizable options.

**Features:**
- Smooth count-up animation with configurable duration
- Multiple easing functions (linear, easeOut, easeInOut)
- Intersection Observer integration (starts animating when visible)
- Customizable prefix and suffix
- Decimal support

**Usage:**

```tsx
import { CountUp } from "@/components";

function MyComponent() {
  return (
    <div>
      <CountUp
        end={150}
        duration={2000}
        suffix="+"
        easing="easeOut"
      />
    </div>
  );
}
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `end` | `number` | required | The target number to count up to |
| `start` | `number` | `0` | The starting number |
| `duration` | `number` | `2000` | Duration of the animation in milliseconds |
| `delay` | `number` | `0` | Delay before starting the animation in milliseconds |
| `prefix` | `string` | `""` | Prefix to display before the number (e.g., "$") |
| `suffix` | `string` | `""` | Suffix to display after the number (e.g., "+", "k") |
| `decimals` | `number` | `0` | Decimal places to show |
| `className` | `string` | `""` | Optional CSS class name |
| `easing` | `"linear" \| "easeOut" \| "easeInOut"` | `"easeOut"` | Easing function type |

---

### WelcomeModal

A welcome modal component that displays on first visit with animated statistics.

**Features:**
- Automatic display on first visit
- localStorage integration to prevent repeated display
- Animated statistics using CountUp component
- Keyboard navigation (ESC to close)
- Click outside to close
- Responsive design
- Accessible (ARIA labels, focus management)

**Usage:**

```tsx
import { WelcomeModal } from "@/components";
import { useWelcomeModal } from "@/hooks";

function App() {
  const { isOpen, closeModal } = useWelcomeModal();

  return (
    <>
      <WelcomeModal isOpen={isOpen} onClose={closeModal} />
      {/* Rest of your app */}
    </>
  );
}
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | required | Whether the modal is open |
| `onClose` | `() => void` | required | Callback when the modal is closed |
| `title` | `string` | `"Bienvenido a Patitas Unidas"` | Modal title |
| `description` | `string` | `"Ayudamos a conectar..."` | Modal description/subtitle |
| `statistics` | `StatisticItem[]` | Default stats | Array of statistics to display |

**StatisticItem Interface:**

```typescript
interface StatisticItem {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon?: string;
}
```

**Custom Statistics Example:**

```tsx
const customStats = [
  { label: "Animals Rescued", value: 200, suffix: "+", icon: "🐾" },
  { label: "Happy Families", value: 150, suffix: "+", icon: "❤️" },
];

<WelcomeModal
  isOpen={isOpen}
  onClose={closeModal}
  statistics={customStats}
/>
```

---

## Hooks

### useWelcomeModal

Custom hook to manage the welcome modal state with localStorage persistence.

**Features:**
- Tracks if user has seen the welcome modal
- Automatic display on first visit with 500ms delay
- localStorage integration
- Reset function for testing

**Usage:**

```tsx
import { useWelcomeModal } from "@/hooks";

function App() {
  const { isOpen, closeModal, resetModal } = useWelcomeModal();

  // For testing: window.resetWelcomeModal = resetModal;

  return (
    <WelcomeModal isOpen={isOpen} onClose={closeModal} />
  );
}
```

**Return Value:**

```typescript
{
  isOpen: boolean;        // Whether the modal is currently open
  closeModal: () => void; // Close modal and mark as seen
  resetModal: () => void; // Reset modal state (for testing)
}
```

---

## Architecture

Following the **Bulletproof React** architecture:

```
components/
├── ui/
│   ├── CountUp.tsx          # CountUp component
│   ├── WelcomeModal.tsx     # WelcomeModal component
│   ├── WelcomeModal.css     # WelcomeModal styles
│   ├── index.ts             # Barrel export
│   └── README.md            # This file
├── index.ts                 # Components barrel export
├── Header.tsx               # Layout components
└── Footer.tsx

hooks/
├── useWelcomeModal.ts       # Welcome modal hook
├── useLockBodyScroll.ts     # Body scroll lock hook
└── index.ts                 # Hooks barrel export
```

**Design Principles:**
- ✅ Reusable across features
- ✅ Well-typed with TypeScript
- ✅ Accessible (a11y compliant)
- ✅ Responsive design
- ✅ Clean separation of concerns
- ✅ Proper barrel exports

---

## Styling

### WelcomeModal CSS

The modal uses custom CSS with:
- Smooth animations and transitions
- Responsive breakpoints (mobile, tablet, desktop)
- Gradient backgrounds
- Hover effects
- Reduced motion support for accessibility

**CSS Variables:**
The modal respects global CSS variables if defined in `styles/global.css`.

---

## Accessibility

Both components follow accessibility best practices:

**CountUp:**
- Uses semantic HTML
- Respects `prefers-reduced-motion`

**WelcomeModal:**
- Keyboard navigation (ESC to close)
- Focus trap (body scroll locked)
- ARIA labels
- High contrast text
- Touch-friendly buttons (min 44px)

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 not supported (uses modern JS features)

---

## Testing

To test the welcome modal locally:

1. **Reset the modal state:**
   ```javascript
   localStorage.removeItem('patitas-unidas-welcome-modal-seen');
   ```

2. **Refresh the page** - modal should appear after 500ms delay

3. **Test interactions:**
   - Click outside to close
   - Press ESC to close
   - Click "Explorar Animales" button
   - Verify animations are smooth
   - Check mobile responsiveness

---

## Future Enhancements

Potential improvements:
- [ ] Add animation variants to CountUp
- [ ] Support for different modal themes
- [ ] Add slide-in/fade-in animation options
- [ ] Multi-step welcome tour
- [ ] Integration with analytics

---

**Last Updated:** 2025-11-30
**Created by:** Claude Code
