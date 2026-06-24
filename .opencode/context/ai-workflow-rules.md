# AI Workflow Rules

## Development Workflow
When tasked with a feature or bug fix, adhere strictly to the following sequence:

1. **Analyze:** Review the relevant context files and existing codebase. Identify all files that will be impacted.
2. **Plan:** Formulate a step-by-step implementation plan. Identify potential edge cases, especially regarding i18n and Server/Client component boundaries.
3. **Implement:** Write the code incrementally. Ensure each file is complete and syntactically correct before moving to the next.
4. **Verify:** Mentally (or via tool execution, if available) trace the data flow. Ensure types are correct and no `'use client'` directives are leaking unnecessarily.

## Scoping Rules
- **Single Responsibility:** Each task should focus on one logical unit of work. Do not attempt to refactor unrelated code during a feature implementation.
- **Dependency Minimization:** Do not introduce new third-party libraries without explicit justification. Prefer native Next.js/Payload features or existing project dependencies.
- **Mocking:** When building UI components before the backend is ready, use realistic mock data. Do not leave hardcoded strings in the final implementation; they must be tied to the i18n dictionary or Payload data.

## Delivery Approach
- **Atomic Commits:** If utilizing version control, structure changes logically. (Note: The agent should output complete, replaceable file contents).
- **Documentation:** Update inline comments only for complex business logic. Do not comment on obvious code.
- **Context Updates:** Upon completing a major phase, proactively update `.opencode/context/progress-tracker.md` to reflect the new state of the project.

## Error Handling
- If an error occurs during implementation, do not guess. Analyze the error trace, identify the root cause, and propose a targeted fix.
- If a requirement conflicts with Next.js 16 or Payload 3 best practices, halt and propose an architectural alternative.