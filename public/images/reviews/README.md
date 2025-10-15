# Customer Reviews Images Setup

## Required Images

Place 12 customer review images in the `/public/images/reviews/` directory with the following naming convention:

- `review-1.jpg` - Customer review screenshot 1
- `review-2.jpg` - Customer review screenshot 2
- `review-3.jpg` - Customer review screenshot 3
- `review-4.jpg` - Customer review screenshot 4
- `review-5.jpg` - Customer review screenshot 5
- `review-6.jpg` - Customer review screenshot 6
- `review-7.jpg` - Customer review screenshot 7
- `review-8.jpg` - Customer review screenshot 8
- `review-9.jpg` - Customer review screenshot 9
- `review-10.jpg` - Customer review screenshot 10
- `review-11.jpg` - Customer review screenshot 11
- `review-12.jpg` - Customer review screenshot 12

## Image Specifications

- **Format**: JPEG (.jpg)
- **Recommended Size**: 800x600 pixels (4:3 aspect ratio)
- **File Size**: Keep under 200KB each for optimal loading
- **Content**: Screenshots of actual customer reviews from Google, Yelp, Facebook, etc.
- **Quality**: High resolution, clear text, visible star ratings

## Accessibility Notes

Each image should contain:
- Customer name (can be first name + last initial for privacy)
- Star rating (preferably 5 stars)
- Review text that's readable
- Platform logo (Google, Yelp, etc.) if applicable

## Image Optimization Tips

1. Use tools like TinyJPG or ImageOptim to compress images
2. Ensure consistent aspect ratios for best visual appearance
3. Include variety of review sources for credibility
4. Make sure text is readable even when displayed as thumbnails

## Fallback Behavior

If images are missing, the component will:
- Hide broken image containers automatically
- Continue functioning with available images
- Maintain responsive layout integrity

## Testing

After adding images:
1. Test hover effects work smoothly
2. Verify carousel scrolling is seamless
3. Check responsiveness on mobile devices
4. Ensure keyboard navigation works properly
5. Validate screen reader accessibility