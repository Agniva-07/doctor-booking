# Doctor Booking Website --- Frontend PRD v2

## Dr. Suman Pandab --- Premium Private Clinic Website

**Project:** Doctor Booking Website\
**Doctor:** Dr. Suman Pandab\
**Specialization:** Homeopathic Physician\
**Stack:** React + Vite + JavaScript + CSS\
**Phase:** Frontend/UI first, Supabase integration later\
**Deployment:** Vercel\
**Primary goal:** Build a polished, trustworthy private-clinic website
that feels like a real doctor's professional practice---not a generic
hospital template or SaaS dashboard.

------------------------------------------------------------------------

# 1. Design Direction

## 1.1 Core Visual Reference

The design should take inspiration from the three provided references:

1.  **Current doctor website screenshot** --- preserve the useful
    information architecture:
    -   Doctor identity and credentials are immediately visible.
    -   Call/appointment actions are easy to find.
    -   Consultation and appointment are clearly separated.
    -   Visiting hours and location are easy to access.
2.  **Rita Foodland website screenshot** --- borrow the design principle
    of using a **large, subtle line-art pattern/blueprint in the
    background** rather than filling the interface with generic feature
    cards and icons.
    -   The pattern should sit behind content.
    -   It should feel like a premium brand motif.
    -   It should remain low-contrast and never reduce readability.
3.  **Provided medical emblem/caduceus reference** --- use it as
    inspiration for a refined medical line-art visual language.
    -   Do NOT simply place the raw image everywhere.
    -   Prefer a custom/minimal medical blueprint treatment.
    -   A **technical line-art stethoscope** should be the primary
        background motif.
    -   Secondary motifs can include subtle medical cross geometry,
        pulse/ECG linework, anatomical/medical instrument outlines, or a
        refined caduceus outline.

## 1.2 Overall Mood

The website should feel like:

> **A respected private doctor's chamber with a refined editorial
> identity.**

Keywords:

-   Professional
-   Trustworthy
-   Calm
-   Premium
-   Sophisticated
-   Medical
-   Established
-   Warm
-   Clean
-   Slightly aristocratic
-   Modern but not futuristic

Avoid making it look:

-   Like a hospital chain
-   Like a SaaS landing page
-   Like a startup template
-   Like a generic Bootstrap medical template
-   Overly colorful
-   Overly rounded
-   Full of floating cards
-   Full of meaningless statistics
-   Full of cartoon medical illustrations

------------------------------------------------------------------------

# 2. Color System

Use a restrained medical palette.

### Primary

-   **Deep Medical Navy:** `#063B67` / similar
-   **Royal/Clinical Blue:** `#075DA8` / similar

### Supporting

-   **Very Light Blue:** `#EAF5FC`
-   **Soft Ice:** `#F5FAFD`
-   **White:** `#FFFFFF`

### Accent

-   **Muted Medical Teal:** `#168C8C`
-   Optional very restrained **antique/champagne accent** for premium
    details, borders, or tiny highlights.

### Text

-   Primary text: deep navy
-   Secondary text: slate/blue-gray
-   Avoid pure black wherever possible.

The exact shades may be adjusted by the designer, but the visual
hierarchy must remain restrained.

------------------------------------------------------------------------

# 3. Typography

Use a combination that gives the site a private-practice/editorial
feeling.

### Headings

Use an elegant serif or refined display font where appropriate.

Possible direction: - Cormorant Garamond - Playfair Display - Libre
Baskerville

### Body/UI

Use a clean humanist or modern sans-serif.

Possible direction: - Inter - Manrope - Source Sans 3

Do not use more than 2 primary font families.

Typography should create hierarchy through:

-   Weight
-   Size
-   Spacing
-   Line-height
-   Small uppercase labels
-   Thin dividers

rather than excessive boxes.

------------------------------------------------------------------------

# 4. Signature Background Blueprint System

This is one of the most important visual requirements.

## 4.1 Main Motif

Create a reusable **medical blueprint / line-art background system**
inspired by the mandala pattern used in the Rita Foodland reference.

The preferred main motif:

### Large technical stethoscope blueprint

A very large outline of a stethoscope should sit partially outside the
viewport/section.

