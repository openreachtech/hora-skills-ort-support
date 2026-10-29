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
const IGNORED_ADVISORIES = []

export default IGNORED_ADVISORIES
