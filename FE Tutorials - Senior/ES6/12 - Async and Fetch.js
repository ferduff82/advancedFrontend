
Async con Fetch: 

(async(loginName) => {
    try {
    	var response = await fetch(`https://api.github.com/users/${loginName}/followers`);
    	var json = await response.json;
    	var followerList = json.map(user => user.login);
    	console.log(followerList);
    } catch(e) {
    	console.log("Data didn't load", e);
    }
})('eveporcello');