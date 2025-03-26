const discordUserId = '442142462857707520';

async function fetchDiscordStatus() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`);
        const data = await response.json();

        if (data.success) {
            const status = data.data.discord_status;
            updateStatusIndicator(status);
        } else {
            console.error('Failed to fetch Discord status:', data.error);
        }
    } catch (error) {
        console.error('Error fetching Discord status:', error);
    }
}

function updateStatusIndicator(status) {
    const statusElement = document.getElementById('status');

    statusElement.classList.remove('online', 'idle', 'dnd', 'offline');

    if (status === 'online' || status === 'idle' || status === 'dnd') {
        statusElement.classList.add('online');
        statusElement.textContent = 'I am currently online.';
    } else {
        statusElement.classList.add('offline');
        statusElement.textContent = 'I am currently offline.';
    }
}
function fetchRSSFeed(rssUrl, targetElement) {
    console.log("Fetching RSS from:", rssUrl); 
  
    fetch(rssUrl)
      .then(response => {
        console.log("Response status:", response.status); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); 
        }
        return response.text();
      })
      .then(str => {
        console.log("XML String (first 200 chars):", str.substring(0, 200)); 
        const xmlDoc = new window.DOMParser().parseFromString(str, "text/xml");
        console.log("Parsed XML:", xmlDoc); 
  
        const errorNode = xmlDoc.querySelector("parsererror"); 
        if (errorNode) {
          console.error("XML Parsing Error:", errorNode.textContent);
          throw new Error("Invalid RSS feed format");
        }
  
        const items = xmlDoc.querySelectorAll("item");
        const targetList = document.querySelector(targetElement);
  
        if (!targetList) {
          console.error("Target element not found:", targetElement);
          return;
        }
        targetList.innerHTML = ""; 
  
        if (items.length === 0) {
          const listItem = document.createElement("li");
          listItem.innerHTML = `
            <span class="title">No Blogs yet :(</span>
            <span class="bar"></span>
            <span class="date">${new Date().toLocaleDateString()}</span> 
          `;
          targetList.appendChild(listItem);
          return;
        }
  
        const recentItems = Array.from(items).slice(0, 5);
  
        recentItems.forEach(item => {
          const title = item.querySelector("title")?.textContent || "No Title Available"; 
          const link = item.querySelector("link")?.textContent || "#"; 
          const date = item.querySelector("pubDate")?.textContent; 
  
          const formattedDate = date ? formatDate(date) : new Date().toLocaleDateString();
          
  
          const listItem = document.createElement("li");
          listItem.innerHTML = `
            <span class="title"><a target="_blank" href="${link}">${title}</a></span>
            <span class="bar"></span>
            <span class="date">${formattedDate}</span>
          `;
          targetList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error("Fetch or Parse Error:", error);
        const targetList = document.querySelector(targetElement);
        if (targetList) {
          targetList.innerHTML = `<li><span class="title">Error loading blogs: ${error.message}</span></li>`; 
        }
      });
  }
  
  function formatDate(dateString) {
    try {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1; 
      const year = date.getFullYear();
  
      const paddedDay = day < 10 ? '0' + day : day;
      const paddedMonth = month < 10 ? '0' + month : month;
  
  
      return `${paddedMonth}-${paddedDay}-${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      const today = new Date();
      const todayDay = today.getDate();
      const todayMonth = today.getMonth() + 1;
      const todayYear = today.getFullYear();
      const paddedTodayDay = todayDay < 10 ? '0' + todayDay : todayDay;
      const paddedTodayMonth = todayMonth < 10 ? '0' + todayMonth : todayMonth;
      return `${paddedTodayMonth}-${paddedTodayDay}-${todayYear}`;
    }
  }
  const rssFeedUrl = "https://corsproxy.io/?url=https://orbiva.bearblog.dev/rss/"; 
  const targetElementSelector = ".writing-list";
  
  fetchRSSFeed(rssFeedUrl, targetElementSelector);

function calculatePreciseAge(birthdate) {
    let now = new Date();
    let birthTime = new Date(birthdate).getTime();
    let nowTime = now.getTime();

    let ageInMilliseconds = nowTime - birthTime;
    let ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); 

    return ageInYears.toFixed(10);
}

function updateAge() {
    document.getElementById("age").textContent = calculatePreciseAge("2002-07-22T00:00:00");
}

document.addEventListener("DOMContentLoaded", function () {
  const text = "Hey I'm Joshua!";
  const typingElement = document.getElementById("typing-text");
  let index = 0;

  function typeText() {
      if (index < text.length) {
          typingElement.innerHTML = text.substring(0, index + 1) + '<span class="typing-cursor"></span>';
          index++;
          setTimeout(typeText, 100);
      } else {
          setTimeout(() => {
              typingElement.innerHTML = text + '<span class="typing-cursor"></span>';
          }, 500);
      }
  }

  typeText();
});


setInterval(updateAge, 50);

updateAge();

setInterval(fetchDiscordStatus, 5000);

fetchDiscordStatus();

const textElement = document.getElementById('typing-text');
const textWidth = textElement.scrollWidth + 5; 

textElement.style.setProperty('--text-width', `${textWidth}px`);