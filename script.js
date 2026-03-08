

        let form = document.querySelector("form")
        let closeBtn = document.querySelector(".close button")
        let add = document.querySelector(".add")
        let upBtn = document.querySelector(".up")
        let downBtn = document.querySelector(".down")
        let card = document.querySelector(".call3")

        let users = JSON.parse(localStorage.getItem("user")) || []
        let currentIndex = users.length - 1

        function showNoData() {
            card.innerHTML = "<h2>No user data</h2>"
        }

        closeBtn.addEventListener("click", function (e) {
            e.preventDefault()
            form.style.display = "none"
        })

        add.addEventListener("click", function (e) {
            e.preventDefault()
            form.style.display = "flex"
        })

        form.addEventListener("submit", function (e) {

            e.preventDefault()

            let name = form.querySelectorAll("input")[0].value.trim()
            let email = form.querySelectorAll("input")[1].value.trim()
            let phone = form.querySelectorAll("input")[2].value.trim()
            let img = form.querySelectorAll("input")[3].value.trim()

            let gender = document.querySelector('input[name="gender"]:checked')?.value

            if (name === "") { alert("enter name"); return }
            if (email === "") { alert("enter email"); return }
            if (phone === "") { alert("enter phone"); return }
            if (img === "") { alert("enter image link"); return }
            if (!gender) { alert("select gender"); return }

            let newUser = {
                name: name,
                email: email,
                phone: phone,
                img: img,
                gender: gender
            }

            users.push(newUser)

            localStorage.setItem("user", JSON.stringify(users))

            currentIndex = users.length - 1

            showUser(users[currentIndex])

            form.querySelectorAll("input")[0].value = ""
            form.querySelectorAll("input")[1].value = ""
            form.querySelectorAll("input")[2].value = ""
            form.querySelectorAll("input")[3].value = ""

            document.querySelectorAll('input[name="gender"]').forEach(function (r) {
                r.checked = false
            })

            form.style.display = "none"

        })

        function showUser(user) {

            card.innerHTML = `
<img src="${user.img}">
<h2>${user.name}</h2>
<p>${user.email}</p>
<p>${user.phone}</p>
<p>Gender : ${user.gender}</p>

<div class="cardBtns">
<a href="tel:${user.phone}">Call</a>
<a href="sms:${user.phone}">Message</a>
</div>
`

        }

        if (users.length > 0) {
            showUser(users[currentIndex])
        } else {
            showNoData()
        }

        upBtn.addEventListener("click", function () {

            if (currentIndex > 0) {
                currentIndex--
                showUser(users[currentIndex])
            }

        })

        downBtn.addEventListener("click", function () {

            if (currentIndex < users.length - 1) {
                currentIndex++
                showUser(users[currentIndex])
            }

        })

