class Poll {
    constructor(root, title){
        this.root = root
        this.selected = sessionStorage.getItem("poll-selected")
        this.endpoint = "http://127.0.0.1:5500/poll"

        this.root.insertAdjacentHTML("afterbegin", 
        `<div class=poll__title> ${ title } </div>`
        )

        this._refresh();
    }
    
    //refrshing and getting the data from API
    async _refresh(){
        //call api and make a request to the endpoint and get the data as an arr
        const response = await fetch(this.endpoint)
        const data = await response.json()

        console.log(data)
    }
}

const p = new Poll(
    document.querySelector(".poll"),
    "Which do you prefer?"
)

console.log(p)