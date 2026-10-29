import NpmAuditGate from '../../../../scripts/stopgap-audit/NpmAuditGate.js'

import IGNORED_ADVISORIES from '../../../../scripts/stopgap-audit/IGNORED_ADVISORIES.js'

import childProcess from 'node:child_process'

describe('NpmAuditGate', () => {
  describe('constructor', () => {
    describe('should keep property', () => {
      describe('#report', () => {
        const cases = [
          {
            input: {
              report: {
                vulnerabilities: {},
              },
            },
            expected: {
              vulnerabilities: {},
            },
          },
          {
            input: {
              report: {
                error: 'error-0002',
              },
            },
            expected: {
              error: 'error-0002',
            },
          },
          {
            input: {
              report: null,
            },
            expected: null,
          },
        ]

        test.each(cases)('report: $input.report', ({ input, expected }) => {
          const args = {
            report: input.report,
            ignoredAdvisories: [], // Neutral value; not under test
          }

          const audit = new NpmAuditGate(args)

          expect(audit)
            .toHaveProperty('report', expected)
        })
      })

      describe('#ignoredAdvisories', () => {
        const cases = [
          {
            input: {
              ignoredAdvisories: [
                {
                  id: 'GHSA-aaaa-aaaa-0001',
                  package: 'package-0001',
                  path: 'alpha-0001 > package-0001',
                  reason: 'reason-0001',
                  removeWhen: 'removeWhen-0001',
                },
              ],
            },
            expected: [
              {
                id: 'GHSA-aaaa-aaaa-0001',
                package: 'package-0001',
                path: 'alpha-0001 > package-0001',
                reason: 'reason-0001',
                removeWhen: 'removeWhen-0001',
              },
            ],
          },
          {
            input: {
              ignoredAdvisories: [
                {
                  id: 'GHSA-aaaa-aaaa-0002',
                  package: 'package-0002',
                  path: 'alpha-0002 > package-0002',
                  reason: 'reason-0002',
                  removeWhen: 'removeWhen-0002',
                },
                {
                  id: 'GHSA-aaaa-aaaa-0003',
                  package: 'package-0003',
                  path: 'alpha-0003 > package-0003',
                  reason: 'reason-0003',
                  removeWhen: 'removeWhen-0003',
                },
              ],
            },
            expected: [
              {
                id: 'GHSA-aaaa-aaaa-0002',
                package: 'package-0002',
                path: 'alpha-0002 > package-0002',
                reason: 'reason-0002',
                removeWhen: 'removeWhen-0002',
              },
              {
                id: 'GHSA-aaaa-aaaa-0003',
                package: 'package-0003',
                path: 'alpha-0003 > package-0003',
                reason: 'reason-0003',
                removeWhen: 'removeWhen-0003',
              },
            ],
          },
          {
            input: {
              ignoredAdvisories: [],
            },
            expected: [],
          },
        ]

        test.each(cases)('ignoredAdvisories: $input.ignoredAdvisories', ({ input, expected }) => {
          const args = {
            report: null, // Neutral value; not under test
            ignoredAdvisories: input.ignoredAdvisories,
          }

          const audit = new NpmAuditGate(args)

          expect(audit)
            .toHaveProperty('ignoredAdvisories', expected)
        })
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('.create()', () => {
    describe('should be an instance of own class', () => {
      const cases = [
        {
          input: {
            report: {
              vulnerabilities: {},
            },
            ignoredAdvisories: [],
          },
        },
        {
          input: {
            report: null,
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0001',
                package: 'package-0001',
                path: 'alpha-0001 > package-0001',
                reason: 'reason-0001',
                removeWhen: 'removeWhen-0001',
              },
            ],
          },
        },
      ]

      test.each(cases)('report: $input.report', ({ input }) => {
        const received = NpmAuditGate.create(input)

        expect(received)
          .toBeInstanceOf(NpmAuditGate)
      })
    })

    describe('should call constructor', () => {
      const cases = [
        {
          tally: {
            report: {
              vulnerabilities: {},
            },
            ignoredAdvisories: [],
          },
        },
        {
          tally: {
            report: null,
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0002',
                package: 'package-0002',
                path: 'alpha-0002 > package-0002',
                reason: 'reason-0002',
                removeWhen: 'removeWhen-0002',
              },
            ],
          },
        },
      ]

      test.each(cases)('report: $tally.report', ({ tally }) => {
        const SpyClass = constructorSpy.spyOn(NpmAuditGate)

        SpyClass.create(tally)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(tally)
      })
    })

    describe('should fill default value', () => {
      const cases = [
        {
          override: {
            report: {
              vulnerabilities: {},
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0003',
                package: 'package-0003',
                path: 'alpha-0003 > package-0003',
                reason: 'reason-0003',
                removeWhen: 'removeWhen-0003',
              },
            ],
          },
          input: {
            report: {
              error: 'error-0004',
            },
            // ignoredAdvisories: omitted → taken from the list
          },
          expected: {
            report: {
              error: 'error-0004',
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0003',
                package: 'package-0003',
                path: 'alpha-0003 > package-0003',
                reason: 'reason-0003',
                removeWhen: 'removeWhen-0003',
              },
            ],
          },
        },
        {
          override: {
            report: {
              vulnerabilities: {},
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0005',
                package: 'package-0005',
                path: 'alpha-0005 > package-0005',
                reason: 'reason-0005',
                removeWhen: 'removeWhen-0005',
              },
            ],
          },
          input: {
            // report: omitted → fetched from npm audit
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0006',
                package: 'package-0006',
                path: 'alpha-0006 > package-0006',
                reason: 'reason-0006',
                removeWhen: 'removeWhen-0006',
              },
            ],
          },
          expected: {
            report: {
              vulnerabilities: {},
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0006',
                package: 'package-0006',
                path: 'alpha-0006 > package-0006',
                reason: 'reason-0006',
                removeWhen: 'removeWhen-0006',
              },
            ],
          },
        },
        {
          override: {
            report: {
              error: 'error-0007',
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0007',
                package: 'package-0007',
                path: 'alpha-0007 > package-0007',
                reason: 'reason-0007',
                removeWhen: 'removeWhen-0007',
              },
            ],
          },
          input: {
            // report: omitted → fetched from npm audit
            // ignoredAdvisories: omitted → taken from the list
          },
          expected: {
            report: {
              error: 'error-0007',
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0007',
                package: 'package-0007',
                path: 'alpha-0007 > package-0007',
                reason: 'reason-0007',
                removeWhen: 'removeWhen-0007',
              },
            ],
          },
        },
      ]

      test.each(cases)('report: $expected.report, ignoredAdvisories: $expected.ignoredAdvisories', ({ override, input, expected }) => {
        jest.spyOn(NpmAuditGate, 'fetchAuditReport')
          .mockReturnValue(override.report)
        jest.spyOn(NpmAuditGate, 'ignoredAdvisories', 'get')
          .mockReturnValue(override.ignoredAdvisories)

        const SpyClass = constructorSpy.spyOn(NpmAuditGate)

        SpyClass.create(input)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('.get:childProcess', () => {
    describe('when called as is', () => {
      test('should be node:child_process module', () => {
        const received = NpmAuditGate.childProcess

        expect(received)
          .toBe(childProcess) // same reference
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('.get:stdout', () => {
    describe('when called as is', () => {
      test('should be standard output stream', () => {
        const received = NpmAuditGate.stdout

        expect(received)
          .toBe(process.stdout) // same reference
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('.get:stderr', () => {
    describe('when called as is', () => {
      test('should be standard error stream', () => {
        const received = NpmAuditGate.stderr

        expect(received)
          .toBe(process.stderr) // same reference
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('.get:ignoredAdvisories', () => {
    describe('when called as is', () => {
      test('should be the list of the data module', () => {
        const received = NpmAuditGate.ignoredAdvisories

        expect(received)
          .toBe(IGNORED_ADVISORIES) // same reference
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('.get:ignoredAdvisoriesFileName', () => {
    describe('when called as is', () => {
      test('should be fixed value', () => {
        const received = NpmAuditGate.ignoredAdvisoriesFileName

        expect(received)
          .toBe('IGNORED_ADVISORIES.js')
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('.get:advisoryIdPattern', () => {
    describe('when called as is', () => {
      test('should be fixed value', () => {
        const received = NpmAuditGate.advisoryIdPattern

        expect(received)
          .toEqual(/(?<id>GHSA(?:-[0-9a-z]{4}){3})$/u)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('.get:maxAuditOutputBytes', () => {
    describe('when called as is', () => {
      test('should be fixed value', () => {
        const received = NpmAuditGate.maxAuditOutputBytes

        expect(received)
          .toBe(67108864) // 64 * 1024 * 1024
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('.fetchAuditReport()', () => {
    describe('should return the report npm printed', () => {
      const cases = [
        {
          override: {
            auditResult: {
              stdout: '{"vulnerabilities":{"package-0001":{"via":[]}}}',
              stderr: '',
            },
          },
          expected: {
            vulnerabilities: {
              'package-0001': {
                via: [],
              },
            },
          },
        },
        {
          override: {
            auditResult: {
              stdout: '{"error":{"code":"E-0002"}}',
              stderr: '',
            },
          },
          expected: {
            error: {
              code: 'E-0002',
            },
          },
        },
        {
          override: {
            auditResult: {
              stdout: 'null',
              stderr: '',
            },
          },
          expected: null,
        },
      ]

      test.each(cases)('stdout: $override.auditResult.stdout', ({ override, expected }) => {
        jest.spyOn(NpmAuditGate, 'invokeNpmAudit')
          .mockReturnValue(override.auditResult)

        const received = NpmAuditGate.fetchAuditReport()

        expect(received)
          .toEqual(expected)
      })
    })

    describe('should write the stderr of npm and return null when stdout is not JSON', () => {
      const cases = [
        {
          override: {
            auditResult: {
              stdout: 'not-json-0001',
              stderr: 'stderr-0001',
            },
          },
          expected: {
            text: 'stderr-0001',
          },
        },
        {
          override: {
            auditResult: {
              stdout: '',
              stderr: 'stderr-0002',
            },
          },
          expected: {
            text: 'stderr-0002',
          },
        },
      ]

      test.each(cases)('stdout: $override.auditResult.stdout', ({ override, expected }) => {
        jest.spyOn(NpmAuditGate, 'invokeNpmAudit')
          .mockReturnValue(override.auditResult)
        const invokeWriteStderrSpy = jest.spyOn(NpmAuditGate, 'invokeWriteStderr')
          .mockImplementation(() => {})

        const received = NpmAuditGate.fetchAuditReport()

        expect(received)
          .toBeNull()
        expect(invokeWriteStderrSpy)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('.invokeNpmAudit()', () => {
    describe('should call childProcess.spawnSync()', () => {
      test('with npm audit --json', () => {
        const expected = [
          'npm',
          [
            'audit',
            '--json',
          ],
          {
            encoding: 'utf8',
            maxBuffer: 67108864, // 64 * 1024 * 1024
          },
        ]

        const spawnSyncSpy = jest.spyOn(childProcess, 'spawnSync')
          .mockReturnValue({
            stdout: '{}',
            stderr: '',
          })

        NpmAuditGate.invokeNpmAudit()

        expect(spawnSyncSpy)
          .toHaveBeenCalledWith(...expected)
      })
    })

    describe('should return what childProcess.spawnSync() returns', () => {
      const alphaAuditResult = {
        stdout: '{"vulnerabilities":{}}',
        stderr: 'stderr-0001',
      }
      const betaAuditResult = {
        stdout: '{"error":{"code":"E-0002"}}',
        stderr: 'stderr-0002',
      }

      const cases = [
        {
          override: {
            auditResult: alphaAuditResult,
          },
          expected: alphaAuditResult,
        },
        {
          override: {
            auditResult: betaAuditResult,
          },
          expected: betaAuditResult,
        },
      ]

      test.each(cases)('stdout: $override.auditResult.stdout', ({ override, expected }) => {
        jest.spyOn(childProcess, 'spawnSync')
          .mockReturnValue(override.auditResult)

        const received = NpmAuditGate.invokeNpmAudit()

        expect(received)
          .toBe(expected) // same reference
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('.invokeWriteStderr()', () => {
    describe('should delegate to process.stderr.write()', () => {
      const cases = [
        {
          override: {
            accepted: true,
          },
          input: {
            text: 'text-0001',
          },
          expected: {
            text: 'text-0001',
            accepted: true,
          },
        },
        {
          override: {
            accepted: false,
          },
          input: {
            text: 'text-0002',
          },
          expected: {
            text: 'text-0002',
            accepted: false,
          },
        },
      ]

      test.each(cases)('text: $input.text', ({ override, input, expected }) => {
        const writeSpy = jest.spyOn(process.stderr, 'write')
          .mockReturnValue(override.accepted)

        const received = NpmAuditGate.invokeWriteStderr(input)

        expect(received)
          .toBe(expected.accepted)
        expect(writeSpy)
          .toHaveBeenCalledWith(expected.text)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('.extractAdvisoryId()', () => {
    describe('should extract the GHSA id at the end of the url', () => {
      const cases = [
        {
          input: {
            advisory: {
              url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0001',
            },
          },
          expected: 'GHSA-aaaa-aaaa-0001',
        },
        {
          input: {
            advisory: {
              url: 'https://example.com/security/GHSA-bbbb-bbbb-0002',
            },
          },
          expected: 'GHSA-bbbb-bbbb-0002',
        },
        {
          input: {
            advisory: {
              url: 'GHSA-cccc-cccc-0003',
            },
          },
          expected: 'GHSA-cccc-cccc-0003',
        },
      ]

      test.each(cases)('url: $input.advisory.url', ({ input, expected }) => {
        const received = NpmAuditGate.extractAdvisoryId(input)

        expect(received)
          .toBe(expected)
      })
    })

    describe('should fall back to the whole url where it carries no GHSA id at the end', () => {
      const cases = [
        {
          input: {
            advisory: {
              url: 'https://example.com/advisory/alpha-0001',
            },
          },
          expected: 'https://example.com/advisory/alpha-0001',
        },
        {
          input: {
            advisory: {
              url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0002/details', // the id is not at the end
            },
          },
          expected: 'https://github.com/advisories/GHSA-aaaa-aaaa-0002/details',
        },
        {
          input: {
            advisory: {
              url: 'https://github.com/advisories/GHSA-AAAA-AAAA-0003', // the id is upper case
            },
          },
          expected: 'https://github.com/advisories/GHSA-AAAA-AAAA-0003',
        },
      ]

      test.each(cases)('url: $input.advisory.url', ({ input, expected }) => {
        const received = NpmAuditGate.extractAdvisoryId(input)

        expect(received)
          .toBe(expected)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('.invokeWriteStdout()', () => {
    describe('should delegate to process.stdout.write()', () => {
      const cases = [
        {
          override: {
            accepted: true,
          },
          input: {
            text: 'text-0001',
          },
          expected: {
            text: 'text-0001',
            accepted: true,
          },
        },
        {
          override: {
            accepted: false,
          },
          input: {
            text: 'text-0002',
          },
          expected: {
            text: 'text-0002',
            accepted: false,
          },
        },
      ]

      test.each(cases)('text: $input.text', ({ override, input, expected }) => {
        const writeSpy = jest.spyOn(process.stdout, 'write')
          .mockReturnValue(override.accepted)

        const received = NpmAuditGate.invokeWriteStdout(input)

        expect(received)
          .toBe(expected.accepted)
        expect(writeSpy)
          .toHaveBeenCalledWith(expected.text)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#get:Ctor', () => {
    class AlphaNpmAuditGate extends NpmAuditGate {}

    class BetaNpmAuditGate extends NpmAuditGate {}

    describe('should be constructor of instance', () => {
      const cases = [
        {
          input: {
            AuditCtor: NpmAuditGate,
          },
          expected: NpmAuditGate,
        },
        {
          input: {
            AuditCtor: AlphaNpmAuditGate,
          },
          expected: AlphaNpmAuditGate,
        },
        {
          input: {
            AuditCtor: BetaNpmAuditGate,
          },
          expected: BetaNpmAuditGate,
        },
      ]

      test.each(cases)('AuditCtor: $input.AuditCtor.name', ({ input, expected }) => {
        const args = {
          report: null, // Neutral value; not under test
          ignoredAdvisories: [], // Neutral value; not under test
        }

        const audit = input.AuditCtor.create(args)

        const received = audit.Ctor

        expect(received)
          .toBe(expected) // same reference
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#auditAdvisories()', () => {
    describe('when the report is not usable', () => {
      const cases = [
        {
          override: {
            noReportMessage: 'noReportMessage-0001',
          },
          expected: {
            exitCode: 1,
            stderr: {
              text: 'noReportMessage-0001\n',
            },
          },
        },
        {
          override: {
            noReportMessage: 'noReportMessage-0002',
          },
          expected: {
            exitCode: 1,
            stderr: {
              text: 'noReportMessage-0002\n',
            },
          },
        },
      ]

      test.each(cases)('noReportMessage: $override.noReportMessage', ({ override, expected }) => {
        const args = {
          report: null, // Neutral value; the judging members are stubbed below
          ignoredAdvisories: [], // Neutral value; the judging members are stubbed below
        }
        const audit = NpmAuditGate.create(args)
        jest.spyOn(audit, 'hasUsableReport')
          .mockReturnValue(false)
        jest.spyOn(audit, 'buildNoReportMessage')
          .mockReturnValue(override.noReportMessage)

        const invokeWriteStderrSpy = jest.spyOn(NpmAuditGate, 'invokeWriteStderr')
          .mockImplementation(() => {})
        const invokeWriteStdoutSpy = jest.spyOn(NpmAuditGate, 'invokeWriteStdout')
          .mockImplementation(() => {})

        const received = audit.auditAdvisories()

        expect(received)
          .toBe(expected.exitCode)
        expect(invokeWriteStderrSpy)
          .toHaveBeenCalledWith(expected.stderr)
        expect(invokeWriteStdoutSpy)
          .not
          .toHaveBeenCalled()
      })
    })

    describe('when the report is usable and nothing fails', () => {
      const cases = [
        {
          override: {
            ignoredLines: [
              'ignoredLine-0001',
              'ignoredLine-0002',
            ],
            failureLines: [],
            summaryLine: 'summaryLine-0001',
            failureCount: 0,
          },
          expected: {
            exitCode: 0,
            stdout: [
              [{ text: 'ignoredLine-0001\n' }],
              [{ text: 'ignoredLine-0002\n' }],
              [{ text: 'summaryLine-0001\n' }],
            ],
          },
        },
        {
          override: {
            ignoredLines: [
              'ignoredLine-0003',
              'ignoredLine-0004',
            ],
            failureLines: [],
            summaryLine: 'summaryLine-0002',
            failureCount: 0,
          },
          expected: {
            exitCode: 0,
            stdout: [
              [{ text: 'ignoredLine-0003\n' }],
              [{ text: 'ignoredLine-0004\n' }],
              [{ text: 'summaryLine-0002\n' }],
            ],
          },
        },
      ]

      test.each(cases)('summaryLine: $override.summaryLine', ({ override, expected }) => {
        const args = {
          report: null, // Neutral value; the judging members are stubbed below
          ignoredAdvisories: [], // Neutral value; the judging members are stubbed below
        }
        const audit = NpmAuditGate.create(args)
        jest.spyOn(audit, 'hasUsableReport')
          .mockReturnValue(true)
        jest.spyOn(audit, 'buildIgnoredLines')
          .mockReturnValue(override.ignoredLines)
        jest.spyOn(audit, 'buildFailureLines')
          .mockReturnValue(override.failureLines)
        jest.spyOn(audit, 'buildSummaryLine')
          .mockReturnValue(override.summaryLine)
        jest.spyOn(audit, 'countFailures')
          .mockReturnValue(override.failureCount)

        const invokeWriteStderrSpy = jest.spyOn(NpmAuditGate, 'invokeWriteStderr')
          .mockImplementation(() => {})
        const invokeWriteStdoutSpy = jest.spyOn(NpmAuditGate, 'invokeWriteStdout')
          .mockImplementation(() => {})

        const received = audit.auditAdvisories()

        const [firstCall, secondCall, thirdCall] = expected.stdout

        expect(received)
          .toBe(expected.exitCode)
        expect(invokeWriteStdoutSpy)
          .toHaveBeenNthCalledWith(1, ...firstCall)
        expect(invokeWriteStdoutSpy)
          .toHaveBeenNthCalledWith(2, ...secondCall)
        expect(invokeWriteStdoutSpy)
          .toHaveBeenNthCalledWith(3, ...thirdCall)
        expect(invokeWriteStdoutSpy)
          .toHaveBeenCalledTimes(3)
        expect(invokeWriteStderrSpy)
          .not
          .toHaveBeenCalled()
      })
    })

    describe('when the report is usable and failures are found', () => {
      const cases = [
        {
          override: {
            ignoredLines: [],
            failureLines: [
              'failureLine-0001',
              'failureLine-0002',
            ],
            summaryLine: 'summaryLine-0003',
            failureCount: 2,
          },
          expected: {
            exitCode: 1,
            stdout: [
              [{ text: 'summaryLine-0003\n' }],
            ],
            stderr: [
              [{ text: 'failureLine-0001\n' }],
              [{ text: 'failureLine-0002\n' }],
            ],
          },
        },
        {
          override: {
            ignoredLines: [],
            failureLines: [
              'failureLine-0003',
              'failureLine-0004',
            ],
            summaryLine: 'summaryLine-0004',
            failureCount: 2,
          },
          expected: {
            exitCode: 1,
            stdout: [
              [{ text: 'summaryLine-0004\n' }],
            ],
            stderr: [
              [{ text: 'failureLine-0003\n' }],
              [{ text: 'failureLine-0004\n' }],
            ],
          },
        },
      ]

      test.each(cases)('summaryLine: $override.summaryLine', ({ override, expected }) => {
        const args = {
          report: null, // Neutral value; the judging members are stubbed below
          ignoredAdvisories: [], // Neutral value; the judging members are stubbed below
        }
        const audit = NpmAuditGate.create(args)
        jest.spyOn(audit, 'hasUsableReport')
          .mockReturnValue(true)
        jest.spyOn(audit, 'buildIgnoredLines')
          .mockReturnValue(override.ignoredLines)
        jest.spyOn(audit, 'buildFailureLines')
          .mockReturnValue(override.failureLines)
        jest.spyOn(audit, 'buildSummaryLine')
          .mockReturnValue(override.summaryLine)
        jest.spyOn(audit, 'countFailures')
          .mockReturnValue(override.failureCount)

        const invokeWriteStderrSpy = jest.spyOn(NpmAuditGate, 'invokeWriteStderr')
          .mockImplementation(() => {})
        const invokeWriteStdoutSpy = jest.spyOn(NpmAuditGate, 'invokeWriteStdout')
          .mockImplementation(() => {})

        const received = audit.auditAdvisories()

        const [summaryCall] = expected.stdout
        const [firstFailureCall, secondFailureCall] = expected.stderr

        expect(received)
          .toBe(expected.exitCode)
        expect(invokeWriteStdoutSpy)
          .toHaveBeenNthCalledWith(1, ...summaryCall)
        expect(invokeWriteStdoutSpy)
          .toHaveBeenCalledTimes(1)
        expect(invokeWriteStderrSpy)
          .toHaveBeenNthCalledWith(1, ...firstFailureCall)
        expect(invokeWriteStderrSpy)
          .toHaveBeenNthCalledWith(2, ...secondFailureCall)
        expect(invokeWriteStderrSpy)
          .toHaveBeenCalledTimes(2)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#hasUsableReport()', () => {
    describe('should be truthy', () => {
      const cases = [
        {
          input: {
            report: {
              vulnerabilities: {},
            },
          },
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0001': {
                  via: [],
                },
              },
            },
          },
        },
      ]

      test.each(cases)('report: $input.report', ({ input }) => {
        const args = {
          report: input.report,
          ignoredAdvisories: [], // Neutral value; not under test
        }
        const audit = NpmAuditGate.create(args)

        const received = audit.hasUsableReport()

        expect(received)
          .toBeTruthy()
      })
    })

    describe('should be falsy', () => {
      const cases = [
        {
          input: {
            report: null,
          },
        },
        {
          input: {
            report: {
              error: {
                code: 'E-0001',
              },
            },
          },
        },
        {
          input: {
            report: {}, // vulnerabilities: omitted
          },
        },
        {
          input: {
            report: {
              error: 'error-0003',
              vulnerabilities: {
                'package-0003': {
                  via: [],
                },
              },
            },
          },
        },
      ]

      test.each(cases)('report: $input.report', ({ input }) => {
        const args = {
          report: input.report,
          ignoredAdvisories: [], // Neutral value; not under test
        }
        const audit = NpmAuditGate.create(args)

        const received = audit.hasUsableReport()

        expect(received)
          .toBeFalsy()
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#buildNoReportMessage()', () => {
    describe('should state what npm answered', () => {
      const cases = [
        {
          input: {
            report: {
              error: {
                code: 'E-0001',
              },
            },
          },
          expected: 'npm audit answered with no report, so nothing was checked: {"code":"E-0001"}',
        },
        {
          input: {
            report: {
              error: 'error-0002',
            },
          },
          expected: 'npm audit answered with no report, so nothing was checked: "error-0002"',
        },
        {
          input: {
            report: {
              vulnerabilities: {}, // error: omitted
            },
          },
          expected: 'npm audit answered with no report, so nothing was checked: null',
        },
        {
          input: {
            report: null,
          },
          expected: 'npm audit answered with no report, so nothing was checked: null',
        },
      ]

      test.each(cases)('report: $input.report', ({ input, expected }) => {
        const args = {
          report: input.report,
          ignoredAdvisories: [], // Neutral value; not under test
        }
        const audit = NpmAuditGate.create(args)

        const received = audit.buildNoReportMessage()

        expect(received)
          .toBe(expected)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#buildIgnoredLines()', () => {
    describe('should name each listed advisory that is still reported', () => {
      const cases = [
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0001': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0001' },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0001',
                package: 'package-0001',
                path: 'alpha-0001 > package-0001',
                reason: 'reason-0001',
                removeWhen: 'removeWhen-0001',
              },
            ],
          },
          expected: [
            'ignored (stopgap): GHSA-aaaa-aaaa-0001 (package-0001) via alpha-0001 > package-0001',
            '  reason: reason-0001',
            '  remove when: removeWhen-0001',
          ],
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0002': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0002' },
                  ],
                },
                'package-0003': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003' },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0003',
                package: 'package-0003',
                path: 'alpha-0003 > package-0003',
                reason: 'reason-0003',
                removeWhen: 'removeWhen-0003',
              },
              {
                id: 'GHSA-aaaa-aaaa-0002',
                package: 'package-0002',
                path: 'alpha-0002 > package-0002',
                reason: 'reason-0002',
                removeWhen: 'removeWhen-0002',
              },
            ],
          },
          expected: [
            'ignored (stopgap): GHSA-aaaa-aaaa-0003 (package-0003) via alpha-0003 > package-0003',
            '  reason: reason-0003',
            '  remove when: removeWhen-0003',
            'ignored (stopgap): GHSA-aaaa-aaaa-0002 (package-0002) via alpha-0002 > package-0002',
            '  reason: reason-0002',
            '  remove when: removeWhen-0002',
          ],
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0004': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0004' },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0004',
                package: 'package-0004',
                path: 'alpha-0004 > package-0004',
                reason: 'reason-0004',
                removeWhen: 'removeWhen-0004',
              },
              {
                id: 'GHSA-zzzz-zzzz-0009',
                package: 'package-0009',
                path: 'alpha-0009 > package-0009',
                reason: 'reason-0009',
                removeWhen: 'removeWhen-0009',
              },
            ],
          },
          expected: [
            'ignored (stopgap): GHSA-aaaa-aaaa-0004 (package-0004) via alpha-0004 > package-0004',
            '  reason: reason-0004',
            '  remove when: removeWhen-0004',
          ],
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0005': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0005' },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-zzzz-zzzz-0009',
                package: 'package-0009',
                path: 'alpha-0009 > package-0009',
                reason: 'reason-0009',
                removeWhen: 'removeWhen-0009',
              },
            ],
          },
          expected: [],
        },
      ]

      test.each(cases)('report: $input.report', ({ input, expected }) => {
        const audit = NpmAuditGate.create(input)

        const received = audit.buildIgnoredLines()

        expect(received)
          .toEqual(expected)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#collectMetIgnores()', () => {
    describe('should collect each listed advisory that is still reported', () => {
      const cases = [
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0001': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0001' },
                  ],
                },
                'package-0002': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0002' },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0002',
                package: 'package-0002',
                path: 'alpha-0002 > package-0002',
                reason: 'reason-0002',
                removeWhen: 'removeWhen-0002',
              },
              {
                id: 'GHSA-aaaa-aaaa-0001',
                package: 'package-0001',
                path: 'alpha-0001 > package-0001',
                reason: 'reason-0001',
                removeWhen: 'removeWhen-0001',
              },
            ],
          },
          expected: [
            {
              id: 'GHSA-aaaa-aaaa-0002',
              package: 'package-0002',
              path: 'alpha-0002 > package-0002',
              reason: 'reason-0002',
              removeWhen: 'removeWhen-0002',
            },
            {
              id: 'GHSA-aaaa-aaaa-0001',
              package: 'package-0001',
              path: 'alpha-0001 > package-0001',
              reason: 'reason-0001',
              removeWhen: 'removeWhen-0001',
            },
          ],
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0003': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003' },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0003',
                package: 'package-0003',
                path: 'alpha-0003 > package-0003',
                reason: 'reason-0003',
                removeWhen: 'removeWhen-0003',
              },
              {
                id: 'GHSA-zzzz-zzzz-0009',
                package: 'package-0009',
                path: 'alpha-0009 > package-0009',
                reason: 'reason-0009',
                removeWhen: 'removeWhen-0009',
              },
            ],
          },
          expected: [
            {
              id: 'GHSA-aaaa-aaaa-0003',
              package: 'package-0003',
              path: 'alpha-0003 > package-0003',
              reason: 'reason-0003',
              removeWhen: 'removeWhen-0003',
            },
          ],
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0004': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0004' },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-zzzz-zzzz-0009',
                package: 'package-0009',
                path: 'alpha-0009 > package-0009',
                reason: 'reason-0009',
                removeWhen: 'removeWhen-0009',
              },
            ],
          },
          expected: [],
        },
      ]

      test.each(cases)('report: $input.report', ({ input, expected }) => {
        const audit = NpmAuditGate.create(input)

        const received = audit.collectMetIgnores()

        expect(received)
          .toEqual(expected)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#isReported()', () => {
    const cases = [
      {
        input: {
          report: {
            vulnerabilities: {
              'package-0001': {
                via: [
                  { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0001' },
                ],
              },
              'package-0002': {
                via: [
                  'package-0001',
                  { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0002' },
                ],
              },
            },
          },
          ignoredAdvisories: [], // Neutral value; not under test
        },
        truthyCases: [
          { id: 'GHSA-aaaa-aaaa-0001' },
          { id: 'GHSA-aaaa-aaaa-0002' },
        ],
        falsyCases: [
          { id: 'GHSA-aaaa-aaaa-0003' },
          { id: 'GHSA-AAAA-AAAA-0001' },
        ],
      },
      {
        input: {
          report: {
            vulnerabilities: {
              'package-0003': {
                via: [
                  { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003' },
                  { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0004' },
                ],
              },
            },
          },
          ignoredAdvisories: [], // Neutral value; not under test
        },
        truthyCases: [
          { id: 'GHSA-aaaa-aaaa-0003' },
          { id: 'GHSA-aaaa-aaaa-0004' },
        ],
        falsyCases: [
          { id: 'GHSA-aaaa-aaaa-0001' },
          { id: 'package-0003' },
        ],
      },
    ]

    describe.each(cases)('report: $input.report', ({ input, truthyCases, falsyCases }) => {
      const audit = NpmAuditGate.create(input)

      describe('should be truthy', () => {
        test.each(truthyCases)('id: $id', ({ id }) => {
          const args = {
            id,
          }

          const received = audit.isReported(args)

          expect(received)
            .toBeTruthy()
        })
      })

      describe('should be falsy', () => {
        test.each(falsyCases)('id: $id', ({ id }) => {
          const args = {
            id,
          }

          const received = audit.isReported(args)

          expect(received)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#collectAdvisoryIds()', () => {
    describe('should collect each id once, in the order they first appear', () => {
      const cases = [
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0001': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0001' },
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0002' },
                  ],
                },
              },
            },
          },
          expected: [
            'GHSA-aaaa-aaaa-0001',
            'GHSA-aaaa-aaaa-0002',
          ],
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0003': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003' },
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0004' },
                  ],
                },
                'package-0004': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0004' },
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003' },
                  ],
                },
              },
            },
          },
          expected: [
            'GHSA-aaaa-aaaa-0003',
            'GHSA-aaaa-aaaa-0004',
          ],
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0005': {
                  via: [
                    { url: 'https://example.com/advisory/alpha-0005' },
                  ],
                },
              },
            },
          },
          expected: [
            'https://example.com/advisory/alpha-0005',
          ],
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0006': {
                  via: [
                    'package-0005',
                  ],
                },
              },
            },
          },
          expected: [],
        },
      ]

      test.each(cases)('report: $input.report', ({ input, expected }) => {
        const args = {
          report: input.report,
          ignoredAdvisories: [], // Neutral value; not under test
        }
        const audit = NpmAuditGate.create(args)

        const received = audit.collectAdvisoryIds()

        expect(received)
          .toEqual(expected)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#collectAdvisories()', () => {
    describe('should collect the advisories of every vulnerability, as often as they are named', () => {
      const cases = [
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0001': {
                  via: [
                    'package-0002',
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0001' },
                  ],
                },
              },
            },
          },
          expected: [
            { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0001' },
          ],
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0003': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003' },
                  ],
                },
                'package-0004': {
                  via: [
                    'package-0003',
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003' },
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0004' },
                  ],
                },
              },
            },
          },
          expected: [
            { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003' },
            { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003' },
            { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0004' },
          ],
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0005': {
                  via: [
                    'package-0006',
                    'package-0007',
                  ],
                },
              },
            },
          },
          expected: [],
        },
      ]

      test.each(cases)('report: $input.report', ({ input, expected }) => {
        const args = {
          report: input.report,
          ignoredAdvisories: [], // Neutral value; not under test
        }
        const audit = NpmAuditGate.create(args)

        const received = audit.collectAdvisories()

        expect(received)
          .toEqual(expected)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#buildFailureLines()', () => {
    describe('should name the unignored advisories first, then the stale ones', () => {
      const cases = [
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0001': {
                  via: [
                    {
                      name: 'package-0001',
                      severity: 'low',
                      range: '>=1.0.1 <=1.0.2',
                      title: 'title-0001',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0001',
                    },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-zzzz-zzzz-0009',
                package: 'package-0009',
                path: 'alpha-0009 > package-0009',
                reason: 'reason-0009',
                removeWhen: 'removeWhen-0009',
              },
            ],
          },
          expected: [
            'not ignored: GHSA-aaaa-aaaa-0001 low package-0001 >=1.0.1 <=1.0.2 — title-0001',
            'stale ignore: GHSA-zzzz-zzzz-0009 (package-0009) is no longer reported; remove it from IGNORED_ADVISORIES.js',
          ],
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0002': {
                  via: [
                    {
                      name: 'package-0002',
                      severity: 'high',
                      range: '>=2.0.1 <=2.0.2',
                      title: 'title-0002',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0002',
                    },
                    {
                      name: 'package-0003',
                      severity: 'moderate',
                      range: '>=3.0.1 <=3.0.2',
                      title: 'title-0003',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003',
                    },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0002',
                package: 'package-0002',
                path: 'alpha-0002 > package-0002',
                reason: 'reason-0002',
                removeWhen: 'removeWhen-0002',
              },
            ],
          },
          expected: [
            'not ignored: GHSA-aaaa-aaaa-0003 moderate package-0003 >=3.0.1 <=3.0.2 — title-0003',
          ],
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0004': {
                  via: [
                    {
                      name: 'package-0004',
                      severity: 'critical',
                      range: '>=4.0.1 <=4.0.2',
                      title: 'title-0004',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0004',
                    },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0004',
                package: 'package-0004',
                path: 'alpha-0004 > package-0004',
                reason: 'reason-0004',
                removeWhen: 'removeWhen-0004',
              },
            ],
          },
          expected: [],
        },
      ]

      test.each(cases)('report: $input.report', ({ input, expected }) => {
        const audit = NpmAuditGate.create(input)

        const received = audit.buildFailureLines()

        expect(received)
          .toEqual(expected)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#buildUnignoredLines()', () => {
    describe('should name each reported advisory the list does not name', () => {
      const cases = [
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0001': {
                  via: [
                    {
                      name: 'package-0001',
                      severity: 'low',
                      range: '>=1.0.1 <=1.0.2',
                      title: 'title-0001',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0001',
                    },
                    {
                      name: 'package-0002',
                      severity: 'high',
                      range: '>=2.0.1 <=2.0.2',
                      title: 'title-0002',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0002',
                    },
                  ],
                },
              },
            },
            ignoredAdvisories: [],
          },
          expected: [
            'not ignored: GHSA-aaaa-aaaa-0001 low package-0001 >=1.0.1 <=1.0.2 — title-0001',
            'not ignored: GHSA-aaaa-aaaa-0002 high package-0002 >=2.0.1 <=2.0.2 — title-0002',
          ],
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0003': {
                  via: [
                    {
                      name: 'package-0003',
                      severity: 'moderate',
                      range: '>=3.0.1 <=3.0.2',
                      title: 'title-0003',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003',
                    },
                    {
                      name: 'package-0004',
                      severity: 'critical',
                      range: '>=4.0.1 <=4.0.2',
                      title: 'title-0004',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0004',
                    },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0003',
                package: 'package-0003',
                path: 'alpha-0003 > package-0003',
                reason: 'reason-0003',
                removeWhen: 'removeWhen-0003',
              },
            ],
          },
          expected: [
            'not ignored: GHSA-aaaa-aaaa-0004 critical package-0004 >=4.0.1 <=4.0.2 — title-0004',
          ],
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0005': {
                  via: [
                    {
                      name: 'package-0005',
                      severity: 'low',
                      range: '>=5.0.1 <=5.0.2',
                      title: 'title-0005',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0005',
                    },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0005',
                package: 'package-0005',
                path: 'alpha-0005 > package-0005',
                reason: 'reason-0005',
                removeWhen: 'removeWhen-0005',
              },
            ],
          },
          expected: [],
        },
      ]

      test.each(cases)('report: $input.report', ({ input, expected }) => {
        const audit = NpmAuditGate.create(input)

        const received = audit.buildUnignoredLines()

        expect(received)
          .toEqual(expected)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#isIgnored()', () => {
    const cases = [
      {
        input: {
          report: null, // Neutral value; not under test
          ignoredAdvisories: [
            {
              id: 'GHSA-aaaa-aaaa-0001',
              package: 'package-0001',
              path: 'alpha-0001 > package-0001',
              reason: 'reason-0001',
              removeWhen: 'removeWhen-0001',
            },
            {
              id: 'GHSA-aaaa-aaaa-0002',
              package: 'package-0002',
              path: 'alpha-0002 > package-0002',
              reason: 'reason-0002',
              removeWhen: 'removeWhen-0002',
            },
          ],
        },
        truthyCases: [
          { id: 'GHSA-aaaa-aaaa-0001' },
          { id: 'GHSA-aaaa-aaaa-0002' },
        ],
        falsyCases: [
          { id: 'GHSA-aaaa-aaaa-0003' },
          { id: 'GHSA-AAAA-AAAA-0001' },
        ],
      },
      {
        input: {
          report: null, // Neutral value; not under test
          ignoredAdvisories: [
            {
              id: 'GHSA-aaaa-aaaa-0004',
              package: 'package-0004',
              path: 'alpha-0004 > package-0004',
              reason: 'reason-0004',
              removeWhen: 'removeWhen-0004',
            },
            {
              id: 'GHSA-aaaa-aaaa-0005',
              package: 'package-0005',
              path: 'alpha-0005 > package-0005',
              reason: 'reason-0005',
              removeWhen: 'removeWhen-0005',
            },
          ],
        },
        truthyCases: [
          { id: 'GHSA-aaaa-aaaa-0004' },
          { id: 'GHSA-aaaa-aaaa-0005' },
        ],
        falsyCases: [
          { id: 'GHSA-aaaa-aaaa-0001' },
          { id: 'package-0004' },
        ],
      },
    ]

    describe.each(cases)('ignoredAdvisories: $input.ignoredAdvisories', ({ input, truthyCases, falsyCases }) => {
      const audit = NpmAuditGate.create(input)

      describe('should be truthy', () => {
        test.each(truthyCases)('id: $id', ({ id }) => {
          const args = {
            id,
          }

          const received = audit.isIgnored(args)

          expect(received)
            .toBeTruthy()
        })
      })

      describe('should be falsy', () => {
        test.each(falsyCases)('id: $id', ({ id }) => {
          const args = {
            id,
          }

          const received = audit.isIgnored(args)

          expect(received)
            .toBeFalsy()
        })
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#buildUnignoredLine()', () => {
    const cases = [
      {
        input: {
          report: {
            vulnerabilities: {
              'package-0001': {
                via: [
                  {
                    name: 'package-0001',
                    severity: 'low',
                    range: '>=1.0.1 <=1.0.2',
                    title: 'title-0001',
                    url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0001',
                  },
                  {
                    name: 'package-0002',
                    severity: 'high',
                    range: '>=2.0.1 <=2.0.2',
                    title: 'title-0002',
                    url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0002',
                  },
                ],
              },
            },
          },
          ignoredAdvisories: [], // Neutral value; not under test
        },
        idCases: [
          {
            id: 'GHSA-aaaa-aaaa-0001',
            expected: 'not ignored: GHSA-aaaa-aaaa-0001 low package-0001 >=1.0.1 <=1.0.2 — title-0001',
          },
          {
            id: 'GHSA-aaaa-aaaa-0002',
            expected: 'not ignored: GHSA-aaaa-aaaa-0002 high package-0002 >=2.0.1 <=2.0.2 — title-0002',
          },
        ],
      },
      {
        input: {
          report: {
            vulnerabilities: {
              'package-0003': {
                via: [
                  {
                    name: 'package-0003',
                    severity: 'moderate',
                    range: '>=3.0.1 <=3.0.2',
                    title: 'title-0003',
                    url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003',
                  },
                ],
              },
              'package-0004': {
                via: [
                  {
                    name: 'package-0004',
                    severity: 'critical',
                    range: '>=4.0.1 <=4.0.2',
                    title: 'title-0004',
                    url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0004',
                  },
                ],
              },
            },
          },
          ignoredAdvisories: [], // Neutral value; not under test
        },
        idCases: [
          {
            id: 'GHSA-aaaa-aaaa-0003',
            expected: 'not ignored: GHSA-aaaa-aaaa-0003 moderate package-0003 >=3.0.1 <=3.0.2 — title-0003',
          },
          {
            id: 'GHSA-aaaa-aaaa-0004',
            expected: 'not ignored: GHSA-aaaa-aaaa-0004 critical package-0004 >=4.0.1 <=4.0.2 — title-0004',
          },
        ],
      },
    ]

    describe.each(cases)('report: $input.report', ({ input, idCases }) => {
      const audit = NpmAuditGate.create(input)

      test.each(idCases)('id: $id', ({ id, expected }) => {
        const args = {
          id,
        }

        const received = audit.buildUnignoredLine(args)

        expect(received)
          .toBe(expected)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#findAdvisory()', () => {
    const cases = [
      {
        input: {
          report: {
            vulnerabilities: {
              'package-0001': {
                via: [
                  {
                    name: 'package-0001',
                    url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0001',
                  },
                  {
                    name: 'package-0002',
                    url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0002',
                  },
                ],
              },
            },
          },
          ignoredAdvisories: [], // Neutral value; not under test
        },
        foundCases: [
          {
            id: 'GHSA-aaaa-aaaa-0001',
            expected: {
              name: 'package-0001',
              url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0001',
            },
          },
          {
            id: 'GHSA-aaaa-aaaa-0002',
            expected: {
              name: 'package-0002',
              url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0002',
            },
          },
        ],
        missingCases: [
          { id: 'GHSA-aaaa-aaaa-0003' },
          { id: 'package-0001' },
        ],
      },
      {
        input: {
          report: {
            vulnerabilities: {
              'package-0003': {
                via: [
                  {
                    name: 'package-0003',
                    title: 'title-0003 first',
                    url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003',
                  },
                ],
              },
              'package-0004': {
                via: [
                  {
                    name: 'package-0004',
                    title: 'title-0004',
                    url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0004',
                  },
                  {
                    name: 'package-0003',
                    title: 'title-0003 last',
                    url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003',
                  },
                ],
              },
            },
          },
          ignoredAdvisories: [], // Neutral value; not under test
        },
        foundCases: [
          {
            id: 'GHSA-aaaa-aaaa-0003', // named twice: the last one is taken
            expected: {
              name: 'package-0003',
              title: 'title-0003 last',
              url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003',
            },
          },
          {
            id: 'GHSA-aaaa-aaaa-0004',
            expected: {
              name: 'package-0004',
              title: 'title-0004',
              url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0004',
            },
          },
        ],
        missingCases: [
          { id: 'GHSA-aaaa-aaaa-0001' },
          { id: 'GHSA-AAAA-AAAA-0003' },
        ],
      },
    ]

    describe.each(cases)('report: $input.report', ({ input, foundCases, missingCases }) => {
      const audit = NpmAuditGate.create(input)

      describe('should find the advisory', () => {
        test.each(foundCases)('id: $id', ({ id, expected }) => {
          const args = {
            id,
          }

          const received = audit.findAdvisory(args)

          expect(received)
            .toEqual(expected)
        })
      })

      describe('when the report names none', () => {
        test.each(missingCases)('id: $id', ({ id }) => {
          const args = {
            id,
          }

          const received = audit.findAdvisory(args)

          expect(received)
            .toBeNull()
        })
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#buildStaleLines()', () => {
    describe('should name each listed advisory that is no longer reported', () => {
      const cases = [
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0001': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0001' },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0001',
                package: 'package-0001',
                path: 'alpha-0001 > package-0001',
                reason: 'reason-0001',
                removeWhen: 'removeWhen-0001',
              },
              {
                id: 'GHSA-zzzz-zzzz-0009',
                package: 'package-0009',
                path: 'alpha-0009 > package-0009',
                reason: 'reason-0009',
                removeWhen: 'removeWhen-0009',
              },
            ],
          },
          expected: [
            'stale ignore: GHSA-zzzz-zzzz-0009 (package-0009) is no longer reported; remove it from IGNORED_ADVISORIES.js',
          ],
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0002': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0002' },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-zzzz-zzzz-0008',
                package: 'package-0008',
                path: 'alpha-0008 > package-0008',
                reason: 'reason-0008',
                removeWhen: 'removeWhen-0008',
              },
              {
                id: 'GHSA-zzzz-zzzz-0007',
                package: 'package-0007',
                path: 'alpha-0007 > package-0007',
                reason: 'reason-0007',
                removeWhen: 'removeWhen-0007',
              },
            ],
          },
          expected: [
            'stale ignore: GHSA-zzzz-zzzz-0008 (package-0008) is no longer reported; remove it from IGNORED_ADVISORIES.js',
            'stale ignore: GHSA-zzzz-zzzz-0007 (package-0007) is no longer reported; remove it from IGNORED_ADVISORIES.js',
          ],
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0003': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003' },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0003',
                package: 'package-0003',
                path: 'alpha-0003 > package-0003',
                reason: 'reason-0003',
                removeWhen: 'removeWhen-0003',
              },
            ],
          },
          expected: [],
        },
      ]

      test.each(cases)('report: $input.report', ({ input, expected }) => {
        const audit = NpmAuditGate.create(input)

        const received = audit.buildStaleLines()

        expect(received)
          .toEqual(expected)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#buildSummaryLine()', () => {
    describe('should sum up advisories, ignores and failures', () => {
      const cases = [
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0001': {
                  via: [
                    {
                      name: 'package-0001',
                      severity: 'low',
                      range: '>=1.0.1 <=1.0.2',
                      title: 'title-0001',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0001',
                    },
                    {
                      name: 'package-0002',
                      severity: 'high',
                      range: '>=2.0.1 <=2.0.2',
                      title: 'title-0002',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0002',
                    },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0001',
                package: 'package-0001',
                path: 'alpha-0001 > package-0001',
                reason: 'reason-0001',
                removeWhen: 'removeWhen-0001',
              },
              {
                id: 'GHSA-zzzz-zzzz-0009',
                package: 'package-0009',
                path: 'alpha-0009 > package-0009',
                reason: 'reason-0009',
                removeWhen: 'removeWhen-0009',
              },
            ],
          },
          expected: 'checked 2 advisory(ies), 1 ignored, 2 failure(s)',
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0003': {
                  via: [
                    {
                      name: 'package-0003',
                      severity: 'moderate',
                      range: '>=3.0.1 <=3.0.2',
                      title: 'title-0003',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003',
                    },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0003',
                package: 'package-0003',
                path: 'alpha-0003 > package-0003',
                reason: 'reason-0003',
                removeWhen: 'removeWhen-0003',
              },
            ],
          },
          expected: 'checked 1 advisory(ies), 1 ignored, 0 failure(s)',
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0004': {
                  via: [
                    {
                      name: 'package-0004',
                      severity: 'critical',
                      range: '>=4.0.1 <=4.0.2',
                      title: 'title-0004',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0004',
                    },
                    {
                      name: 'package-0005',
                      severity: 'low',
                      range: '>=5.0.1 <=5.0.2',
                      title: 'title-0005',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0005',
                    },
                    {
                      name: 'package-0006',
                      severity: 'high',
                      range: '>=6.0.1 <=6.0.2',
                      title: 'title-0006',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0006',
                    },
                  ],
                },
              },
            },
            ignoredAdvisories: [],
          },
          expected: 'checked 3 advisory(ies), 0 ignored, 3 failure(s)',
        },
      ]

      test.each(cases)('report: $input.report', ({ input, expected }) => {
        const audit = NpmAuditGate.create(input)

        const received = audit.buildSummaryLine()

        expect(received)
          .toBe(expected)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#countAdvisories()', () => {
    describe('should count each advisory once', () => {
      const cases = [
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0001': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0001' },
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0002' },
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003' },
                  ],
                },
              },
            },
          },
          expected: 3,
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0004': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0004' },
                  ],
                },
                'package-0005': {
                  via: [
                    'package-0004',
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0004' },
                  ],
                },
              },
            },
          },
          expected: 1,
        },
        {
          input: {
            report: {
              vulnerabilities: {},
            },
          },
          expected: 0,
        },
      ]

      test.each(cases)('report: $input.report', ({ input, expected }) => {
        const args = {
          report: input.report,
          ignoredAdvisories: [], // Neutral value; not under test
        }
        const audit = NpmAuditGate.create(args)

        const received = audit.countAdvisories()

        expect(received)
          .toBe(expected)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#countMetIgnores()', () => {
    describe('should count each listed advisory that is still reported', () => {
      const cases = [
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0001': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0001' },
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0002' },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0001',
                package: 'package-0001',
                path: 'alpha-0001 > package-0001',
                reason: 'reason-0001',
                removeWhen: 'removeWhen-0001',
              },
              {
                id: 'GHSA-aaaa-aaaa-0002',
                package: 'package-0002',
                path: 'alpha-0002 > package-0002',
                reason: 'reason-0002',
                removeWhen: 'removeWhen-0002',
              },
            ],
          },
          expected: 2,
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0003': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003' },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0003',
                package: 'package-0003',
                path: 'alpha-0003 > package-0003',
                reason: 'reason-0003',
                removeWhen: 'removeWhen-0003',
              },
              {
                id: 'GHSA-zzzz-zzzz-0009',
                package: 'package-0009',
                path: 'alpha-0009 > package-0009',
                reason: 'reason-0009',
                removeWhen: 'removeWhen-0009',
              },
            ],
          },
          expected: 1,
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0004': {
                  via: [
                    { url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0004' },
                  ],
                },
              },
            },
            ignoredAdvisories: [],
          },
          expected: 0,
        },
      ]

      test.each(cases)('report: $input.report', ({ input, expected }) => {
        const audit = NpmAuditGate.create(input)

        const received = audit.countMetIgnores()

        expect(received)
          .toBe(expected)
      })
    })
  })
})

describe('NpmAuditGate', () => {
  describe('#countFailures()', () => {
    describe('should count unignored and stale advisories', () => {
      const cases = [
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0001': {
                  via: [
                    {
                      name: 'package-0001',
                      severity: 'low',
                      range: '>=1.0.1 <=1.0.2',
                      title: 'title-0001',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0001',
                    },
                    {
                      name: 'package-0002',
                      severity: 'high',
                      range: '>=2.0.1 <=2.0.2',
                      title: 'title-0002',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0002',
                    },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-zzzz-zzzz-0009',
                package: 'package-0009',
                path: 'alpha-0009 > package-0009',
                reason: 'reason-0009',
                removeWhen: 'removeWhen-0009',
              },
            ],
          },
          expected: 3,
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0003': {
                  via: [
                    {
                      name: 'package-0003',
                      severity: 'moderate',
                      range: '>=3.0.1 <=3.0.2',
                      title: 'title-0003',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0003',
                    },
                  ],
                },
              },
            },
            ignoredAdvisories: [],
          },
          expected: 1,
        },
        {
          input: {
            report: {
              vulnerabilities: {
                'package-0004': {
                  via: [
                    {
                      name: 'package-0004',
                      severity: 'critical',
                      range: '>=4.0.1 <=4.0.2',
                      title: 'title-0004',
                      url: 'https://github.com/advisories/GHSA-aaaa-aaaa-0004',
                    },
                  ],
                },
              },
            },
            ignoredAdvisories: [
              {
                id: 'GHSA-aaaa-aaaa-0004',
                package: 'package-0004',
                path: 'alpha-0004 > package-0004',
                reason: 'reason-0004',
                removeWhen: 'removeWhen-0004',
              },
            ],
          },
          expected: 0,
        },
      ]

      test.each(cases)('report: $input.report', ({ input, expected }) => {
        const audit = NpmAuditGate.create(input)

        const received = audit.countFailures()

        expect(received)
          .toBe(expected)
      })
    })
  })
})
