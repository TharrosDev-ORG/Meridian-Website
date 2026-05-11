export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is membership free?",
    answer: "Yes. Membership is completely free. There are no registration fees, dues, or hidden costs to join The Meridian Society.",
  },
  {
    question: "Who can join?",
    answer: "Any motivated, curious student in the Ottawa area is welcome to register. You don't need to be affiliated with a specific academic program or institution to join the conversation.",
  },
  {
    question: "What happens after I register?",
    answer: "You will receive priority announcements and direct invitations to all upcoming Meridian events. We maintain a zero-spam policy, and membership involves no mandatory commitments. You can also follow us on <a href=\"https://www.instagram.com/Meridian.Society\" target=\"_blank\" rel=\"noopener noreferrer\">Instagram</a> for real-time updates.",
  },
  {
    question: "Do I have to attend every event?",
    answer: "No. Our programming is modular. You are welcome to attend only the events that align with your interests. Membership is a persistent credential meant to be used as it suits you.",
  },
  {
    question: "What is my Member ID, and why is it important?",
    answer: "Your Member ID is your unique identifier within The Meridian Society's registry. It grants you access to our private events and is your record of membership. You can download your digital ID card immediately after registration and present it at venue check-in."
  }
];
