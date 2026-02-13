import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing posts
  await prisma.blogPost.deleteMany({});

  // Create sample blog posts
  const blogPosts = [
    {
      title: "Building Neural Networks with PyTorch",
      excerpt: "A comprehensive guide to creating and training neural networks using PyTorch framework for deep learning applications.",
      content: "In this comprehensive guide, we'll explore how to build neural networks from scratch using PyTorch. We'll cover the fundamentals of tensors, autograd, and how to construct complex architectures. PyTorch provides a flexible and intuitive API that makes it easy to experiment with different network designs. We'll walk through practical examples including CNNs for image classification and RNNs for sequence modeling.",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: JSON.stringify(["AI", "PyTorch", "Deep Learning"]),
      slug: "building-neural-networks-pytorch"
    },
    {
      title: "RAG Systems: The Future of AI Applications",
      excerpt: "Exploring Retrieval-Augmented Generation systems and how they're revolutionizing AI-powered applications.",
      content: "Retrieval-Augmented Generation (RAG) is transforming how we build AI applications. By combining the power of large language models with external knowledge retrieval, RAG systems can provide more accurate, up-to-date, and contextually relevant responses. This guide explores the architecture of RAG systems, implementation strategies, and real-world applications in question-answering, document analysis, and more.",
      date: "2024-01-10",
      readTime: "12 min read",
      tags: JSON.stringify(["RAG", "LLM", "AI"]),
      slug: "rag-systems-future-ai"
    },
    {
      title: "Optimizing LLM Performance for Production",
      excerpt: "Best practices and techniques for deploying large language models in production environments.",
      content: "Deploying large language models in production requires careful consideration of performance, cost, and reliability. This article covers quantization techniques, model optimization, caching strategies, and load balancing. We'll discuss how to choose the right infrastructure, implement efficient inference pipelines, and monitor model performance in real-time.",
      date: "2024-01-05",
      readTime: "10 min read",
      tags: JSON.stringify(["LLM", "Production", "Optimization"]),
      slug: "optimizing-llm-performance"
    },
    {
      title: "Computer Vision with OpenCV and Python",
      excerpt: "Getting started with computer vision projects using OpenCV library and Python programming.",
      content: "OpenCV is one of the most popular libraries for computer vision tasks. In this tutorial, we'll cover image processing fundamentals, feature detection, object recognition, and video analysis. Whether you're building a security system, autonomous vehicle, or medical imaging application, OpenCV provides the tools you need.",
      date: "2023-12-28",
      readTime: "15 min read",
      tags: JSON.stringify(["Computer Vision", "OpenCV", "Python"]),
      slug: "computer-vision-opencv-python"
    }
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: post,
    });
  }

  console.log('✅ Database seeded with blog posts!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

