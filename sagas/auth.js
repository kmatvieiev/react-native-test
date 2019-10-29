import { takeEvery } from 'redux-saga'
import { put, fork, take } from 'redux-saga/effects'
import { CHECK_USER } from "../constants/auth";


function* handleSuccessfullyAuth(props) {
	console.log(1312312)
}

function* watchSuccesfullyAuth() {
	console.log(CHECK_USER, 1111111)
	yield* takeEvery(CHECK_USER, handleSuccessfullyAuth)
}

export default function*() {
	yield fork(watchSuccesfullyAuth)
}
