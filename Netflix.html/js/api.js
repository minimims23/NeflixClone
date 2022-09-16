const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7c9e1fb735mshb1eb0e45b84dff6p127599jsn48150f00dfa6',
		'X-RapidAPI-Host': 'netflix-unofficial.p.rapidapi.com'
	}
};

fetch('https://netflix-unofficial.p.rapidapi.com/api/genres', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));