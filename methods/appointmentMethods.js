exports.mockAppointmentsList = (userAmount) => {
  return {
    all_appointments: generateRandomAppointments(userAmount),
  };
};

const generateRandomAppointments = (count) => {
  const appointments = [];

  for (let i = 0; i < count; i++) {
    const appointment = {
      appointmentId: generateRandomId(10),
      appointmentStartTime: getRandomTime(),
      appointmentEndTime: getRandomTime(),
      appointmentDate: getRandomDate(),
      appointmentReasons: generateRandomReasons(5),
      appointmentComments: generateRandomComments(3),
      appointmentStatus: generateRandomAppointmentStatus(),
      avatarUrl: generateRandomAvatarUrl(),
      hasDocumentsToFill: Math.random() > 0.5,
      customerDocuments: generateRandomDocuments(2),
      customerFirstName: generateRandomName(true),
      customerLastName: generateRandomName(false),
      customerId: generateRandomId(10),
      customerPhoneNumber: generateRandomPhoneNumber(),
      customerEmail: generateRandomEmail(),
      staffId: generateRandomId(10),
      staffFirstName: generateRandomName(),
      staffLastName: generateRandomName(),
    };

    appointments.push(appointment);
  }

  return appointments;
}

// Helper consts
const getRandomTime = () =>{
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  return `${hours}:${minutes}:00`;
}

const getRandomDate = () => {
  const year = 2023 + Math.floor(Math.random() * 2);
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1; // Assuming 28 days in a month for simplicity
  return `${year}-${month}-${day}`;
}

const generateRandomReasons = (count) => {
  const reasons = [];
  for (let i = 0; i < count; i++) {
    reasons.push(generateRandomText(10));
  }
  return reasons;
}

const generateRandomComments = (count) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(generateRandomText(20));
  }
  return comments;
}

const generateRandomAvatarUrl = () => {
  return `https://randomuser.me/api/portraits/men/${Math.floor(
    Math.random() * 100
  )}.jpg`;
}

const generateRandomDocuments = (count) => {
  const documents = [];
  for (let i = 0; i < count; i++) {
    documents.push(generateRandomText(5));
  }
  return documents;
}

const generateRandomName = (isFirstName) =>{
  const firstNames = [
    "John",
    "Jane",
    "Alice",
    "Bob",
    "Emily",
    "Aiden",
    "Sophia",
    "Noah",
    "Emma",
    "Liam",
    "Olivia",
    "Mason",
    "Ava",
    "Jacob",
    "Isabella",
    "William",
    "Mia",
    "Ethan",
    "Amelia",
    "Michael",
    "Evelyn",
    "Oliver",
    "Abigail",
    "Daniel",
    "Harper",
    "Elijah",
    "Emily",
    "James",
    "Elizabeth",
    "Benjamin",
    "Avery",
    "Alexander",
    "Sofia",
    "Lucas",
    "Chloe",
    "Logan",
    "Grace",
    "David",
    "Victoria",
    "Matthew",
    "Lily",
    "Joseph",
    "Aiden",
    "Carter",
    "Charlotte",
    "Carter",
    "Eleanor",
    "Wyatt",
    "Sofia",
    "Jayden",
    "Ella",
    "Gabriel",
    "Addison",
    "Samuel",
    "Natalie",
    "Sebastian",
    "Mia",
    "Dylan",
    "Brooklyn",
    "Luke",
    "Hannah",
    "Henry",
    "Jasmine",
    "Jackson",
    "Alyssa",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Anderson",
    "Taylor",
    "Thomas",
    "Jackson",
    "White",
    "Harris",
    "Martin",
    "Thompson",
    "Garcia",
    "Martinez",
    "Clark",
    "Lewis",
    "Lee",
    "Allen",
    "King",
    "Wright",
    "Scott",
    "Baker",
    "Hill",
    "Nelson",
    "Carter",
    "Perez",
    "Hall",
    "Roberts",
    "Turner",
    "Phillips",
    "Campbell",
    "Parker",
    "Evans",
    "Edwards",
    "Collins",
    "Stewart",
    "Morris",
    "Rogers",
    "Flores",
    "Sanchez",
    "Russell",
    "Bennett",
    "Brooks",
    "Reynolds",
    "Rice",
  ];
  return isFirstName ?`${firstNames[Math.floor(Math.random() * firstNames.length)]}` : `${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

const generateRandomId = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

const generateRandomPhoneNumber = () =>{
  return `+1 ${Math.floor(Math.random() * 10000000000)}`;
}

const generateRandomEmail = () => {
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "example.com"];
  return `${generateRandomName(false).toLowerCase()}${generateRandomName(true).toLowerCase()}@${
    domains[Math.floor(Math.random() * domains.length)]
  }`;
}

const generateRandomText = (length) =>{
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return text;
}

const generateRandomAppointmentStatus = () => {
    const statuses = ["Booked", "Cancelled", "Within 24 hours", "Late", "Reschedule Needed"];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  }
