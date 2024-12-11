exports.mockStaffList = (staffs) => {
    return {
        all_staff: generateRandomAppointments(staffs),
    };
  };
  
  const generateRandomAppointments = (count) => {
    const staffs = [];
  
    for (let i = 0; i < count; i++) {
      const staff = {
        staffId: generateRandomId(10),
        staffFirstName: generateRandomName(),
        staffLastName: generateRandomName(),
        staffPhone: generateRandomPhoneNumber(),
        staffEmail: generateRandomEmail(),
        avatarUrl: generateRandomAvatarUrl(),
      };
  
      staffs.push(staff);
    }
  
    return staffs;
  }
  
  
  const generateRandomAvatarUrl = () => {
    return `https://randomuser.me/api/portraits/men/${Math.floor(
      Math.random() * 100
    )}.jpg`;
  }
  
  
  const generateRandomName = () =>{
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
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
      lastNames[Math.floor(Math.random() * lastNames.length)]
    }`;
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
    return `${generateRandomName().toLowerCase()}@${
      domains[Math.floor(Math.random() * domains.length)]
    }`;
  }
  