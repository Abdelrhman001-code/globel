# Task: Create the Project Design System Documentation

Your task is to create `agent/styles.md` for the Support AI Manager project.

This document will serve as the central design system and UI/UX reference for all frontend development.

Its purpose is to ensure that all AI agents produce a visually consistent, professional, accessible, and comfortable user interface.

## 1. Inspect the Existing Project

Before creating the document:

- Read `AGENTS.md`.
- Read `agent/rules.md`.
- Read `agent/project.md`.
- Read `agent/structure.md`.
- Inspect the existing frontend implementation and styling configuration.
- Inspect existing fonts, CSS variables, Tailwind configuration, installed UI libraries, and existing design patterns.

Understand the current implementation before defining the design guidelines.

Do not assume that a library, font, component, or design token exists without verifying it.

## 2. Overall Design Direction

Adopt the following visual direction:

**Modern Minimal SaaS Dashboard**

The design should be:

- Clean and professional.
- Minimal without feeling empty.
- Comfortable for extended daily use.
- Easy to understand and navigate.
- Consistent across all pages and features.
- Visually organized with clear information hierarchy.

Avoid excessive decoration, unnecessary gradients, heavy shadows, excessive animations, and complicated visual effects.

The interface should prioritize usability and readability over decorative elements.

## 3. Color System

Define a consistent color palette.

Use the following proposed colors as the initial design direction:

### Primary Colors

- Primary: `#2563EB`
- Page Background: `#F8FAFC`
- Surface: `#FFFFFF`
- Primary Text: `#0F172A`
- Secondary Text: `#64748B`
- Border: `#E2E8F0`

### Semantic Colors

- Success: `#16A34A`
- Error: `#DC2626`
- Warning: `#D97706`
- Information: `#2563EB`

Define appropriate usage guidelines for each color.

Ensure sufficient contrast between text, backgrounds, and interactive elements.

Colors may be adjusted slightly when necessary to achieve better accessibility and visual consistency, but do not introduce unrelated color palettes.

## 4. Typography and Fonts

Define a clear typography system.

Requirements:

- Use the existing Geist Sans font as the primary font if confirmed in the project.
- Use suitable system fallbacks.
- Provide appropriate Arabic font fallbacks if Arabic content is displayed.
- Avoid introducing new font dependencies without a genuine requirement.
- Define consistent font sizes and weights for headings, body text, labels, captions, and supporting text.
- Maintain comfortable line heights and readable text sizes.

## 5. Spacing and Layout

Define consistent spacing and layout conventions.

Use a predictable spacing scale based on multiples of 4 pixels.

Specify guidelines for:

- Page padding.
- Section spacing.
- Component spacing.
- Card padding.
- Form spacing.
- Sidebar dimensions.
- Content width.
- Grid layouts.

Avoid arbitrary spacing values when an established spacing token is suitable.

## 6. UI Components Design Guidelines

Define consistent visual standards for:

- Buttons.
- Input fields.
- Select menus.
- Checkboxes and radio buttons.
- Cards.
- Tables.
- Badges and status indicators.
- Dropdown menus.
- Modals and dialogs.
- Tooltips.
- Tabs.
- Navigation elements.
- Toast notifications.
- Loading indicators.
- Empty states.
- Error states.

Specify their visual behavior, borders, backgrounds, spacing, and interaction states where appropriate.

These guidelines should support reusable components without forcing every component to look identical regardless of its purpose.

## 7. Border Radius and Shadows

Use moderate and consistent corner radii.

Suggested direction:

- Small controls: 6–8px.
- Inputs and buttons: 8px.
- Cards: 10–12px.
- Dialogs: 12–16px.

Use subtle shadows only when they improve visual separation or hierarchy.

Prefer clean borders over heavy shadows.

## 8. Responsive Design

Define responsive behavior for:

- Desktop.
- Tablet.
- Mobile.

Ensure:

- Navigation adapts appropriately to smaller screens.
- Tables remain usable on mobile.
- Cards and grids adjust to available space.
- Forms remain readable and accessible.
- No horizontal overflow occurs unnecessarily.
- Interactive elements remain comfortable to use.

Follow the project's existing responsive conventions.

## 9. Interaction and Accessibility

Define guidelines for:

- Hover states.
- Focus states.
- Active states.
- Disabled states.
- Loading states.
- Keyboard navigation.
- Accessible labels.
- Color contrast.
- Clear interaction feedback.

Animations should be subtle, purposeful, and short.

Respect reduced-motion preferences where applicable.

## 10. Dark Mode

Define dark-mode compatibility principles.

If dark mode is implemented or introduced, it must use a coordinated palette rather than simply inverting colors.

Maintain readability, contrast, and visual consistency.

Do not implement dark mode or create additional theme infrastructure as part of this documentation task.

## 11. Design Consistency Rules

Establish the following principles:

- All frontend agents must follow this document.
- Use existing design tokens and reusable UI components whenever possible.
- Do not introduce arbitrary colors, fonts, spacing, radii, or shadows.
- Do not create separate design systems for individual features.
- New components must remain visually consistent with the overall application.
- Feature-specific visual requirements are allowed when they serve a genuine usability purpose.
- Shared component changes must preserve consistency across their consumers.

## 12. Documentation Scope

Create only `agent/styles.md`.

Do not:

- Modify application code.
- Modify existing CSS files.
- Change the current UI.
- Install or remove packages.
- Introduce new fonts.
- Create new design components.
- Modify other agent documentation files.

This task is documentation only.

## 13. Final Review

Before completing:

- Ensure the guidelines match the existing project technologies.
- Ensure proposed fonts and libraries are not falsely described as installed.
- Ensure the color palette is consistent.
- Ensure the typography and spacing rules are practical.
- Ensure the guidelines are clear enough for different AI coding agents to follow independently.
- Write the document in clear, structured English Markdown.

Finally, report the created file and confirm that no other project files were modified.