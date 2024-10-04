import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";

const client = await db.connect();

// Seed Users (Job Seekers and Recruiters)
async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role VARCHAR(50) NOT NULL CHECK (role IN ('job_seeker', 'recruiter')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const users = [
    {
      id: 1,
      name: "Alice Jobseeker",
      email: "alice@example.com",
      password: "password123",
      role: "job_seeker",
    },
    {
      id: 2,
      name: "Bob Recruiter",
      email: "bob@example.com",
      password: "password123",
      role: "recruiter",
    },
  ];

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password, role)
        VALUES (uuid_generate_v4(), ${user.name}, ${user.email}, ${hashedPassword}, ${user.role})
        ON CONFLICT (email) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

// Seed Companies
async function seedCompanies() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS companies (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      website TEXT NOT NULL
    );
  `;

  const companies = [
    {
      name: "Tech Innovators",
      description: "A leading tech company.",
      website: "https://techinnovators.com",
    },
    {
      name: "HealthTech Inc.",
      description: "Healthcare technology solutions.",
      website: "https://healthtech.com",
    },
  ];

  const insertedCompanies = await Promise.all(
    companies.map(
      (company) => client.sql`
        INSERT INTO companies (id, name, description, website)
        VALUES (uuid_generate_v4(), ${company.name}, ${company.description}, ${company.website})
        ON CONFLICT (name) DO NOTHING;
      `
    )
  );

  return insertedCompanies;
}

// Seed Job Categories
async function seedCategories() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS categories (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE
    );
  `;

  const categories = [
    { name: "Software Engineering" },
    { name: "Product Management" },
    { name: "Data Science" },
    { name: "Design" },
  ];

  const insertedCategories = await Promise.all(
    categories.map(
      (category) => client.sql`
        INSERT INTO categories (id, name)
        VALUES (uuid_generate_v4(), ${category.name})
        ON CONFLICT (name) DO NOTHING;
      `
    )
  );

  return insertedCategories;
}

// Seed Jobs
async function seedJobs() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS jobs (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      company_id UUID NOT NULL,
      category_id UUID NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (company_id) REFERENCES companies(id),
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );
  `;

  const jobs = [
    {
      title: "Frontend Developer",
      description: "Build amazing UIs with React.",
      companyId: "company-uuid-1",
      categoryId: "category-uuid-1",
    },
    {
      title: "Data Scientist",
      description: "Analyze data trends and models.",
      companyId: "company-uuid-2",
      categoryId: "category-uuid-2",
    },
  ];

  const insertedJobs = await Promise.all(
    jobs.map(
      (job) => client.sql`
        INSERT INTO jobs (id, title, description, company_id, category_id)
        VALUES (uuid_generate_v4(), ${job.title}, ${job.description}, ${job.companyId}, ${job.categoryId})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedJobs;
}

// Seed Recruiters (Linked to Users table)
async function seedRecruiters() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS recruiters (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      company_id UUID NOT NULL,
      experience_years INT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (company_id) REFERENCES companies(id)
    );
  `;

  const recruiters = [
    { userId: "user-uuid-1", companyId: "company-uuid-1", experienceYears: 5 },
    { userId: "user-uuid-2", companyId: "company-uuid-2", experienceYears: 8 },
  ];

  const insertedRecruiters = await Promise.all(
    recruiters.map(
      (recruiter) => client.sql`
        INSERT INTO recruiters (id, user_id, company_id, experience_years)
        VALUES (uuid_generate_v4(), ${recruiter.userId}, ${recruiter.companyId}, ${recruiter.experienceYears})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedRecruiters;
}

// Main function to seed all data
export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedCompanies();
    await seedCategories();
    await seedJobs();
    await seedRecruiters();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
