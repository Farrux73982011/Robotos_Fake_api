fetch('http://localhost:7000/users')
  .then(res => res.json())
  .then(res => reload(res))

let name_na = document.querySelector('.name')
let surname = document.querySelector('.surname')
let age = document.querySelector('.age')
let foto = document.querySelector('.foto')

let twofife = document.querySelector('.twofife')
let fife= document.querySelector('.fife')
let ost= document.querySelector('.ost')
let add_btn = document.querySelector('.add')

function reload(arr) {
    twofife.innerHTML = ""
    fife.innerHTML = ""
    ost.innerHTML = ""

    for(let item of arr) {
        let div_korol = document.createElement('div')
        let h1_img = document.createElement('div')
        let name_h1 = document.createElement('h1')
        let img = document.createElement('img')
        let div_age = document.createElement('div')
        let age_h1_box = document.createElement('h1')
        let num_h1 = document.createElement('h1')
        let delete_btn = document.createElement('button')

        div_korol.classList.add('div_korol')
        h1_img.classList.add('h1_img')
        name_h1.classList.add('name_h1_box')
        img.classList.add('img')
        div_age.classList.add('div_age')
        age_h1_box.classList.add('age_h1_box')
        num_h1.classList.add('num_h1')
        delete_btn.classList.add('delet_btn')

        name_h1.innerHTML = `${item.firstName} ${item.lastName}`
        img.src = item.image
        age_h1_box.innerHTML = 'Age'
        num_h1.innerHTML = item.age
        delete_btn.innerHTML = 'Delete'

        div_korol.append(h1_img, div_age, delete_btn)
        h1_img.append(name_h1, img)
        div_age.append(age_h1_box, num_h1)
        
        if(item.age <= '25'){
            twofife.append(div_korol)
        }else if(item.age <= '50'){
            fife.append(div_korol)
        }else if(item.age > '50'){
            ost.append(div_korol)
        }
        delete_btn.onclick = () => {
            fetch('http://localhost:7000/users/' + item.id, {
                method: "delete"
            })
            .then(res => {
                if(res.status === 200 || res.status === 201) {
                    div_korol.remove()
                }
            })
        }
    }
}

add_btn.onclick = () => {
    fetch('http://localhost:7000/users', {
        method: "post",
        body: JSON.stringify({firstName: name_na.value, lastName: surname.value, age: age.value, image: foto.value}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    return reload()
}