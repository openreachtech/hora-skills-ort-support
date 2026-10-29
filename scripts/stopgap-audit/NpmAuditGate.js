import childProcess from 'node:child_process'

import IGNORED_ADVISORIES from './IGNORED_ADVISORIES.js'

/**
 * Judge an `npm audit` report, deliberately letting through the advisories
 * `scripts/stopgap-audit/IGNORED_ADVISORIES.js` lists, as a stopgap until a release fixes them.
 *
 * It fails on an advisory the list does not name, at any severity,
 * on an advisory the list names that is no longer reported,
 * and on an `npm audit` that answers with an error instead of a report.
 */
export default class NpmAuditGate {
  /**
   * @param {{
   *   report: AuditReport | null
   *   ignoredAdvisories: Array<IgnoredAdvisory>
   * }} params - Parameters of this constructor.
   */
  constructor ({
    report,
    ignoredAdvisories,
  }) {
    this.report = report
    this.ignoredAdvisories = ignoredAdvisories
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof NpmAuditGate ? X : never} T, X
   * @param {{
   *   report?: AuditReport | null
   *   ignoredAdvisories?: Array<IgnoredAdvisory>
   * }} [params] - Parameters for the factory method.
   * @returns {InstanceType<T>} Instance of this class.
   * @this {T}
   * @public
   */
  static create ({
    report = this.fetchAuditReport(),
    ignoredAdvisories = this.ignoredAdvisories,
  } = {}) {
    return new this({
      report,
      ignoredAdvisories,
    })
  }

  /**
   * get: `node:child_process` module.
   *
   * @returns {typeof childProcess} `node:child_process` module.
   */
  static get childProcess () {
    return childProcess
  }

  /**
   * get: Standard output stream.
   *
   * @returns {typeof process.stdout} Standard output stream.
   */
  static get stdout () {
    return process.stdout
  }

  /**
   * get: Standard error stream.
   *
   * @returns {typeof process.stderr} Standard error stream.
   */
  static get stderr () {
    return process.stderr
  }

  /**
   * get: Advisories the list lets through.
   *
   * @returns {Array<IgnoredAdvisory>} Advisories the list names.
   */
  static get ignoredAdvisories () {
    return IGNORED_ADVISORIES
  }

  /**
   * get: Name of the file listing the advisories to let through.
   *
   * @returns {string} File name.
   */
  static get ignoredAdvisoriesFileName () {
    return 'IGNORED_ADVISORIES.js'
  }

  /**
   * get: Pattern picking a GHSA id off the end of an advisory url.
   *
   * @returns {RegExp} Pattern with the named group `id`.
   */
  static get advisoryIdPattern () {
    return /(?<id>GHSA(?:-[0-9a-z]{4}){3})$/u
  }

  /**
   * get: Largest output `npm audit` may produce, in bytes.
   *
   * @returns {number} Size in bytes.
   */
  static get maxAuditOutputBytes () {
    return 64 * 1024 * 1024
  }

  /**
   * Fetch the report `npm audit --json` prints.
   *
   * @returns {AuditReport | null} Report, or null when npm printed none.
   */
  static fetchAuditReport () {
    const auditResult = this.invokeNpmAudit()

    // npm exits 1 whenever it finds an advisory, so only its stdout says whether a report came back.
    try {
      return JSON.parse(auditResult.stdout)
    } catch {
      this.invokeWriteStderr({
        text: auditResult.stderr,
      })

      return null
    }
  }

  /**
   * Run `npm audit --json`.
   *
   * @returns {SpawnSyncReturns<string>} Result of the process.
   */
  static invokeNpmAudit () {
    return this.childProcess.spawnSync(
      'npm',
      [
        'audit',
        '--json',
      ],
      {
        encoding: 'utf8',
        maxBuffer: this.maxAuditOutputBytes,
      }
    )
  }

  /**
   * Write a text to the standard error stream.
   *
   * @param {{
   *   text: string
   * }} params - Parameters.
   * @returns {BooleanLike} Whether the stream accepted the text.
   */
  static invokeWriteStderr ({
    text,
  }) {
    return this.stderr.write(text)
  }

