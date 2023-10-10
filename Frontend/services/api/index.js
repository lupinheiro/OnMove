import AsyncStorage from '@react-native-community/async-storage';
import {create} from 'apisauce';
const token = AsyncStorage.getItem('@App:token');
console.log('Retrieved Token:', token);
//const baseURL = '192.168.1.221';
const baseURL = 'smob.esce.ipvc.pt';
const auth = create({
  baseURL: `http://${baseURL}:3000/api`,
});

auth.addAsyncRequestTransform(request => async () => {
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
});

auth.addResponseTransform(response => {
  if (!response.ok) {
    throw response;
  }
});

const orders = create({
  baseURL: `http://${baseURL}:3001/api`,
});

orders.addAsyncRequestTransform(request => async () => {
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
});

orders.addResponseTransform(response => {
  if (!response.ok) {
    throw response;
  }
});

const routes = create({
  baseURL: `http://${baseURL}:3002/api`,
});

routes.addAsyncRequestTransform(request => async () => {
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
});

routes.addResponseTransform(response => {
  if (!response.ok) {
    throw response;
  }
});

const vehicles = create({
  baseURL: `http://${baseURL}:3003/api`,
});

vehicles.addAsyncRequestTransform(request => async () => {
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
});

vehicles.addResponseTransform(response => {
  if (!response.ok) {
    throw response;
  }
});

export {auth, orders, routes, vehicles};