Characteristics:

-   Thin line art
-   Low opacity
-   Monochrome
-   No filled illustration
-   No cartoon style
-   Looks like a medical technical drawing
-   Can be cropped by the section edges
-   Should feel decorative, not informational

Example concept:

``` text
             _________
          .-'         '-.
        .'               '.
       /                   \
      |                     |
       \                   /
        '.               .'
          '-._________.-'
                 \
                  \
                   \________
                            \
                             )
                            )
```

The actual implementation should be much more elegant and anatomically
recognizable than this sketch.

## 4.2 Secondary Blueprint Motifs

Different sections may use different medical line-art motifs:

-   Stethoscope
-   Caduceus / medical emblem
-   ECG/pulse line
-   Doctor's coat / medical instrument outline
-   Anatomical heart outline
-   Cross/medical geometry
-   Circular technical drafting rings
-   Subtle grid or blueprint measurement marks

**Do not use all of them at once.**

Each major section should have at most one dominant decorative motif.

## 4.3 Placement

The blueprint should be:

-   Behind the content
-   Very subtle
-   Large scale
-   Partially cropped
-   Fixed or softly moving only if performance remains excellent

Recommended opacity:

`0.035 – 0.09`

The background must never compete with:

-   Doctor's photograph
-   Heading
-   Appointment form
-   Buttons
-   Body text

## 4.4 Reusable CSS Concept

The implementation should support something similar to:

``` css
.section--blueprint::before {
  content: "";
  position: absolute;
  inset: auto -10% -25% auto;
  width: 520px;
  height: 520px;
  opacity: 0.06;
  pointer-events: none;
  background-image: url("/assets/images/stethoscope-blueprint.svg");
  background-repeat: no-repeat;
  background-size: contain;
}
```

The actual positioning must be responsive.

Prefer SVG line art where possible so the motif remains crisp at every
resolution.

------------------------------------------------------------------------

# 5. Brand/Header

## Desktop Header

The header should be compact and premium.

Left:

-   Medical mark/logo
-   **Dr. Suman Pandab**
-   Small subtitle: **Homoeopathic Physician**

Navigation:

-   Home
-   About
-   Consultation
-   Appointment
-   Contact

Right:

-   Phone number
-   Primary **Book Appointment** button

The header should remain visually light.

Avoid:

-   Huge navbar
-   Excessive shadows
-   Gradient navbar
-   Too many icons
-   Pills everywhere

## Sticky Header

On scroll:

-   Header becomes slightly more compact.
-   Background becomes solid/opaque.
-   Subtle shadow or bottom border.
-   Navigation remains accessible.

------------------------------------------------------------------------

# 6. Home Page

The Home page is the primary conversion page.

## 6.1 Hero Section

Use a layout similar in information density to the provided doctor
screenshot, but make it significantly more refined.

### Left

Small eyebrow:

> Your Health, Our Commitment

Main heading:

> **Dr. Suman Pandab**

Supporting credentials:

> B.H.M.S. (WBUHS), D.E.P.H. (VU)\
> Homoeopathic Physician

Additional professional details can include:

-   Medical Officer (Ayush)
-   Department of Health & Family Welfare
-   Government of West Bengal
-   Relevant professional credentials

Use the actual verified content supplied for the doctor. Do not invent
credentials.

Short brand statement:

> **Thoughtful Homoeopathic Care for a Healthier Tomorrow**

### Primary CTA

**Book an Appointment →**

### Secondary CTA

**Call Now**

## 6.2 Hero Image

Use the provided/approved doctor photograph.

Presentation:

-   Large portrait
-   Clean circular or softly framed treatment
-   Thin premium border
-   Subtle background treatment
-   Not a huge floating card

The photograph should remain the visual focus on the right.

Behind/around the image:

-   Very subtle stethoscope blueprint
-   Soft medical drafting lines
-   Light blue atmospheric shapes

Do NOT use generic stock hospital imagery in the hero.

------------------------------------------------------------------------

# 7. Replace the Generic Feature Strip

The reference screenshot contains:

-   Safe & Natural Treatment
-   Personalized Care
-   Trusted & Experienced
-   Better Health / Brighter Life

