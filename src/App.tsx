import { useEffect, useState } from "react";

interface User {
  name: string;
  role: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>MSW + Playwright Demo</h1>
        <p>Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>MSW + Playwright Demo</h1>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>MSW + Playwright Demo</h1>
      <p>
        This is a demo application with MSW (Mock Service Worker) and Playwright
        testing.
      </p>
      
      {/* REST API Demo */}
      {user && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <h2>User Information (REST API)</h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      )}

      {/* GraphQL Demo Toggle */}
      <div style={{ margin: "20px 0" }}>
        <button
          data-testid="toggle-graphql-demo"
          onClick={() => setShowGraphQLDemo(!showGraphQLDemo)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          {showGraphQLDemo ? "Hide GraphQL Demo" : "Show GraphQL Demo"}
        </button>
      </div>

      {/* GraphQL Demo */}
      {showGraphQLDemo && (
        <div style={{ 
          marginTop: "20px", 
          padding: "20px", 
          backgroundColor: "#f8f9fa", 
          borderRadius: "8px" 
        }}>
          <h2>GraphQL Demo</h2>
          <UserProfile userId="1" />
        </div>
      )}
    </div>
  );
}

export default App;
