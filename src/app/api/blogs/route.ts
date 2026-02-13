import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all blogs
export async function GET() {
  try {
    let blogs = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // If no blogs exist, seed with sample data
    if (blogs.length === 0) {
      const sampleBlogs = [
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

      for (const blog of sampleBlogs) {
        await prisma.blogPost.create({ data: blog });
      }

      blogs = await prisma.blogPost.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST create new blog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, excerpt, content, date, readTime, tags, slug } = body;

    if (!title || !excerpt || !content || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields: title, excerpt, content, slug' },
        { status: 400 }
      );
    }

    const blog = await prisma.blogPost.create({
      data: {
        title,
        excerpt,
        content,
        date: date || new Date().toISOString().split('T')[0],
        readTime: readTime || '5 min read',
        tags: JSON.stringify(tags || []),
        slug,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}