Do NOT reproduce this as four generic icon cards.

Instead create a **Clinical Trust Band**.

Example:

``` text
HOMOEOPATHIC CARE     |     PERSONAL ATTENTION     |     PATIENT-CENTRED APPROACH
```

Or:

``` text
B.H.M.S.      •      MEDICAL OFFICER (AYUSH)      •      PERSONALIZED CONSULTATION
```

Design:

-   Full-width horizontal section
-   Thin dividers
-   Typography-led
-   Small medical line mark only where useful
-   No large colorful icons
-   No fake numbers
-   No claims that cannot be verified

This should feel like an editorial credentials ribbon.

------------------------------------------------------------------------

# 8. Consultation Section

Create a major section explaining the two ways patients can consult.

## Option A --- Visit the Chamber

Content:

> Meet the doctor in person at the chamber for a focused consultation.

Include:

-   Chamber location
-   Visiting hours
-   Appointment button

Important:

### The patient does NOT select a time slot.

The system will automatically assign the earliest available appointment
slot based on the doctor's configured schedule.

CTA:

**Book Chamber Appointment →**

## Option B --- Online Consultation

Content:

> Share your concern from wherever you are and connect directly with the
> doctor.

CTA:

**Start Online Consultation →**

The two options should be visually distinct without becoming two giant
generic cards.

Possible design:

-   Editorial split layout
-   Large section numbers: `01` and `02`
-   Thin divider
-   Small medical blueprint motif behind one side
-   Minimal supporting graphics

------------------------------------------------------------------------

# 9. Physical Appointment Flow

This is the primary booking flow.

## Patient Inputs

The patient provides:

-   Full Name
-   Phone Number
-   Address
-   Date, where enabled by the final schedule design

The patient does NOT manually select a time slot.

## Automatic Slot Allocation

Example chamber schedule:

``` text
7:30 – 8:00
8:00 – 8:30
8:30 – 9:00
9:00 – 9:30
```

If the first slot is available:

> Patient receives 7:30 -- 8:00

If it is occupied:

> Patient receives 8:00 -- 8:30

Continue until an available slot is found.

## Confirmation

After successful booking, display:

-   Appointment number
-   Patient name
-   Date
-   Allotted time
-   Chamber location
-   Doctor name
-   Confirmation message

Example:

> **Appointment Confirmed**
>
> Your appointment has been reserved successfully.
>
> **Appointment No.: A-014**\
> **Time: 8:00 -- 8:30 AM**

The exact appointment number format can be decided during
implementation.

## UX Rule

The booking interface must make it extremely clear:

> **You do not need to choose a time. We will automatically assign the
> earliest available slot.**

This avoids confusion and reduces unnecessary UI.

------------------------------------------------------------------------

# 10. Online Consultation Flow

Online consultation is intentionally simpler.

Patient provides:

-   Full Name
-   Phone Number
-   Address
-   Message / Health Concern

Then show:

> **Continue on WhatsApp**

The button opens WhatsApp with a pre-filled message containing the
patient's submitted details.

Example structure:

``` text
Hello Dr. Suman Pandab,

I would like to consult regarding:

Name:
Phone:
Address:
Concern:
```

The doctor then directly contacts the patient and decides the
consultation timing.

### Important

There is **no automatic online appointment scheduling in V1**.

Do not create:

-   Online time-slot picker
-   Online appointment calendar
-   Online booking database
-   Fake consultation confirmation

The WhatsApp handoff is the final action for the online flow.

------------------------------------------------------------------------

# 11. About Page

The About page should feel like a professional doctor's profile rather
than a generic biography page.

## Structure

### Intro

-   Doctor photograph
-   Name
-   Professional title
-   Short introduction

### Professional Background

Use only verified information.

Possible content:

-   B.H.M.S. (WBUHS)
-   D.E.P.H. (VU)
-   Medical Officer (Ayush)
-   Department of Health & Family Welfare
-   Government of West Bengal

### Philosophy

A short section explaining the doctor's approach to patient care.

Avoid exaggerated claims such as:

-   "Best doctor"
-   "100% cure"
-   "Guaranteed treatment"
-   "No side effects"
-   "Miracle treatment"

