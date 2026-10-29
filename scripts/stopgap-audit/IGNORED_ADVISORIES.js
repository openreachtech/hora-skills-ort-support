/**
 * Advisories `scripts/stopgap-audit/npm-audit-gate.js` lets through, as a stopgap until a release fixes them.
 *
 * Each entry carries its reason and the condition for removing it,
 * and an entry whose advisory is no longer reported fails the audit,
 * so this list cannot outlive the reasons it was written for.
 *
 * @type {Array<{
 *   id: string
 *   package: string
 *   path: string
 *   reason: string
 *   removeWhen: string
 * }>}
 */
const IGNORED_ADVISORIES = [
  {
    id: 'GHSA-gcqx-w48m-w2h4',
    package: 'deepmerge',
    path: 'jest > @jest/core > jest-config > deepmerge',
    reason: 'No patched release: the advisory covers deepmerge >=4.2.0 <=4.3.1, and 4.3.1 is the latest. The maintainer closed the upstream report without a code change. deepmerge is reached through jest alone, a devDependency that is not shipped, and the two jest-config call sites that use it do not run with this repository\'s jest configuration: mergeConfig() is exported for jest.config.js to call and nothing here calls it, and the preset globals merge needs a preset, which this repository does not set.',
    removeWhen: 'deepmerge publishes a release outside <=4.3.1, or the advisory is withdrawn or disputed so that npm audit stops reporting it, or jest-config stops depending on deepmerge',
  },
]

export default IGNORED_ADVISORIES
