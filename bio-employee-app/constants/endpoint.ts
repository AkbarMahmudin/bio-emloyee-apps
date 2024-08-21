const BASE_URL = process.env.API_ENDPOINT
export const endpoints = {
  signIn: `${BASE_URL}/login`,
  signUp: `${BASE_URL}/users`,
  profile: `${BASE_URL}/profile`,
  users: `${BASE_URL}/users`,
  biodata: `${BASE_URL}/bio`,
  education: `${BASE_URL}/educations`,
  training: `${BASE_URL}/trainings`,
  experience: `${BASE_URL}/experiences`,
}