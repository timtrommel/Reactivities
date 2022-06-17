import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';



function App() {

  //Activities is the variable. SetActivities is the function. UseState([]) = the current state
const [activities, setActivities] = useState([]);

useEffect(() => {
  //Use axios to get the the url data and set the response data to the setActivities
  axios.get('http://localhost:5000/api/Activities').then(response =>{
  console.log(response); // Create a log of the response.
  setActivities(response.data);
})
}, [])

  return (
    <div>
      <Header as="h2" icon="users" content="Reactivities"/>
     <List>
      {activities.map((activity: any) => 
      (
        <List.Item key= {activity.id}>
          {activity.title}
        </List.Item>
        ))}
      </List>  
    </div>
  );
}

export default App;
