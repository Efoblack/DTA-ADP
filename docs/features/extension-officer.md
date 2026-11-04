# AgriTrust AI — Extension Officer Features

> Source: `AgriTrust_AI_Prototype/trust_agri_ai_prototype` (`index.html`, `app.js`, `styles.css`).
> This document lists **every** Extension Officer feature in the prototype so it can be re-implemented in another language/app type. Items marked **[STUB]** exist in the UI but have no logic in the prototype; items marked **[MOCK]** use hard-coded data.

---

## 1. Role overview

| Item | Value |
|---|---|
| Role key (internal) | `extension` |
| Display name | Extension Officer |
| Audit-log actor label | `EXTENSION OFFICER` |
| Example officer id (from seed log) | `EO-104` |
| Purpose | The **human-in-the-loop** reviewer. Checks AI crop diagnoses that farmers have shared, then confirms, corrects, rejects, or asks for more evidence, and sends human-reviewed advice back to the farmer. |

Layout: a single full-width workspace (no sidebar) with three areas:
1. Assigned farmer cases (table)
2. Case review panel
3. Access boundary panel

---

## 2. Assigned farmer cases (case queue)

- Eyebrow: **Extension officer workspace**
- Heading: **Assigned farmer cases**

**Table columns:** Case · Farmer · Crop · AI result · Confidence · Status

**Data** [MOCK]:
| Case | Farmer | Crop | AI result | Confidence | Status |
|---|---|---|---|---|---|
| AGR-2026-014 | Ama K. | Maize | Possible fall armyworm | 72% | Pending |
| AGR-2026-009 | Kojo A. | Tomato | Possible early blight | 64% | Needs more evidence |

Rules / notes:
- Only cases **assigned to this officer** or **shared by the farmer** are listed (see the access boundary).
- Farmer names are shortened to first name + surname initial (e.g. "Ama K."), which keeps personal data to a minimum.
- Case id format: `AGR-<year>-<sequence>`.
- Statuses: **Pending**, **Needs more evidence**; implied by the review actions: **Confirmed**, **Rejected**.
- Migration: in the prototype rows can't be clicked and the review panel is fixed to AGR-2026-014. The real app should open the review panel for whichever case is selected.

---

## 3. Case review panel

Title: **Review AGR-2026-014** (the selected case id).

Information shown:
- **Data authorised by farmer:** crop image, crop type, district and symptom description.
  → The officer only sees the data the farmer authorised; nothing else from the farmer's profile.
- **AI explanation:** irregular feeding pattern, maize crop, similar regional reports.
  → The officer sees the AI's reasons as well as its result.

Suggested additions for migration (the data exists elsewhere in the app): the uploaded image, the farmer's symptom text, the AI confidence and band (72% · Moderate), the AI limitations list, and the model version (CropVision v1.3).

**Officer assessment** (multi-line text input), pre-filled in the prototype with:
> "The symptoms are consistent with fall armyworm, but the farmer should inspect the whorl and provide a close-up image before treatment."

### 3.1 Review actions
| Button | Style | Behaviour in prototype | Audit log | Toast | Intended outcome |
|---|---|---|---|---|---|
| **Confirm with advice** | Primary | Working | `EXTENSION OFFICER \| Confirmed AGR-2026-014 with revised human advice` | "Human-reviewed advice sent to farmer" | Case → **Confirmed**; officer's assessment sent to the farmer's *Human Review* screen |
| **Request more evidence** | Secondary | **[STUB]** no handler | (should log e.g. `Requested more evidence for <case>`) | — | Case → **Needs more evidence**; farmer asked for more images/details |
| **Reject AI result** | Danger | **[STUB]** no handler | (should log e.g. `Rejected AI result for <case>`) | — | Case → **Rejected**; the AI result is marked incorrect (ideally with the officer's correct diagnosis/advice); feeds model-quality and fairness monitoring |

Migration notes:
- Every review action should save the officer's assessment text, officer id, timestamp and new status.
- The farmer should be notified of every outcome.
- Rejections and corrections are useful **feedback for model improvement**, but they may only be used for training if the farmer gave "Model improvement" consent.

---

## 4. Access boundary (role-based access rules)

The workspace shows these rules to the officer, and the system must **enforce** them:

| Rule | Implementation requirement |
|---|---|
| You can access only assigned or farmer-shared cases. | Filter cases by assignment, and by the farmer's "Extension officer sharing" consent / review request. |
| Financial records are hidden. | Officers must never get farmer financial data. |
| All viewing and edits are logged. | Write an audit event when a case is **viewed** as well as when it is edited. |
| Case access expires after closure. | Remove the officer's access once a case is closed (Confirmed / Rejected). |

Related farmer-side rules:
- Farmers can turn **Extension officer sharing** on or off on their privacy screen. When it is off, new cases must not be shared.
- A farmer starts a review with **"Ask an extension officer"** on a diagnosis result.
- Farmer crop images are kept for **90 days** at most, and the farmer may delete them sooner. Officers then lose access to the image.

---

## 5. Cross-cutting features used by the Extension Officer

### 5.1 Audit logging
Format: `<local date-time> | EXTENSION OFFICER | <action>`. Logs go to the shared audit log that admins and auditors can read. Officers cannot see the log themselves.

**Extension Officer audit events in the prototype:**
1. `Confirmed AGR-2026-014 with revised human advice`

Related seed event (logged by the admin): `ADMIN | Access granted to Extension Officer EO-104`. This means officer access is **granted by a platform administrator**.

**Events to add during migration:** case viewed, more evidence requested, AI result rejected, case closed, access expired.

### 5.2 Toast notifications
A short confirmation at the bottom-right that disappears after about 2.2 seconds (e.g. "Human-reviewed advice sent to farmer").

### 5.3 Role switcher (prototype only)
In the prototype anyone can reach this view through the "View as" dropdown. The real app needs **authentication**, with officer accounts provisioned by an admin.

### 5.4 Visual design
Same design system as the rest of the app: primary green `#216b3a`, cards with rounded corners (16 px), and primary / secondary / danger buttons. The table and panels stack into one column below 680 px.

---

## 6. Data entities the Extension Officer touches (suggested model)

| Entity | Key fields |
|---|---|
| Officer | id (e.g. `EO-104`), name, districts covered, access granted by/at |
| ReviewCase | id (`AGR-YYYY-NNN`), farmerId, farmerDisplayName, crop, aiResult, aiConfidence, aiExplanation[], authorisedData[], status (`Pending`, `Needs more evidence`, `Confirmed`, `Rejected`), assignedOfficerId, closedAt |
| OfficerAssessment | caseId, officerId, assessmentText, decision (`confirm`, `request_evidence`, `reject`), createdAt |
| CaseAccessGrant | caseId, officerId, grantedAt, expiresAt / revokedAt (on closure) |
| AuditEvent | timestamp, actor (`EXTENSION OFFICER` + id), action, caseId |

---

## 7. Summary checklist

- [ ] Case queue (assigned or shared cases only) with farmer, crop, AI result, confidence and status
- [ ] Case detail showing only farmer-authorised data, plus the AI explanation
- [ ] Officer assessment text entry
- [ ] Confirm with advice → sends human-reviewed advice to the farmer
- [ ] Request more evidence → farmer asked for more input
- [ ] Reject AI result → marked incorrect, feeds model monitoring
- [ ] Access boundary shown and enforced (no financial data, everything logged, access ends on closure)
- [ ] Audit events for view, confirm, request evidence, reject
