/**
 * BLOG DATA STRUCTURE
 * 
 * IMPORTANT: All cover images should be 1920x1080 (16:9 aspect ratio) for consistent
 * display across blog cards and post pages. Place images in the ./Images/ folder.
 * 
 * Example: coverImage: "./Images/my-cover-image.jpg"
 * 
 * The CSS uses object-fit: contain, so other sizes will work but may have letterboxing.
 * 1920x1080 ensures pixel-perfect quality across all displays.
 */

window.BLOG_DATA = {
  authors: {
    regis: {
      name: "Regis Mfitumukiza",
      avatarText: "RM",
    },
  },
  posts: [
    {
      slug: "my-journey-into-web-development",
      category: "career",
      categoryLabel: "Career",
      title: "My Journey Into Web Development — From Curiosity to Building Real Projects",
      excerpt:
        "How curiosity, self-learning, and real projects shaped my path into full-stack development.",
      dateISO: "2026-04-13",
      dateLabel: "Apr 13, 2026",
      coverImage: "./Images/sampleCode.JPG",
      authorId: "regis",
      tags: ["Career", "Learning", "Full-stack", "JavaScript"],
      comments: [],
      content: [
        {
          type: "p",
          text: "How curiosity, self-learning, and real projects shaped my path into full-stack development.",
        },
        {
          type: "h2",
          text: "How Curiosity Started Everything",
        },
        {
          type: "p",
          text:
            "My journey into web development really started with curiosity — and what felt like love at first sight.",
        },
        {
          type: "p",
          text:
            "It wasn’t something I planned carefully with a clear roadmap or a detailed step-by-step strategy. Instead, it began with a simple fascination with technology and the digital world.",
        },
        {
          type: "p",
          text:
            "Long before I even thought about studying software engineering, I used to watch movies where characters were typing quickly on laptops, interacting with systems, or using the internet to solve complex problems. At that time, it always felt like those people were geniuses who belonged to a completely different world — a world of technology and innovation.",
        },
        {
          type: "p",
          text:
            "Somehow, I always felt drawn to that world. I didn’t fully understand it yet, but I knew I wanted to be part of it someday.",
        },
        {
          type: "blockquote",
          text:
            "Curiosity is often the first step into programming.",
        },
        {
          type: "p",
          text:
            "Looking back now, that early curiosity was probably the first step that eventually led me into the world of web development.",
        },
        {
          type: "h2",
          text: "Learning the Basics of Web Development",
        },
        {
          type: "p",
          text:
            "Later, when I reached high school, my interest in technology started becoming more concrete.",
        },
        {
          type: "p",
          text:
            "During that period, my brother was studying Computer Engineering, and seeing him pursue that path motivated me even more. It made the world of technology feel closer and more real to me. I started imagining myself following a similar path and eventually becoming a developer.",
        },
        {
          type: "p",
          text:
            "In high school, I studied Mathematics, Physics, and Chemistry, which are subjects that require logical thinking and problem solving. Even though I appreciated the analytical side of these subjects, I always felt that my real interest was somewhere else — in building software and understanding how technology works.",
        },
        {
          type: "p",
          text:
            "Because of that, after finishing high school, I decided to study Software Engineering at university.",
        },
        {
          type: "p",
          text:
            "Around the same time, the world was going through the COVID-19 pandemic, which unexpectedly gave many people more time to explore new skills. For me, that period became a turning point because it’s when I seriously started teaching myself web development.",
        },
        {
          type: "p",
          text:
            "Like many beginners, I started with the fundamentals: HTML and CSS.",
        },
        {
          type: "p",
          text:
            "I used learning platforms like freeCodeCamp, where I followed tutorials and built small projects along the way. Even though the projects were simple, seeing a webpage appear in my browser that I had built myself was incredibly exciting.",
        },
        {
          type: "p",
          text:
            "For the first time, I realized that I could actually create something real on the web.",
        },
        {
          type: "p",
          text:
            "Later, I started learning JavaScript, and that’s when things began to feel completely different.",
        },
        {
          type: "p",
          text:
            "With JavaScript, the websites I was building were no longer just static pages. They could now respond to user actions, update content dynamically, and become interactive.",
        },
        {
          type: "p",
          text:
            "Buttons could trigger actions, forms could process data, and pages could react to what users were doing.",
        },
        {
          type: "p",
          text:
            "At that moment, it honestly felt like magic.",
        },
        {
          type: "h2",
          text: "Facing the Early Challenges",
        },
        {
          type: "p",
          text:
            "Of course, the journey wasn’t always smooth.",
        },
        {
          type: "p",
          text:
            "Like many beginners in programming, I faced several challenges along the way.",
        },
        {
          type: "p",
          text:
            "One of the biggest struggles was debugging. Sometimes my code wouldn’t work, and I had no idea why. A small mistake like a missing bracket or a typo could break an entire program, and finding the problem could take hours.",
        },
        {
          type: "p",
          text:
            "Another challenge was what many developers call “tutorial hell.”",
        },
        {
          type: "p",
          text:
            "There were so many tutorials, courses, and learning paths available online that it became difficult to know which ones were actually useful. I would start one tutorial, then discover another one that looked better, and before I knew it, I was jumping from one course to another without finishing anything.",
        },
        {
          type: "p",
          text:
            "Technology itself also felt overwhelming at times.",
        },
        {
          type: "p",
          text:
            "There were so many different programming languages and tools that I kept asking myself questions like:",
        },
        {
          type: "ul",
          items: [
            "Which language should I focus on?",
            "Which technologies are actually needed in the job market?",
            "Am I learning the right things?",
          ],
        },
        {
          type: "p",
          text:
            "At university, the situation sometimes felt even more confusing. In my first years, we were studying C programming, while at the same time I was already exploring JavaScript on my own.",
        },
        {
          type: "p",
          text:
            "Meanwhile, I would meet other students who were focusing on completely different technologies like Java.",
        },
        {
          type: "p",
          text:
            "Seeing so many different paths made me wonder if I was choosing the right direction.",
        },
        {
          type: "blockquote",
          text:
            "Every developer’s journey is different, and confusion is often part of the learning process.",
        },
        {
          type: "h2",
          text: "When Things Finally Started Making Sense",
        },
        {
          type: "p",
          text:
            "For a long time, I felt stuck between watching tutorials and trying to understand new technologies. I was learning many things, but sometimes it felt like I wasn’t making real progress.",
        },
        {
          type: "p",
          text:
            "The turning point came when I decided to stop focusing only on tutorials and start building small projects on my own.",
        },
        {
          type: "p",
          text:
            "Instead of just following along with videos, I began experimenting and trying to create simple things independently.",
        },
        {
          type: "p",
          text:
            "Around 2022, another important moment in my journey happened when I joined a workshop organized by Andela. During that workshop, I had the opportunity to interact with professional developers and experience a more practical approach to learning.",
        },
        {
          type: "p",
          text:
            "We were given tasks to complete within a certain time, which pushed me to actually apply what I knew instead of just watching someone else code.",
        },
        {
          type: "p",
          text:
            "That experience showed me that the best way to learn programming is by building real things.",
        },
        {
          type: "p",
          text:
            "From that point on, my learning style changed. Instead of focusing only on theory, I began learning by building and experimenting.",
        },
        {
          type: "p",
          text:
            "Slowly, things that once felt confusing started making more sense.",
        },
        {
          type: "p",
          text:
            "I began understanding:",
        },
        {
          type: "ul",
          items: [
            "how different parts of an application connect",
            "how to approach and solve problems step by step",
            "how to debug issues logically",
          ],
        },
        {
          type: "p",
          text:
            "Another breakthrough came when I understood key concepts such as:",
        },
        {
          type: "ul",
          items: ["APIs", "Asynchronous JavaScript", "Component-based design"],
        },
        {
          type: "p",
          text:
            "Instead of copying code, I started thinking like a developer.",
        },
        {
          type: "h2",
          text: "What I'm Building Today",
        },
        {
          type: "p",
          text:
            "Today, my focus is on becoming a full-stack developer.",
        },
        {
          type: "p",
          text:
            "While I enjoy working across the entire stack, I’ve discovered that backend development is currently one of my strongest areas, especially when working with Node.js.",
        },
        {
          type: "p",
          text:
            "I enjoy building APIs, designing application logic, and structuring systems that allow different parts of an application to communicate effectively.",
        },
        {
          type: "p",
          text:
            "At the same time, I’ve invested time in learning frontend technologies, including React and other modern frameworks, because I believe it’s important to understand how the entire system works — from the user interface to the server.",
        },
        {
          type: "p",
          text:
            "Another important part of my journey is continuous learning.",
        },
        {
          type: "p",
          text:
            "I regularly attend trainings, workshops, and developer programs to improve my skills and gain exposure to real industry practices.",
        },
        {
          type: "p",
          text:
            "And most importantly, I continue building real-world projects, because each project teaches something new.",
        },
        {
          type: "h2",
          text: "Lessons I've Learned Along the Way",
        },
        {
          type: "p",
          text:
            "Looking back, several lessons stand out.",
        },
        {
          type: "p",
          text:
            "First, building projects teaches far more than simply watching tutorials.",
        },
        {
          type: "p",
          text:
            "Second, consistency matters more than speed. Programming can feel overwhelming, but small progress every day leads to long-term growth.",
        },
        {
          type: "p",
          text:
            "I’ve also learned that debugging is one of the most valuable skills a developer can develop. Every error message is an opportunity to understand the system better.",
        },
        {
          type: "p",
          text: "And finally:",
        },
        {
          type: "p",
          text:
            "Confusion is part of learning programming.",
        },
        {
          type: "p",
          text:
            "Every developer has moments where nothing makes sense. The key is to keep learning and keep building.",
        },
        {
          type: "h2",
          text: "Final Thoughts",
        },
        {
          type: "p",
          text:
            "My journey into web development is still ongoing.",
        },
        {
          type: "p",
          text:
            "What started as curiosity — watching people interact with computers in movies — has now grown into a passion for building software and solving problems through technology.",
        },
        {
          type: "p",
          text:
            "Along the way, I’ve experienced confusion, challenges, and moments of breakthrough. Each of those experiences has helped shape the developer I am becoming.",
        },
        {
          type: "p",
          text:
            "And while there is still a lot more to learn, that’s exactly what makes this journey exciting.",
        },
        {
          type: "p",
          text:
            "For me, this is only the beginning.",
        },
      ],
    },
  ],
};
