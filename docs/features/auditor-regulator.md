# AgriTrust AI — Auditor / Regulator Features

> Source: `AgriTrust_AI_Prototype/trust_agri_ai_prototype` (`index.html`, `app.js`, `styles.css`).
> This document lists **every** Auditor / Regulator feature in the prototype so it can be re-implemented in another language/app type. Items marked **[MOCK]** use hard-coded data.

---

## 1. Role overview

| Item | Value |
|---|---|
| Role key (internal) | `auditor` |
| Display name | Auditor / Regulator |
| Audit-log actor label | `AUDITOR` |
| Access level | **Read-only** |
| Purpose | **Independent oversight.** Checks the platform's governance and compliance: consent traceability, data retention, model transparency, access controls, fairness monitoring, and complaint/incident processes. |

Layout: a single full-width page (no sidebar) with:
1. Governance and compliance review (3 summary cards)
2. Read-only audit log
3. Governance checklist

---

## 2. Governance and compliance review

- Eyebrow: **Independent oversight**
- Heading: **Governance and compliance review**

Three compliance check cards [MOCK]:

| Check | Result | Finding |
|---|---|---|
| Consent traceability | **Pass** | Consent versions and changes are recorded. |
| Data retention | **Review** | Two records exceed the configured period. |
| Model transparency | **Pass** | Version, purpose and limitations are published. |

Result values used: **Pass**, **Review** (a **Fail** state is a natural addition).

How each check should be worked out when migrated:
| Check | Evaluation logic |
|---|---|
| Consent traceability | Every farmer consent change is stored with its version and timestamp (see the farmer privacy screen: core, extension officer sharing, model improvement, district analytics, marketing). |
| Data retention | Count records older than their retention period: crop images > **90 days**, AI interaction logs > **12 months**, district data or phone number kept after account deletion. Any count above 0 → **Review**, with the number of records. |
| Model transparency | The current model (e.g. CropVision v1.3) has a published model card with version, purpose, supported crops, known limitations and last evaluation date. |

Migration: auditors should be able to drill into a finding, e.g. see which two records are past their retention period.

---

## 3. Read-only audit log

Title: **Read-only audit log**. A scrollable, monospace, dark-themed log panel, newest first. The auditor **cannot edit or delete** entries.

Entry format:
```
<local date-time> | <ACTOR> | <action>
```

Seed events:
1. `SYSTEM | CropVision v1.3 model card published`
2. `AUDITOR | Quarterly governance review opened`
3. `ADMIN | Access granted to Extension Officer EO-104`
4. `FARMER | Consent preferences updated`

All events that can appear:
| Actor | Action |
|---|---|
| FARMER | Submitted crop image for purpose-limited AI diagnosis |
| FARMER | Requested extension-officer review for AGR-2026-014 |
| FARMER | Reported potentially incorrect AI result AGR-2026-014 |
| FARMER | Deleted uploaded crop image for AGR-2026-014 |
| FARMER | Requested explainable AI advisory response |
| FARMER | Updated granular consent preferences |
| FARMER | Downloaded personal data export |
| FARMER | Submitted account deletion request |
| EXTENSION OFFICER | Confirmed AGR-2026-014 with revised human advice |
| ADMIN | Access granted to Extension Officer `<id>` |
| SYSTEM | `<model>` model card published |
| AUDITOR | Quarterly governance review opened |
| USER | Switched prototype role view to `<role>` (prototype only) |

Behaviour and requirements:
- It is the same log the Platform Administrator sees.
- The prototype stores it in browser `localStorage` (key `agriTrustLogs`). Production needs a server-side, **append-only, tamper-evident** log.
- Auditors may read **AI interaction logs** (data inventory: "AI interaction logs — Safety, traceability and complaints — Shared with authorised auditors — 12 months").
- Suggested for migration: filter by actor, date range or case id, and export the log for regulators.

---

## 4. Governance checklist

Title: **Governance checklist**. Each item is a control the platform must provide and the auditor confirms:

| # | Control | Where it is implemented |
|---|---|---|
| 1 | Data inventory and processing purposes documented. | Farmer "Data inventory visible to you" table (data, purpose, shared with, retention) |
| 2 | Farmer consent can be withdrawn. | Farmer privacy toggles (all except core service) + Save preferences |
| 3 | Role-based access and privileged-access controls enabled. | Officer access boundary; admin grants access |
| 4 | AI recommendations are labelled and contestable. | "AI-generated preliminary advice" labels, confidence, reasons, limitations; "Report incorrect result"; "Ask an extension officer" |
| 5 | District-level performance disparities are monitored. | Admin fairness and quality monitoring table |
| 6 | Incident and complaint processes are operational. | Admin KPIs (open complaints, critical incidents); farmer reports |

Migration: the checklist is static in the prototype. Consider giving each item a status (Pass / Review / Fail), evidence links, and reviewer notes.

---

## 5. Auditor activities implied by the prototype

| Activity | Evidence |
|---|---|
| Open a periodic (quarterly) governance review | Seed log `AUDITOR \| Quarterly governance review opened` |
| Review consent history | "Consent traceability" check |
| Review retention compliance | "Data retention" check |
| Review model documentation | "Model transparency" check |
| Inspect audit trail | Read-only audit log |

**Auditor actions that should be audit-logged** (actor `AUDITOR`): review opened/closed, finding raised, log exported, record inspected.

---

## 6. Cross-cutting

- **Access:** read-only; no data changes allowed beyond the auditor's own review records. Replace the prototype role switcher with authentication and role-based authorisation.
- **Toasts:** none are used in the auditor view in the prototype.
- **Visual design:** same design system: three-column "mini-card" grid (two columns below 900 px, one below 680 px), checklist styling, dark log panel.

---

## 7. Data entities the Auditor reads (suggested model)

| Entity | Key fields |
|---|---|
| GovernanceReview | id, period (e.g. quarter), openedBy, openedAt, closedAt, status |
| ComplianceCheck | reviewId, name (`Consent traceability`, `Data retention`, `Model transparency`, …), result (`Pass`, `Review`, `Fail`), finding, evidence |
| ConsentHistory | farmerId, purpose, granted, version, changedAt |
| RetentionPolicy | dataType, period (images 90 days; AI logs 12 months; phone until deletion; district while active) |
| ModelCard | modelName, version, purpose, limitations, lastEvaluationDate |
| AuditEvent | timestamp, actor, action (read-only) |

---

## 8. Summary checklist

- [ ] Compliance check cards: consent traceability, data retention, model transparency (Pass/Review)
- [ ] Drill-down into findings (e.g. records past retention)
- [ ] Read-only, append-only audit log with filter/export
- [ ] Access to AI interaction logs (12-month retention)
- [ ] Governance checklist (6 controls)
- [ ] Ability to open/close periodic governance reviews
