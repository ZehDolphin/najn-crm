// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCFRNF0peoTlsiqtCcFsKXh2OC73S8uWwg',
	authDomain: 'najn-crm.firebaseapp.com',
	projectId: 'najn-crm',
	storageBucket: 'najn-crm.appspot.com',
	messagingSenderId: '435352907203',
	appId: '1:435352907203:web:aa90ca958298b8fc106176',
	measurementId: 'G-ZM2DRPKMC0',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const db = getFirestore(app)
export const auth = getAuth(app)
