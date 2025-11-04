# @optimus/ui

Design System pour Optimus Stock - Composants réutilisables avec style glassmorphism inspiré de l'art islamique et du désert.

## Installation

```bash
pnpm add @optimus/ui
```

## Composants

### Button

Bouton avec variants et accessibilité WCAG 2.2 AA.

```tsx
import { Button } from '@optimus/ui';

<Button variant="primary" size="lg" onClick={handleClick}>
  Créer une commande
</Button>

<Button variant="outline" leftIcon={<PlusIcon />}>
  Ajouter
</Button>

<Button variant="danger" isLoading>
  Suppression en cours...
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`, `danger`
**Sizes**: `sm`, `md`, `lg`

### Card

Conteneur avec support glassmorphism.

```tsx
import { Card } from '@optimus/ui';

<Card variant="glass" padding="lg" hoverable>
  <h3>Titre</h3>
  <p>Contenu</p>
</Card>
```

**Variants**: `default`, `glass`, `elevated`, `outlined`
**Padding**: `none`, `sm`, `md`, `lg`, `xl`

### Badge

Badge pour statuts et tags.

```tsx
import { Badge } from '@optimus/ui';

<Badge variant="success">En stock</Badge>
<Badge variant="warning">Stock bas</Badge>
<Badge variant="error">Rupture</Badge>
```

**Variants**: `default`, `primary`, `success`, `warning`, `error`, `info`, `outline`

### Input

Champ de saisie accessible avec label et gestion d'erreurs.

```tsx
import { Input } from '@optimus/ui';

<Input
  label="Email"
  type="email"
  placeholder="votre@email.com"
  error="Email invalide"
  helperText="Nous ne partagerons jamais votre email"
/>
```

## Design Tokens

### Colors

```tsx
import { colors } from '@optimus/ui';

colors.sand[50]; // '#F5E7C6' - Sable doux
colors.night[100]; // '#1B3A4B' - Ciel nocturne
colors.oasis[200]; // '#005F73' - Vert oasis
colors.gold[200]; // '#D4AF37' - Or calligraphique
```

### Typography

```tsx
import { typography } from '@optimus/ui';

typography.fonts.latin; // 'Inter, -apple-system, ...'
typography.fonts.arabic; // 'Amiri, Scheherazade New, ...'
typography.sizes.base; // '1rem'
typography.weights.semibold; // 600
```

### Spacing

```tsx
import { spacing, radii, shadows } from '@optimus/ui';

spacing.md; // '1rem' (16px)
radii.lg; // '0.75rem' (12px)
shadows.glass; // '0 8px 32px 0 rgba(27, 58, 75, 0.15)'
```

## Accessibilité

Tous les composants respectent WCAG 2.2 niveau AA:

- ✅ Contraste minimum 4.5:1 (texte normal)
- ✅ Navigation clavier complète
- ✅ Focus visible
- ✅ ARIA labels appropriés
- ✅ Support screen readers

## Glassmorphism

Style verre dépoli avec transparence et flou:

```tsx
<Card variant="glass">
  {/* Effet glassmorphism automatique */}
</Card>
```

CSS custom:

```css
.glass-card {
  @apply bg-glass-light backdrop-blur-glass border border-gold-200/20 shadow-glass;
}
```

## RTL Support

Support automatique pour l'arabe:

```tsx
// Les composants utilisent CSS logical properties
// margin-inline-start au lieu de margin-left
```

## TypeScript

Tous les composants sont typés strictement avec TypeScript:

```tsx
import type { ButtonProps } from '@optimus/ui';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## License

MIT