Unless legally/clinically verified and explicitly approved, these should
not appear.

## Background

Use a large, subtle medical blueprint motif.

Recommended:

**Caduceus or medical emblem line art**, used as a faint watermark
behind the profile content.

------------------------------------------------------------------------

# 12. Appointment Page

The Appointment page should be focused and distraction-free.

## Layout

### Left

Heading:

> **Book Your Chamber Visit**

Short explanation:

> Share your details and we will assign the earliest available
> appointment time based on the doctor's chamber schedule.

### Right

Booking form:

1.  Full Name
2.  Phone Number
3.  Address
4.  Date
5.  Submit

No time-slot dropdown.

### Informational Notice

A visually distinct but simple notice:

> **Automatic Time Allocation**\
> You don't need to choose a time. After submitting your details, the
> system will assign the earliest available slot.

Use a tiny line-art clock/calendar treatment rather than a large icon
card.

------------------------------------------------------------------------

# 13. Booking States

The frontend must support all states even before Supabase is connected.

## Idle

Normal form.

## Loading

Button changes to:

> Confirming Appointment...

Disable repeated submissions.

## Success

Show appointment confirmation with:

-   Appointment number
-   Date
-   Time
-   Location

## Validation Error

Examples:

-   Please enter your name.
-   Please enter a valid phone number.
-   Please enter your address.
-   Please select a date.

## Server/Booking Error

Use a calm message:

> We couldn't confirm your appointment right now. Please try again or
> call the clinic directly.

Never show raw database errors to patients.

------------------------------------------------------------------------

# 14. Contact Page

The Contact page should combine:

### Contact Details

-   Phone number
-   Alternative phone number if officially provided
-   Chamber address
-   Visiting hours

### Location

Use a map embed or map preview.

Include:

**Get Directions →**

and optionally:

**Open in Google Maps →**

### Visiting Hours

Use a clean timetable.

Example structure:

  Day                  Hours
  -------------------- ---------------------
  Monday -- Saturday   7:30 PM -- 9:30 PM
  Sunday               11:00 AM -- 1:00 PM

Use the actual approved chamber schedule/content when supplied.

------------------------------------------------------------------------

# 15. Footer

The footer should take inspiration from the visual depth of the Rita
Foodland footer.

But instead of the food-themed mandala, use:

### Medical Blueprint Footer Background

Large faint stethoscope / medical line-art pattern.

Suggested structure:

### Column 1

**Dr. Suman Pandab**

Homoeopathic Physician

Short professional statement.

### Column 2

**Quick Links**

-   Home
-   About
-   Consultation
-   Appointment
-   Contact

### Column 3

**Contact**

-   Phone
-   Address

### Column 4

**Visiting Hours / Location**

-   Chamber hours
-   Compact map

Bottom row:

-   Copyright
-   Doctor name
-   Optional privacy/terms links if required

Keep the footer sophisticated and dark.

Suggested direction:

-   Deep navy
-   Very dark blue
-   White text
-   Low-opacity blueprint line art
-   Thin separators

------------------------------------------------------------------------

# 16. Decorative Design Language

## Use

-   Thin borders
-   Fine dividers
-   Blueprint line art
-   Editorial spacing
-   Serif display typography
-   Small uppercase labels
-   Subtle shadows
-   Soft background transitions
-   Large negative space
-   Cropped oversized medical illustrations
-   Small premium gold/champagne details where useful

## Avoid

-   Excessive rounded cards
-   Glassmorphism
-   Neon colors
-   Gradient-heavy backgrounds
-   Floating blobs
-   Cartoon doctors
-   Generic medical stock illustrations
-   Huge icon + heading + paragraph repeated four times
-   Fake testimonials
-   Fake statistics
-   Fake patient counts
-   Fake awards
-   Excessive animations

------------------------------------------------------------------------

# 17. Cards

Cards are allowed, but should be used selectively.

A card should exist because it improves usability.

Good examples:

-   Appointment form
-   Contact information block
-   Consultation option
-   Booking confirmation

Avoid turning every section into:

``` text
┌─────────────┐
│     ICON    │
│   HEADING   │
│ description │
└─────────────┘
```

