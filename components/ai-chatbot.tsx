"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageSquare,
  Send,
  X,
  Minimize2,
  Maximize2,
  ExternalLink,
  Brain,
  Bot,
  Code,
  Database,
  Globe,
  Smartphone,
  PenTool,
  BarChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Message = {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  hasAction?: boolean
  actionType?: "whatsapp" | "email" | "link"
  actionText?: string
  actionUrl?: string
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! I'm JOMIEZ AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // WhatsApp contact information
  const whatsappNumber = "2349119404716"
  const welcomeMessage = "Welcome to Jomiez Digital Innovation. How may we be of service?"
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(welcomeMessage)}`
  const emailAddress = "timtemple2024@gmail.com"
  const emailUrl = `mailto:${emailAddress}`
  const phoneNumber = "+2347030454298"

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  // JOMIEZ Knowledge Base - comprehensive company information
  const jomiezKnowledgeBase = {
    company: {
      name: "JOMIEZ",
      founded: 2021,
      description:
        "JOMIEZ is a cutting-edge digital innovation studio specializing in Web3 development, AI integration, mobile applications, and custom software solutions. With over 10 years of experience, we've helped businesses of all sizes transform their digital presence through innovative technology and exceptional design.",
      founder: {
        name: "Templeton DC",
        bio: "Templeton DC is the visionary founder and CEO of JOMIEZ Digital Innovation. With a background in computer science and over 5 years of experience in software development, Templeton founded JOMIEZ in 2021 with a mission to help businesses leverage cutting-edge technology for digital transformation. His expertise spans Web3 technologies, AI integration, and enterprise software architecture. Templeton is passionate about creating digital solutions that not only meet current needs but anticipate future technological trends.",
        vision:
          "Templeton's vision for JOMIEZ is to be at the forefront of digital innovation, creating solutions that seamlessly blend technology with human-centered design. He believes in building long-term partnerships with clients and delivering solutions that provide measurable business value.",
        achievements:
          "Under Templeton's leadership, JOMIEZ has grown from a small startup to a respected digital innovation studio with clients across multiple continents. He has been recognized with several industry awards for innovation and business leadership.",
        contact: "timtemple2024@gmail.com",
      },
      team: {
        size: "20+ team members",
        leadership: [
          {
            name: "Templeton DC",
            position: "CEO & Founder",
            expertise: "Business Strategy, Web3 Technology, Enterprise Architecture, AI Integration",
          },
          {
            name: "Sarah Johnson",
            position: "Lead Developer",
            expertise: "Full-Stack Development, System Architecture, Cloud Solutions",
          },
          {
            name: "Michael Chen",
            position: "UI/UX Designer",
            expertise: "User Experience, Interface Design, Brand Strategy",
          },
          {
            name: "Emily Rodriguez",
            position: "Project Manager",
            expertise: "Agile Methodologies, Team Leadership, Client Relations",
          },
        ],
      },
      milestones: [
        {
          year: 2013,
          event: "Company Founded",
          description: "JOMIEZ Technologies was established with a vision to deliver innovative digital solutions.",
        },
        {
          year: 2015,
          event: "First Major Client",
          description: "Secured our first enterprise client and expanded the team to 10 professionals.",
        },
        {
          year: 2017,
          event: "Expanding Services",
          description: "Added mobile app development and UI/UX design to our service offerings.",
        },
        {
          year: 2019,
          event: "International Expansion",
          description: "Opened our first international office and started serving clients globally.",
        },
        {
          year: 2021,
          event: "Major Recognition",
          description: "Received multiple industry awards for our innovative projects and designs.",
        },
        {
          year: 2023,
          event: "Technology Partnership",
          description: "Formed strategic partnerships with leading technology companies.",
        },
        {
          year: 2024,
          event: "Today",
          description:
            "Continuing to innovate and deliver exceptional digital experiences for our growing client base.",
        },
      ],
      awards: [
        { title: "Best Web Design Agency", org: "Design Awards", year: "2024" },
        { title: "Excellence in UX", org: "UX/UI Awards", year: "2024" },
        { title: "Best Mobile App Design", org: "Mobile Excellence Awards", year: "2023" },
        { title: "Innovation in Web Development", org: "Tech Innovation Awards", year: "2023" },
      ],
      statistics: {
        projects: "250+",
        clients: "100+",
        countries: "25+",
        satisfaction: "99.8%",
      },
    },
    services: [
      {
        name: "Web3 Development",
        icon: <Globe className="h-5 w-5" />,
        description:
          "We create decentralized applications and blockchain solutions that leverage the power of Web3 technologies. Our expertise includes smart contract development, NFT marketplaces, DeFi applications, and integration with popular blockchain networks.",
        technologiesUsed: ["Ethereum", "Solidity", "Web3.js", "IPFS", "Hardhat"],
        useCases: [
          "NFT Marketplaces",
          "Decentralized Finance",
          "Smart Contracts",
          "Supply Chain Tracking",
          "Digital Identity Solutions",
        ],
      },
      {
        name: "AI-Powered Mobile Apps",
        icon: <Smartphone className="h-5 w-5" />,
        description:
          "Native and cross-platform mobile applications with integrated AI capabilities for iOS and Android that deliver exceptional user experiences. We employ sophisticated machine learning algorithms to create intelligent, context-aware applications.",
        technologiesUsed: ["React Native", "Flutter", "Swift", "Kotlin", "TensorFlow", "PyTorch"],
        useCases: [
          "Predictive User Interfaces",
          "Smart Content Curation",
          "Voice Assistants",
          "Image Recognition",
          "Personalized Recommendations",
        ],
      },
      {
        name: "Custom Software",
        icon: <Code className="h-5 w-5" />,
        description:
          "Tailored software solutions with machine learning integration designed to address your specific business challenges and requirements. We build scalable, future-proof applications that grow with your business.",
        technologiesUsed: ["React", "Node.js", "Python", "Java", "GraphQL", "AWS", "Docker"],
        useCases: [
          "Enterprise Resource Planning",
          "Customer Relationship Management",
          "Business Process Automation",
          "Data Analytics Platforms",
        ],
      },
      {
        name: "Cloud & Edge Computing",
        icon: <Database className="h-5 w-5" />,
        description:
          "Scalable, secure cloud infrastructure with edge computing capabilities to optimize performance and reduce latency. Our solutions ensure your applications run efficiently regardless of user location or device.",
        technologiesUsed: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Docker", "Terraform"],
        useCases: [
          "Global Application Deployment",
          "IoT Device Networks",
          "Real-time Data Processing",
          "Content Delivery Networks",
        ],
      },
      {
        name: "Immersive UI/UX Design",
        icon: <PenTool className="h-5 w-5" />,
        description:
          "User-centered design with AR/VR capabilities that combines aesthetics with functionality to create engaging digital experiences. We focus on creating intuitive interfaces that delight users.",
        technologiesUsed: ["Figma", "Adobe XD", "Sketch", "Three.js", "WebGL", "Unity"],
        useCases: [
          "Virtual Showrooms",
          "Interactive Product Experiences",
          "Training Simulations",
          "Gaming Applications",
        ],
      },
      {
        name: "AI-Driven Analytics",
        icon: <BarChart className="h-5 w-5" />,
        description:
          "Advanced analytics and business intelligence solutions powered by artificial intelligence to drive data-informed decisions. Turn your raw data into actionable insights with our sophisticated analytics tools.",
        technologiesUsed: ["TensorFlow", "PyTorch", "scikit-learn", "Tableau", "Power BI", "Python"],
        useCases: [
          "Predictive Analytics",
          "Customer Behavior Analysis",
          "Market Trend Forecasting",
          "Supply Chain Optimization",
        ],
      },
    ],
    technologies: [
      {
        category: "Frontend",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      },
      {
        category: "Backend",
        items: ["Node.js", "Express", "Python", "Django", "GraphQL"],
      },
      {
        category: "Database",
        items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
      },
      {
        category: "Mobile",
        items: ["React Native", "Flutter", "Expo", "iOS", "Android"],
      },
      {
        category: "DevOps",
        items: ["Docker", "Kubernetes", "AWS", "Vercel", "CI/CD"],
      },
      {
        category: "AI & ML",
        items: ["TensorFlow", "PyTorch", "Hugging Face", "OpenAI API", "LangChain"],
      },
      {
        category: "Web3",
        items: ["Ethereum", "Solidity", "Web3.js", "IPFS", "Hardhat"],
      },
    ],
    projects: [
      {
        title: "E-Commerce Platform",
        category: "Web Development",
        description:
          "A comprehensive e-commerce solution with advanced product filtering, secure payment processing, and customer management features. The platform includes real-time inventory tracking and integrates with multiple payment gateways.",
        technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "AWS"],
        results: "Increased client's online sales by 245% in the first year",
      },
      {
        title: "Mobile Banking App",
        category: "Mobile App",
        description:
          "A secure and user-friendly mobile banking application with real-time transaction tracking and financial management tools. Features include biometric authentication, spending analytics, and investment tracking.",
        technologies: ["React Native", "Firebase", "Redux", "Plaid API", "Biometric Authentication"],
        results: "Over 500,000 downloads with 4.8/5 rating on app stores",
      },
      {
        title: "Corporate Website Redesign",
        category: "Web Development",
        description:
          "A complete redesign of a corporate website with improved user experience, performance optimization, and content management system. Emphasized accessibility and mobile responsiveness.",
        technologies: ["React", "Tailwind CSS", "Sanity CMS", "Framer Motion", "Vercel"],
        results: "Reduced bounce rate by 40% and increased lead generation by 65%",
      },
      {
        title: "Inventory Management System",
        category: "Software",
        description:
          "A robust inventory management system with barcode scanning, real-time stock tracking, and automated reordering capabilities. Includes supplier management and detailed reporting features.",
        technologies: ["Vue.js", "Express", "PostgreSQL", "Docker", "WebSockets"],
        results: "Reduced inventory discrepancies by 95% and operational costs by 35%",
      },
      {
        title: "Healthcare Patient Portal",
        category: "Web Development",
        description:
          "A secure patient portal for healthcare providers with appointment scheduling, medical record access, and telemedicine integration. Fully HIPAA compliant with encrypted data storage.",
        technologies: ["Angular", "Node.js", "MongoDB", "Socket.io", "HIPAA Compliance"],
        results: "Increased patient engagement by 78% and reduced administrative workload by 45%",
      },
      {
        title: "Fitness Tracking App",
        category: "Mobile App",
        description:
          "A comprehensive fitness tracking application with workout plans, progress monitoring, and social sharing features. Includes AI-powered form correction and personalized workout recommendations.",
        technologies: ["Flutter", "Firebase", "Google Fit API", "Apple HealthKit", "Machine Learning"],
        results: "85% user retention rate after 3 months, with users reporting 60% better workout consistency",
      },
    ],
    clientTestimonials: [
      {
        name: "David Wilson",
        position: "CEO, TechStart Inc.",
        testimony:
          "JOMIEZ transformed our digital presence with a stunning website and AI-powered CRM solution. Their team's expertise and dedication to our project exceeded our expectations at every stage.",
      },
      {
        name: "Jennifer Lee",
        position: "Marketing Director, GrowthHub",
        testimony:
          "Working with JOMIEZ was a game-changer for our business. Their mobile app development skills are unmatched, and they delivered a product with cutting-edge features that our customers love. The attention to detail was impressive.",
      },
      {
        name: "Robert Martinez",
        position: "Founder, EcoSolutions",
        testimony:
          "The team at JOMIEZ brought our vision to life with their innovative approach and technical expertise. They integrated blockchain solutions that revolutionized our business model. They were responsive, professional, and delivered on time.",
      },
    ],
    faq: [
      {
        question: "What technologies do you specialize in?",
        answer:
          "We specialize in a wide range of technologies including React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, AWS, and more. Our team stays up-to-date with the latest advancements to ensure we're using the most efficient and effective tools for each project.",
      },
      {
        question: "How long does a typical project take to complete?",
        answer:
          "Project timelines vary depending on complexity, scope, and specific requirements. A small website might take 2-4 weeks, while a complex web application could take 3-6 months. During our initial consultation, we'll provide a detailed timeline based on your specific project needs.",
      },
      {
        question: "Do you offer ongoing support and maintenance?",
        answer:
          "Yes, we offer various support and maintenance packages to ensure your digital solutions continue to perform optimally after launch. These can include regular updates, security monitoring, performance optimization, content updates, and technical support.",
      },
      {
        question: "What is your development process like?",
        answer:
          "Our development process follows an agile methodology with five key phases: Discovery & Planning, Design, Development, Testing & QA, and Deployment & Support. We maintain transparent communication throughout, with regular updates and opportunities for feedback.",
      },
      {
        question: "How do you handle project pricing?",
        answer:
          "We offer flexible pricing models including fixed-price quotes, hourly rates, and retainer agreements depending on the nature of your project. Following an initial consultation where we understand your requirements, we provide a detailed proposal outlining the scope, timeline, and associated costs.",
      },
    ],
  }

  // Natural language understanding capabilities
  const companyNameVariations = [
    "jomiez",
    "company",
    "you",
    "your company",
    "this company",
    "business",
    "agency",
    "studio",
    "firm",
    "organization",
  ]
  const serviceKeywords = {
    web3: [
      "web3",
      "blockchain",
      "crypto",
      "nft",
      "defi",
      "decentralized",
      "ethereum",
      "smart contract",
      "token",
      "web 3",
    ],
    mobile: ["mobile", "app", "ios", "android", "smartphone", "tablet", "react native", "flutter", "hybrid"],
    ai: [
      "ai",
      "artificial intelligence",
      "machine learning",
      "ml",
      "deep learning",
      "neural",
      "algorithm",
      "prediction",
      "data science",
    ],
    software: [
      "software",
      "custom",
      "development",
      "application",
      "enterprise",
      "solution",
      "system",
      "platform",
      "saas",
    ],
    cloud: ["cloud", "aws", "azure", "gcp", "serverless", "infrastructure", "devops", "hosting", "deployment"],
    design: [
      "design",
      "ui",
      "ux",
      "user interface",
      "user experience",
      "wireframe",
      "prototype",
      "figma",
      "sketch",
      "adobe",
    ],
  }

  // Information extraction functions
  const extractNameEntities = (text: string) => {
    const lowerText = text.toLowerCase()
    // Check for company name references
    return companyNameVariations.some((name) => lowerText.includes(name))
  }

  const extractServiceTypes = (text: string) => {
    const lowerText = text.toLowerCase()
    const matchedServices = []

    for (const [service, keywords] of Object.entries(serviceKeywords)) {
      if (keywords.some((keyword) => lowerText.includes(keyword))) {
        matchedServices.push(service)
      }
    }

    return matchedServices
  }

  const containsQuestion = (text: string) => {
    return (
      text.includes("?") ||
      text.toLowerCase().includes("what") ||
      text.toLowerCase().includes("how") ||
      text.toLowerCase().includes("who") ||
      text.toLowerCase().includes("when") ||
      text.toLowerCase().includes("where") ||
      text.toLowerCase().includes("why") ||
      text.toLowerCase().includes("which") ||
      text.toLowerCase().includes("can you") ||
      text.toLowerCase().includes("do you")
    )
  }

  // Advanced intent recognition
  const recognizeIntent = (text: string) => {
    const lowerText = text.toLowerCase()

    // Founder-specific intents
    if (/founder|ceo|templeton|dc|creator|started|who made|who created|who started|who founded/.test(lowerText)) {
      return "founder_info"
    }

    // Greeting intents
    if (/^(hi|hello|hey|greetings|good (morning|afternoon|evening))/.test(lowerText)) {
      return "greeting"
    }

    // Company information intents
    if (
      extractNameEntities(text) &&
      (lowerText.includes("about") ||
        lowerText.includes("info") ||
        lowerText.includes("tell me about") ||
        lowerText.includes("who is") ||
        lowerText.includes("what is"))
    ) {
      return "company_info"
    }

    // Contact/team connection requests
    if (/contact|connect|reach|talk|speak|team|call|human|person|support|help/.test(lowerText)) {
      if (/team|human|person|agent|representative|manager/.test(lowerText)) {
        return "connect_team"
      }
      return "contact"
    }

    // WhatsApp specific requests
    if (/whatsapp|phone|call|text|message/.test(lowerText)) {
      return "whatsapp"
    }

    // Email specific requests
    if (/email|mail|e-mail|send|write/.test(lowerText)) {
      return "email"
    }

    // Project/service inquiries
    if (/project|service|work|hire|cost|price|quote|estimate/.test(lowerText)) {
      return "project_inquiry"
    }

    // Case studies/portfolio
    if (/case study|case studies|portfolio|work|example|showcase|project/.test(lowerText)) {
      return "portfolio"
    }

    // Timeline questions
    if (/how long|timeline|duration|turnaround|time frame|deadline|finish|complete/.test(lowerText)) {
      return "timeline"
    }

    // Technology questions
    if (/tech|technology|stack|framework|language|platform|tool/.test(lowerText)) {
      const services = extractServiceTypes(text)
      if (services.length > 0) {
        return `tech_${services[0]}`
      }
      return "tech_general"
    }

    // Team questions
    if (/team|staff|employee|developer|designer|expert|specialist/.test(lowerText)) {
      return "team"
    }

    // Process questions
    if (/process|methodology|approach|step|phase|method|workflow|agile|scrum/.test(lowerText)) {
      return "process"
    }

    // Year/founding questions
    if (/found|start|create|begin|year|old|long|experience|establish/.test(lowerText)) {
      return "founding"
    }

    // Location questions
    if (/where|location|office|address|city|country|remote/.test(lowerText)) {
      return "location"
    }

    // Owner questions
    if (/owner|founder|ceo|president|director|lead|chief|executive/.test(lowerText)) {
      return "owner"
    }

    // FAQ-type questions
    if (containsQuestion(text)) {
      // Try to match with one of our FAQs
      for (const faq of jomiezKnowledgeBase.faq) {
        const questionKeywords = faq.question.toLowerCase().split(" ")
        const matchCount = questionKeywords.filter((word) => word.length > 4 && lowerText.includes(word)).length
        if (matchCount >= 2) {
          return "faq_match"
        }
      }
      return "question"
    }

    // Fallback for when we can't determine intent
    return "general"
  }

  // Process user message and generate appropriate response based on intent and context
  const processMessage = (userMessage: string) => {
    // Identify the intent of the user message
    const intent = recognizeIntent(userMessage)
    const lowerCaseMessage = userMessage.toLowerCase()

    // Generate responses based on intent
    switch (intent) {
      case "founder_info":
        return {
          text: `JOMIEZ was founded by ${jomiezKnowledgeBase.company.founder.name}, who currently serves as our CEO. ${jomiezKnowledgeBase.company.founder.bio}\n\n${jomiezKnowledgeBase.company.founder.vision}\n\nUnder his leadership, JOMIEZ has grown from a small startup to a respected digital innovation studio with clients across multiple continents. You can reach him directly at ${jomiezKnowledgeBase.company.founder.contact}.`,
        }
      case "greeting":
        return {
          text: "Hello! I'm the JOMIEZ AI assistant. I can provide information about our services, projects, team, and more. How can I help you today?",
        }

      case "company_info":
        return {
          text: `${jomiezKnowledgeBase.company.description} We were founded in ${jomiezKnowledgeBase.company.founded} and have worked on ${jomiezKnowledgeBase.company.statistics.projects} projects across ${jomiezKnowledgeBase.company.statistics.countries} with a client satisfaction rate of ${jomiezKnowledgeBase.company.statistics.satisfaction}.`,
        }

      case "connect_team":
        return {
          text: "I'd be happy to connect you with our team! They're experts in digital innovation and can provide personalized guidance for your specific needs. You can reach them directly via WhatsApp for the fastest response.",
          hasAction: true,
          actionType: "whatsapp",
          actionText: "Contact our team",
          actionUrl: whatsappUrl,
        }

      case "contact":
        return {
          text: "You can reach our team through several channels. For the quickest response, WhatsApp is recommended, or you can email us directly. Our team typically responds within 1-2 hours during business hours.",
          hasAction: true,
          actionType: "whatsapp",
          actionText: "Contact via WhatsApp",
          actionUrl: whatsappUrl,
        }

      case "whatsapp":
        return {
          text: "You can reach our team directly via WhatsApp at any time. Our client success managers are ready to assist you with any questions or project discussions.",
          hasAction: true,
          actionType: "whatsapp",
          actionText: "Open WhatsApp Chat",
          actionUrl: whatsappUrl,
        }

      case "email":
        return {
          text: "You can reach our team directly via email. Our client success managers are ready to assist you with any questions or project discussions.",
          hasAction: true,
          actionType: "email",
          actionText: "Send Email",
          actionUrl: emailUrl,
        }

      case "project_inquiry":
        const matchedServices = extractServiceTypes(userMessage)
        let serviceText = ""

        if (matchedServices.length > 0) {
          const serviceType = matchedServices[0]
          const relevantService = jomiezKnowledgeBase.services.find(
            (s) => s.name.toLowerCase().includes(serviceType) || s.description.toLowerCase().includes(serviceType),
          )

          if (relevantService) {
            serviceText = ` I see you're interested in our ${relevantService.name} services. ${relevantService.description.split(".")[0]}.`
          }
        }

        return {
          text: `We'd be happy to discuss your project needs!${serviceText} To provide an accurate quote and timeline, our team would need some details about your specific requirements. Would you like to connect with them directly?`,
          hasAction: true,
          actionType: "whatsapp",
          actionText: "Discuss Your Project",
          actionUrl: whatsappUrl,
        }

      case "portfolio":
        let projectText = ""
        const relevantProjects = jomiezKnowledgeBase.projects.slice(0, 3)
        projectText = relevantProjects.map((p) => `- ${p.title}: ${p.description.split(".")[0]}`).join("\n\n")

        return {
          text: `JOMIEZ has delivered over ${jomiezKnowledgeBase.company.statistics.projects} successful projects. Here are a few notable examples:\n\n${projectText}\n\nWould you like me to share more details about any specific project?`,
        }

      case "timeline":
        return {
          text: "Project timelines vary based on complexity and requirements. Typically, our projects range from 4-8 weeks for smaller websites to 3-6 months for complex applications. We follow an agile methodology with regular deliverables and updates throughout the development process. Would you like to discuss timeline estimates for your specific project?",
          hasAction: true,
          actionType: "whatsapp",
          actionText: "Get Timeline Estimate",
          actionUrl: whatsappUrl,
        }

      case "tech_general":
        const techStack = jomiezKnowledgeBase.technologies
          .map((t) => `${t.category}: ${t.items.slice(0, 3).join(", ")}`)
          .join("\n")
        return {
          text: `At JOMIEZ, we leverage cutting-edge technologies to build robust digital solutions. Some of the key technologies we work with include:\n\n${techStack}\n\nOur team continuously stays updated with the latest advancements to ensure we deliver future-proof solutions.`,
        }

      case "tech_web3":
        return {
          text: `For Web3 development, we specialize in technologies like ${jomiezKnowledgeBase.technologies.find((t) => t.category === "Web3")?.items.join(", ")}. Our Web3 solutions include decentralized applications (dApps), NFT marketplaces, smart contracts, and blockchain integrations that provide transparency, security, and efficiency. Would you like to learn more about our Web3 capabilities?`,
        }

      case "tech_mobile":
        return {
          text: `For mobile app development, we work with ${jomiezKnowledgeBase.technologies.find((t) => t.category === "Mobile")?.items.join(", ")}. We build native and cross-platform applications with integrated AI capabilities, delivering exceptional user experiences across iOS and Android platforms.`,
        }

      case "tech_ai":
        return {
          text: `For AI and machine learning solutions, we utilize ${jomiezKnowledgeBase.technologies.find((t) => t.category === "AI & ML")?.items.join(", ")}. Our AI expertise enables us to create intelligent applications with features like predictive analytics, natural language processing, computer vision, and personalized recommendations.`,
        }

      case "team":
        const leadershipTeam = jomiezKnowledgeBase.company.team.leadership
          .map((member) => `${member.name}, ${member.position} - ${member.expertise}`)
          .join("\n")
        return {
          text: `JOMIEZ has ${jomiezKnowledgeBase.company.team.size} comprising developers, designers, project managers, and digital strategists. Our leadership team includes:\n\n${leadershipTeam}\n\nEach project is assigned a dedicated team with the specific expertise required for success.`,
        }

      case "process":
        return {
          text: "At JOMIEZ, we follow an agile development methodology with five key phases: 1) Discovery & Planning, 2) Design, 3) Development, 4) Testing & QA, and 5) Deployment & Support. We maintain transparent communication throughout, with regular updates and opportunities for feedback. This approach ensures we deliver high-quality solutions that align perfectly with client needs.",
        }

      case "founding":
        const foundingInfo = jomiezKnowledgeBase.company.milestones.find(
          (m) => m.year === jomiezKnowledgeBase.company.founded,
        )
        return {
          text: `JOMIEZ was founded in ${jomiezKnowledgeBase.company.founded}. ${foundingInfo?.description} We've since grown to ${jomiezKnowledgeBase.company.team.size} and completed over ${jomiezKnowledgeBase.company.statistics.projects} projects for clients across ${jomiezKnowledgeBase.company.statistics.countries}.`,
        }

      case "location":
        return {
          text: "JOMIEZ operates globally with our main headquarters and additional offices in key technology hubs. We also maintain a distributed team of experts across multiple time zones, allowing us to provide responsive service to clients worldwide. Would you like to connect with our team to learn more?",
          hasAction: true,
          actionText: "Contact our team",
          actionUrl: whatsappUrl,
        }

      case "owner":
        const founder = jomiezKnowledgeBase.company.team.leadership[0]
        return {
          text: `JOMIEZ was founded by ${founder.name}, who serves as our ${founder.position}. With expertise in ${founder.expertise}, Templeton leads our vision of transforming businesses through innovative digital solutions. Our leadership team also includes experts in development, design, and project management.`,
        }

      case "faq_match":
        // Find the best matching FAQ
        let bestMatch = { question: "", answer: "", score: 0 }
        for (const faq of jomiezKnowledgeBase.faq) {
          const questionKeywords = faq.question.toLowerCase().split(" ")
          const matchCount = questionKeywords.filter(
            (word) => word.length > 4 && lowerCaseMessage.includes(word),
          ).length
          if (matchCount > bestMatch.score) {
            bestMatch = { ...faq, score: matchCount }
          }
        }
        return {
          text: bestMatch.answer,
        }

      case "question":
        // Try to extract what the question is about
        if (lowerCaseMessage.includes("service") || extractServiceTypes(userMessage).length > 0) {
          const servicesList = jomiezKnowledgeBase.services.map((s) => s.name).join(", ")
          return {
            text: `JOMIEZ offers a comprehensive range of digital services including ${servicesList}. Each service is tailored to meet the specific needs of our clients. Would you like more information about any particular service?`,
          }
        }

        if (lowerCaseMessage.includes("project") || lowerCaseMessage.includes("portfolio")) {
          return {
            text: `We've successfully delivered over ${jomiezKnowledgeBase.company.statistics.projects} projects across various industries including e-commerce, healthcare, finance, and entertainment. Our portfolio includes web applications, mobile apps, AI solutions, and blockchain projects. Would you like me to share some case studies?`,
          }
        }

        if (
          lowerCaseMessage.includes("cost") ||
          lowerCaseMessage.includes("price") ||
          lowerCaseMessage.includes("pricing")
        ) {
          return {
            text: "We offer customized pricing based on the specific requirements of each project. Factors that influence pricing include project complexity, timeline, features, and ongoing support needs. Our team would be happy to provide a detailed quote after understanding your project scope.",
            hasAction: true,
            actionType: "whatsapp",
            actionText: "Get a Quote",
            actionUrl: whatsappUrl,
          }
        }

        // If we can't determine what the question is about, provide a friendly response and offer to connect with the team
        return {
          text: "That's a great question! While I have information about our services, projects, and company, I might not have all the specific details you need. For more in-depth information, I'd recommend connecting with our team who can provide personalized answers to your questions and address your specific needs.",
          hasAction: true,
          actionType: "whatsapp",
          actionText: "Ask the JOMIEZ Team",
          actionUrl: whatsappUrl,
        }
      default:
        // If no specific intent is recognized or for general inquiries
        // Use context from the conversation to provide a relevant response
        if (extractServiceTypes(userMessage).length > 0) {
          const serviceType = extractServiceTypes(userMessage)[0]
          const relevantService = jomiezKnowledgeBase.services.find(
            (s) => s.name.toLowerCase().includes(serviceType) || s.description.toLowerCase().includes(serviceType),
          )

          if (relevantService) {
            return {
              text: `${relevantService.description} Would you like to learn more about our ${relevantService.name} capabilities or discuss a potential project?`,
            }
          }
        }

        // Check if the message mentions any of our technologies
        for (const techCategory of jomiezKnowledgeBase.technologies) {
          for (const tech of techCategory.items) {
            if (lowerCaseMessage.includes(tech.toLowerCase())) {
              return {
                text: `Yes, we have expertise in ${tech}! It's one of the technologies we use in our ${techCategory.category} stack. Would you like to know more about how we use ${tech} in our projects?`,
              }
            }
          }
        }

        // Intelligent fallback responses based on context
        const contextualResponses = [
          `I understand you're interested in learning more about JOMIEZ. We're a digital innovation studio specializing in Web3, AI, and custom software development. How can I help you with your specific needs?`,
          `Thank you for your message. JOMIEZ has been delivering cutting-edge digital solutions since 2013, with expertise in web development, mobile apps, and immersive experiences. What aspect of our services are you most interested in?`,
          `I'd be happy to provide more information about how JOMIEZ can help with your digital needs. We offer everything from Web3 development to AI-powered applications. Could you share a bit more about your project or requirements?`,
          `JOMIEZ specializes in transforming ideas into powerful digital experiences. Our team of experts can guide you through the entire process from concept to deployment. Would you like to know more about our approach?`,
          `As JOMIEZ's AI assistant, I can provide information about our services, projects, and expertise. For more detailed discussions about your specific needs, our team would be happy to connect with you directly.`,
        ]

        // Choose a contextual response based on a simple hash of the message to ensure variety
        const responseIndex =
          Math.abs(userMessage.split("").reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0)) %
          contextualResponses.length

        return {
          text: contextualResponses[responseIndex],
        }
    }
  }

  const handleSend = () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Show typing indicator
    setIsTyping(true)

    // Process the message and generate response
    const response = processMessage(input)

    // Simulate AI response with typing delay - vary based on message length for realism
    const responseLength = response.text.length
    const typingSpeed = 15 // characters per second
    const minDelay = 1000 // minimum delay in ms
    const maxDelay = 3500 // maximum delay in ms

    // Calculate delay based on message length, with min and max limits
    const calculatedDelay = Math.min(maxDelay, Math.max(minDelay, (responseLength / typingSpeed) * 1000))

    setTimeout(() => {
      setIsTyping(false)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        hasAction: response.hasAction,
        actionType: response.actionType,
        actionText: response.actionText,
        actionUrl: response.actionUrl,
      }

      setMessages((prev) => [...prev, botMessage])
    }, calculatedDelay)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  return (
    <>
      <motion.button
        className="fixed bottom-20 left-6 z-50 w-10 h-10 rounded-full bg-[#ff4d4d] text-white flex items-center justify-center shadow-lg"
        whilehover={{ scale: 1.1, boxShadow: "0 0 15px rgba(255, 77, 77, 0.5)" }}
        whiletap={{ scale: 0.9 }}
        onClick={toggleChat}
      >
        <MessageSquare size={18} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "450px",
              width: isMinimized ? "auto" : "300px",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-20 left-6 bg-[#151515] rounded-lg shadow-xl overflow-hidden z-50 border border-[#333]"
          >
            {/* Chat header */}
            <div className="bg-[#ff4d4d] p-3 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2 text-sm">
                <Brain size={16} />
                JOMIEZ AI Assistant
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:bg-[#ff3333]"
                  onClick={toggleMinimize}
                >
                  {isMinimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:bg-[#ff3333]"
                  onClick={toggleChat}
                >
                  <X size={12} />
                </Button>
              </div>
            </div>

            {/* Chat messages */}
            {!isMinimized && (
              <div className="h-[340px] overflow-y-auto p-4 flex flex-col gap-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-lg ${
                        message.sender === "user" ? "bg-[#ff4d4d] text-white" : "bg-[#333] text-white"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>

                      {/* Action button for WhatsApp or other actions */}
                      {message.hasAction && message.actionUrl && (
                        <motion.a
                          href={message.actionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md ${
                            message.actionType === "whatsapp"
                              ? "bg-[#25D366] text-white"
                              : message.actionType === "email"
                                ? "bg-[#4285F4] text-white"
                                : "bg-blue-600 text-white"
                          }`}
                          whilehover={{ scale: 1.05 }}
                          whiletap={{ scale: 0.95 }}
                        >
                          {message.actionText || "Open Link"}
                          <ExternalLink size={12} />
                        </motion.a>
                      )}

                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[85%] p-3 rounded-lg bg-[#333] text-white">
                      <div className="flex space-x-1 items-center">
                        <Bot size={14} className="text-[#ff4d4d] mr-2" />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.1 }}
                          className="w-2 h-2 bg-white/70 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.2, delay: 0.1 }}
                          className="w-2 h-2 bg-white/70 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.3, delay: 0.2 }}
                          className="w-2 h-2 bg-white/70 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Chat input */}
            {!isMinimized && (
              <div className="p-3 border-t border-[#333] flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="bg-[#222] border-[#444] focus-visible:ring-[#ff4d4d] text-white text-sm h-9"
                />
                <Button
                  onClick={handleSend}
                  className="bg-[#ff4d4d] hover:bg-[#ff3333] text-white h-9 w-9 p-0"
                  disabled={isTyping || input.trim() === ""}
                >
                  <Send size={16} />
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
