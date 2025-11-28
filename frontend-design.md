# BNomad Website - Frontend Design System

## 🎨 Design Philosophy

BNomad's design embodies **Glocal Innovation with Soul and Authenticity**:
- Clean, modern aesthetics with warmth
- Professional yet approachable
- Bilingual (EN/KO) with seamless language switching
- Accessible and responsive across all devices

---

## 🎯 Brand Identity

### Core Values Reflected in Design:
- **Innovation**: Modern, cutting-edge UI patterns
- **Community**: Warm, inviting colors and spacing
- **Authenticity**: Honest, clear communication
- **Glocal**: Balance of global standards and local character

---

## 🌈 Color System

### Primary Colors

#### Brand Blue (Primary)
```css
brand.50:  #e3f2fd  /* Lightest - backgrounds, hovers */
brand.100: #bbdefb
brand.200: #90caf9
brand.300: #64b5f6
brand.400: #42a5f5
brand.500: #2196f3  /* Main brand color - buttons, links */
brand.600: #1e88e5  /* Button hover states */
brand.700: #1976d2
brand.800: #1565c0
brand.900: #0d47a1  /* Darkest - emphasis */
```

**Usage**:
- Primary buttons: `brand.500`
- Button hover: `brand.600`
- Links: `brand.500`
- Accents: `brand.400`
- Backgrounds: `brand.50`

#### Accent Orange (Secondary)
```css
accent.50:  #fff3e0  /* Lightest */
accent.100: #ffe0b2
accent.200: #ffcc80
accent.300: #ffb74d
accent.400: #ffa726
accent.500: #ff9800  /* Main accent color */
accent.600: #fb8c00
accent.700: #f57c00
accent.800: #ef6c00
accent.900: #e65100  /* Darkest */
```

**Usage**:
- Call-to-action highlights
- Featured badges
- Warning states
- Energy and warmth

### Semantic Colors

#### Success (Green)
```css
green.500: For success messages, published status
green.50:  For success backgrounds
```

#### Warning (Yellow)
```css
yellow.500: For warnings, featured items
yellow.50:  For warning backgrounds
```

#### Error (Red)
```css
red.500: For errors, delete actions
red.50:  For error backgrounds
```

#### Info (Blue)
```css
blue.500: For informational messages
blue.50:  For info backgrounds
```

### Neutral Colors

```css
gray.50:   #fafafa  /* Page backgrounds */
gray.100:  #f5f5f5  /* Card backgrounds */
gray.200:  #eeeeee  /* Borders */
gray.300:  #e0e0e0
gray.400:  #bdbdbd  /* Disabled text */
gray.500:  #9e9e9e  /* Secondary text */
gray.600:  #757575  /* Helper text */
gray.700:  #616161  /* Body text */
gray.800:  #424242  /* Headings */
gray.900:  #212121  /* Dark text */

white:     #ffffff
black:     #000000
```

---

## 📝 Typography

### Font Family

```css
Heading: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif
Body:    'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif
```

**Why Inter?**
- Modern, clean geometric sans-serif
- Excellent readability at all sizes
- Great for both Latin and Korean characters
- Open-source and performant

### Font Sizes (Chakra UI Scale)

```css
xs:   0.75rem   (12px)  /* Helper text, captions */
sm:   0.875rem  (14px)  /* Small text, labels */
md:   1rem      (16px)  /* Body text (default) */
lg:   1.125rem  (18px)  /* Large body text */
xl:   1.25rem   (20px)  /* Small headings */
2xl:  1.5rem    (24px)  /* Section headings */
3xl:  1.875rem  (30px)  /* Page headings */
4xl:  2.25rem   (36px)  /* Large headings */
5xl:  3rem      (48px)  /* Hero headings */
6xl:  3.75rem   (60px)  /* Extra large hero */
```

### Font Weights

