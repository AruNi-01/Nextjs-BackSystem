interface UserDataType {
  id: number;
  name: string;
  age?: number;
  gender: string;
  phone?: number;
  team?: string;
}

const mockUserList: UserDataType[] = [
  {
    id: 1,
    name: "John Doe",
    age: 25,
    gender: "male",
    phone: 17785895311,
    team: "Team A"
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 30,
    gender: "female",
    phone: 98765432130,
    team: "Team B"
  },
  {
    id: 3,
    name: "Adam Johnson",
    age: 32,
    gender: "male",
    phone: 34465246463,
    team: "Team C"
  },
  {
    id: 4,
    name: "Emily Davis",
    age: 28,
    gender: "female",
    phone: 16545686789,
    team: "Team A"
  },
  {
    id: 5,
    name: "Michael Brown",
    age: 40,
    gender: "female",
    phone: 14789997875,
    team: "Team C"
  },
  {
    id: 6,
    name: "Emma Mnoso",
    age: 30,
    gender: "male",
    phone: 15454334534,
    team: "Team B"
  },
  {
    id: 7,
    name: "Lbtse Olivia",
    age: 22,
    gender: "female",
    phone: 14656782354,
    team: "Team A"
  },
  {
    id: 8,
    name: "James Bisol",
    age: 21,
    gender: "male",
    phone: 14546235464,
    team: "Team D"
  },
  {
    id: 9,
    name: "Visol Benjamin",
    age: 25,
    gender: "female",
    phone: 11547684534,
    team: "Team C"
  },
  {
    id: 10,
    name: "Isabella Mudy",
    age: 31,
    gender: "female",
    phone: 12378999775,
    team: "Team B"
  },
  {
    id: 11,
    name: "Ava Piby",
    age: 35,
    gender: "male",
    phone: 15464574523,
    team: "Team B"
  },
  {
    id: 12,
    name: "Michael John",
    age: 36,
    gender: "male",
    phone: 99867456345,
    team: "Team D"
  },
  {
    id: 13,
    name: "Michael Tusyan",
    age: 31,
    gender: "female",
    phone: 12545345623,
    team: "Team A"
  },
  {
    id: 14,
    name: "Budys Stick",
    age: 32,
    gender: "male",
    phone: 12431243416,
    team: "Team D"
  },
  {
    id: 15,
    name: "Sophia Wilson",
    age: 33,
    gender: "female",
    phone: 68834541244,
    team: "Team C"
  }
];

export default mockUserList;