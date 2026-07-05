let materials = JSON.parse(localStorage.getItem("materials")) || [];

showTable(materials);

function searchMaterial() {

    const type = document.getElementById("searchType").value;

    const keyword = document
        .getElementById("keyword")
        .value
        .toLowerCase()
        .trim();

    if (keyword == "") {

        showTable(materials);

        return;

    }

    const result = materials.filter(item => {

        return String(item[type])
            .toLowerCase()
            .includes(keyword);

    });

    showTable(result);

}

function showTable(data) {

    let html = "";

    if (data.length == 0) {

        html = `
        <tr>
            <td colspan="8" class="text-center">
                No Data Found
            </td>
        </tr>
        `;

    } else {

        data.forEach(item => {

            html += `

            <tr>

                <td>

                ${
                    item.photo
                    ?
                    `<img
                        src="${item.photo}"
                        width="60"
                        height="60"
                        style="object-fit:cover;border-radius:6px;">`
                    :
                    "-"
                }

                </td>

                <td>${item.name}</td>

                <td>${item.sap}</td>

                <td>${item.qty}</td>

                <td>${item.shelf}</td>

                <td>${item.level}</td>

                <td>${item.bin}</td>

                <td>${item.location}</td>

            </tr>

            `;

        });

    }

    document.querySelector("#table tbody").innerHTML = html;

}