```css
normal:    400  /* Body text */
medium:    500  /* Emphasized text */
semibold:  600  /* Subheadings */
bold:      700  /* Headings */
extrabold: 800  /* Hero text */
```

### Typography Usage

```tsx
// Page Titles
<Heading size="4xl" fontWeight="extrabold">Page Title</Heading>

// Section Headings
<Heading size="2xl" fontWeight="bold">Section Title</Heading>

// Body Text
<Text fontSize="md" color="gray.700">Body content</Text>

// Small Text
<Text fontSize="sm" color="gray.600">Helper text</Text>

// Labels
<Text fontSize="sm" fontWeight="medium" color="gray.700">Label</Text>
```

---

## 📐 Spacing System

Using Chakra UI's spacing scale (1 unit = 0.25rem = 4px):

```css
0:  0px
1:  4px    /* Tiny gaps */
2:  8px    /* Small gaps */
3:  12px   /* Medium gaps */
4:  16px   /* Standard gaps */
5:  20px
6:  24px   /* Large gaps */
8:  32px   /* Section spacing */
10: 40px
12: 48px
16: 64px   /* Large section spacing */
20: 80px   /* Page section spacing */
24: 96px
32: 128px
```

### Common Spacing Patterns

```tsx
// Card padding
<Box p={6}>          // 24px padding

// Section spacing
<VStack spacing={8}> // 32px between items

// Page padding
<Container py={20}>  // 80px top/bottom padding

// Button padding
<Button px={6} py={3}> // 24px horizontal, 12px vertical
```

---

## 🧩 Component Patterns

### 1. Cards

```tsx
<Box
  bg="white"
  p={6}
  rounded="lg"        // 8px border radius
  shadow="md"         // Medium shadow
  borderWidth="1px"
  borderColor="gray.200"
>
  Card content
</Box>
```

**Variants**:
- `shadow="sm"` - Subtle elevation
- `shadow="md"` - Standard elevation
- `shadow="lg"` - Prominent elevation
- `shadow="xl"` - Maximum elevation

### 2. Buttons

#### Primary Button
```tsx
<Button
  colorScheme="brand"
  size="lg"
  px={8}
>
  Primary Action
</Button>
```

#### Secondary Button
```tsx
<Button
  variant="outline"
  colorScheme="brand"
  size="lg"
>
  Secondary Action
</Button>
```

#### Ghost Button
```tsx
<Button
  variant="ghost"
  colorScheme="gray"
>
  Tertiary Action
</Button>
```

#### Icon Button
```tsx
<IconButton
  aria-label="Action"
  icon={<EditIcon />}
  size="sm"
  colorScheme="blue"
  variant="ghost"
/>
```

### 3. Badges

```tsx
// Status badges
<Badge colorScheme="green">Published</Badge>
<Badge colorScheme="gray">Draft</Badge>
<Badge colorScheme="yellow">Featured</Badge>
<Badge colorScheme="purple">Category</Badge>
```

### 4. Forms

```tsx
<FormControl isRequired>
  <FormLabel>Label</FormLabel>
  <Input
    placeholder="Enter value"
    size="md"
  />
  <FormHelperText>Helper text</FormHelperText>
</FormControl>
```

### 5. Tables

```tsx
<Table variant="simple">
  <Thead bg="gray.50">
    <Tr>
      <Th>Header</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr _hover={{ bg: 'gray.50' }}>
      <Td>Cell</Td>
    </Tr>
  </Tbody>
</Table>
```

---

## 📱 Responsive Design

### Breakpoints

```css
base: 0px      /* Mobile */
sm:   480px    /* Small mobile */
md:   768px    /* Tablet */
lg:   992px    /* Desktop */
xl:   1280px   /* Large desktop */
2xl:  1536px   /* Extra large */
```

### Responsive Patterns

