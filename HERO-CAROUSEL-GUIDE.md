# Hero Carousel Implementation Guide

## ✅ Implementation Complete!

The HeroCarousel has been fully integrated into [app/page.tsx](app/page.tsx) and is ready to use.

All components have been successfully created:

1. **Sanity Schema** ([sanity/schemaTypes/heroSlide.ts](sanity/schemaTypes/heroSlide.ts))
2. **React Component** ([components/HeroCarousel.tsx](components/HeroCarousel.tsx))
3. **GROQ Query** ([sanity/lib/queries.ts](sanity/lib/queries.ts))

## 📦 Dependencies

Already installed:
- ✅ `embla-carousel-react`
- ✅ `embla-carousel-autoplay`
- ✅ `lucide-react`

## 🚀 Usage in page.tsx

✅ **Already integrated!** The HeroCarousel is now at the top of your homepage.

The carousel will automatically display when you add hero slides in Sanity Studio.

## 🎨 Design Specifications

### Layout
- **Height**: `h-[70vh]` with `min-h-[600px]` (immersive, large viewport)
- **Image**: Full-screen background using `next/image` with `fill` and `object-cover`

### Content Placement
- **Position**: Bottom center of each slide
- **Padding**: `pb-12` (12 units from bottom edge)
- **Alignment**: Centered horizontally with `items-center justify-end text-center`

### Styling
- **Gradient Overlay**: `bg-gradient-to-t from-black/90 via-black/50 to-transparent`
  - Strong dark gradient at bottom for text readability
  - Fades to transparent at top
- **Typography**:
  - Title: El Messiri font, `text-5xl md:text-6xl lg:text-7xl`
  - Button: Open Sans font
- **Button**:
  - Background color: `#6E6353` (Primary Green/Brown)
  - Shape: `rounded-full` (pill-shaped)
  - Hover effect: Scale up with shadow

### Navigation
- **Arrows**: Left and right chevrons
- **Style**: White with `opacity-50`, hover to `opacity-100`
- **Position**: Far left and right edges at vertical center
- **Auto-hide**: Only shows when there are multiple slides

### Functionality
- **Auto-play**: 5-second delay between slides
- **Loop**: Infinite loop through slides
- **Filtering**: Only displays active slides (`active: true`)
- **Ordering**: Sorted by `order` field (ascending)

## 🎯 Sanity Studio Setup

1. **Restart Sanity Studio**:
   ```bash
   cd sanity
   npm run dev
   ```

2. **Create Hero Slides**:
   - Go to Sanity Studio
   - Create new "Hero Slide" documents
   - Add:
     - Title (e.g., "Welcome to Masjid Al-Quba")
     - High-resolution image (use hotspot to focus on important areas)
     - Button text (e.g., "Donate", "Learn More")
     - Link URL
     - Set `active` to `true`
     - Set `order` number (0, 1, 2, etc.)

3. **Image Recommendations**:
   - High resolution: 1920x1080 or larger
   - Focus on architectural beauty
   - Avoid placing important content in the bottom center (reserved for text)
   - Use hotspot to ensure focus stays correct on different screen sizes

## 🔍 GROQ Query

The query fetches all active hero slides sorted by order:

```groq
*[_type == "heroSlide" && active == true] | order(order asc) {
  _id,
  title,
  image,
  buttonText,
  link,
  active,
  order
}
```

## 📱 Responsive Design

- **Mobile**: Text size adjusts (`text-5xl`)
- **Tablet**: Medium text size (`md:text-6xl`)
- **Desktop**: Large text size (`lg:text-7xl`)
- **Height**: Maintains 70vh on all screens, minimum 600px

## 🎨 Color Palette

- **Primary Button**: `#6E6353` (warm brown/green)
- **Text**: White with dark gradient background for contrast
- **Navigation**: White with 50% opacity, 100% on hover

## 💡 Tips

1. **Image Quality**: Use high-quality, professional images of the masjid
2. **Text Readability**: The bottom gradient ensures white text is always readable
3. **Button Links**: Use relative URLs for internal pages (`/donate`) or absolute URLs for external
4. **Performance**: Images are optimized with Next.js Image component
5. **Accessibility**: Includes proper ARIA labels for navigation buttons

## 🔧 Customization Options

Want to adjust the carousel? Here are common modifications:

- **Autoplay Speed**: Change `delay: 5000` in HeroCarousel.tsx
- **Height**: Modify `h-[70vh] min-h-[600px]`
- **Gradient**: Adjust `from-black/90 via-black/50 to-transparent`
- **Button Color**: Change `backgroundColor: '#6E6353'`
- **Text Size**: Modify `text-5xl md:text-6xl lg:text-7xl`
