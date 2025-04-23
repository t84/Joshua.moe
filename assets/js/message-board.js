const messagesData = [
    { name: "Joshua", timestamp: "2025-04-23 13:55 CDT", message: "Hey this is pretty cool!", image: "../assets/images/Joshua_avatar.png" },
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
        timestampElement.classList.add('timestamp');
        const userTime = convertTimestampToUserTime(messageData.timestamp);
        timestampElement.textContent = userTime;

        messageHeaderElement.appendChild(nameElement);
        messageHeaderElement.appendChild(timestampElement);

        const messageTextElement = document.createElement('p');
        messageTextElement.classList.add('message');
        messageTextElement.textContent = messageData.message;

        messageContentElement.appendChild(messageHeaderElement);
        messageContentElement.appendChild(messageTextElement);

        messageElement.appendChild(imageElement);
        messageElement.appendChild(messageContentElement);

        messagesContainer.appendChild(messageElement);
    });
}
function convertTimestampToUserTime(timestamp) {
    const originalDate = new Date(timestamp);

    if (isNaN(originalDate.getTime())) {
        return "Invalid Date";
    }
    const userTime = originalDate.toLocaleString();
    return userTime;
}

displayMessages();