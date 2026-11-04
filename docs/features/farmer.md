# AgriTrust AI — Farmer Features

> Source: `AgriTrust_AI_Prototype/trust_agri_ai_prototype` (`index.html`, `app.js`, `styles.css`).
> This document lists **every** Farmer-facing feature in the prototype so it can be re-implemented in another language/app type. Items marked **[STUB]** exist in the UI but have no real logic in the prototype; items marked **[MOCK]** use hard-coded data.

---

## 1. Role overview

| Item | Value |
|---|---|
| Role key (internal) | `farmer` |
| Display name | Farmer |
| Demo user | **Ama K.** (greeted as "Ama"), district **Ho West** |
| Audit-log actor label | `FARMER` |
| Default role | Yes — the app opens in the Farmer view |
| Purpose | Get preliminary, explainable AI advice on crops, planting and markets; stay in control of personal data; escalate to a human (extension officer) at any time. |

### Core principles the Farmer UI must communicate
- AI advice is **preliminary**; the farmer remains in control.
- **Human review** by an extension officer can be requested at any time.
- Data use is **purpose-specific** and **consent-based**; all secondary sharing is optional.
- Every significant action is written to an **audit log**.

---

## 2. Navigation

The Farmer view has a sidebar (on mobile it becomes a horizontally scrollable tab bar) with 6 screens:

