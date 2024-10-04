import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Hashing passwords for the users
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create Addresses
  const address1 = await prisma.address.create({
    data: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
  });

  const address2 = await prisma.address.create({
    data: {
      street: "456 Elm St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "USA",
    },
  });

  const education1 = await prisma.education.create({
    data: {
      school: "MIT",
      level: "BACHELORS",
      degree: "Computer Science",
      field: "Software Engineering",
      startYear: 2010,
      endYear: 2014,
    },
  });

  const education2 = await prisma.education.create({
    data: {
      school: "Stanford University",
      level: "MASTERS",
      degree: "Human Resource Management",
      field: "HR",
      startYear: 2010,
      endYear: 2012,
    },
  });

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: "johndoe@example.com",
      phone: "1234567890",
      name: "John Doe",
      password: hashedPassword,
      passwordUpdatedAt: new Date(),
      type: "JOB_SEEKER",
      addressId: address1.id,
      profile: {
        create: {
          bio: "Full Stack Developer with 5 years of experience.",
          avatar: "https://example.com/avatar.jpg",
        },
      },
      education: {
        create: {
          school: "MIT",
          level: "BACHELORS",
          degree: "Computer Science",
          field: "Software Engineering",
          startYear: 2010,
          endYear: 2014,
        },
      },
      experience: {
        create: {
          company: "Tech Corp",
          position: "Senior Developer",
          startYear: 2015,
          endYear: 2020,
          description:
            "Worked on various full-stack projects using modern technologies.",
        },
      },
      skills: {
        createMany: {
          data: [
            { name: "JavaScript" },
            { name: "TypeScript" },
            { name: "React" },
          ],
        },
      },
      socialLinks: {
        createMany: {
          data: [
            { name: "LINKEDIN", url: "https://linkedin.com/in/johndoe" },
            { name: "GITHUB", url: "https://github.com/johndoe" },
          ],
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "janedoe@example.com", // Use a different email
      phone: "0987654321",
      name: "Jane Doe",
      password: hashedPassword,
      passwordUpdatedAt: new Date(),
      type: "PROFESSIONAL_RECRUITER",
      addressId: address2.id,
      profile: {
        create: {
          bio: "Recruiter with a passion for finding great tech talent.",
          avatar: "https://example.com/avatar2.jpg",
        },
      },
      education: {
        create: {
          school: "Stanford University",
          level: "MASTERS",
          degree: "Human Resource Management",
          field: "HR",
          startYear: 2010,
          endYear: 2012,
        },
      },
      experience: {
        create: {
          company: "HR Solutions",
          position: "Recruitment Manager",
          startYear: 2013,
          endYear: 2020,
          description: "Managed recruitment processes for top tech companies.",
        },
      },
      skills: {
        createMany: {
          data: [{ name: "Recruitment" }, { name: "Talent Acquisition" }],
        },
      },
      socialLinks: {
        createMany: {
          data: [
            { name: "LINKEDIN", url: "https://linkedin.com/in/janedoe" },
            { name: "TWITTER", url: "https://twitter.com/janedoe" },
          ],
        },
      },
    },
  });

  //get user data for usage

  const user = await prisma.user.findMany({
    include: {
      profile: true,
      education: true,
      experience: true,
      skills: true,
      socialLinks: true,
    },
  });
  // Create Companies
  const company1 = await prisma.company.create({
    data: {
      name: "Tech Corp",
      email: "info@techcorp.com",
      phone: "1234567890",
      website: "https://techcorp.com",
      addressId: address1.id,
      logo: "https://example.com/logo.png",
    },
  });

  const company2 = await prisma.company.create({
    data: {
      name: "HR Solutions",
      email: "contact@hrsolutions.com",
      phone: "0987654321",
      website: "https://hrsolutions.com",
      addressId: address2.id,
      logo: "https://example.com/logo2.png",
    },
  });

  const createdSkills = await prisma.skill.createMany({
    data: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "React" },
      { name: "Recruitment" },
      { name: "Talent Acquisition" },
    ],
    skipDuplicates: true, // This will avoid any duplicate skill creation
  });

  // Now fetch the skill IDs
  const skills = await prisma.skill.findMany({
    where: {
      name: {
        in: [
          "JavaScript",
          "TypeScript",
          "React",
          "Recruitment",
          "Talent Acquisition",
        ],
      },
    },
    select: { id: true, name: true },
  });

  // Create Jobs
  const job1 = await prisma.job.create({
    data: {
      title: "Full Stack Developer",
      description: "Looking for an experienced full stack developer.",
      type: "FULL_TIME",
      salary: 120000,
      deadline: new Date("2024-12-31"),
      reposted: false,
      companyId: company1.id,
      jobCategory: "SOFTWARE_ENGINEERING",
      featured: true,
      requirements: {
        create: {
          experience: "5+ years",
          education: {
            connect: { id: education1.id },
          },
          skills: {
            connect: skills
              .filter((skill) =>
                ["JavaScript", "TypeScript", "React"].includes(skill.name)
              )
              .map((skill) => ({ id: skill.id })),
          },
        },
      },
    },
  });

  const job2 = await prisma.job.create({
    data: {
      title: "Backend Developer",
      description: "Hiring for a backend developer with Node.js expertise.",
      type: "FULL_TIME",
      salary: 110000,
      deadline: new Date("2024-11-30"),
      reposted: false,
      companyId: company1.id,
      jobCategory: "SOFTWARE_ENGINEERING",
      featured: true,
      requirements: {
        create: {
          experience: "3+ years",
          education: {
            connect: { id: education1.id },
          },
          skills: {
            connect: skills
              .filter((skill) =>
                ["JavaScript", "TypeScript", "React"].includes(skill.name)
              )
              .map((skill) => ({ id: skill.id })),
          },
        },
      },
    },
  });

  const job3 = await prisma.job.create({
    data: {
      title: "HR Manager",
      description: "We need a skilled HR manager to join our growing team.",
      type: "FULL_TIME",
      salary: 90000,
      deadline: new Date("2024-10-31"),
      reposted: true,
      repostedAt: new Date("2024-09-15"),
      companyId: company2.id,
      jobCategory: "HR",
      featured: true,
      requirements: {
        create: {
          experience: "5+ years",
          education: {
            connect: { id: education2.id },
          },
          skills: {
            connect: skills
              .filter((skill) =>
                ["JavaScript", "TypeScript", "React"].includes(skill.name)
              )
              .map((skill) => ({ id: skill.id })),
          },
        },
      },
    },
  });

  const job4 = await prisma.job.create({
    data: {
      title: "HR Assistant - Payroll",
      description: "We need a skilled HR Assistant to join our growing team.",
      type: "FULL_TIME",
      salary: 90000,
      deadline: new Date("2024-10-31"),
      reposted: true,
      repostedAt: new Date("2024-09-15"),
      companyId: company2.id,
      jobCategory: "HR",
      featured: false,
      requirements: {
        create: {
          experience: "5+ years",
          education: {
            connect: { id: education2.id },
          },
          skills: {
            connect: skills
              .filter((skill) =>
                ["JavaScript", "TypeScript", "React"].includes(skill.name)
              )
              .map((skill) => ({ id: skill.id })),
          },
        },
      },
    },
  });

  const SavedJobs = await prisma.savedJob.createMany({
    data: [
      { userId: user1.id, jobId: job1.id },
      { userId: user1.id, jobId: job2.id },
      { userId: user2.id, jobId: job3.id },
    ],
  });

  // Create Job Applications
  await prisma.jobApplication.createMany({
    data: [
      { userId: user1.id, jobId: job1.id, status: "APPLIED" },
      { userId: user1.id, jobId: job2.id, status: "APPLIED" },
      { userId: user2.id, jobId: job3.id, status: "HIRED" },
    ],
  });

  console.log("Seed data has been created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
