# User Story: Web Map Implementation

**As a** web user,  
**I want** to view incident locations on a map,  
**So that** I can understand the geographical context of reports.

---

## Acceptance Criteria
- [ ] `Map.web.tsx` renders a Google Maps iframe.
- [ ] Supports single marker (pin) mode.
- [ ] Supports route mode (origin -> destination).
- [ ] Handles resizing via props.
- [ ] Native `Map.native.tsx` remains unaffected.

## Implementation Notes
- Use Google Maps Embed API (`https://www.google.com/maps?output=embed`).
- Dynamic `q` parameter for single point (`lat,lng`) and route (`lat1,lng1+to+lat2,lng2`).
- Styling: `width: 100%`, `height: 100%`, `frameBorder: 0`.
