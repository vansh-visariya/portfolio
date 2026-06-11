export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  emoji: string;
  tags: string[];
  github: string;
  features: string[];
  gradient: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Kaito-AI",
    category: "AI Chatbot Platform",
    description: "Intelligent search & document analysis chatbot with RAG capabilities, web search integration, and multi-threaded conversations.",
    emoji: "🤖",
    tags: ["LangGraph", "RAG", "Streamlit", "Groq"],
    github: "https://github.com/vansh-visariya/kaito-ai",
    features: ["Web Search Mode", "Document Analysis", "Chat History", "Vector Search"],
    gradient: "from-white/[0.03] to-white/[0.06]",
  },
  {
    id: 2,
    title: "BhiduAI",
    category: "Localized LLM",
    description: "Cultural language model fine-tuned with Mumbai Bambaiyya slang, mixing Hindi, English, and local street language for authentic conversations.",
    emoji: "💬",
    tags: ["LoRA", "Fine-tuning", "Gemma-2", "Cultural AI"],
    github: "https://github.com/vansh-visariya/BhiduAI",
    features: ["Mumbai Slang", "Cultural Nuances", "Localized Responses", "3000+ Dataset"],
    gradient: "from-white/[0.02] to-white/[0.05]",
  },
  {
    id: 3,
    title: "Kaito-Model",
    category: "Transformer from Scratch",
    description: "Complete GPT-2 style transformer model built from scratch using PyTorch, demonstrating self-attention and autoregressive generation.",
    emoji: "🧠",
    tags: ["PyTorch", "Transformer", "GPT-2", "From Scratch"],
    github: "https://github.com/vansh-visariya/kaito-model",
    features: ["Multi-Head Attention", "Layer Normalization", "Text Generation", "Training Pipeline"],
    gradient: "from-white/[0.04] to-white/[0.07]",
  },
];
