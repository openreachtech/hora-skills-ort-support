import NpmAuditGate from './NpmAuditGate.js'

const audit = NpmAuditGate.create()

process.exitCode = audit.auditAdvisories()
