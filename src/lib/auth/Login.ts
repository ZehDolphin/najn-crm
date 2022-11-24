import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

export function loginEmailAndPassword(
	email: string,
	password: string,
	onLogin?: Function
) {
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			onLogin && onLogin(userCredential.user)
		})
		.catch((error) => {
			const errorCode = error.code
			const errorMessage = error.message
			console.log(errorCode, errorMessage)
			alert(errorMessage)
		})
}
