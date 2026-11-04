# AgriTrust AI — Platform Administrator Features

> Source: `AgriTrust_AI_Prototype/trust_agri_ai_prototype` (`index.html`, `app.js`, `styles.css`).
> This document lists **every** Platform Administrator feature in the prototype so it can be re-implemented in another language/app type. Items marked **[STUB]** exist in the UI but have no logic in the prototype; items marked **[MOCK]** use hard-coded data.

---

## 1. Role overview

| Item | Value |
|---|---|
| Role key (internal) | `admin` |
| Display name | Platform Administrator |
| Audit-log actor label | `ADMIN` |
| Purpose | Run the platform: track usage and AI quality, check **fairness across districts**, publish **model transparency** (the model card), and review the **audit trail**. Admins also grant access to other roles (e.g. extension officers). |

Layout: a single full-width dashboard (no sidebar) with:
1. KPI metrics row (4 tiles)
2. Fairness and quality monitoring table
3. Model card
4. Recent audit events log

---

## 2. Platform KPI metrics [MOCK]

| Value | Label | Source when migrated |
|---|---|---|
| 1,284 | Registered farmers | Count of farmer accounts |
| 76% | Average model confidence | Average confidence across AI diagnoses |
| 18 | Open complaints | Open "Report incorrect result" reports + complaints |
| 0 | Critical incidents | Incident register |

---

## 3. Fairness and quality monitoring

Title: **Fairness and quality monitoring**. Model performance broken down by **district**, so that gaps between districts can be spotted.

| District | Accuracy | Cases | Action |
|---|---|---|---|
| Ho West | 82% | 318 | Monitor |
| Kpando | 78% | 246 | Monitor |
| Hohoe | 74% | 205 | Review data coverage |
| Afadzato South | 68% | 103 | Restrict high-risk advice |

Thresholds implied by the data (confirm with stakeholders):
| Accuracy | Recommended action |
|---|---|
| ≥ 75% | **Monitor** |
| 70% – 74% | **Review data coverage** (district may lack training data) |
| < 70% | **Restrict high-risk advice** in that district |

Migration notes:
- Accuracy should come from human-review outcomes (officer confirms vs rejects) and incorrect-result reports, per district.
- "Restrict high-risk advice" implies a **policy control**: the platform should be able to limit or add warnings to AI advice for a district. Farmers in that district would then see stronger caveats or be sent to human review by default.
- The district list matches the farmer diagnosis form: Ho West, Kpando, Hohoe, Afadzato South.
- Consider breaking results down further, e.g. by crop.

---

## 4. Model card (AI transparency)

Title: **Model card**

| Field | Value |
|---|---|
| Model | CropVision v1.3 |
| Purpose | Preliminary classification of selected crop conditions. |
| Supported crops | Maize, tomato, rice. |
| Known limitation | Lower performance on blurred images and underrepresented districts. |
| Last evaluation | 20 July 2026 |

Action: **View full model documentation** (secondary button) — **[STUB]**, no handler.

Related seed audit event: `SYSTEM | CropVision v1.3 model card published`. This means publishing a model card is an audited system event.

Migration notes:
- Model cards should be versioned records (model name, version, purpose, supported crops, known limitations, evaluation date and metrics) and linked to every AI result the model produced.
- Admins should be able to publish or update a model card. Each publish creates an audit event.
- The full documentation should be viewable (it is a stub in the prototype).
- Mismatch: the farmer diagnosis form offers **Cassava** and **Cocoa**, but the model card says only maize, tomato and rice are supported. The admin side should control which crops are enabled.
- The auditor's "Model transparency" check relies on this card (version, purpose and limitations published).

---

## 5. Recent audit events

Title: **Recent audit events**. A scrollable, monospace, dark-themed log panel (about 280 px high), newest first.

Entry format:
```
<local date-time> | <ACTOR> | <action>
```

**Seed events** (on first load):
1. `SYSTEM | CropVision v1.3 model card published`
2. `AUDITOR | Quarterly governance review opened`
3. `ADMIN | Access granted to Extension Officer EO-104`
4. `FARMER | Consent preferences updated`

**All events that can appear (from every role):**
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
| USER | Switched prototype role view to `<role>` (prototype only) |

Behaviour:
- The log is shared with the Auditor view (same data).
- The prototype stores it in browser `localStorage` (key `agriTrustLogs`). A real build needs a server-side, **append-only / tamper-evident** store.

---

## 6. Administrative responsibilities implied by the prototype

These have no screens in the prototype but other parts of the app assume them:

| Responsibility | Evidence in prototype |
|---|---|
| Grant/revoke role access (e.g. extension officers) | Seed log `ADMIN \| Access granted to Extension Officer EO-104` |
| Assign cases to extension officers | Officer view: "You can access only assigned … cases" |
| Handle complaints and incorrect-result reports | KPI "Open complaints"; farmer "Report incorrect result" |
| Process account and image deletion requests | Farmer "Request account deletion" / "Delete uploaded image" |
| Enforce data retention (images 90 days, AI logs 12 months) | Data inventory; auditor finding "two records exceed the configured period" |
| Manage incidents | KPI "Critical incidents"; auditor checklist "Incident and complaint processes are operational" |
| Privileged-access controls | Auditor checklist "Role-based access and privileged-access controls enabled" |
| Restrict high-risk advice by district | Fairness table action |

**Admin actions that should be audit-logged** (actor `ADMIN`): access granted/revoked, case assigned, complaint resolved, deletion request fulfilled, retention purge run, district restriction changed, model card published/updated.

---

## 7. Cross-cutting

- **Role switcher (prototype only):** replace it with authentication and role-based authorisation. The admin role is privileged and should have extra controls (e.g. MFA, its own actions logged).
- **Toasts:** none are used in the admin view in the prototype.
- **Visual design:** same design system: four-column metric grid (two columns below 900 px, one below 680 px), cards, tables, and a dark log panel (`#0f1a13` background, `#d5f1da` text).

---

## 8. Data entities the Admin touches (suggested model)

| Entity | Key fields |
|---|---|
| PlatformMetrics | registeredFarmers, avgModelConfidence, openComplaints, criticalIncidents |
| DistrictPerformance | district, accuracy %, caseCount, action (`Monitor`, `Review data coverage`, `Restrict high-risk advice`), period |
| ModelCard | modelName, version, purpose, supportedCrops[], knownLimitations[], lastEvaluationDate, documentationUrl, publishedAt |
| RoleAssignment | userId, role, grantedBy, grantedAt, revokedAt |
| Complaint | id, caseId, farmerId, type, status, createdAt, resolvedAt |
| Incident | id, severity, description, status |
| DeletionRequest | id, farmerId, type, status |
| AuditEvent | timestamp, actor, action |

---

## 9. Summary checklist

- [ ] KPI tiles: registered farmers, average model confidence, open complaints, critical incidents
- [ ] Per-district fairness/accuracy table with recommended actions
- [ ] District restriction control ("Restrict high-risk advice")
- [ ] Model card display + full documentation view + publish/version
- [ ] Recent audit events (newest first, shared store)
- [ ] User/role access management (e.g. grant access to extension officers)
- [ ] Complaint, deletion-request, retention and incident handling
