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
        

        
        this.root.querySelectorAll(".poll__option").forEach(option =>{option.remove()})
        
        //create a div for each element in the arr
        for(const option of data){
            const template = document.createElement("template")
            const fragment = template.content

            template.innerHTML = `
            <div class="poll__option ${this.selected === option.label ? "poll__option--selected" : ""}">
                <div class="poll__option-fill"></div>
                <div class="poll__option-info">
                    <span class="poll__label"> ${option.label} </span>
                    <span class="poll__label"> ${option.percentage}%</span>
                </div>
            </div>
            `;
        
        
        //     if(!this.selected){
        //         fragment.querySelector(".poll__option").addEventListener("click", () =>{
                    
        //             fetch (this.endpoint,{
        //                 method: "post",
        //                 body: `add=${ option.label }`,
        //                 headers: {
        //                     "Content-Type": "application/x-www-form-urlencoded"
        //                 }
        //             }).then(()=>{
        //                 this.selected = option.label
        //                 document.getElementById("message").innerHTML ="You have voted! Please open a new window to vote again"
        //                 sessionStorage.setItem("poll-selected", option.label)
        //                 //sessionStorage.removeItem("poll-selected")
        //                 this._refresh()
        //                 //sessionStorage.removeItem("poll-selected")
        //             })
        //         })
        //     }

        
            
            

            
            
            fragment.querySelector(".poll__option-fill").style.width = `${option.percentage}%`
            this.root.appendChild(fragment)
            
        }
        
        
    }
    
}

const p = new Poll(
    document.querySelector(".poll"),
    "Which do you prefer?"
)
function submitForm() {
 location.reload()
 p._refresh
}
const formId = document.querySelector(".form")
formId.addEventListener("click" , event =>{
    event.preventDefault()
    const formData = new FormData(formId)
    const data = new URLSearchParams(formData)

    const postEndpoint = 'http://127.0.0.1:5500/poll/addOption'
    fetch(postEndpoint, {
        method: 'POST',
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    }).then(res => res.json())
        .then(data=>console.log(data))
        .catch(error => console.log(error))








    // //alert('HI')
    // try{
    //     const postEndpoint = 'http://127.0.0.1:5500/poll/addOption'
    //     const postResponse = await fetch(postEndpoint, {
    //         method : "POST",
    //         body: new FormData(document.querySelector('form'))
    //         // body:  "aim",
    //         // headers: {
    //         //             "Content-Type": "application/x-www-form-urlencoded"
    //         //     }
    //     }) 

    //     if(postResponse.ok){
    //         const postData = await postResponse.json()
    //         console.log(postData)
    //     }
        
    // }
    // catch(error){
    //     console.log(error)
    // }
})