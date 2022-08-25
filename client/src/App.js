import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { CREATE_USER } from "./mutation/user";
import { GET_ALL_USERS } from "./query/user";
export function App() {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);

  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username,
          age,
        },
      },
    }).then(({ data }) => {
      console.log(data);
      setUsername("");
      setAge(0);
    });
    refetch();
  };

  const getAll = (e) => {
    e.preventDefault();
    refetch();
  };

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  if (error) {
    return <p>ERROR server invalid</p>;
  }

  return (
    <div className="App">
      <form>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type={"text"}
        />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type={"number"}
        />
        <div className="btns">
          <button onClick={(e) => addUser(e)}>Create</button>
          <button onClick={(e) => getAll(e)}>Get</button>
        </div>
        <div>
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id}>
                {user.id} {user.username} {user.age}
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </form>
    </div>
  );
}
