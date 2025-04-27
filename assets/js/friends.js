const messagesData = [
    { name: "Sneethan", message: "Heres my <a target='_blank' href='https://sneethan.xyz'>website</a>! ", image: "../assets/images/Sneethan_avatar.png" },
];

function displayMessages() {
    const messagesContainer = document.querySelector(".messages-container");
    messagesContainer.innerHTML = '';

    messagesData.forEach(messageData => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message-container');

        const imageElement = document.createElement('img');
        imageElement.classList.add('image');
        imageElement.src = messageData.image;

        const messageContentElement = document.createElement('div');
        messageContentElement.classList.add('message-content');

        const messageHeaderElement = document.createElement('div');
        messageHeaderElement.classList.add('message-header');

        const nameElement = document.createElement('h4');
        nameElement.classList.add('name');
        nameElement.textContent = messageData.name;

        const timestampElement = document.createElement('h4');

        messageHeaderElement.appendChild(nameElement);

        const messageTextElement = document.createElement('p');
        messageTextElement.classList.add('message');
        messageTextElement.innerHTML = messageData.message;

        messageContentElement.appendChild(messageHeaderElement);
        messageContentElement.appendChild(messageTextElement);

        messageElement.appendChild(imageElement);
        messageElement.appendChild(messageContentElement);

        messagesContainer.appendChild(messageElement);
    });
}

displayMessages();
