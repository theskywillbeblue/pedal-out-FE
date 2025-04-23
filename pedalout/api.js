import axios from 'axios';
import Geocoder from 'react-native-geocoding';

const supabaseApi = axios.create({
  baseURL: 'https://pedal-out-be.onrender.com/api',
});

// Google Maps api key

Geocoder.init('AIzaSyDT2-TcbuafxCQy7iKHe-J6RsHNQBtw-yw');

// Supabase api requests

async function getRides(ride_id, discipline, sortBy, order) {
  const params = {};
  if (discipline) params.discipline = discipline;
  if (sortBy) params.sort_by = sortBy;
  if (order) params.order = order;

  try {
    const endpoint = ride_id ? `/rides/${ride_id}` : '/rides';
    const response = await supabaseApi.get(endpoint, {
      params,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function postRide(newRide) {
  try {
    const requestBody = {
      author: newRide.author,
      description: newRide.description,
      discipline: newRide.discipline,
      is_public: newRide.is_public,
      ride_date: newRide.ride_date,
      ride_location: newRide.ride_location,
      ride_time: newRide.ride_time,
      title: newRide.title,
      participants: `{"${newRide.author}"}`,
    };
    const response = await supabaseApi.post('/rides', requestBody);
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function patchRideById(ride_id, patchData) {
  try {
    const response = await supabaseApi.patch(`/rides/${ride_id}`, {
      ride_location: patchData.ride_location,
      ride_date: patchData.ride_date,
      ride_time: patchData.ride_time,
      description: patchData.description,
      discipline: patchData.discipline,
      title: patchData.title,
      isPublic: patchData.isPublic,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function getCommentsByRideId(ride_id) {
  try {
    const response = await supabaseApi.get(`/rides/${ride_id}/comments`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function deleteCommentById(comment_id) {
  try {
    const response = await supabaseApi.delete(`/comments/${comment_id}`);
    return response;
  } catch (err) {
    throw err;
  }
}

async function patchCommentById(comment_id, updatedComment) {
  try {
    const response = await supabaseApi.patch(`/comments/${comment_id}`, {
      body: updatedComment,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function postCommentOnRideById(ride_id, comment) {
  try {
    const response = await supabaseApi.post(`/rides/${ride_id}/comments`, {
      body: comment,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

// MongoDb api requests

async function addFriend(username, newFriendUsername) {
  try {
    const response = await supabaseApi.post(`/friends/${username}`, {
      followingUsername: newFriendUsername,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function getFriends(username) {
  try {
    const response = await supabaseApi.get(`/friends/${username}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function removeFriend(username, personToUnfriend) {
  try {
    console.log(personToUnfriend);
    
    const response = await supabaseApi.delete(`/friends/${username}`, {
      followingUsername: personToUnfriend,
    });
    return response;
  } catch (err) {
    throw err;
  }
}

async function removeAllFriends() {
  try {
    const response = await supabaseApi.delete(`/friends`);
    return response;
  } catch (err) {
    throw err;
  }
}

export default Geocoder;

export {
  getRides,
  postRide,
  patchRideById,
  getCommentsByRideId,
  postCommentOnRideById,
  patchCommentById,
  deleteCommentById,
  addFriend,
  getFriends,
  removeFriend,
  removeAllFriends,
};
