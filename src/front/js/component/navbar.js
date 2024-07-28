import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		console.log("Store Token:", store.token);
	  }, [store.token]);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				{store.token == null ? (
          <div className="ml-auto">
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-primary">Signup</button>
            </Link>
          </div>) 
		  : 
		  (
          <div className="ml-auto">
            <button onClick={() => actions.logout()} className="btn btn-primary">Logout</button>
          </div>
        )}
        <div>
            <Link to="/private">
              <button className="btn btn-primary">Private Area</button>
            </Link>
          </div>
      </div>
		</nav>
	);
};
