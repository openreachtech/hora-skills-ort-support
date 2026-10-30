import IGNORED_ADVISORIES from '../../../../scripts/stopgap-audit/IGNORED_ADVISORIES.js'

describe('IGNORED_ADVISORIES', () => {
  describe('default export', () => {
    describe('should carry each listed entry', () => {
      test('when imported', () => {
        const expected = [
          expect.objectContaining({
            id: 'GHSA-gcqx-w48m-w2h4',
            package: 'deepmerge',
            path: 'jest > @jest/core > jest-config > deepmerge',
            reason: expect.stringMatching(/\S/u),
            removeWhen: expect.stringMatching(/\S/u),
          }),
        ]

        const received = IGNORED_ADVISORIES

        expect.each(received)
          .toEqual.each(expected)
      })
    })
  })
})
