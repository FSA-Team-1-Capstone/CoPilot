import React, { useEffect , useState } from 'react';
import { getTripDetails, getUserCreatedTrips, getUserInvitedTrips, addUpdateTrip } from '../store/trips';
import { useDispatch, useSelector } from "react-redux";

export const SampleCode = props => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username)

  const [trip, setTrip] = useState({});
  const [userCreatedTrips, setUserCreatedTrips] = useState([]);
  const [userInvitedTrips, setUserInvitedTrips] = useState([]);

  useEffect( () => {
    const fetchData = async () => {
      const data = await dispatch(getTripDetails(1));
      setTrip(data);
    }
    fetchData();
  },[] );

  useEffect( () => {
    const fetchData = async () => {
      const data = await dispatch(getUserCreatedTrips(1));
      setUserCreatedTrips(data);
    }
    fetchData();
  },[] )

  useEffect( () => {
    const fetchData = async () => {
      const data = await dispatch(getUserInvitedTrips(5));
      setUserInvitedTrips(data);
    }
    fetchData();
  },[] )

  const addTrip = async (id) => {
    const newTrip = await dispatch(addUpdateTrip({destination: 'Hollywood', purpose: 'RELAX', status: 'IN PROGRESS', ownerId: id}))
  }

  const tripDetails = useSelector((state) => state.trips.trip);
  const userCreatedTripDetails = useSelector((state) => state.trips.userCreatedTrips);
  const userInvitedTripDetails = useSelector((state) => state.trips.userInvitedTrips);

  if (!Array.isArray(userCreatedTripDetails)) return '';
  if (!Array.isArray(userInvitedTripDetails)) return '';

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <button onClick={() => addTrip(2)}>Add trip</button>
      <hr />
      <p>use of getTripDetails thunk (pass in a trip ID): </p>
      <p>getTripDetails returns owner information, all invitees, events, and event invitees for a trip</p>
      <p>Location: {tripDetails.destination}</p>
      <p>Purpose: {tripDetails.purpose}</p>
      <p>Status: {tripDetails.status}</p>
      <p>Breakfast: {tripDetails.breakfast ? 'Yes' : 'No'}</p>
      <p>Lunch: {tripDetails.lunch ? 'Yes' : 'No'}</p>
      <p>Dinner: {tripDetails.dinner ? 'Yes' : 'No'}</p>
      <p>Start date: {tripDetails.startDate}</p>
      <hr />
      <p>use of getUserCreatedTrips thunk (pass in a user id)</p>
      <p>getUserCreatedTrips returns the trips a user has created</p>
      { userCreatedTripDetails.map(c => <p>{c.id} / {c.destination}</p>) } 
      <hr />
      <p>use of getUserInvitedTrips thunk (pass in a user id)</p>
      <p>getUserInvitedTrips returns the trips a user is invited to (not the owner)</p>
      { userInvitedTripDetails.map(c => <p>{c.id} / {c.destination}</p>) } 
      <hr />
      <p>use of addUpdateTrip thunk (pass in a trip object - if no id, it creates, else it updates)</p>
      <p>addUpdateTrip returns the updated/new trip in state</p>
      <p>{ tripDetails.destination  } </p>
      <hr />
    </div>
  )
};

export default SampleCode;
