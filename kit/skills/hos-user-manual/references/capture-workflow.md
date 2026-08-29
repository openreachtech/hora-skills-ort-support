# Capture Workflow

How each feature is walked and photographed. The rule this file serves: **only what was actually
performed and actually captured enters the manual.**

## Driving the system

- Operate through the browser against the running E2E stack, the way an end user would: navigate,
  click, type. Any browser automation the session has is fine. The tool does not matter; the
  discipline does. Every screenshot comes from a real rendered screen of this run.
- **Use one fixed viewport for the whole run** (1280×800 is a good default). Mixed sizes make the
  manual look stitched together.
- Use the seeded test user chosen in the login step, with the same permissions the manual's
  reader has. If different roles see different UIs, walk each role's pages under that role's
  account.

## Seed data during the walk

- The E2E seed set is the material on screen. **Reuse the existing test seeders as far as they
  go.** They are maintained, realistic, and reproducible.
- When a feature needs data the seeders do not provide (for example, a cancellation page with no
  cancellable order seeded), **stop and ask the user**. Never improvise. Ask:
  1. Add the missing data at all? If yes, as a proper seeder in the E2E seed set (kept and
     maintained, helps future runs), or as throwaway records created through the UI for this run
     only?
  2. Clean the additions up after the run, or keep them?
  Record the answers. The teardown step executes them, and the final report states them.
- Data created *as part of a documented operation* (the record the reader is shown how to create)
  is not seed data. It is the walk itself. It still falls under the same cleanup decision.

## What to capture

One screenshot per **meaningful step**: a screen the reader must recognize, or a state the reader
must produce. Concretely:

- The screen as the step begins, so the reader can confirm "I am in the right place".
- Forms **after** filling them in, before submitting. A filled form teaches; an empty one does
  not.
- The visible result of the action: the success message, the new row, the changed status.
- Any dialog or confirmation the reader must answer.

Not every click needs a frame. Navigating three menu levels is one step with one screenshot of
the destination, with the path written in the step text.

## Screenshot hygiene

- **Naming**: `<feature>-<step number>.png` under `assets/images/` — `login-1.png`,
  `login-2.png`. The name ties the file to its page and step. Delete any screenshot no page
  references.
- **Check the content before saving**, every time:
  - No real personal data. Seeded fictional users only. If a screen shows anything that did not
    come from seed data or from this walk, stop and find out why before publishing it.
  - No developer chrome: no devtools pane, no error overlays, no bookmark-bar noise. The frame is
    the application as the reader sees it.
  - The state matches the step text. A screenshot of a slightly different state (another record
    selected, another tab active) is worse than none. Retake it.
- Capture the full window by default. Crop to a region only when the step is about one control
  and the full screen would make it too small to read. When cropping, keep enough surroundings
  for the reader to find the control.

## When a step cannot be performed

A feature that errors, a button that does nothing, a permission that blocks the walk: **do not
write the step from imagination, and do not silently drop the feature.** Leave the feature's page
out (or mark the specific step as unavailable), and report the finding to the user at the end:
what was attempted, what happened, and that the manual omits it. A gap with a reported reason is
fine. A made-up page is a defect.
