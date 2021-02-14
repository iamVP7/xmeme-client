import Axios from '../../node_modules/axios'

/*var masterBaseURL = '/memes' // No I18N
 */
var masterBaseURL = 'http://ec2-18-218-95-245.us-east-2.compute.amazonaws.com:8081/memes'; // NO I18N

var localinstance = Axios.create({
	baseURL: '/'
})
var instance = Axios.create({
	baseURL: masterBaseURL
})
var deleteInstance = Axios.create({
	baseURL: masterBaseURL
})
var patchInstance = Axios.create({
	baseURL: masterBaseURL
})
var connections = {

	axiosGet: function (apiUrl) {
		return instance.get(apiUrl).then(function (response) {
			return response
		}).catch(error => {
			return error.response
		})
	},
	axiosPost: function (apiUrl, data) {
		
		
		return instance.post(apiUrl, data).then(function (response) {
			// this.activateLoading(false)
			return response.data ? response.data : response
		}).catch(error => {
			return error.response
		})
	},
	axiosPATCH: function (apiUrl, data) {
		return patchInstance.patch(apiUrl, data).then(function (response) {
			return response.data ? response.data : response
		}).catch(error => {
			return error.response
		})
	},
	activateLoading: function (showLoadDiv) {
		if (showLoadDiv) {
			// document.getElementById('loadingText').classList.add('active')
		} else {
			// document.getElementById('loadingText').classList.remove('active')
		}
	}
}

export default connections
