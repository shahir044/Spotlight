import {useState,useContext} from "react";
import {FaSearch} from "react-icons/fa";
import {FaTrash} from "react-icons/fa";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";
import {searchUsers} from "../../context/github/GithubActions";

function UserSearch() {
    const [text,setText] = useState('');

    const {users,dispatch} = useContext(GithubContext);
    const {setAlert} = useContext(AlertContext);
    const handleChange = (e) => setText(e.target.value);
    // const handleClear = () =>{
    //     clearUsers();
    // }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (text===''){
          setAlert('Please enter something!','error') ;
      }else{
          // @todo search
          //Calling searchUsers function
          dispatch({
              type: 'SET_LOADING'
          })
          const users = await searchUsers(text);
          dispatch({
              type: 'GET_USERS',
              payload: users,
          })
          setText('');
      }
    }

    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="relative">
                            <input type='text' placeholder='Type here to search' value={text} onChange={handleChange} className="w-full pr-40 bg-gray-200 input input-lg text-black"></input>
                            <button type='submit' className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"><FaSearch className='mr-2'/> Go</button>
                        </div>
                    </div>
                </form>
            </div>
            {users.length>0 && (<div>
                <button type='submit' onClick={()=>dispatch({type: 'CLEAR_USERS'})} className="btn btn-ghost btn-lg">
                    <FaTrash className='mr-2'/>Clear
                </button>
            </div>)}

        </div>
    );
}

export default UserSearch;