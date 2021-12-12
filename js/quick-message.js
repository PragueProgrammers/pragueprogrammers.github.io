document.addEventListener('DOMContentLoaded', () => {
	const statusElement = document.getElementById('quick-message-status');

	document
		.getElementById('quick-message-form')
		.addEventListener('submit', (event) => {
			e.preventDefault();

			statusElement.innerHTML = 'Delivering message...';

			fetch({
				method: 'POST',
				url: 'https://api.pragueprogrammers.cz/quick-message',
				body: JSON.stringify({
					email: event.target.elements['email'].value,
					subject: event.target.elements['subject'].value,
					message: event.target.elements['message'].value,
				}),
			})
				.then((response) => {
					statusElement.innerHTML = 'Your message was successfuly delivered.';
				})
				.catch((error) => {
					statusElement.innerHTML = 'Message delivery failed. Please try again, or send us an e-mail directly to <a href="mailto:hello@pragueprogrammers.cz">hello@pragueprogrammers.cz</a>. We are sorry for the trouble.';
				});
		});
});
