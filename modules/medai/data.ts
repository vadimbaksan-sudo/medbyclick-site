import type { DiagnosticResult } from "./types";

export const mockDiagnosticResult: DiagnosticResult = {
  possibleConditions: [
    { name: "Tension headache", likelihood: "high", description: "Most common cause of recurring head pain, often stress-related." },
    { name: "Migraine", likelihood: "medium", description: "Neurological condition with episodic moderate-to-severe headaches." },
    { name: "Hypertension", likelihood: "low", description: "Elevated blood pressure can cause headaches, especially morning pain." },
  ],
  recommendedSpecialty: "Neurology",
  urgency: "routine",
  disclaimer: "This analysis is for informational purposes only. It is not a medical diagnosis. Consult a qualified physician before making any health decisions.",
};

export const aiFeatures = [
  { icon: "🔬", title: "Pattern Recognition", description: "Trained on 50M+ clinical records to identify symptom clusters" },
  { icon: "⚡", title: "Instant Analysis", description: "Results in under 30 seconds, available 24/7" },
  { icon: "🎯", title: "Specialist Routing", description: "Recommends the exact specialty you need — no guessing" },
  { icon: "🔒", title: "Private & Encrypted", description: "Your symptoms are never stored or shared" },
];