Prefer editorial layouts with:

-   asymmetric columns
-   dividers
-   typography
-   image + text
-   large numbers
-   line-art background
-   whitespace

------------------------------------------------------------------------

# 18. Animation

Animation should feel premium and calm.

Use:

-   Fade-up on section entrance
-   Very subtle image reveal
-   Small button hover transitions
-   Header transition on scroll
-   Blueprint motif appearing softly

Avoid:

-   Bouncing icons
-   Excessive parallax
-   Fast zooms
-   Constant floating objects
-   Attention-grabbing animations

Animation duration guideline:

`250ms – 700ms`

Use reduced-motion support.

------------------------------------------------------------------------

# 19. Responsive Design

The website must be designed mobile-first.

## Mobile

Navigation becomes:

-   Logo/name
-   Menu button
-   Call button where space allows

Hero becomes:

1.  Doctor image
2.  Name/credentials
3.  CTA
4.  Trust band
5.  Consultation
6.  Appointment CTA

Appointment form becomes one column.

Blueprint artwork scales down or moves partially off-screen.

## Tablet

Use two-column layouts where appropriate.

## Desktop

Use generous whitespace and editorial composition.

Target widths:

-   Mobile: `320px+`
-   Tablet: `768px+`
-   Desktop: `1024px+`
-   Large desktop: `1440px+`

No horizontal overflow.

------------------------------------------------------------------------

# 20. Accessibility

Required:

-   Semantic HTML
-   Proper heading hierarchy
-   Labels for every form field
-   Keyboard-accessible navigation
-   Visible focus states
-   Sufficient contrast
-   Alt text for doctor images
-   `aria-label` where necessary
-   Reduced-motion support

Do not use text embedded inside images for important information.

------------------------------------------------------------------------

# 21. SEO

Every public page should have:

-   Meaningful `<title>`
-   Meta description
-   Proper heading structure
-   Descriptive URLs
-   Descriptive image alt text
-   Local doctor/chamber information where appropriate

Suggested routes:

``` text
/
 /about
 /consultation
 /appointment
 /contact
```

Admin routes should be separate:

``` text
/admin
/admin/appointments
/admin/schedule
/admin/settings
```

------------------------------------------------------------------------

# 22. Components

Suggested reusable components:

``` text
components/
├── Navbar
├── Footer
├── Button
├── SectionHeading
├── BlueprintBackground
├── DoctorProfile
├── TrustBand
├── ConsultationOption
├── AppointmentForm
├── BookingConfirmation
├── ContactDetails
├── VisitingHours
├── MapPreview
└── LoadingState
```

The `BlueprintBackground` component should make it easy to reuse the
medical line-art treatment across sections without duplicating CSS.

------------------------------------------------------------------------

# 23. Assets

Recommended assets:

``` text
src/assets/
├── images/
│   ├── doctor/
│   ├── clinic/
│   └── locations/
├── icons/
└── medical/
    ├── stethoscope-blueprint.svg
    ├── caduceus-outline.svg
    ├── ecg-line.svg
    └── medical-cross.svg
```

Use SVG for decorative blueprint artwork wherever possible.

## Asset Rules

-   Prefer original/approved assets.
-   Do not use random stock images.
-   Do not use copyrighted medical illustrations without permission.
-   Do not distort the doctor's photograph.
-   Do not overuse decorative assets.

------------------------------------------------------------------------

# 24. Content Rules

The website must use real, approved information.

Never invent:

-   Degrees
-   Hospital affiliations
-   Awards
-   Experience years
-   Patient counts
-   Success rates
-   Testimonials
-   Medical claims
-   Chamber timings
-   Addresses
-   Phone numbers

If content is unavailable, create a clear placeholder rather than
inventing facts.

------------------------------------------------------------------------

# 25. Phase 1 --- Frontend Boundary

Phase 1 is UI/frontend only.

### Build now

-   React + Vite
-   Routing
-   Design system
-   Navbar
-   Footer
-   Home
-   About
-   Consultation
-   Appointment
-   Contact
-   Appointment form UI
-   Online consultation form UI
-   WhatsApp handoff UI
-   Blueprint background system
-   Responsive layouts
-   Loading/error/success states
-   Accessibility
-   SEO basics
-   Animations
-   Real approved assets/content

