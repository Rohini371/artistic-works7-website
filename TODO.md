# TODO - Community Moments Premium Lightbox Normalization

## Plan
1. Inspect existing lightbox implementation(s) for duplication:
   - `js/community-moments-lightbox.js`
   - `js/community-moments-lightbox-inline-css.js`
   - `js/community-moments-lightbox.css`
   - confirm whether both JS files run on pages.
2. Choose a single clean implementation:
   - Keep one JS module that builds overlay once, uses event delegation, supports ESC, backdrop click, focus close button, scroll lock + exact scroll restore.
   - Remove duplication:
     - delete/disable inline style injection logic.
     - delete/stop duplicate overlay/DOM creation if present in multiple files.
3. Move CSS exclusively into `css/style.css` (per requirement):
   - Add scoped rules only for `#community-moments .community-moment-card img` lightbox UI classes.
   - Ensure no global selectors; do not affect other sections.
4. Update JS exclusively in `js/script.js`:
   - Implement/clean the lightbox behavior there using class names `community-moments-lightbox-*`.
   - Ensure only ONE overlay exists.
5. Remove/clean obsolete files:
   - Stop `community-moments-lightbox.js` and `community-moments-lightbox-inline-css.js` from running (either delete them or prevent execution by commenting out their contents).
   - Keep `community-moments-lightbox.css` unused (or remove reference if present).
6. QA checklist (manual):
   - Verify only #community-moments images open lightbox.
   - Verify no regression elsewhere.
   - Verify image click does NOT close lightbox.
   - Verify ESC closes.
   - Verify backdrop click closes.
   - Verify scroll position preserved.
   - Verify focus returns appropriately.

