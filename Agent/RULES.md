Development Rules

How code is designed, written, modified, and verified. AGENTS.md defines the agent's general instructions, task boundaries, and workflow; this document complements it and does not repeat it.

1. Code Quality
Readability: write clear, predictable code; prefer straightforward solutions over clever or needlessly abstract ones. Keep functions, components, and modules focused on one responsibility; split large ones when it improves clarity, reuse, or testability, but not into tiny units without benefit. Follow the formatting and conventions already used in that part of the codebase.
Naming: descriptive, meaningful names for files, folders, variables, functions, components, types, and props (components named for the UI element or responsibility; functions and variables for their purpose). Avoid vague names (data, item, value, temp) unless the meaning is obvious in a small local context. Follow the project's and framework's existing naming style.
Types: explicit, accurate types for props, parameters, return values, and shared data, aligned with runtime behavior; reuse existing types when they fit. Do not use any, unsafe casts, non-null assertions, or type suppression just to silence an error; only when genuinely necessary, narrow in scope, with non-obvious cases explained. When a shared type changes, update all affected usages in the task's dependency scope.
Simplicity: no patterns, abstractions, configuration layers, or helpers without concrete benefit; no premature optimization. Choose the simplest implementation that meets the requirements, stays maintainable, and fits the existing architecture.
2. Project Structure
Place files by responsibility and existing conventions: page- or feature-specific components and logic next to their owner (if consistent with the architecture); genuinely reusable components, hooks, utilities, and types in the established shared locations.
No new top-level folders, extra nesting, or alternative organizational patterns without clear need. Do not move or reorganize files as unrelated cleanup.
Each file has one clear purpose. Separate unrelated responsibilities only when it makes code materially easier to maintain; do not create files for trivial code. Follow the feature's existing architecture.
3. Components Management
Responsibility: one cohesive responsibility each. Extract a subcomponent only if it has an independent responsibility, is reused, or substantially improves readability. No wrappers around a few lines of markup; no mixing unrelated UI, data, and business logic.
Props: clearly typed, minimal API, defaults only for valid and intentional behavior. Avoid unnecessary props, unclear boolean combinations, and overly configurable components. When props, parameters, events, or the return contract change, update all affected call sites.
Existing first: before creating a component, check whether an existing one provides the behavior or can be safely extended (when it fits its responsibility and keeps the API clear). Create a new one when the responsibility is distinct or extending would make the original harder to maintain. Never duplicate a component under another name.
4. Component Relationships and Dependencies

Before a change that may affect other code, identify: parent/child components and importers/renderers; props, parameters, callbacks, and events passed between them; shared hooks, utilities, constants, types, and interfaces; data structures and state involved; relevant styling, variants, and responsive behavior. Inspect the chain far enough to understand the impact; do not scan unrelated areas.

Keep dependents compatible: if props, parameters, exports, types, or behavior change, update every affected usage in the dependency scope (no obsolete props, parameters, types, or assumptions left behind), and check imports, exports, call sites, and related types. Preserve backward compatibility where practical; if a breaking change is required, update and verify all affected usages. Do not change unrelated behavior of dependents.
Trace impact in both directions (changed component → consumers; task entry point → shared resources), including indirect effects through shared types, hooks, styles, and state. Verify the affected parts still work together.
5. Shared Components and Compatibility

Shared changes can affect many pages, so take extra care.

Allowed when necessary: a shared component or resource may be modified when needed to complete the task correctly; that change is part of the task even if other pages use it. Do not skip it if that would cause duplication, inconsistency, or an incomplete task. Do not modify shared code for optional, unrelated improvements.
Update consumers: identify consumers → determine which are affected → update them → preserve the behavior and appearance of unaffected usages → verify. Example: if a share