| # | Nav label | Screen id | Section |
|---|---|---|---|
| 1 | Dashboard | `dashboard` | [3](#3-dashboard) |
| 2 | Diagnose Crop | `diagnose` | [4](#4-diagnose-crop-ai-crop-diagnosis) |
| 3 | Ask AI Adviser | `advice` | [5](#5-ask-ai-adviser-explainable-ai-chat) |
| 4 | Market Prices | `market` | [6](#6-market-prices-transparent-market-recommendation) |
| 5 | My Data & Privacy | `privacy` | [7](#7-my-data--privacy) |
| 6 | Human Review | `messages` | [8](#8-human-review-my-review-cases) |

- One screen is visible at a time; the active nav item is highlighted.
- "Jump" buttons/links inside screens navigate to another screen and also update the active nav item.

---

## 3. Dashboard

### 3.1 Hero / welcome card
- Eyebrow: **"Welcome, Ama"** (should use the logged-in farmer's first name).
- Heading: **"Make better farm decisions with transparent AI support"**
- Body: *"AI advice is preliminary. You remain in control and can request extension-officer review at any time."*
- Actions:
  - **Diagnose a crop problem** (primary) → goes to *Diagnose Crop*.
  - **Ask the AI adviser** (secondary) → goes to *Ask AI Adviser*.
- Trust badge (side panel):
  - ✓ Privacy controls active
  - ✓ Secure access
  - ✓ Human review available

### 3.2 Summary metrics (3 tiles) [MOCK]
| Value | Label |
|---|---|
| 2 | Active farm records |
| 1 | Pending human review |
| All optional | Secondary data sharing |

Migration: "Active farm records" and "Pending human review" should be computed from real data.

### 3.3 Latest AI recommendation card [MOCK]
- Title: **Latest AI recommendation**
- Label: **Maize planting window**
- Text: *"Delay planting for approximately five days because low rainfall is forecast."*
- Link: **View reasons and limitations** → goes to *Ask AI Adviser*.

### 3.4 Data status card [MOCK]
- Title: **Your data status**
- Checklist:
  - Model improvement consent: **Off**
  - Extension officer sharing: **On**
  - Marketing messages: **Off**
- Link: **Manage consent** → goes to *My Data & Privacy*.

Migration: in the prototype these values are hard-coded and do **not** follow the toggles on the privacy screen. They should be bound to the farmer's real consent state.

---

## 4. Diagnose Crop (AI crop diagnosis)

### 4.1 Input form
- Eyebrow: **AI crop diagnosis**
- Heading: **Upload a crop photograph**
- Data-minimisation notice: *"Only the photograph, crop type, district and symptoms are needed for this service."*

**Purpose-specific consent box** (title: "Purpose-specific consent"):
| Control | Id | Default | Meaning |
|---|---|---|---|
| ☑ "Use this image to provide a diagnosis." | `diagnosisConsent` | **Checked** | Required for analysis |
| ☐ "Use an anonymised copy to improve the model." | `trainingConsent` | Unchecked | Optional; training use |

**Fields:**
| Field | Type | Options / notes |
|---|---|---|
| Crop type | Dropdown | Maize, Rice, Tomato, Cassava, Cocoa |
| District | Dropdown | Ho West, Kpando, Hohoe, Afadzato South |
| Observed symptoms | Multi-line text | Placeholder: *"Example: holes in leaves and damaged maize whorl"* |
| Crop image | File/image picker (images only) | Shows the selected file name, or "No file selected" |

**Action:** **Analyse securely** (primary button).

### 4.2 Behaviour
1. If **diagnosis consent is unchecked** → do not analyse; show the toast *"Consent is required to analyse the image."*
2. Otherwise:
   - Show the diagnosis result card.
   - Audit log: `FARMER | Submitted crop image for purpose-limited AI diagnosis`
   - Toast: *"Secure analysis completed"*

Prototype gaps / migration notes:
- No image is actually required or uploaded; the result is the same whatever the input [MOCK]. Validate that an image is present in the real build.
- `trainingConsent` is collected but never stored or used. The real app must save it per image/submission.
- The model card (admin) lists supported crops as **Maize, tomato, rice**, but this dropdown also offers **Cassava and Cocoa**. Decide whether to block unsupported crops or warn that they are outside the model's scope.

### 4.3 Diagnosis result card [MOCK]
- Eyebrow: **AI-generated preliminary advice** (AI output must always be labelled).
- Result: **"Possible fall armyworm damage"**
- Confidence badge: **"72% confidence · Moderate"** (amber "moderate" style). The design implies confidence bands (e.g. low / moderate / high) with a matching colour for each.

**"Why this result?"** (explainability):
- Irregular feeding damage matches known maize-leaf patterns.
- The selected crop is maize.
- Similar cases have been reported in the selected district.
- Your description mentions leaf and whorl damage.

**"Limitations":**
- The image was not physically inspected by an agronomist.
- Lighting and camera quality can affect the result.
- This model does not replace professional diagnosis.

**Recommended next steps** notice:
*"Inspect additional plants, capture a clearer close-up if possible, and request extension-officer confirmation before applying treatment."*

### 4.4 Result actions
| Button | Style | Audit log entry | Toast |
|---|---|---|---|
| **Ask an extension officer** | Primary | `FARMER \| Requested extension-officer review for AGR-2026-014` | "Review request sent" |
| **Report incorrect result** | Secondary | `FARMER \| Reported potentially incorrect AI result AGR-2026-014` | "Feedback recorded for safety review" |
| **Delete uploaded image** | Danger | `FARMER \| Deleted uploaded crop image for AGR-2026-014` | "Image deletion recorded" |

Migration notes:
- The case id `AGR-2026-014` is hard-coded. Real cases need ids generated in the format `AGR-<year>-<sequence>`.
- "Ask an extension officer" should create or update a review case, which then appears in *Human Review* and in the Extension Officer queue. It should respect the "Extension officer sharing" consent.
- "Report incorrect result" should create a complaint/feedback record. These feed the Admin "Open complaints" metric.
- "Delete uploaded image" should really delete the image (in the prototype the result stays on screen). Consider asking for confirmation, since this is destructive.

---

## 5. Ask AI Adviser (explainable AI chat)

### 5.1 UI
- Eyebrow: **Explainable AI adviser**
- Heading: **Ask an agricultural question**
- Chat area, starting with a bot greeting:
  *"Hello Ama. I can provide preliminary crop, weather and market advice. Important decisions can be reviewed by an extension officer."*
- Text input, placeholder *"Example: Should I plant maize this week?"*, and an **Ask** button.
- Pressing **Enter** in the input also sends.

### 5.2 Behaviour
1. Trim the input; ignore empty questions.
2. Add the farmer's message (user bubble, right-aligned). User text must be **HTML-escaped / sanitised**.
3. Add the AI reply (bot bubble) in a fixed three-part structure [MOCK — the same answer every time]:
   - **Preliminary AI advice:** Consider delaying maize planting for about five days.
   - **Why:** Low rainfall is forecast, the Ho West maize calendar supports a later window, and the soil condition you previously recorded is dry.
   - **Uncertainty:** Weather forecasts can change. Request an extension officer review before making a high-cost decision.
4. Clear the input.
5. Audit log: `FARMER | Requested explainable AI advisory response`

Migration notes:
- Every AI answer must keep the **Advice / Why / Uncertainty** structure.
- The answer draws on context: weather forecast, district crop calendar, and the farmer's earlier soil records.
- Chat history is not saved in the prototype. AI interaction logs are kept for **12 months** (see the data inventory).
- Consider adding a "Request review" action on individual AI answers, as the uncertainty text suggests.

---

## 6. Market Prices (transparent market recommendation)

- Eyebrow: **Transparent market recommendation**
- Heading: **Current maize market comparison**

**Market table** [MOCK]:
| Market | Price / 100 kg | Estimated transport | Verified demand |
|---|---|---|---|
| Ho Central | GHS 420 | GHS 35 | Medium |
| Kpando | GHS 455 | GHS 42 | High |
| Hohoe | GHS 470 | GHS 68 | High |

**AI suggestion notice:**
- Title: **AI suggestion: Kpando**
- Reason: *"Suggested because the net estimated return is strongest after transport, buyer demand is high, and verified buyers completed recent transactions."*
- Disclaimer (small print): *"Prices can change. The platform does not guarantee sale or payment."*

Recommendation logic implied by the prototype:
- Net return = price − estimated transport. Ho Central 385, Kpando 413, Hohoe 402 → **Kpando** has the highest net return.
- Other factors: verified demand level, and recent completed transactions by verified buyers.
- Currency: **GHS** (Ghana cedi). Unit: per **100 kg**.

Migration notes: the crop is fixed to maize. The real app should support a crop selector, live prices, and a "last updated" time. No audit event is logged for this screen.

---

## 7. My Data & Privacy

### 7.1 Granular consent settings
- Eyebrow: **Privacy and data governance**
- Heading: **My Data & Privacy**
- Text: *"Control each purpose separately. Essential processing is limited to delivering the service you request."*

| Purpose | Description | Id | Default | Editable |
|---|---|---|---|---|
| Core service data | Use farm information to provide requested recommendations. | — | **On** | **No** (essential, locked) |
| Extension officer sharing | Share selected cases for human review. | `shareOfficer` | **On** | Yes |
| Model improvement | Use anonymised images and feedback to improve AI. | `improveModel` | Off | Yes |
| Aggregated district analytics | Use de-identified data for planning reports. | `districtAnalytics` | Off | Yes |
| Marketing messages | Receive product or service promotions. | `marketing` | Off | Yes |

### 7.2 Actions
| Button | Style | Behaviour | Audit log | Toast |
|---|---|---|---|---|
| **Save preferences** | Primary | Saves the consent settings | `FARMER \| Updated granular consent preferences` | "Consent preferences saved" |
| **Download my data** | Secondary | Downloads a JSON export (see 7.3) | `FARMER \| Downloaded personal data export` | — |
| **Request account deletion** | Danger | Submits a deletion request | `FARMER \| Submitted account deletion request` | "Account deletion request submitted" |

### 7.3 Personal data export (data portability)
File name: `my-agritrust-data.json`. Structure (consent values are read from the **current** toggle state):
```json
{
  "profile": { "name": "Ama K.", "district": "Ho West" },
  "consents": {
    "extensionOfficerSharing": true,
    "modelImprovement": false,
    "districtAnalytics": false,
    "marketing": false
  },
  "activeCases": ["AGR-2026-014"]
}
```
Migration: a real export should include all personal data held, such as phone number, images, AI interaction history and case history. The prototype only exports a subset.

### 7.4 Data inventory (transparency table)
Title: **Data inventory visible to you**

| Data | Purpose | Shared with | Retention |
|---|---|---|---|
| Phone number | Login and account recovery | No third party | Until account deletion |
| Crop images | Diagnosis | Extension officer only when requested | 90 days unless deleted earlier |
| District | Localised recommendations | Aggregated analytics if consented | While account is active |
| AI interaction logs | Safety, traceability and complaints | Authorised auditors | 12 months |

Implied rules:
- Login is by **phone number**.
- Crop images are **deleted automatically after 90 days**.
- AI interaction logs are kept for **12 months** and can be read by auditors.

Prototype gaps / migration notes:
- Consent toggles are not saved (they reset on reload) and are not linked to the dashboard status card. They must be stored, and the auditor's "consent traceability" check expects **consent versions and change history** to be recorded.
- Account deletion is only logged. It needs a real workflow with confirmation, a pending state, and fulfilment.

---

## 8. Human Review (my review cases)

- Eyebrow: **Human-in-the-loop review**
- Heading: **Your review cases**
- Case list [MOCK]:

| Case id | Summary | Status badge |
|---|---|---|
| AGR-2026-014 | Possible fall armyworm · Pending review | Pending (amber) |

Migration notes:
- List all of the farmer's cases with their status. Statuses seen across the app: **Pending**, **Needs more evidence**; implied by officer actions: **Confirmed**, **Rejected**.
- Show the officer's human-reviewed advice when a case is confirmed (the officer side sends "Human-reviewed advice" to the farmer).
- When an officer asks for more evidence, the farmer should be able to upload extra images or details.
- The farmer's dashboard "Pending human review" count should come from this list.

---

## 9. Cross-cutting features used by the Farmer

### 9.1 Toast notifications
A short message at the bottom-right that disappears after about **2.2 seconds**. It is used to confirm every farmer action (see the tables above).

### 9.2 Audit logging
Every significant farmer action adds a line to the shared audit log, in the format:
```
<local date-time> | FARMER | <action>
```
Newest entries come first. The prototype stores them in browser `localStorage` under the key `agriTrustLogs`. Admins and auditors can read these logs; farmers cannot see them.

**Complete list of Farmer audit events:**
1. `Submitted crop image for purpose-limited AI diagnosis`
2. `Requested extension-officer review for AGR-2026-014`
3. `Reported potentially incorrect AI result AGR-2026-014`
4. `Deleted uploaded crop image for AGR-2026-014`
5. `Requested explainable AI advisory response`
6. `Updated granular consent preferences`
7. `Downloaded personal data export`
8. `Submitted account deletion request`
9. (seed data) `Consent preferences updated`

### 9.3 Role switcher (prototype only)
The header has a "View as" dropdown (Farmer / Extension Officer / Platform Administrator / Auditor / Regulator) that logs `USER | Switched prototype role view to <role>`. In the real app this should be replaced by **authentication with role-based access**.

### 9.4 Branding and visual design
- App name **AgriTrust AI**; tagline *"Trust-aware AI agricultural platform prototype"*.
- Colours: background `#f4f7f3`, surface `#fff`, ink `#17301f`, muted `#66756a`, primary green `#216b3a`, light primary `#e7f2e9`, border `#dce5dd`, warning `#a25d00`, danger `#a53131`, header `#123b24`.
- Button styles: primary (green, filled), secondary (white, outlined), danger (light red), link (text only).
- Status/confidence badges are pill-shaped; "pending" and "moderate" use amber (`#fff2d8` / `#8f5800`).
- Responsive: below 680 px the layout becomes one column and the sidebar becomes a horizontal scrolling tab bar.

---

## 10. Data entities the Farmer touches (suggested model)

| Entity | Key fields |
|---|---|
| FarmerProfile | id, name, phone, district, farm records |
| Consent | farmerId, purpose (`core`, `extensionOfficerSharing`, `modelImprovement`, `districtAnalytics`, `marketing`), granted, version, changedAt |
| DiagnosisSubmission | id, farmerId, cropType, district, symptoms, image, diagnosisConsent, trainingConsent, createdAt, imageExpiresAt (+90 days) |
| DiagnosisResult | submissionId, label, confidence %, confidenceBand, reasons[], limitations[], nextSteps, modelVersion |
| ReviewCase | id (`AGR-YYYY-NNN`), farmerId, submissionId, status, officerId, officerAssessment |
| AdvisoryInteraction | farmerId, question, advice, why, uncertainty, createdAt (retain 12 months) |
| MarketPrice | market, crop, pricePer100kg, transportCost, verifiedDemand, recommended, reason |
| Complaint / IncorrectResultReport | caseId, farmerId, createdAt, status |
| DeletionRequest | farmerId, type (account / image), status, createdAt |
| AuditEvent | timestamp, actor, action |

---

## 11. Important limitation (must be shown or kept)
The AI diagnosis is simulated in the prototype. It is **not** a medical, veterinary or agronomic diagnostic service and should not be used for real farming decisions. In production, keep clear "preliminary AI advice" labelling and the route to human review.
