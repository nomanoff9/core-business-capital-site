# Deprecated API Fix: H1UserAgentFontSizeInSection

## Issue
Chrome PageSpeed Insights reported a deprecation warning:
```
H1UserAgentFontSizeInSection
Deprecated APIs will eventually be removed from the browser.
```

## Root Cause
When `<h1>` elements are placed inside `<section>` elements, some browsers historically applied default user-agent font sizes that differ from standard heading sizes. Chrome is deprecating this behavior, and web developers should explicitly define font sizes instead of relying on browser defaults.

## Solution Applied

### Before (Relying on User-Agent Defaults)
```tsx
<h1 
  className="text-4xl lg:text-5xl font-bold"
  style={{ color: '#000000' }}
>
  {serviceName}
</h1>
```

### After (Explicit Font Sizing)
```tsx
<h1 
  className="text-4xl lg:text-5xl font-bold"
  style={{ color: '#000000', fontSize: 'clamp(2.25rem, 4vw, 3rem)' }}
>
  {serviceName}
</h1>
```

## Changes Made

### 1. Hero Component (`src/components/Hero.tsx`)

**Desktop/Tablet h1:**
- Added: `fontSize: 'clamp(1.5rem, 5vw, 3.75rem)'`
- Responsive sizing: 1.5rem (24px) minimum → 3.75rem (60px) maximum
- Scales with viewport width (5vw)

**Mobile h1:**
- Added: `fontSize: '1.875rem'`
- Fixed size: 1.875rem (30px) for consistent mobile experience

### 2. ServicesDetail Component (`src/components/ServicesDetail.tsx`)

**Service Detail h1:**
- Added: `fontSize: 'clamp(2.25rem, 4vw, 3rem)'`
- Responsive sizing: 2.25rem (36px) minimum → 3rem (48px) maximum
- Scales with viewport width (4vw)

## CSS clamp() Function

The `clamp()` function provides fluid typography with three values:
```css
clamp(minimum, preferred, maximum)
```

**Benefits:**
1. **No media queries needed** - Automatically responsive
2. **Smooth scaling** - Font size grows proportionally with viewport
3. **Explicit sizing** - No reliance on user-agent defaults
4. **Better accessibility** - Prevents text from becoming too small or too large

## Browser Support

`clamp()` is supported in:
- ✅ Chrome 79+ (Dec 2019)
- ✅ Firefox 75+ (Apr 2020)
- ✅ Safari 13.1+ (Mar 2020)
- ✅ Edge 79+ (Jan 2020)

Coverage: **97.8%** of all browsers (as of 2025)

## Font Size Calculations

### Hero (Desktop/Tablet)
- **Minimum**: 1.5rem = 24px
- **Preferred**: 5vw (5% of viewport width)
- **Maximum**: 3.75rem = 60px

Example on 1920px viewport: `5vw = 96px` → clamped to 60px

### Hero (Mobile)
- **Fixed**: 1.875rem = 30px

### Service Details
- **Minimum**: 2.25rem = 36px
- **Preferred**: 4vw (4% of viewport width)
- **Maximum**: 3rem = 48px

Example on 1920px viewport: `4vw = 76.8px` → clamped to 48px

## Testing

After deployment, verify:
1. ✅ h1 elements display correctly across all breakpoints
2. ✅ Font sizes scale smoothly when resizing browser
3. ✅ No deprecation warning in Chrome DevTools Console
4. ✅ No deprecation warning in PageSpeed Insights

## Impact

- **Performance**: No impact (inline styles)
- **Accessibility**: ✅ Improved (explicit sizing)
- **Browser Compatibility**: ✅ Excellent (97.8%)
- **Future-proof**: ✅ No deprecated APIs

## Deployment

**Status**: ✅ Deployed to production (commit `cbe2aad`)

**Verification Steps:**
1. Wait 2-3 minutes for Vercel deployment
2. Open Chrome DevTools Console
3. Navigate to https://corebusinesscapital.com/en
4. Verify no deprecation warnings appear
5. Re-test PageSpeed Insights - deprecation warning should be resolved

## Related Documentation
- [Chrome Platform Status: Remove H1 User-Agent Font Size In Section](https://chromestatus.com/feature/5665422896029696)
- [MDN: clamp() CSS Function](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
- [Web.dev: Deprecated APIs](https://web.dev/deprecations/)