```tsx
// Responsive columns
<SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
  Cards
</SimpleGrid>

// Responsive text size
<Heading size={{ base: "2xl", md: "4xl" }}>Title</Heading>

// Responsive padding
<Container py={{ base: 8, md: 20 }}>Content</Container>

// Responsive display
<HStack display={{ base: "none", md: "flex" }}>Desktop only</HStack>
```

---

## 🎭 Component Library

### Layout Components

#### Container
```tsx
<Container maxW="container.xl" py={10}>
  Page content
</Container>
```

**Max Widths**:
- `container.sm`: 640px
- `container.md`: 768px
- `container.lg`: 1024px
- `container.xl`: 1280px

#### Stack Layouts
```tsx
// Vertical stack
<VStack spacing={4} align="stretch">
  <Item />
</VStack>

// Horizontal stack
<HStack spacing={4} justify="space-between">
  <Item />
</HStack>

// Flex layout
<Flex direction="row" justify="center" align="center" gap={4}>
  <Item />
</Flex>
```

### Admin Components

#### AdminSidebar
- Fixed left sidebar (260px wide)
- Navigation items with active states
- User profile section
- Sign out button

#### AdminLayout
- Wraps admin pages
- Includes sidebar
- Authentication protection
- Loading states

#### StatCard
```tsx
<StatCard
  label="Total Posts"
  value={25}
  icon={ChatIcon}
  color="blue.500"
  helpText="All blog posts"
/>
```

---

## 🎨 Design Tokens

### Border Radius

```css
sm:   2px   /* Subtle rounding */
md:   4px   /* Default */
lg:   8px   /* Cards, buttons */
xl:   12px  /* Large cards */
2xl:  16px  /* Hero sections */
full: 9999px /* Pills, avatars */
```

### Shadows

```css
sm:   0 1px 2px 0 rgba(0, 0, 0, 0.05)
md:   0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg:   0 10px 15px -3px rgba(0, 0, 0, 0.1)
xl:   0 20px 25px -5px rgba(0, 0, 0, 0.1)
2xl:  0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

---

## 🌍 Internationalization (i18n)

### Language Switching

- Route-based: `/en/...` and `/ko/...`
- Automatic redirect based on browser language
- Language switcher in navigation

### Bilingual Content Structure

```typescript
{
  "en": "English content",
  "ko": "한국어 콘텐츠"
}
```

### Font Considerations

- Inter font works well for both Latin and Hangul
- Ensure proper line-height for Korean text (1.6+)
- Test all UI with Korean content for overflow

---

## ♿ Accessibility

### WCAG 2.1 Level AA Compliance

#### Color Contrast
- Text on white: minimum 4.5:1 ratio
- Large text: minimum 3:1 ratio
- Interactive elements: clear focus states

#### Keyboard Navigation
- All interactive elements focusable
- Logical tab order
- Skip links for navigation

#### ARIA Labels
```tsx
<IconButton
  aria-label="Edit post"
  icon={<EditIcon />}
/>
```

#### Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3)
- Use semantic elements (`<nav>`, `<main>`, `<article>`)
- Form labels associated with inputs

---

## 🎯 Design Patterns

### Empty States

```tsx
<VStack spacing={3} py={10}>
  <Icon as={EmptyIcon} boxSize={12} color="gray.300" />
  <Text color="gray.500" fontWeight="medium">
    No items yet
  </Text>
  <Text fontSize="sm" color="gray.400">
    Create your first item to get started!
  </Text>
  <Button colorScheme="brand" size="sm">
    Create Item
  </Button>
</VStack>
```

### Loading States

```tsx
<VStack spacing={4}>
  <Spinner size="xl" color="brand.500" />
  <Text>Loading...</Text>
</VStack>
```

### Error States

```tsx
<Alert status="error" rounded="md">
  <AlertIcon />
  <AlertDescription>Error message</AlertDescription>
