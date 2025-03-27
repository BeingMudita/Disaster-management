const signup = async (name, email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    console.log("Signup Response:", data); // Log response

    if (response.ok) {
      console.log("Signup successful!");
    } else {
      console.error("Signup failed:", data.message);
    }
  } catch (error) {
    console.error("Signup Error:", error);
  }
};
