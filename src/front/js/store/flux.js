const apiUrl = process.env.BACKEND_URL + "/api";
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: null,
      userInfo: null,
    },
    actions: {

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      login: async (email, password) => {
        let resp = await fetch(apiUrl + "/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!resp.ok) {
          setStore({ token: null });
          return false;
        }
        let data = await resp.json();
        setStore({ token: data.token });
        localStorage.setItem("token", data.token);
        return true;
      },
      signup: async (first_name, last_name, email, password) => {
        let resp = await fetch(apiUrl + "/signup", {
          method: "POST",
          body: JSON.stringify({ first_name, last_name, email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!resp.ok) {
          const errorData = await resp.json();
          console.error("Signup error:", errorData);
          return false;
        }
        let data = await resp.json();
        alert("User created successfully!");
        return true;
      },
	  
      loadSession: async () => {
        let storageToken = localStorage.getItem("token");
        if (!storageToken) return;
        setStore({ token: storageToken });
        let resp = await fetch(apiUrl + "/userInfo", {
          headers: {
            Authorization: "Bearer " + storageToken,
          },
        });
        if (!resp.ok) {
          setStore({ token: null });
          localStorage.removeItem("token");
          return false;
        }
        let data = await resp.json();
        setStore({ userInfo: data });
        return true;
      },
      logout: async () => {
        let { token } = getStore();
        let resp = await fetch(apiUrl + "/logout", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (!resp.ok) return false;
        setStore({ token: null, userInfo: null });
        localStorage.removeItem("token");
        return true;
      },
    },
  };
};

export default getState;