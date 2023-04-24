 import {createContext, useReducer} from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({children}) => {

    const initialState = {
        users: [], // array of objects
        user: {}, //single object
        repos: [],
        loading: false,
    }
    const [state, dispatch] = useReducer(githubReducer, initialState);


    return <GithubContext.Provider value={{
        // users: state.users,
        // loading: state.loading,
        // user: state.user,
        // repos: state.repos,
        ...state,
        dispatch,
    }}
    >
        {children}
    </GithubContext.Provider>
}

export default GithubContext