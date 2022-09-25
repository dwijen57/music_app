







document.getElementById("btnadd").onclick = function input(){
    var input_title = document.getElementById("song_title").value
    var input_artist= document.getElementById("artist_name").value
    var alert = document.getElementById("alert");

    var nodeTitle = document.createTextNode(input_title)
    var nodeArtist = document.createTextNode(input_artist)
    

    var li = document.createElement("li")
    var ul = document.createElement("ul")

   

    if(input_title == "" ||input_artist == "")
    {
        
        
        
        
        if(alert.style.display = 'none'){
            
            alert.style.display = 'block';

        }
 
    }

    else{
        if(alert.style.display = 'block'){

        alert.style.display = 'none';
        
    }
    ul.appendChild(nodeArtist);
    li.appendChild(nodeTitle);
    
    li.appendChild(ul);
    document.getElementById("List").appendChild(li);
    }

}