</Alert>
```

### Toast Notifications

```tsx
toast({
  title: 'Success',
  description: 'Action completed',
  status: 'success',  // 'error' | 'warning' | 'info'
  duration: 3000,
  isClosable: true,
})
```

---

## 📊 Page Layouts

### Public Pages
- Full-width hero sections
- Container-constrained content (1280px max)
- Generous white space
- Clear visual hierarchy

### Admin Pages
- Fixed sidebar (260px)
- Content area with gray background
- White content cards
- Breadcrumb navigation (future)

---

## 🎨 Color Usage Guide

### Navigation
- Background: `white`
- Active link: `brand.500`
- Hover: `brand.50` background

### Buttons
- Primary: `brand.500` → `brand.600` hover
- Secondary: `outline` with `brand.500`
- Danger: `red.500` → `red.600` hover
- Ghost: transparent → `gray.50` hover

### Backgrounds
- Page: `gray.50`
- Card: `white`
- Sidebar: `white`
- Table header: `gray.50`

### Text
- Headings: `gray.800`
- Body: `gray.700`
- Secondary: `gray.600`
- Disabled: `gray.400`

---

## 🔄 Interactive States

### Hover States
```tsx
_hover={{
  bg: 'gray.50',
  transform: 'translateY(-2px)',
  shadow: 'md'
}}
```

### Focus States
```tsx
_focus={{
  outline: '2px solid',
  outlineColor: 'brand.500',
  outlineOffset: '2px'
}}
```

### Active States
```tsx
_active={{
  bg: 'brand.600',
  transform: 'scale(0.98)'
}}
```

---

## 📦 Component Inventory

### Implemented Components

**Layout**:
- Navigation (sticky, with language switcher)
- Footer (4-column layout with links)
- AdminSidebar (fixed, 260px)
- AdminLayout (wrapper with auth)

**Sections** (Landing page):
- Hero (full-width, large text)
- AboutSection (two-column)
- ProgramsSection (grid of 4)
- CTASection (centered, accent color)

**Blog**:
- BlogCard (card with image, excerpt)
- BlogPost (full post with markdown)

**Admin**:
- StatCard (statistics with icon)
- PostTable (sortable, filterable)
- PostEditor (bilingual tabs)
- MediaUpload (drag & drop)

**Forms**:
- ContactForm (with validation)
- LoginForm (Firebase auth)
- PostForm (complex, bilingual)

---

## 🚀 Performance

### Image Optimization
- Use Next.js `<Image>` component
- Lazy loading by default
- WebP format when possible
- Proper sizing and srcset

### Code Splitting
- Dynamic imports for heavy components
- Route-based code splitting (automatic)
- Lazy load admin components

### Font Loading
- System font stack as fallback
- Font display: swap
- Subset fonts when possible

---

## 📝 Best Practices

### Do's ✅
- Use Chakra UI components consistently
- Follow spacing scale (multiples of 4)
- Maintain color contrast for accessibility
- Use semantic HTML
- Test with both English and Korean content
- Implement loading and error states
- Add ARIA labels to interactive elements

### Don'ts ❌
- Don't use arbitrary pixel values
- Don't use colors outside the design system
- Don't forget mobile responsiveness
- Don't skip empty states
- Don't use inline styles (use Chakra props)
- Don't forget keyboard navigation
- Don't hardcode text (use i18n)

---

## 🎯 Future Enhancements

### Planned Improvements
- [ ] Dark mode support
- [ ] Animation library (Framer Motion)
- [ ] Custom illustrations
- [ ] Micro-interactions
- [ ] Advanced admin components (rich text editor)
- [ ] Component documentation (Storybook)
- [ ] Design tokens export (for Figma)

---

## 📚 Resources

### Design Tools
- **Chakra UI**: https://chakra-ui.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **Inter Font**: https://rsms.me/inter/

### Color Tools
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Color Palette**: Material Design Color System

### Accessibility
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA**: https://www.w3.org/WAI/ARIA/apg/

---

**Last Updated**: November 2024
**Version**: 1.0.0
**Maintained by**: BNomad Development Team
