export type Education = {
        degree: string
        institution: string
        year: string
}

export type Project = {
        name: string
        year: string
        description: string
}

export type InstagramPost = {
        id: string
        image: string
        caption: string
        likes: number
        comments: number
        date: string
}

export type TeamMember = {
        slug: string
        name: string
        position: string
        image: string
        age: number
        location: string
        education: Education[]
        bio: string
        skills: string[]
        languages: string[]
        social: {
                linkedin: string
                twitter: string
                github: string
                instagram: string
        }
        projects: Project[]
        instagramPosts: InstagramPost[]
}

const teamMembers: TeamMember[] = [
        {
                slug: "templeton-dc",
                name: "Templeton DC",
                position: "CEO & Founder",
                image: "/team-member-4.jpg",
                age: 20,
                location: "Enugu state, Nigeria ",
                bio: "Templeton is the visionary founder and CEO of our company with over 5 years of experience in the tech industry. He founded the company with a mission to create innovative solutions that solve real-world problems. His leadership and strategic vision have been instrumental in the company's growth and success.",
                education: [
                        {
                                degree: "Bsc in Mechanical And Production Engineering ",
                                institution: "Enugu state university (ESUT)",
                                year: "2022 till date",
                        },
                        {
                                degree: "software development", // Corrected here
                                institution: "C-web technology ",
                                year: "2021 - 2025",
                        },
                ],
                skills: [
                        "Strategic Planning",
                        "Business Development",
                        "Team Leadership",
                        "Product Vision",
                        "Entrepreneurship",
                        "Public Speaking",
                        "Venture Capital",
                        "Market Analysis",
                ],
                languages: ["English (Native)", "Spanish (Not-Fluent)", "French (A little)"],
                social: {
                        linkedin: "#",
                        twitter: "#",
                        github: "#",
                        instagram: "https://instagram.com/unseenme_._",
                },
                projects: [
                        {
                                name: "Company Foundation",
                                year: "2022",
                                description: "Founded the company with a vision to revolutionize the tech industry with innovative solutions.",
                        },
                        {
                                name: "Series A Funding",
                                year: "2022",
                                description:
                                        "Successfully secured $5 in Series A funding to accelerate product development and market expansion.",
                        },
                        {
                                name: "Global Expansion",
                                year: "2022",
                                description:
                                        "Led the company's expansion into European and Asian markets, establishing offices in London and Singapore.",
                        },
                ],
                instagramPosts: [
                        {
                                id: "post1",
                                image: "/instagram/ceo-conference.jpg",
                                caption: "Sharing insights at the annual Tech Leadership Summit #TechLeaders #Innovation",
                                likes: 1243,
                                comments: 89,
                                date: "2 days ago",
                        },
                        {
                                id: "post2",
                                image: "/instagram/ceo-team.jpg",
                                caption: "Celebrating our amazing team's achievements this quarter! #TeamSuccess #ProudCEO",
                                likes: 982,
                                comments: 56,
                                date: "1 week ago",
                        },
                        {
                                id: "post3",
                                image: "/instagram/ceo-office.jpg",
                                caption: "New office space, new possibilities. Excited for this next chapter! #NewBeginnings",
                                likes: 1567,
                                comments: 124,
                                date: "2 weeks ago",
                        },
                ],


        },
        {
                slug: "ruler-johnson",
                name: "Ruler Johnson",
                position: "Lead Developer",
                image: "/team-member-lead-dev.jpg",
                age: 23, // Corrected here, removed 'k'
                location: "Tokyo, Japan",
                bio: "Ruler is our exceptional Lead Developer with a passion for creating elegant solutions to complex problems. With expertise in multiple programming languages and frameworks, she leads our development team in building robust and scalable applications. Her attention to detail and commitment to code quality have been key to our technical success.",
                education: [
                        {
                                degree: "MSc in Computer Science",
                                institution: "University of Tokyo",
                                year: "2016 - 2018",
                        },
                        {
                                degree: "BSc in Software Engineering",
                                institution: "Kyoto University",
                                year: "2012 - 2016",
                        },
                ],
                skills: [
                        "Full Stack Development",
                        "System Architecture",
                        "React & Next.js",
                        "Node.js",
                        "TypeScript",
                        "Database Design",
                        "API Development",
                        "Cloud Infrastructure",
                        "DevOps",
                        "Team Leadership",
                ],
                languages: ["Japanese (Native)", "English (Fluent)", "Korean (Basic)"],
                social: {
                        linkedin: "#",
                        twitter: "#",
                        github: "#",
                        instagram: "#",
                },
                projects: [
                        {
                                name: "Core Platform Architecture",
                                year: "2021",
                                description:
                                        "Designed and implemented the core architecture for our flagship product, focusing on scalability and performance.",
                        },
                        {
                                name: "Microservices Migration",
                                year: "2022",
                                description:
                                        "Led the team in migrating our monolithic application to a microservices architecture, improving system reliability and development velocity.",
                        },
                        {
                                name: "Real-time Analytics Engine",
                                year: "2023",
                                description:
                                        "Developed a high-performance real-time analytics engine that processes millions of events per second with minimal latency.",
                        },
                ],
                instagramPosts: [
                        {
                                id: "post1",
                                image: "/instagram/dev-coding.jpg",
                                caption: "Late night coding session. Building something amazing! #CodeLife #Developer",
                                likes: 876,
                                comments: 42,
                                date: "3 days ago",
                        },
                        {
                                id: "post2",
                                image: "/instagram/dev-conference.jpg",
                                caption:
                                        "Speaking at ReactConf about our journey with Next.js. So many great questions! #ReactJS #NextJS #TechTalk",
                                likes: 1105,
                                comments: 78,
                                date: "1 week ago",
                        },
                        {
                                id: "post3",
                                image: "/instagram/dev-team.jpg",
                                caption: "Code review session with the team. Love how we all learn from each other! #TeamWork #CodeReview",
                                likes: 932,
                                comments: 51,
                                date: "2 weeks ago",
                        },
                ],
        },
        {
                slug: "milo-alex",
                name: "Milo Alex",
                position: "UI/UX Designer",
                image: "/team-member-ux-designer.jpg",
                age: 26,
                location: "Berlin, Germany",
                bio: "Milo is our creative UI/UX Designer who transforms complex requirements into intuitive and beautiful user experiences. With a background in both design and psychology, Milo brings a unique perspective to user interface design, focusing on creating experiences that are not only visually stunning but also highly functional and user-friendly.",
                education: [
                        {
                                degree: "MA in Interaction Design",
                                institution: "Berlin University of Arts",
                                year: "2018 - 2020",
                        },
                        {
                                degree: "BA in Visual Communication",
                                institution: "Hamburg School of Design",
                                year: "2014 - 2018",
                        },
                ],
                skills: [
                        "UI/UX Design",
                        "User Research",
                        "Wireframing & Prototyping",
                        "Visual Design",
                        "Interaction Design",
                        "Design Systems",
                        "Figma & Adobe Creative Suite",
                        "Motion Design",
                        "Accessibility",
                        "User Testing",
                ],
                languages: ["German (Native)", "English (Fluent)", "French (Intermediate)"],
                social: {
                        linkedin: "#",
                        twitter: "#",
                        github: "#",
                        instagram: "#",
                },
                projects: [
                        {
                                name: "Product Design System",
                                year: "2021",
                                description:
                                        "Created a comprehensive design system that improved design consistency and development efficiency across all our products.",
                        },
                        {
                                name: "Mobile App Redesign",
                                year: "2022",
                                description:
                                        "Led the complete redesign of our mobile application, resulting in a 40% increase in user engagement and a 25% decrease in task completion time.",
                        },
                        {
                                name: "Accessibility Initiative",
                                year: "2023",
                                description:
                                        "Spearheaded an initiative to make all our products WCAG 2.1 AA compliant, ensuring our applications are accessible to users with disabilities.",
                        },
                ],
                instagramPosts: [
                        {
                                id: "post1",
                                image: "/instagram/designer-workspace.jpg",
                                caption: "My creative space for the day. Finding inspiration in the details. #DesignerLife #Workspace",
                                likes: 1432,
                                comments: 67,
                                date: "1 day ago",
                        },
                        {
                                id: "post2",
                                image: "/instagram/designer-sketch.jpg",
                                caption: "From sketch to screen. The evolution of our new feature. #DesignProcess #UXDesign",
                                likes: 1289,
                                comments: 93,
                                date: "5 days ago",
                        },
                        {
                                id: "post3",
                                image: "/instagram/designer-presentation.jpg",
                                caption:
                                        "Presenting our new design system to the team. Excited to see it come to life! #DesignSystems #Teamwork",
                                likes: 1056,
                                comments: 48,
                                date: "1 week ago",
                        },
                ],
        },
        {
                slug: "young-josh",
                name: "Young Josh",
                position: "Project Manager",
                image: "/founder-image.jpg",
                age: 24,
                location: "Enugu State, Nigeria ",
                bio: "Young Josh is our detail-oriented Project Manager who ensures that all our projects are delivered on time and within budget. With a background in both technology and business management, Josh excels at coordinating cross-functional teams and managing complex project requirements. His methodical approach to project planning and execution has been instrumental in our successful project deliveries.",
                education: [
                        {
                                degree: "MSc in Project Management",
                                institution: "London Business School",
                                year: "2017 - 2019",
                        },
                        {
                                degree: "BSc in Mechanical And Production Engineering ",
                                institution: "ESUT",
                                year: "2017 - 2022",
                        },
                ],
                skills: [
                        "Project Management",
                        "Agile Methodologies",
                        "Risk Management",
                        "Stakeholder Communication",
                        "Resource Planning",
                        "Budgeting",
                        "JIRA & Project Tools",
                        "Team Coordination",
                        "Client Relationship Management",
                        "Process Optimization",
                ],
                languages: ["English (Native)", "Russian  (Not-Very-Fluent)", "Portuguese (Basic)"],
                social: {
                        linkedin: "#",
                        twitter: "#",
                        github: "#",
                        instagram: "https://www.instagram.com/shoot_bird_",
                },
                projects: [
                        {
                                name: "Enterprise Client Portal",
                                year: "2021",
                                description:
                                        "Managed the development and launch of a complex client portal for a Fortune 500 company, delivered 2 weeks ahead of schedule.",
                        },
                        {
                                name: "Agile Transformation",
                                year: "2022",
                                description:
                                        "Led the company's transition to Agile methodologies, resulting in a 30% increase in development velocity and improved team satisfaction.",
                        },
                        {
                                name: "Multi-platform Product Launch",
                                year: "2023",
                                description:
                                        "Coordinated the simultaneous launch of our product across web, iOS, and Android platforms, ensuring consistent user experience across all channels.",
                        },
                ],
                instagramPosts: [
                        {
                                id: "post1",
                                image: "/instagram/pm-planning.jpg",
                                caption: "Sprint planning day! Setting goals and mapping our path to success. #AgileLife #ProjectManagement",
                                likes: 743,
                                comments: 38,
                                date: "2 days ago",
                        },
                        {
                                id: "post2",
                                image: "/instagram/pm-team.jpg",
                                caption:
                                        "Celebrating another successful project delivery with this amazing team! #ProjectSuccess #TeamCelebration",
                                likes: 892,
                                comments: 64,
                                date: "1 week ago",
                        },
                        {
                                id: "post3",
                                image: "/instagram/pm-workshop.jpg",
                                caption:
                                        "Running a risk management workshop today. Preparation is key to project success! #RiskManagement #Workshop",
                                likes: 651,
                                comments: 29,
                                date: "2 weeks ago",
                        },
                ],
        },
]

export function getAllTeamMembers(): TeamMember[] {
        return teamMembers
}

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
        return teamMembers.find((member) => member.slug === slug)
}