  /**
   * Extract the GHSA id of an advisory.
   *
   * @param {{
   *   advisory: AuditAdvisory
   * }} params - Parameters.
   * @returns {string} GHSA id, or the whole url where it carries none.
   */
  static extractAdvisoryId ({
    advisory,
  }) {
    const matched = advisory.url.match(this.advisoryIdPattern)

    return matched?.groups.id
      ?? advisory.url
  }

  /**
   * Write a text to the standard output stream.
   *
   * @param {{
   *   text: string
   * }} params - Parameters.
   * @returns {BooleanLike} Whether the stream accepted the text.
   */
  static invokeWriteStdout ({
    text,
  }) {
    return this.stdout.write(text)
  }

  /**
   * get: Constructor of this class.
   *
   * @returns {typeof NpmAuditGate} Constructor of this class.
   */
  get Ctor () {
    return /** @type {typeof NpmAuditGate} */ (this.constructor)
  }

  /**
   * Compare the advisories reported with the list, and print the outcome.
   *
   * @returns {number} Exit code: 0 when nothing fails, otherwise 1.
   * @public
   */
  auditAdvisories () {
    if (!this.hasUsableReport()) {
      this.Ctor.invokeWriteStderr({
        text: `${this.buildNoReportMessage()}\n`,
      })

      return 1
    }

    this.buildIgnoredLines()
      .forEach(it => {
        this.Ctor.invokeWriteStdout({
          text: `${it}\n`,
        })
      })
    this.buildFailureLines()
      .forEach(it => {
        this.Ctor.invokeWriteStderr({
          text: `${it}\n`,
        })
      })
    this.Ctor.invokeWriteStdout({
      text: `${this.buildSummaryLine()}\n`,
    })

    return this.countFailures() === 0
      ? 0
      : 1
  }

  /**
   * Check whether the report can be judged.
   *
   * @returns {BooleanLike} Whether the report carries vulnerabilities and no error.
   */
  hasUsableReport () {
    if (
      !this.report
      || this.report.error
    ) {
      return false
    }

    return this.report.vulnerabilities
      ?? false
  }

  /**
   * Build the line saying no report came back.
   *
   * @returns {string} Line to print.
   */
  buildNoReportMessage () {
    const error = this.report?.error
      ?? null

    return `npm audit answered with no report, so nothing was checked: ${JSON.stringify(error)}`
  }

  /**
   * Build the lines naming each listed advisory that is still reported.
   *
   * @returns {Array<string>} Lines to print.
   */
  buildIgnoredLines () {
    return this.collectMetIgnores()
      .flatMap(it => [
        `ignored (stopgap): ${it.id} (${it.package}) via ${it.path}`,
        `  reason: ${it.reason}`,
        `  remove when: ${it.removeWhen}`,
      ])
  }

  /**
   * Collect the listed advisories that are still reported.
   *
   * @returns {Array<IgnoredAdvisory>} Advisories of the list.
   */
  collectMetIgnores () {
    return this.ignoredAdvisories
      .filter(it => this.isReported({
        id: it.id,
      }))
  }

  /**
   * Check whether the report names an advisory.
   *
   * @param {{
   *   id: string
   * }} params - Parameters.
   * @returns {BooleanLike} Whether the advisory is reported.
   */
  isReported ({
    id,
  }) {
    return this.collectAdvisoryIds()
      .includes(id)
  }

  /**
   * Collect the ids of the advisories the report names, each once.
   *
   * @returns {Array<string>} GHSA ids in the order they first appear.
   */
  collectAdvisoryIds () {
    const advisoryIds = this.collectAdvisories()
      .map(it => this.Ctor.extractAdvisoryId({
        advisory: it,
      }))

    return [
      ...new Set(advisoryIds),
    ]
  }

