import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './Layout';
import ActivityDashboard from '../../Features/activities/dasboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {

  //Activities is the variable. SetActivities is the function. UseState([]) = the current state
const [activities, setActivities] = useState<Activity[]>([]);
const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
const [editMode,setEditMode] = useState(false);

useEffect(() => {
  //Use axios to get the the url data and set the response data to the setActivities
  axios.get<Activity[]>('http://localhost:5000/api/Activities').then(response =>{
  setActivities(response.data);
})
}, [])

function handleSelectActivity(id: string){
  setSelectedActivity(activities.find(x => x.id === id))
}

function handleCancelSelectActivity()
{
  setSelectedActivity(undefined);
}

function handleFormOpen(id?: string)
{
  id ? handleSelectActivity(id) : handleCancelSelectActivity();
  setEditMode(true);
}

function handleFormClose(){
  setEditMode(false);
}

function handleCreateOrEditActivity(activity : Activity){
  activity.id 
  ? setActivities([...activities.filter(x => x.id !== activity.id),activity])
  : setActivities([...activities, {...activity, id: uuid()}]);
  setEditMode(false);
  setSelectedActivity(activity);
};

function handleDeleteActivity(id: string){
  setActivities([...activities.filter(x => x.id !== id)])
}

  return (
    <>
     <NavBar  openForm = {handleFormOpen}/>
     <Container style={{marginTop: '7em'}}>
    <ActivityDashboard 
     activities={activities}
     selectedActivity={selectedActivity}
     selectActivity={handleSelectActivity}
     cancelSelectActivity={handleCancelSelectActivity}
     editMode={editMode}
     openForm={handleFormOpen}
     closeForm = {handleFormClose}
     createOrEdit = {handleCreateOrEditActivity}
     deleteActivity={handleDeleteActivity}
    />
     </Container>
    </>
  );
}

export default App;
