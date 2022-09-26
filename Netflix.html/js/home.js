const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7c9e1fb735mshb1eb0e45b84dff6p127599jsn48150f00dfa6',
		'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
	}
};

fetch('https://unogs-unogs-v1.p.rapidapi.com/search/people?person_type=Actor', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
	