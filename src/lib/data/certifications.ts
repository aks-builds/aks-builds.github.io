export interface Certification {
  name: string;
  issuer: string;
  date?: string;
}

export const CERTIFICATIONS: Certification[] = [
  { name: "ISTQB Certified Tester – Foundation Level (CT-FL)", issuer: "ISTQB", date: "Jul 2023" },
  { name: "ISTQB Agile Testing and Automation Testing Foundation", issuer: "ISTQB" },
  { name: "ISTQB Certified Tester AI Testing (CT-AI) v2.0", issuer: "ISTQB" },
  { name: "Reactive Architecture Fundamentals (LB0101EN)", issuer: "IBM", date: "Aug 2023" },
  { name: "Building Scalable Systems (LB0107EN)", issuer: "IBM", date: "Aug 2023" },
  { name: "Innovative India Coding Championship", issuer: "Certificate of Appreciation", date: "Jul 2022" },
];
