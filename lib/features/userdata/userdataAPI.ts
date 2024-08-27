// A mock function to mimic making an async request for data
export const fetchUserData = async () => {
    const response = await fetch("http://localhost:3000/api/userdata");
    const result = await response.json();
    return result;
  };
  