window.addEventListener('load', () => {
	document
		.getElementById('quick-message-form')
		.addEventListener('submit', (submitEvent) => {
			submitEvent.preventDefault();

			const statusElement = document.getElementById('quick-message-status');

			const emailElement = submitEvent.target['email'];
			const subjectElement = submitEvent.target['subject'];
			const messageElement = submitEvent.target['message'];

			if (!/^\S+@\S+\.\S+$/.test(emailElement.value)) {
				emailElement.classList.add('error');
				statusElement.innerHTML = 'You entered an invalid e-mail address. Please try again.';
				return;
			}

			if (messageElement.value.trim() === '') {
				statusElement.innerHTML = 'You did not write a message. Please try again.';
				return;
			}

			emailElement.classList.remove('error');
			statusElement.classList.remove('error');

			statusElement.innerHTML = 'Delivering your message...';

			fetch({
				method: 'POST',
				url: 'https://api.pragueprogrammers.cz/quick-message',
				body: JSON.stringify({
					email: emailElement.value,
					subject: subjectElement.value,
					message: messageElement.value,
				}),
			})
				.then((response) => {
					statusElement.innerHTML = 'Your message was successfuly delivered.';

					emailElement.value = '';
					subjectElement.value = '';
					messageElement.value = '';
				})
				.catch((error) => {
					statusElement.classList.add('error');
					statusElement.innerHTML = 'Message delivery failed. Please try again, or send us an e-mail directly to <a href="mailto:hello@pragueprogrammers.cz">hello@pragueprogrammers.cz</a>. We are sorry for the trouble.';
				});
		});
});
