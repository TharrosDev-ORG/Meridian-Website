import { submitSpeakerApplication } from './app/actions/speak';

const testData = {
  fullName: "Dr. Antigravity Test",
  email: "antigravity-test@example.com",
  roleTitle: "Lead AI Researcher",
  organization: "DeepMind Labs",
  classification: "Industry" as const,
  expertise: ["Tech / AI"],
  proposedTitle: "The Future of Agentic Coding",
  topicOverview: "A comprehensive deep dive into how AI agents are transforming the software development lifecycle through autonomous reasoning and tool use.",
  bio: "Dr. Antigravity Test is a leading researcher in the field of autonomous AI systems.",
  preferredFormat: ["Keynote"],
  availability: "Flexible",
  locationConstraints: "Remote / Virtual",
  previousExperience: true,
  portfolioLink: "",
  linkedinUrl: "",
  socialMedia: "",
  referralSource: "Website",
  additionalNotes: "",
};

async function test() {
  console.log("Submitting test application...");
  const res = await submitSpeakerApplication(testData);
  console.log("Result:", res);
}

test();
