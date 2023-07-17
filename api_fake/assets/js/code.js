// url
const url = 'https://randomuser.me/api/?results=55';
const page = {
    postPerPage: 9,
    currentPage: 1,
    results: null
}

// method ajax
let ajax = new XMLHttpRequest();
ajax.onreadystatechange = function (ev) {
    page.currentPage = ev;
    //checked status 
    // چک کردن اکی بودن درخواست
    if (this.readyState == 4 && this.status == 200) {
        let res = this.responseText;
        res = JSON.parse(res);
        page.results = res.results;
        // console.log(page.results);

        const loadPage = function (ev) {
            page.currentPage = ev;

            let startPost = (page.currentPage - 1) * page.postPerPage;
            let totalPage = Math.ceil(page.results.length / page.postPerPage);
            let endPost = startPost + page.postPerPage > page.results.length ? page.results.length : startPost + page.postPerPage;
            // console.log("startPost:  " + startPost);

            // pagination
            let pagination = document.querySelector(".pagination");
            // 
            pagination.innerHTML = "";

            // make btn << Next and Previous >>
            pagination.innerHTML = `<li class="page-item"><span class="page-link" id="Previous">Previous</span></li>`;
            pagination.innerHTML += `<li class="page-item"><a class="page-link" id="Next">Next</span></li>`;
            // make btn
            for (let index = 1; index <= totalPage; index++) {
                let li = document.createElement('li');
                li.innerHTML = `<span class="page-link">${index}</span>`;
                li.classList.add(`page-item`);
                li.addEventListener('click', function () {
                    loadPage(index);
                });
                if (index == page.currentPage) {
                    li.classList.add('active');
                }
                pagination.appendChild(li);
            }


            // click on btn << Next and Previous >>
            document.getElementById("Next").addEventListener('click', ev => {
                if (page.currentPage < totalPage) {
                    loadPage(page.currentPage + 1);
                }
            });
            document.getElementById("Previous").addEventListener('click', ev => {
                if (page.currentPage > 1) {
                    loadPage(page.currentPage - 1);
                }
            });


            document.querySelector('.info').innerHTML = `information </br></br> page ${page.currentPage}`;
            const results = res['results'];
            let data = document.getElementById('data');
            data.innerHTML = "";
            for (let index = startPost; index < endPost; index++) {
                // console.log(startPost + "end    " + endPost)
                // The results are in array format
                let item = results[index];

                // img box
                let img = item['picture'];
                img = img['large'];

                //name
                let name = item['name'];
                name = name['first'] + "  " + name["last"];

                //age
                let registered = item['registered'];
                registered = registered['age'];

                //email
                let email = item['email'];

                //phone
                let phone = item['phone'];

                // spilling info in html
                data.innerHTML += `
                <div class="col-lg-4">
                    <a href="#" target="_blank" class="card my-3">
                       
                        <img src="${img}" class="w-100 img_box card-img-top" alt="${name}">                    

                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="card-title">${name}</h5>
                                <span>age : ${registered}</span>
                            </div>

                            
                            <p>Ways of communication :</p>
                            <ul>
                            <li>Phone Number : ${email}</li>
                            <li>Email : ${phone}</li>
                            </ul>
                        </div>
                    </a>
                </div>
            `;

            }
        }
        loadPage(1);
    }
    else {
        let data = document.getElementById('data');
        // data.innerHTML = "<h5 class='h3 text-center'>یافت نشد</h5>";
    }
}
// Get url and sent info
ajax.open('GET', url, true);
ajax.send();