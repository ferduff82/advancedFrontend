// regular expressions for auth users
export const idRegex = new RegExp("[1]si|[1-4]no.*")
export const serviceRegex = new RegExp("[2-9](si|asi|bsi).*|10si|triage[1-3]")
export const monitorRegex = new RegExp("(CUIL_PROVIDER)|fin_triage")
export const outcomeRegex = new RegExp("(outcome)[1-3]|fin$")

// regular expressions for auth providers
export const freeRegex = new RegExp("^free$")
export const preassignRegex = new RegExp("^preassign$")
export const assignRegex = new RegExp("^assign$")
export const attRegex = new RegExp("^att$")