# UTM Tracking Implementation Guide

## Overview
Comprehensive UTM parameter tracking system for **Bing Ads**, Google Ads, Facebook Ads, and all marketing campaigns. This system automatically captures, persists, and forwards UTM parameters from landing pages to the application form.

## Features

### ✅ Supported Tracking Parameters
- **Standard UTM Parameters:**
  - `utm_source` - Traffic source (e.g., "bing", "google", "facebook")
  - `utm_medium` - Marketing medium (e.g., "cpc", "email", "social")
  - `utm_campaign` - Campaign name
  - `utm_term` - Paid search keywords
  - `utm_content` - Ad variation/content

- **Platform-Specific Click IDs:**
  - `msclkid` - Microsoft Bing Ads Click ID
  - `gclid` - Google Ads Click ID
  - `fbclid` - Facebook Ads Click ID

### ✅ Automatic Functionality
1. **Capture** - UTM parameters automatically captured from URL on page load
2. **Persist** - Stored in sessionStorage for tracking across pages
3. **Forward** - Automatically appended to all "Apply Now" buttons
4. **Analytics** - Sent to Google Analytics dataLayer for reporting

## Implementation

### Components Updated
All "Apply Now" links now dynamically include UTM parameters:

1. **Hero.tsx** - Main hero CTA buttons (desktop + mobile)
2. **Header.tsx** - Navigation "Apply Now" button (desktop + mobile menu)
3. **ServicesDetail.tsx** - Service-specific Apply Now buttons

### How It Works

```typescript
// 1. User visits with Bing Ad:
https://corebusinesscapital.com/en?utm_source=bing&utm_medium=cpc&utm_campaign=sba_loans&msclkid=abc123

// 2. UTMTracker captures and stores:
{
  utm_source: "bing",
  utm_medium: "cpc",
  utm_campaign: "sba_loans",
  msclkid: "abc123",
  timestamp: "2025-01-18T10:30:00.000Z",
  landing_page: "/en"
}

// 3. Apply Now button dynamically updates to:
https://app.corebusinesscapital.com/en/?utm_source=bing&utm_medium=cpc&utm_campaign=sba_loans&msclkid=abc123

// 4. Sent to Google Analytics:
dataLayer.push({
  event: 'utm_capture',
  utm_source: "bing",
  utm_medium: "cpc",
  utm_campaign: "sba_loans",
  msclkid: "abc123"
});
```

## Bing Ads Setup

### Step 1: Create UTM Template
In your Bing Ads campaign, add this tracking template:

```
{lpurl}?utm_source=bing&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&utm_content={adid}&msclkid={msclkid}
```

### Step 2: Campaign-Level Tracking
For better organization, customize per campaign:

**SBA Loans Campaign:**
```
{lpurl}?utm_source=bing&utm_medium=cpc&utm_campaign=sba_loans_2025&utm_term={keyword}&msclkid={msclkid}
```

**Equipment Financing Campaign:**
```
{lpurl}?utm_source=bing&utm_medium=cpc&utm_campaign=equipment_financing&utm_term={keyword}&msclkid={msclkid}
```

**Working Capital Campaign:**
```
{lpurl}?utm_source=bing&utm_medium=cpc&utm_campaign=working_capital&utm_term={keyword}&msclkid={msclkid}
```

### Step 3: Test Your Tracking
1. Click your Bing Ad
2. URL should include: `?utm_source=bing&utm_medium=cpc&...`
3. Check browser console (dev mode): Should log "UTM Parameters captured"
4. Click "Apply Now" - Application URL should include all UTM params

## Google Analytics Setup

### View UTM Data in GA4

**1. Acquisition Reports:**
- Navigate to: **Reports > Acquisition > Traffic acquisition**
- Filter by: `utm_source=bing`
- See: Sessions, conversions, engagement from Bing Ads

**2. Create Custom Dimension (Optional):**
- Go to: **Admin > Data display > Custom definitions**
- Create dimension: "Bing Click ID" → Event parameter: `msclkid`

**3. Create Conversion Event:**
```javascript
// In your application form, track when user submits:
gtag('event', 'form_submission', {
  form_name: 'loan_application',
  utm_source: '[captured_source]',
  utm_campaign: '[captured_campaign]'
});
```

### Example GA4 Report Query
View Bing Ads performance:
```
Event name: utm_capture
Filter: utm_source = bing
Metrics: Event count, Conversions
Breakdown: utm_campaign, utm_term
```

## Testing

### Manual Testing

**Test 1: Bing Ads Simulation**
1. Visit: `https://corebusinesscapital.com/en?utm_source=bing&utm_medium=cpc&utm_campaign=test&msclkid=test123`
2. Open DevTools Console
3. Should see: `"UTM Parameters captured: {utm_source: 'bing', ...}"`
4. Click "Apply Now"
5. Verify URL includes all parameters

**Test 2: Session Persistence**
1. Visit with UTM parameters (as above)
2. Navigate to different pages (/services, /about)
3. Click "Apply Now" from any page
4. UTM parameters should still be present

**Test 3: Google Analytics**
1. Visit with UTM parameters
2. Open GA4 Real-Time report
3. Check "Event name: utm_capture"
4. Verify parameters are received

