if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/service-worker.js", { scope: "/" })
      .then(function (registration) { })
      .catch(function (error) {
        console.log('Register Failed:', error);
      });
  }
  else {
    console.log('Service workers are not supported.');
  }
  
  const notifBtn = document.getElementById("btnadd");
  if ("Notification" in window && "serviceWorker" in navigator)
  {
    notifBtn.addEventListener("click", () =>{
      switch (Notification.permission) {
        case "denied":
          document.getElementById("btnadd").style.display = "none";
          document.getElementById("dispNoti").style.display = "none";
          break;
  
        case "default":
          document.getElementById("btnadd").onclick = () => {
            Notification.requestPermission();
          };
  
          break;
  
        case "granted":
          document.getElementById("btnadd").style.display = "none";
          document.getElementById("dispNoti").style.display = "block";
          break;
      }
      navigator.serviceWorker.addEventListener("message", (message) => {
        let displayMsg = document.getElementById("msg");
        displayMsg.innerText = message.data;
      });

      if (Notification.permission == "granted") {
        document.getElementById("btnadd").style.display = "none";
        document.getElementById("dispNoti").style.display = "block";
      } else if (Notification.permission == "denied") {
        document.getElementById("btnadd").style.display = "none";
        document.getElementById("dispNoti").style.display = "none";
      } else if (Notification.permission == "default") {
        document.getElementById("btnadd").style.display = "block";
        document.getElementById("dispNoti").style.display = "none";
      }

    });
    
  }

  if (Notification.permission == "granted") {
    document.getElementById("btnadd").style.display = "none";
    document.getElementById("dispNoti").style.display = "block";
  } else if (Notification.permission == "denied") {
    document.getElementById("btnadd").style.display = "none";
    document.getElementById("dispNoti").style.display = "none";
  } else if (Notification.permission == "default") {
    document.getElementById("btnadd").style.display = "block";
    document.getElementById("dispNoti").style.display = "none";
  }
  




document.getElementById("btnadd").onclick = () => {
    // var input_title = document.getElementById("title").value
    // var input_body= document.getElementById("body").value
    // var alert = document.getElementById("alert");

    // var nodeTitle = document.createTextNode(input_title)
    // var nodeArtist = document.createTextNode(input_body)
    

    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(document.getElementById("title").value, {
        body: document.getElementById("body").value,
        actions: [
          {
            action: "agree",
            title: "Agree",
          },
          {
            action: "disagree",
            title: "Disagree",
          },
        ],
      });
    });

}


