for (var i = 0; i < users.length; i++) {
	for (var i = 0; j < users.length; i++) {
		
				};	
	userWords[i].userWords.word === userWords[j].userWords.word
};

// i have a user array and a within that all the users have an array of words. so it would be some like 
// maybe the users would habe usersWords and the usersWords will have the name so it would be 
//userWords[i].userWords.word






		<a href="/words"><p>All Hey check out the words other users have been checking out!</p></a>

				<div id="dataset-select-container">
					<p id="users-title">Users</p>
					<select id="dataset-select">
						<option value=""/>-------</option>
						<% for (var i=0; i < users.length; i ++) { %>
							<option value="<%= users[i].id %>"><%= users[i].username %></option>
						<% } %>
					</select>					
				</div> 








						< div id="movies-container">
						<% for (var i=0; i < user.movies.length; i++) { %>
							<div class="movies">
								<p><%= user.movies[i].name %></p>
							</div>
						<% } %>
					</div>















					<% if(usertrue)  { %>
						<p>add another movie to your collection</p>
						<form action="/users/<%= user.id %>/" method="POST">
							<input type="text" name="name" placeholder="Name">
							<input type="text" name="from" placeholder="What story is he from?">
							<input type="text" name="accomplishments" placeholder="High lights">
							<input type="text" name="about" placeholder="Tell us more">

							<input type="submit">				
						</form>
					<% } %>


					<% if(usertrue) { %> 
						<form action="/users/<%= data.id %>?_method=DELETE" method="POST">
							
							<button id="delete-button">Remove user</button>
						</form>
					<% } %>
			</div>
		</main>
	</div>




















					