### Browser Console Testing
```javascript
// Check if UTM params are stored
JSON.parse(sessionStorage.getItem('utm_params'))

// Expected output:
{
  utm_source: "bing",
  utm_medium: "cpc",
  utm_campaign: "sba_loans",
  msclkid: "abc123",
  timestamp: "2025-01-18T10:30:00.000Z",
  landing_page: "/en"
}
```

## ROI Tracking

### Calculate Bing Ads ROI
With this implementation, you can now:

1. **Track Cost:** Bing Ads dashboard shows ad spend
2. **Track Conversions:** GA4 shows form submissions with `utm_source=bing`
3. **Calculate CPA (Cost Per Acquisition):**
   ```
   CPA = Total Bing Ad Spend / Number of Applications from Bing
   ```

4. **Track Revenue:** When loans are approved, attribute revenue to Bing campaign
5. **Calculate ROI:**
   ```
   ROI = (Revenue from Bing Leads - Bing Ad Spend) / Bing Ad Spend × 100%
   ```

### Example Metrics Dashboard
| Campaign | Clicks | Applications | Cost | CPA | Approved | Revenue | ROI |
|----------|--------|--------------|------|-----|----------|---------|-----|
| SBA Loans | 1,250 | 42 | $3,150 | $75 | 12 | $60,000 | 1,805% |
| Equipment | 890 | 28 | $2,225 | $79 | 8 | $32,000 | 1,339% |
| Working Cap | 1,105 | 35 | $2,763 | $79 | 10 | $45,000 | 1,529% |

## Troubleshooting

### UTM Parameters Not Captured
**Issue:** Console shows no "UTM Parameters captured" message

**Solutions:**
1. Verify URL contains UTM parameters
2. Check browser console for JavaScript errors
3. Ensure `UTMTracker` component is loaded in layout
4. Clear browser cache and sessionStorage

### Apply Now Links Missing UTM
**Issue:** Application URL doesn't include UTM parameters

**Solutions:**
1. Check sessionStorage: `sessionStorage.getItem('utm_params')`
2. Verify `appendUTMToURL()` function is called
3. Wait for useEffect to complete (React lifecycle)
4. Refresh page and try again

### Google Analytics Not Receiving Data
**Issue:** GA4 doesn't show utm_capture events

**Solutions:**
1. Verify GTM is loaded (check Network tab)
2. Check dataLayer: `window.dataLayer`
3. Ensure GA4 measurement ID is correct
4. Wait for real-time processing (1-2 minutes)
5. Check GA4 DebugView mode

## Advanced Usage

### Application Form Integration
When user submits application, include UTM data:

```typescript
import { getStoredUTMParams } from '@/components/UTMTracker';

function ApplicationForm() {
  const handleSubmit = async (formData) => {
    const utmParams = getStoredUTMParams();
    
    // Send to backend with application
    await fetch('/api/submit-application', {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
        tracking: utmParams
      })
    });
  };
}
```

### Custom Campaign Tracking
Track specific marketing initiatives:

```
// Email Campaign
https://corebusinesscapital.com/en?utm_source=email&utm_medium=newsletter&utm_campaign=january_2025

// Social Media Post
https://corebusinesscapital.com/en?utm_source=linkedin&utm_medium=social&utm_campaign=success_story

// Referral Partner
https://corebusinesscapital.com/en?utm_source=partner&utm_medium=referral&utm_campaign=abc_accounting
```

## Best Practices

### 1. Consistent Naming Conventions
```
utm_source: lowercase, no spaces (bing, google, facebook)
utm_medium: lowercase, no spaces (cpc, email, social)
utm_campaign: lowercase, underscores (sba_loans_2025)
```

### 2. Campaign Organization
```
├─ Bing Ads
│  ├─ sba_loans_2025_q1
│  ├─ equipment_financing_spring
│  └─ working_capital_urgent
├─ Google Ads
│  ├─ sba_loans_search_2025
│  └─ equipment_financing_display
└─ Facebook Ads
   ├─ small_business_awareness
   └─ equipment_financing_retargeting
```

### 3. Regular Monitoring
- Review GA4 reports weekly
- Compare campaign performance monthly
- Adjust bids based on CPA
- Pause underperforming campaigns

## Security & Privacy

### Data Storage
- UTM parameters stored in **sessionStorage** (cleared on tab close)
- No personally identifiable information (PII) captured
- Compliant with GDPR/CCPA (tracking anonymous marketing data)

### Data Transmission
- UTM parameters sent via HTTPS
- Google Analytics processes data server-side
- Click IDs (msclkid, gclid) are anonymized

## Deployment Status

✅ **Live on Production**
- URL: https://corebusinesscapital.com
- Components: Hero, Header, ServicesDetail
- Tracking: Active for all traffic sources
- Analytics: Integrated with GA4 (G-QVMLEDCCHV)

## Support

### Need Help?
1. Check browser console for errors
2. Review this guide's troubleshooting section
3. Test with example URLs provided
4. Verify GA4 setup in Google Analytics

### Future Enhancements
- [ ] Server-side UTM parameter validation
- [ ] Enhanced conversion tracking with revenue attribution
- [ ] A/B testing integration
- [ ] Multi-touch attribution modeling
- [ ] Automated reporting dashboard