  /**
   * Collect the advisories the report names, as often as it names them.
   *
   * @returns {Array<AuditAdvisory>} Advisories of the report.
   */
  collectAdvisories () {
    return Object.values(this.report.vulnerabilities)
      .flatMap(it => it.via)
      .filter(it => typeof it === 'object')
  }

  /**
   * Build the lines naming each failure.
   *
   * @returns {Array<string>} Lines to print.
   */
  buildFailureLines () {
    return [
      ...this.buildUnignoredLines(),
      ...this.buildStaleLines(),
    ]
  }

  /**
   * Build the lines naming each reported advisory the list does not name.
   *
   * @returns {Array<string>} Lines to print.
   */
  buildUnignoredLines () {
    return this.collectAdvisoryIds()
      .filter(it => !this.isIgnored({
        id: it,
      }))
      .map(it => this.buildUnignoredLine({
        id: it,
      }))
  }

  /**
   * Check whether the list names an advisory.
   *
   * @param {{
   *   id: string
   * }} params - Parameters.
   * @returns {BooleanLike} Whether the advisory is listed.
   */
  isIgnored ({
    id,
  }) {
    return this.ignoredAdvisories
      .some(it => it.id === id)
  }

  /**
   * Build the line naming a reported advisory the list does not name.
   *
   * @param {{
   *   id: string
   * }} params - Parameters.
   * @returns {string} Line to print.
   */
  buildUnignoredLine ({
    id,
  }) {
    const advisory = this.findAdvisory({
      id,
    })

    return `not ignored: ${id} ${advisory.severity} ${advisory.name} ${advisory.range} — ${advisory.title}`
  }

  /**
   * Find the advisory of an id, taking the last one the report names under it.
   *
   * @param {{
   *   id: string
   * }} params - Parameters.
   * @returns {AuditAdvisory | null} Advisory, or null where the report names none.
   */
  findAdvisory ({
    id,
  }) {
    return this.collectAdvisories()
      .findLast(it => this.Ctor.extractAdvisoryId({
        advisory: it,
      }) === id)
      ?? null
  }

  /**
   * Build the lines naming each listed advisory that is no longer reported.
   *
   * @returns {Array<string>} Lines to print.
   */
  buildStaleLines () {
    return this.ignoredAdvisories
      .filter(it => !this.isReported({
        id: it.id,
      }))
      .map(it => `stale ignore: ${it.id} (${it.package}) is no longer reported; remove it from ${this.Ctor.ignoredAdvisoriesFileName}`)
  }

  /**
   * Build the line summing up the check.
   *
   * @returns {string} Line to print.
   */
  buildSummaryLine () {
    const advisoryCount = this.countAdvisories()
    const metIgnoreCount = this.countMetIgnores()
    const failureCount = this.countFailures()

    return `checked ${advisoryCount} advisory(ies), ${metIgnoreCount} ignored, ${failureCount} failure(s)`
  }

  /**
   * Count the advisories the report names, each once.
   *
   * @returns {number} Number of advisories.
   */
  countAdvisories () {
    return this.collectAdvisoryIds().length
  }

  /**
   * Count the listed advisories that are still reported.
   *
   * @returns {number} Number of advisories.
   */
  countMetIgnores () {
    return this.collectMetIgnores().length
  }

  /**
   * Count the failures.
   *
   * @returns {number} Number of failures.
   */
  countFailures () {
    return this.buildFailureLines().length
  }
}

/**
 * @typedef {{
 *   name: string
 *   severity: string
 *   range: string
 *   title: string
 *   url: string
 * }} AuditAdvisory
 */

/**
 * @typedef {{
 *   error?: *
 *   vulnerabilities?: Record<string, {
 *     via: Array<string | AuditAdvisory>
 *   }>
 * }} AuditReport
 */

/**
 * @typedef {{
 *   id: string
 *   package: string
 *   path: string
 *   reason: string
 *   removeWhen: string
 * }} IgnoredAdvisory
 */

/**
 * @typedef {*} BooleanLike
 */

/**
 * @import {
 *   SpawnSyncReturns,
 * } from 'node:child_process'
 */
