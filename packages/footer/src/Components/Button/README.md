# Dynamic Button Component

A highly customizable and dynamic React button component with excellent UX/UI, supporting icons, multiple variants, sizes, and states.

## Features

- 🎨 **7 Visual Variants**: Primary, Secondary, Outline, Ghost, Danger, Success, Warning
- 📏 **5 Sizes**: XS, SM, MD, LG, XL
- 🔄 **Icon Support**: Left/right placement, icon-only buttons
- ⚡ **Loading States**: Built-in spinner and loading text
- 🎯 **Accessibility**: ARIA compliant with focus management
- 🌙 **Dark Mode**: Automatic dark mode support
- 📱 **Responsive**: Mobile-optimized sizing
- ✨ **Animations**: Smooth hover, active, and loading transitions
- 🎛️ **Highly Customizable**: Custom styles, classes, and props

## Installation

```bash
# The component is already part of your footer package
import GlobalButton from './Components/Button';
# or
import GlobalButton, { ButtonProps } from './Components/Button';
```

## Basic Usage

```tsx
import GlobalButton from './Components/Button';

function App() {
  return (
    <GlobalButton variant="primary" onClick={() => console.log('clicked')}>
      Click me!
    </GlobalButton>
  );
}
```

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Button text content |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger' \| 'success' \| 'warning'` | `'primary'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `icon` | `ReactNode` | - | Icon element (React SVG or any ReactNode) |
| `iconPlacement` | `'left' \| 'right'` | `'left'` | Icon placement relative to text |
| `iconOnly` | `boolean` | `false` | Icon-only button (no text) |
| `fullWidth` | `boolean` | `false` | Full width button |
| `loading` | `boolean` | `false` | Loading state with spinner |
| `disabled` | `boolean` | `false` | Disabled state |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `React.CSSProperties` | - | Custom inline styles |

All standard button HTML attributes are also supported (`onClick`, `onMouseOver`, `type`, `form`, etc.).

## Examples

### Variants

```tsx
<GlobalButton variant="primary">Primary</GlobalButton>
<GlobalButton variant="secondary">Secondary</GlobalButton>
<GlobalButton variant="outline">Outline</GlobalButton>
<GlobalButton variant="ghost">Ghost</GlobalButton>
<GlobalButton variant="danger">Danger</GlobalButton>
<GlobalButton variant="success">Success</GlobalButton>
<GlobalButton variant="warning">Warning</GlobalButton>
```

### Sizes

```tsx
<GlobalButton size="xs">Extra Small</GlobalButton>
<GlobalButton size="sm">Small</GlobalButton>
<GlobalButton size="md">Medium</GlobalButton>
<GlobalButton size="lg">Large</GlobalButton>
<GlobalButton size="xl">Extra Large</GlobalButton>
```

### With Icons

```tsx
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

// Icon on the left
<GlobalButton icon={<PlayIcon />} iconPlacement="left">
  Play Video
</GlobalButton>

// Icon on the right
<GlobalButton icon={<PlayIcon />} iconPlacement="right">
  Play Video
</GlobalButton>

// Icon only
<GlobalButton icon={<PlayIcon />} iconOnly title="Play" />
```

### States

```tsx
// Loading state
<GlobalButton loading={true}>
  Processing...
</GlobalButton>

// Disabled state
<GlobalButton disabled>
  Disabled
</GlobalButton>

// Full width
<GlobalButton fullWidth>
  Full Width Button
</GlobalButton>
```

### Custom Styling

```tsx
<GlobalButton 
  variant="primary"
  style={{ borderRadius: '20px', background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)' }}
  className="my-custom-class"
>
  Custom Styled
</GlobalButton>
```

### Complex Examples

```tsx
// Download button with icon
<GlobalButton 
  variant="outline" 
  icon={<DownloadIcon />} 
  iconPlacement="right"
  onClick={handleDownload}
>
  Download File
</GlobalButton>

// Async action button
<GlobalButton 
  variant="success" 
  icon={<SaveIcon />}
  loading={isSaving}
  disabled={!hasChanges}
  onClick={handleSave}
>
  {isSaving ? 'Saving...' : 'Save Changes'}
</GlobalButton>

// Delete confirmation button
<GlobalButton 
  variant="danger" 
  icon={<TrashIcon />}
  size="sm"
  onClick={() => {
    if (confirm('Are you sure?')) {
      handleDelete();
    }
  }}
>
  Delete
</GlobalButton>
```

## Icon Guidelines

### Creating SVG Icons

For best results, use SVG icons with:
- `viewBox="0 0 24 24"` for consistent sizing
- `fill="currentColor"` to inherit button text color
- Simple, clean designs that work at small sizes

```tsx
const MyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="..." />
  </svg>
);
```

### Icon Libraries

The component works with popular icon libraries:

```tsx
// React Icons
import { FaPlay, FaDownload } from 'react-icons/fa';
<GlobalButton icon={<FaPlay />}>Play</GlobalButton>

// Heroicons
import { PlayIcon } from '@heroicons/react/24/solid';
<GlobalButton icon={<PlayIcon />}>Play</GlobalButton>

// Material-UI Icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
<GlobalButton icon={<PlayArrowIcon />}>Play</GlobalButton>
```

## Accessibility

The button component includes:
- Proper ARIA attributes
- Keyboard navigation support
- Focus indicators
- Screen reader friendly loading states
- Semantic HTML structure

## Styling Customization

### CSS Variables

You can customize the button by overriding CSS custom properties:

```css
.my-custom-button {
  --button-border-radius: 16px;
  --button-font-weight: 600;
  --button-transition-duration: 0.3s;
}
```

### Custom Themes

Create your own variant by extending the CSS:

```css
.button.custom {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.button.custom:hover:not(:disabled) {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}
```

## Best Practices

1. **Use semantic variants**: Choose variants that match the action (danger for delete, success for save, etc.)
2. **Consistent sizing**: Stick to one or two sizes per interface section
3. **Icon clarity**: Ensure icons are recognizable and meaningful
4. **Loading states**: Always provide feedback for async actions
5. **Accessibility**: Include `title` attributes for icon-only buttons
6. **Responsive design**: Test button sizes on mobile devices

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance

- Lightweight: ~3KB gzipped (CSS + JS)
- No external dependencies
- Optimized animations using CSS transforms
- Minimal re-renders with React.memo optimization potential

## Contributing

When extending the button component:
1. Maintain backward compatibility
2. Add proper TypeScript types
3. Include CSS for new features
4. Update examples and documentation
5. Test across different browsers and devices