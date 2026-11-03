# Production delivery checklist

## Implemented

- Six fixed public routes: `/`, `/projects`, `/volunteer`, `/gallery`, `/about`, `/donate`.
- Shared navigation and footer links, including a cross-page home-logo link.
- Mobile disclosure navigation: 44px trigger, Escape/outside-click dismissal, keyboard focus handling, and a scrollable menu on short screens.
- Mobile form text at least 16px to avoid automatic iOS input zoom.
- Framer Motion content reveals and gallery transitions, shared hover/press feedback, animated menu controls, and a keyboard-accessible back-to-top control. Reduced-motion preferences disable added motion.
- Lenis wheel smoothing on fine-pointer/hover devices only; touch momentum, native anchors, form controls, nested menus, and modal scrolling retain native behavior. Listeners, animation frames, and observers are cleaned up.
- Gallery previous/next buttons, arrow-key navigation, touch-swipe navigation, and focus restoration after closing.
- Removed horizontal raster artifacts from the volunteer and About-page collages.
- Skip-to-content link, labelled controls, native photo dialog with focus restoration, readable contrast, and reduced-motion support.
- Canonical URLs, page-specific Open Graph/Twitter metadata, branded icons/share image, sitemap, robots rules, error recovery, and a global branded 404.
- TypeScript errors block builds. Preview-origin configuration, Payload integration, and the custom image loader are preserved.
- Preview-only social buttons are not rendered without real destinations.
- Repeated demo project cards/pagination and sample testimonial endorsements are removed. The project route shows an honest empty state until approved project stories are available.
- The repeated placeholder `58+` figures are replaced with non-numeric team copy.
- Formspree submission support includes allowlisted fields, HTTPS destination validation, duplicate-submit prevention, a timeout, error/retry states, and a honeypot. No submissions are stored in Payload.
- Direct Jaiz Bank transfer details are displayed for NGN and GBP donations, with copy controls, recipient-name verification guidance, and email/WhatsApp follow-up. The site does not collect card or banking credentials.
- The official email, clarification phone, WhatsApp, and TikTok profile are connected. Unconfigured social profiles remain hidden.

## Required before a full public launch

These are real launch gates, not completed features:

1. **Bank details:** an authorized foundation representative must compare both account numbers and the account name on the final published page against an official Jaiz Bank record. Complete a small test transfer in each supported currency before promoting the donation route. The site intentionally does not claim to confirm transfers or issue receipts.
2. **Formspree:** supply separate public volunteer/newsletter endpoints. Set them in `src/lib/public-site-config.ts`, configure server-side validation/spam controls in Formspree, then test actual owner-authorized delivery. The automated suite mocks submissions; it does not send personal data to a live form.
3. **Remaining social profiles:** Instagram and Facebook remain hidden because verified profile URLs were not supplied. Add them only after the foundation confirms the official profiles.
4. **Approved content:** supply actual project titles, dates, descriptions, and photographs; confirm the published impact counts, trustee identities/roles, and permission to use every photo. Approved testimonials need the speaker's consent. No results or identities should be invented.
5. **Domain and legal review:** confirm the final HTTPS domain (`siteURL` in the public config overrides the platform URL), privacy/data-retention notice, third-party form processing disclosures, and donation/receipt terms. Analytics is not configured at audit time; review cookie/consent requirements before enabling it.
6. **Dependency security:** compatible updates to Zod **4.6.7** and fast-uri **3.1.9** reduced the audit from 4 high/20 moderate/9 low to **3 high, 18 moderate, and 7 low** inherited dependency advisories. Remaining high advisories affect the DOMPurify version pinned by Monaco and Happy DOM through Payload Lexical. Several lower-level advisories have no patched range. A platform-compatible dependency update/applicability review is required before security sign-off. No blanket overrides or major upgrades were applied to Figma-managed Payload internals.
7. **Final published-site checks:** after Publish, verify every public route, the actual canonical/sitemap origin, images, forms, security headers, bank details, phone/email links, and WhatsApp/TikTok destinations on the published hostname. Preview/build verification is not a substitute for this.
8. **Real devices:** complete a final pass on iOS Safari and Android Chrome (including screen reader/keyboard access, rotation, virtual keyboard and low-bandwidth loading). Automated Chromium viewport coverage does not certify every mobile browser.

## Latest workspace verification

- `pnpm typecheck`: passed.
- `pnpm test:e2e`: **36 passed** in mobile and desktop Chromium profiles, both against the supervised preview and the locally served standalone production build.
- No automated WCAG A/AA violations in the tested page profiles.
- Responsive tests passed from 320–1920px, including tablet/landscape menu controls.
- `figma make verify-deploy`: passed with TypeScript validation enabled.
- All six public pages plus `robots.txt` and `sitemap.xml` are statically generated and returned HTTP 200.
- An unmatched URL returned the branded recovery page with HTTP 404.
- `nosniff`, strict-origin referrer policy, and restricted camera/microphone/geolocation headers were present.
- Added regression coverage for live reduced-motion changes, touch/native scrolling, gallery navigation, FAQ keyboard input, and back-to-top focus recovery.
- The interactive shell reported Node 22.23.4 against the package's declared Node >=24.22.1 requirement. Checks succeeded, but deployment/CI should use the repository-managed toolchain.

These checks do not confirm bank ownership, live form delivery, remaining dependency
advisories are resolved, or the published hostname and real devices have been
certified. Complete the launch gates above before full sign-off.

## Verification commands

Do not start another development server inside Make. The host supervises it.

```sh
pnpm typecheck
# Inside this workspace, Chromium is already available:
PLAYWRIGHT_CHROMIUM_PATH=/usr/bin/chromium pnpm test:e2e
figma make verify-deploy
pnpm audit --prod
```

For CI or another workstation, install Playwright's Chromium first and point the
suite at an already-running preview/staging site:

```sh
pnpm exec playwright install chromium
PLAYWRIGHT_BASE_URL=https://your-staging-host.example pnpm test:e2e
```

`playwright.config.ts` does not start a server. Tests run in mobile and desktop
Chromium profiles and cover the six pages, WCAG A/AA automated checks, responsive
widths from 320–1920px, landscape, metadata, local images, anchors, mobile
navigation, the gallery dialog, donation selectors, unavailable-form safeguards,
404 recovery, crawler files, and mocked Formspree submissions.

Build and version history are separate from bank transactions or Formspree data.
Do not put provider secrets in the public configuration file.

Public configuration is part of the static build. After changing contact links,
Formspree endpoints, the site URL, or approved content, publish a fresh build.
