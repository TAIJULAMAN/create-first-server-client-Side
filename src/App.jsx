
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
const [users,setUsers] = useState([])
useEffect(()=>{
  fetch('http://localhost:5000/users')
  .then(res=> res.json())
  .then(data=>setUsers(data))
},[])

const addUserButton = event => {
  event.preventDefault()
  const form = event.target;
  const name= form.name.value;
  const email= form.email.value;
  const user={name,email};
  console.log(user);

  fetch('http://localhost:5000/users' , {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(user) 
})
.then(res=> res.json())
.then(data=>
{
  console.log(data)
  const newUsers =[...users,data]
  setUsers(newUsers);
  form.reset();
})  
};

  return (
    <>
      
      <h1>USERS MANAGEMENT SYSTEM</h1>
    <h3>number of users: {users.length}</h3>

    <form onSubmit={addUserButton}>  
      <input type="text" name="name" id="" />
      <br></br>
      <input type="email" name="email" id="" />
      <br></br>
      <input type="submit" value="add user" />
    </form>

    <div>
      {
        users.map(users =>
          <p key={users.id}>
            {users.id}:{users.name}: {users.email}
          </p>
          )
      }
    </div>
      
    </>
  )
}

export default App
