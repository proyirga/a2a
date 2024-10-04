// Updated placeholder data for jobs, job seekers, recruiters, companies, and categories

const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "Alice Jobseeker",
    email: "alice@jobseeker.com",
    password: "password123",
    role: "job_seeker",
  },
  {
    id: "510bdfb2-4351-4297-8845-abc4b5d1234b",
    name: "Bob Recruiter",
    email: "bob@recruiter.com",
    password: "password123",
    role: "recruiter",
  },
  {
    id: "2147a13f-243f-4386-8d53-d896c8e0e69b",
    name: "Charlie Jobseeker",
    email: "charlie@jobseeker.com",
    password: "password456",
    role: "job_seeker",
  },
];

const companies = [
  {
    id: "8f5c3f3a-1234-44b2-ae67-d45b67c1f4a9",
    name: "Tech Innovators",
    description: "A company leading in tech solutions.",
    website: "https://techinnovators.com",
  },
  {
    id: "9c2d1ef2-8d45-4f33-89e8-cb489ce7e4ba",
    name: "HealthTech Inc.",
    description: "Innovating in healthcare technology.",
    website: "https://healthtech.com",
  },
];

const categories = [
  {
    id: "564a78b6-b7e7-4d4d-8fdc-4531e1f67b3f",
    name: "Software Engineering",
  },
  {
    id: "87344eb3-411d-4f7c-85d9-b567c2fe398c",
    name: "Data Science",
  },
  {
    id: "73951fdb-cb1f-474a-a66a-7d62e99b1fb4",
    name: "Product Management",
  },
  {
    id: "c1b8d9d2-4185-47ef-918b-f45eb93fa374",
    name: "UI/UX Design",
  },
];

const jobs = [
  {
    id: "76e8d1ef-9b47-44b4-a47a-8e235c1df445",
    title: "Frontend Developer",
    description: "Build amazing UIs with React and Next.js.",
    company_id: companies[0].id,
    category_id: categories[0].id,
    created_at: "2024-01-15",
  },
  {
    id: "145b1789-215d-49a4-a123-dbb563f8e45d",
    title: "Data Scientist",
    description: "Analyze and interpret complex data sets.",
    company_id: companies[1].id,
    category_id: categories[1].id,
    created_at: "2024-02-10",
  },
  {
    id: "2a4f714b-5133-4e78-a3a1-7f7e24845e45",
    title: "Product Manager",
    description: "Lead product development and strategy.",
    company_id: companies[0].id,
    category_id: categories[2].id,
    created_at: "2024-03-20",
  },
  {
    id: "3141b77a-5d17-4ea9-a7cb-e1eabc1dc122",
    title: "UI/UX Designer",
    description: "Design intuitive user experiences.",
    company_id: companies[1].id,
    category_id: categories[3].id,
    created_at: "2024-04-10",
  },
];

const recruiters = [
  {
    id: "b0f3ab44-d1a8-4f8c-9326-fd81f2f089d8",
    user_id: users[1].id,
    company_id: companies[0].id,
    experience_years: 5,
  },
  {
    id: "e94ab9c2-dcbb-4c6c-b8d6-f4e7dbef7b9f",
    user_id: users[1].id,
    company_id: companies[1].id,
    experience_years: 7,
  },
];

export { users, companies, categories, jobs, recruiters };
