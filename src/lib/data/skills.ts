export interface SkillGroup {
  heading: string;
  items: string;
}

export const SKILL_GROUPS: SkillGroup[] = [
  { heading: "Languages", items: "TypeScript, JavaScript, C#, Java, Python" },
  { heading: "Test Frameworks", items: "Jest, Cypress, Selenium, XUnit, TestNG, JUnit" },
  { heading: "API & Contract Testing", items: "Postman, Rest Assured, Supertest, gRPC / Protocol Buffers" },
  { heading: "Performance", items: "K6, k6-operator, Apache JMeter, Gatling" },
  { heading: "Observability", items: "Grafana, Splunk, OpenTelemetry, Azure KQL" },
  { heading: "Cloud (Azure)", items: "AKS, Kubernetes, Function Apps, Container Apps, Cosmos DB, APIM" },
  { heading: "CI/CD & GitOps", items: "GitHub Actions, Azure DevOps, Jenkins, ArgoCD, Kargo, Kustomize" },
  { heading: "Event Streaming", items: "Apache Kafka (Confluent), CQRS, Event-Driven Architecture" },
];

export const FACTS: string[] = [
  "ISTQB CT-FL certified",
  "3 internal tech talks at NashTech",
  "8 npm packages published",
  "Based in Greater Noida, open to relocation",
];