### Do NOT build yet

-   Supabase connection
-   Real database queries
-   Real slot allocation
-   Authentication
-   Admin database integration
-   Server/API
-   Online appointment scheduling
-   Payment gateway

Use mock/local state where necessary.

------------------------------------------------------------------------

# 26. Future Supabase Integration Contract

The frontend should be structured so that Supabase can later be
connected without redesigning the UI.

Future backend responsibilities:

### Physical appointments

-   Store patient booking
-   Read chamber schedule
-   Find earliest available slot
-   Prevent double booking
-   Return appointment number
-   Return allotted time
-   Expose appointment data to admin panel

### Admin

Doctor/admin dashboard should eventually show:

-   Patient name
-   Phone
-   Allotted time
-   Date

Address may be stored for the booking record but should not be shown in
the main appointment list unless specifically required.

### Online consultation

No database dependency is required for the V1 WhatsApp flow.

------------------------------------------------------------------------

# 27. Design Quality Benchmark

Before considering the frontend complete, compare the site against these
principles:

### It should feel like:

**"A premium private doctor's chamber website."**

### It should NOT feel like:

**"A medical SaaS template with blue cards."**

The Rita Foodland reference demonstrates an important principle:

> **The background itself can become part of the brand identity.**

For this project, that identity should come from **medical technical
line art / blueprint artwork**, especially the stethoscope.

------------------------------------------------------------------------

# 28. Final Page Structure

## Home

``` text
Navbar
↓
Hero — Doctor + Credentials + CTA
↓
Clinical Trust Band
↓
Consultation Choices
↓
Short About / Professional Profile
↓
Appointment CTA / Booking Introduction
↓
Visiting Hours + Location
↓
Footer with Medical Blueprint
```

## About

``` text
Navbar
↓
Doctor Profile
↓
Professional Credentials
↓
Care Philosophy
↓
Medical Blueprint Section
↓
CTA
↓
Footer
```

## Consultation

``` text
Navbar
↓
Consultation Introduction
↓
Chamber Consultation
↓
Online Consultation
↓
Online Consultation Form
↓
WhatsApp Handoff
↓
Footer
```

## Appointment

``` text
Navbar
↓
Booking Introduction
↓
Appointment Form
↓
Automatic Slot Allocation Explanation
↓
Success / Error State
↓
Footer
```

## Contact

``` text
Navbar
↓
Contact Introduction
↓
Phone + Address
↓
Visiting Hours
↓
Map
↓
Directions CTA
↓
Footer
```

------------------------------------------------------------------------

# 29. Definition of Done

The frontend is complete when:

-   [ ] All public pages are implemented.
-   [ ] Navigation works.
-   [ ] Doctor identity and credentials are clearly presented.
-   [ ] The visual style matches the premium private-clinic direction.
-   [ ] Medical blueprint artwork is integrated as a consistent brand
    motif.
-   [ ] Stethoscope line art is the primary decorative motif.
-   [ ] The caduceus reference is treated as visual inspiration, not
    pasted repeatedly.
-   [ ] The site does not look like a generic medical template.
-   [ ] The trust band is typography-led rather than an icon-card strip.
-   [ ] Physical booking does not ask patients to choose a time.
-   [ ] Online consultation ends in a WhatsApp handoff.
-   [ ] Loading, validation, success, and error states exist.
-   [ ] Mobile layout is polished.
-   [ ] Tablet layout is polished.
-   [ ] Desktop layout is polished.
-   [ ] Accessibility basics are covered.
-   [ ] SEO basics are covered.
-   [ ] No fake medical claims/content exist.
-   [ ] No unnecessary dependencies are introduced.
-   [ ] Supabase is not required for Phase 1.
-   [ ] The code is structured for later Supabase integration.
-   [ ] Production build completes successfully.

------------------------------------------------------------------------

# 30. One-Line Creative Direction

> **Design a timeless, premium private-clinic website for Dr. Suman
> Pandab, combining clean medical professionalism with an
> editorial/aristocratic visual identity, using subtle technical
> stethoscope blueprint line art as the signature background motif.**
