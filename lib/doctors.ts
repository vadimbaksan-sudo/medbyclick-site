export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  subspecialties: string[];
  languages: string[];
  credentials: string;
  endorsement: string;
  bio: string;
  casesHandled: number;
  responseTime: string;
  avatar?: string;
}

export const doctors: Doctor[] = [
  {
    id: "dr-elena-volkova",
    name: "Dr. Elena Volkova",
    title: "MD, PhD",
    specialty: "Oncology",
    subspecialties: ["Breast cancer", "Rare tumors", "Second opinions"],
    languages: ["Russian", "Hebrew", "English"],
    credentials: "Head of Oncology, Sheba Medical Center. 22 years of practice. Fellow of the European Society for Medical Oncology.",
    endorsement:
      "Elena is one of three oncologists I call when I see a case that doesn't fit a textbook. She has the rarest combination of academic rigor and clinical instinct. I've sent her some of the most complex breast cancer cases I've encountered — cases where patients had been told there were no more options. She finds options.",
    bio: "Dr. Volkova leads the oncology department at one of Israel's top medical centers. Trained in Moscow and Tel Aviv, she specializes in rare and treatment-resistant tumors. Fluent in Russian, Hebrew, and English.",
    casesHandled: 84,
    responseTime: "Within 24 hours",
  },
  {
    id: "dr-mikhail-stern",
    name: "Dr. Mikhail Stern",
    title: "MD",
    specialty: "Cardiology",
    subspecialties: ["Complex arrhythmia", "Heart failure", "Pre-surgery evaluation"],
    languages: ["Russian", "Hebrew", "English"],
    credentials: "Senior Cardiologist, Hadassah Medical Center. 18 years of practice. Trained at the Cleveland Clinic.",
    endorsement:
      "Mikhail is who I call before a patient goes into cardiac surgery and I want a second set of eyes on the case. His judgment on when to operate — and when not to — has saved more than a few lives. I trust him completely.",
    bio: "Dr. Stern trained at the Cleveland Clinic and has spent 18 years at Hadassah specializing in complex heart cases. He handles pre-surgical evaluations and patients who have been turned away by other cardiologists.",
    casesHandled: 61,
    responseTime: "Within 48 hours",
  },
  {
    id: "dr-rina-goldberg",
    name: "Dr. Rina Goldberg",
    title: "MD, Professor",
    specialty: "Neurology",
    subspecialties: ["Multiple sclerosis", "Rare neurological conditions", "Treatment-resistant cases"],
    languages: ["Russian", "Hebrew"],
    credentials: "Professor of Neurology, Tel Aviv University. Chair of the MS Clinic. 30 years of practice.",
    endorsement:
      "Rina is the person I consult when a neurological case makes no sense. She has an encyclopedic knowledge of rare conditions and the patience to sit with diagnostic uncertainty that most clinicians don't. If anyone can find a pattern, it's her.",
    bio: "Prof. Goldberg chairs the MS clinic at Tel Aviv University's medical school. She is the go-to specialist for treatment-resistant multiple sclerosis and rare neurological conditions that have stumped other neurologists.",
    casesHandled: 112,
    responseTime: "Within 48 hours",
  },
];
