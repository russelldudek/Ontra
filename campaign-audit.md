# Campaign Audit

State: building until the current `main` head, regenerated PDFs, and public Pages deployment are verified together.

## Corrected candidate experience

- Replaced the dashboard-like precedent interface with a mobile-first editorial candidate vision.
- Replaced the old thesis with: `Turn scattered AI effort into operating capability.`
- Replaced the six-cell control surface with a four-condition AI Capability Charter: Work, Owner, Boundary, Proof.
- Limited the public site to one optional disclosure control.
- Added a distinct 390-pixel and 320-pixel composition rather than compressing the desktop layout.
- Removed obsolete dashboard overrides and temporary release payloads.
- Retained the supplied Ontra wordmark with a text fallback when the image cannot render.
- Reimplemented the skip link as a clipped accessible element so it cannot appear as a random white block.
- Removed the isolated white outcome panel from the hero.

## Local rendered verification

- Candidate site: 1440×900, 1280×800, 768×1024, 390×844, and 320×800.
- Document routes: desktop, 390-pixel mobile, and 320-pixel mobile.
- Checks: horizontal overflow, out-of-viewport geometry, console errors, fixed white blocks, logo load, one-control limit, disclosure behavior, reduced motion, responsive document reflow, print pagination, minimum type, and lower-page use.
- Local findings: 0 unresolved failures.

## Required publication verification

- Current source files present on `main`.
- Five PDFs regenerated from the current HTML.
- Exact pagination: 2 / 1 / 2 / 2 / 1.
- AI Capability Charter PDF is landscape.
- Public source and PDF text/metadata scans return zero internal-system-name matches.
- Live Pages files match the final `main` source and downloads.

Do not classify the campaign as complete until every publication-verification item passes against one captured `main` head.
