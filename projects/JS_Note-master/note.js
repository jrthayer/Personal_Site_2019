class Note{
    constructor(note, name){
        this.notepad = note.getElementsByClassName("notepad")[0];
        this.name = name;
        this.saveBtn = note.getElementsByClassName("notepadBtn")[0];
        this.saveBtn.addEventListener("click", () => this.save());
        
        if (typeof(Storage) !== "undefined"){
            if(localStorage.getItem(name) != null){
                this.notepad.innerHTML = localStorage.getItem(name);
            }
            else{
                this.notepad.innerHTML = "Put Notes Here";
            }
            
        } else {
            this.notepad.innerHTML = "Local Storage Not Supported";
        }
    }

    save(){
        alert("note has been saved");
        localStorage.setItem(this.name, this.notepad.value);
    }
}

let test = new Note(document.getElementsByClassName('note')[0], "note1");