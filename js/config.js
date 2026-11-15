/* ═══════════════════════════════════════════════════════════════
   QAMAR · config.js
   ---------------------------------------------------------------
   Main personalisation data for the site and visual editor.
   Longer copy, palette, and theme are editable here. Values
   marked SAMPLE are tasteful placeholders — replace them with
   your own before sending the link to your guests.
   ═══════════════════════════════════════════════════════════════ */

window.HEIRLOOM = {
  templateId: "qamar",

  /* ── The couple — SAMPLE content, replace with your names ────── */
  couple: {
    partnerOne: "Zoya",                    // SAMPLE
    partnerTwo: "Amaan",                      // SAMPLE
    initials:  "Z · A",                     // SAMPLE — used on seals & monograms
    namesLine: "Zoya & Amaan"                // SAMPLE — used across the site
  },

  /* ── The wedding date & time ─────────────────────────────────
     iso : ISO 8601 date-time WITH an explicit UTC offset, so the
           countdown and the calendar files are correct on every
           guest's device, wherever they are in the world.
           Format: "YYYY-MM-DDTHH:MM:SS±HH:MM"
     display / words / numerals : how the date reads in the copy. */
  wedding: {
    iso: "2027-12-12T17:30:00+05:00",                                        // EDIT
    endIso: "2027-12-13T23:00:00+05:00",                                     // EDIT — end of the celebration
    display: "Sunday, 12 December 2027 · the Nikah begins at maghrib", // EDIT
    zoneLabel: "PKT",                                                        // EDIT — optional note for guests abroad
    words: "Sunday · The Twelfth of December · Two Thousand Twenty-Seven",   // EDIT
    numerals: "12 · 12 · 2027",                                              // EDIT
    weekday: "Sunday",                                                     // EDIT — the ornamental date row
    month: "December",                                                       // EDIT
    day: "12",                                                               // EDIT — the large numeral
    year: "2027",                                                            // EDIT
    muhuratLabel: "Nikah",                                                   // EDIT
    muhurat: "at maghrib, as the stars arrive",                               // EDIT
    eventTitle: "Zoya & Amaan — Nikah"                                       // EDIT (calendar entry)
  },

  /* ── The venue ──────────────────────────────────────────────── */
  venue: {
    name: "The Falak Mahal",                               // SAMPLE
    address: "3 Noor Avenue, Gulberg III, Lahore, Punjab 54660", // SAMPLE
    mapsQuery: "Falak Mahal, Noor Avenue, Gulberg III, Lahore",
    /* A full URL here overrides the map link built above, e.g. an
       exact Google Maps place link or an Apple Maps URL.          */
    mapUrl: ""
  },

  /* ── Copy shown throughout the invitation ────────────────────
     The visual editor can change these values without editing HTML. */
  content: {
    pageTitle: "Zoya & Amaan · 12 December 2027 — A Walima Invitation in Midnight & Rose Gold",
    pageDescription: "Zoya and Amaan request the honour of your presence at The Falak Mahal, Lahore — two blessed nights of mehndi and the Nikah at maghrib on Sunday the twelfth of December 2027. Open your invitation.",
    socialTitle: "Zoya & Amaan — A Walima Invitation · 12.12.2027",
    socialDescription: "A midnight envelope, a rose-gold crescent and a blessed union — you are cordially invited.",
    navStory: "Story",
    navDetails: "Events",
    navVenue: "Venue",
    navRsvp: "RSVP",
    menuInvitation: "The Invitation",
    menuStory: "Our Story",
    menuSaveDate: "Save the Date",
    menuDetails: "The Celebrations",
    menuPalette: "The Palette",
    menuWeddingDay: "The Festivities",
    menuVenue: "Venue & Location",
    menuRsvp: "Kindly Respond",
    menuCountdown: "The Countdown",
    menuClosing: "A Closing Dua",
    openingEyebrow: "With the blessings of Allah Almighty, you are invited to the wedding of",
    openingHint: "Touch the seal to break it",
    openButton: "Enter the Moonlit Court",
    skipButton: "Skip straight to the invitation",
    envelopeAddress: "their honoured guests",
    bismillah: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ",
    invitationEyebrow: "With the blessings of our families",
    invitationLead: "We joyfully invite you to celebrate the Nikah of",
    invitationAnd: "and",
    invitationClosing: "Your presence is our greatest blessing",
    heroVenueLabel: "Venue",
    sceneSignboard: "Written under the light of Qamar",
    invitationVenueSuffix: "· Lahore",
    storyKicker: "The Chronicle",
    storyTitle: "Two hearts,",
    storyTitleScript: "one dua answered",
    storyParagraphOne: "Every blessed story begins with a dua whispered quietly, and ours was whispered on a December night on the university rooftop, over one shared cup of Kashmiri chai and a sky full of stars neither of us was studying. One conversation that outlasted the last tram home, one umbrella raced through the winter rain — and somehow, that night decided the rest of our lives.",
    storyParagraphTwo: "Five years and two cities later, our families gathered beneath one roof to give their blessing, and the date was written with dates and water — the sunnah way. Nothing would mean more than to have you standing beside us as we say Qubool Hai, and begin a home built on sakinah, mawaddah and mercy.",
    storyQuote: "The moon is a friend for the lonesome to talk to.",
    storyQuoteLabel: "— the line we read to each other that first night, and every night since",
    storyNote: "chapter one, and every chapter after",
    storyNoteCredit: "— pencilled on the back of a wedding date card",
    storyCaptionOne: "the rooftop and the winter stars",
    storyCaptionTwo: "one umbrella through the rain",
    storyCaptionFour: "the Qubool Hai",
    storyAside: "and they lived",
    ayatKicker: "The Blessed Verse",
    ayatArabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    ayatTranslation: "And one of His signs is that He created for you spouses from among yourselves so that you may find comfort in them. And He has placed between you compassion and mercy. Surely in this are signs for people who reflect.",
    ayatReference: "Surah Ar-Rūm · 30:21",
    saveDateTitle: "Save the Date",
    saveDateCrossing: "two blessed nights of mehndi, Nikah & Walima",
    saveDateNote: "Add the date to your calendar and keep these particulars close.",
    calendarDownloadLabel: "Add to Calendar",
    calendarGoogleLabel: "Google Calendar",
    detailsKicker: "The Celebrations",
    detailsTitleFirst: "Wedding",
    detailsTitleSecond: "Events",
    detailsIntro: "Two blessed nights with our families — at a glance.",
    eventOneLabel: "The Mehndi",
    eventOneTime: "Saturday, 11 December 2027 · six in the evening",
    eventOneNote: "Henna vines, dholki songs and saffron sweets in the courtyard — wear midnight blue and gold.",
    eventTwoLabel: "The Baraat",
    eventTwoTime: "Sunday, 12 December 2027 · five in the evening",
    eventTwoNote: "The groom's procession arrives with qawwali and lanterns — the courtyard glows.",
    eventThreeLabel: "The Nikah",
    eventThreeTime: "Sunday, 12 December 2027 · at maghrib",
    eventThreeNote: "The Nikah ceremony and the Qubool Hai, led by the Imam, beneath the crescent moon.",
    eventFourLabel: "The Rukhsati",
    eventFourTime: "Sunday, 12 December 2027 · ten in the night",
    eventFourNote: "The bride's farewell — dua, tears of joy, and the send-off under a canopy of stars.",
    eventFiveLabel: "The Walima",
    eventFiveTime: "Monday, 13 December 2027 · half past seven in the evening",
    eventFiveNote: "The groom's family hosts the grand reception banquet — a feast of celebration and welcome.",
    kindlyReplyLabel: "Kindly Reply",
    kindlyReplyNote: "Kindly send your response using the reply card further below.",
    particularsEyebrow: "The Particulars",
    particularsDateLabel: "The Date",
    particularsPlaceLabel: "The Place",
    particularsAttireLabel: "The Attire",
    particularsAttire: "Midnight, gold & rose",
    particularsAttireNote: "Shalwar kameez, saris and formal wear are most welcome — dress as though the night could blush.",
    particularsCarriagesLabel: "Kindly Reply",
    particularsCarriagesTime: "the twelfth of November, 2027",
    particularsCarriagesNote: "So the banquet count is right and every seat is saved.",
    paletteKicker: "The Colours of the Night",
    paletteTitleFirst: "The moonlit",
    paletteTitleSecond: "court",
    paletteIntro: "Midnight navy and antique gold, rose gold and moonlight ivory — the colours of the court, worn by our favourite people.",
    dressCodeLabel: "Attire · Midnight & Gold",
    dressCodeTitle: "Colours of the moonlit court",
    dressCodeNote: "Navy silks, rose-gold zari and moonlight ivory are most welcome — dress as splendidly as you feel.",
    weddingDayKicker: "The Celebrations",
    weddingDayTitleFirst: "The wedding",
    weddingDayTitleSecond: "festivities",
    venueKicker: "The Place",
    venueDescription: "A private moonlit estate of navy courts and gilded arches — fanous lanterns at dusk, starlight on marble, the sweet Adhan of gratitude, and roses on every table.",
    venueCeremonyLabel: "Nikah",
    venueCeremonyText: "in the grand hall, at maghrib, led by the Imam",
    venueReceptionLabel: "Walima",
    venueReceptionText: "a candlelit banquet in the starlit courtyard",
    mapButton: "View Location",
    rsvpKicker: "Your Reply",
    rsvpTitle: "Kindly Respond",
    rsvpLead: "Kindly reply by",
    rsvpNameLabel: "Your name",
    rsvpNamePlaceholder: "e.g. Ayesha Siddiqui",
    rsvpNameError: "May we have your name? Two letters or more will do.",
    rsvpAttendanceLabel: "Will you be joining us?",
    rsvpAcceptLabel: "Joyfully accepts",
    rsvpDeclineLabel: "Regretfully declines",
    rsvpAttendanceError: "Please let us know whether you can come.",
    rsvpGuestsLabel: "Seats in your party",
    rsvpGuestsError: "May we have a seat count between one and the party size allowed?",
    rsvpGuestSingular: "guest",
    rsvpGuestPlural: "guests",
    rsvpDietaryLabel: "Dietary requirements",
    rsvpDietaryPlaceholder: "Halal, vegetarian, allergies…",
    rsvpMessageLabel: "A note for the couple",
    rsvpMessagePlaceholder: "Duas, memories, blessings…",
    rsvpSubmitLabel: "Send Response",
    rsvpAmendLabel: "Amend the reply",
    countdownDaysLabel: "Days",
    countdownHoursLabel: "Hours",
    countdownMinutesLabel: "Minutes",
    countdownSecondsLabel: "Seconds",
    countdownKicker: "The Grand Countdown",
    countdownTitle: "counting the hours until",
    countdownPromise: "the Nikah begins",
    closingScript: "with all our love",
    closingMessage: "Thank you, from the depths of our hearts, for being part of our story. May our home be filled with sakinah, mawaddah and rahmah — tranquillity, love and mercy — and may every guest who walks through our door leave with a blessing. Your presence completes our celebration.",
    closingDua: "بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    closingDuaTranslation: "May Allah bless you both, and shower His blessings upon you, and unite you both in goodness.",
    footerTagline: "Midnight & rose gold — written under the light of Qamar."
  },

  palette: [
    { name: "Moonlight Ivory", color: "#F2EDE0" },
    { name: "Antique Gold",    color: "#C9A24B" },
    { name: "Midnight Navy",   color: "#1C2740" },
    { name: "Deep Midnight",   color: "#0D1320" },
    { name: "Rose Gold",       color: "#C98F6B" },
    { name: "Rose Blush",      color: "#E8C7A8" }
  ],
  theme: "qamar",
  themeColors: {},
  fonts: {
    editorial: "cormorant",
    display: "cinzel",
    script: "greatVibes",
    hand: "caveat",
    body: "ebGaramond"
  },

  /* ── Wedding festivities — SAMPLE words for the string of lights.
     Use one short phrase per entry; an empty list hides the section. */
  moments: ["The Mehndi", "The Baraat", "The Nikah", "The Rukhsati", "The Walima", "The Duas"],

  /* ── RSVP ─────────────────────────────────────────────────────
     endpoint : leave "" for the honest demonstration mode — the
                form validates and shows a preview of the reply and
                states clearly that nothing is sent or stored.
                Cloudflare's publishing service supplies the invitation-
                specific RSVP endpoint to public invitation pages.
     maxGuests: the number allowed by the invitation.
     deadline  : shown above the form.                                  */
  rsvp: {
    endpoint: "",
    maxGuests: 4,
    deadline: "the twelfth of November, 2027"        // SAMPLE
  },

  /* ── Countdown wording (invalid or passed dates) ─────────────── */
  countdown: {
    invalidMessage: "The Nikah is still being finalised — see the celebrations below.",
    pastMessage: "The celebration has begun — thank you for being part of our story."
  },

  /* ── Optional ambient music ───────────────────────────────────
     Drop a small looping file at assets/audio/theme.mp3 and set
     src to enable the volume toggle in the navigation. Never
     autoplays; stays silent if the file is missing.                  */
  audio: {
    src: ""             // e.g. "assets/audio/theme.mp3"
  }
};
