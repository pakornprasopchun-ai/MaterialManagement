// =========================================
// Material Management V3
// Part 1 / 4
// =========================================

let materials = JSON.parse(localStorage.getItem("materials")) || [];

let editIndex = -1;

// ===========================
// INITIALIZE
// ===========================

document.addEventListener("DOMContentLoaded", () => {

    updateStorageCode();

    renderTable(materials);

});

// ===========================
// SAVE
// ===========================

function save() {

    const file = document.getElementById("photo").files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function(e){

            saveData(e.target.result);

        };

        reader.readAsDataURL(file);

    } else {

        let photo = "";

        if(editIndex >= 0){

            photo = materials[editIndex].photo;

        }

        saveData(photo);

    }

}

function saveData(photo){

    const material={

        id: editIndex >=0
            ? materials[editIndex].id
            : Date.now(),

        name: document.getElementById("name").value.trim(),

        sap: document.getElementById("sap").value.trim(),

        qty: Number(document.getElementById("qty").value),

        shelf: document.getElementById("shelf").value,

        level: document.getElementById("level").value,

        bin: document.getElementById("bin").value,

        storageCode:
        document.getElementById("storageCode").value,

        location:
        document.getElementById("location").value,

        status:"Occupied",

        photo:photo

    };

    if(material.name==""){

        alert("Please enter Material Name");

        return;

    }

    if(material.sap==""){

        alert("Please enter SAP No.");

        return;

    }

    if(editIndex==-1){

        materials.push(material);

    }else{

        materials[editIndex]=material;

        editIndex=-1;

    }

    localStorage.setItem(

        "materials",

        JSON.stringify(materials)

    );

    clearForm();

    renderTable(materials);

}// ===========================
// TABLE
// ===========================

function renderTable(data){

    let html=`

    <thead>

    <tr>

        <th>Photo</th>

        <th>Material</th>

        <th>SAP</th>

        <th>Qty</th>

        <th>Shelf</th>

        <th>Level</th>

        <th>Bin</th>

        <th>Storage Code</th>

        <th>Status</th>

        <th>Location</th>

        <th>Action</th>

    </tr>

    </thead>

    <tbody>

    `;

    data.forEach(item=>{

        html+=`

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

            <td>

                <span class="badge bg-info">

                    ${item.storageCode}

                </span>

            </td>

            <td>

                <span class="badge bg-success">

                    ${item.status}

                </span>

            </td>

            <td>${item.location}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editMaterial(${item.id})">

                    Edit

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteMaterial(${item.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

    html += "</tbody>";

    document.getElementById("table").innerHTML = html;

}// ===========================
// EDIT
// ===========================

function editMaterial(id){

    const item = materials.find(x => x.id == id);

    if(!item) return;

    editIndex = materials.findIndex(x => x.id == id);

    document.getElementById("name").value = item.name;

    document.getElementById("sap").value = item.sap;

    document.getElementById("qty").value = item.qty;

    document.getElementById("shelf").value = item.shelf;

    document.getElementById("level").value = item.level;

    document.getElementById("bin").value = item.bin;

    document.getElementById("location").value = item.location;

    document.getElementById("storageCode").value = item.storageCode;

}

// ===========================
// DELETE
// ===========================

function deleteMaterial(id){

    if(!confirm("Delete this material ?")) return;

    materials = materials.filter(x => x.id != id);

    localStorage.setItem(

        "materials",

        JSON.stringify(materials)

    );

    renderTable(materials);

}

// ===========================
// SEARCH
// ===========================

function searchMaterial(){

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();

    if(keyword===""){

        renderTable(materials);

        return;

    }

    const result = materials.filter(item =>

        item.name.toLowerCase().includes(keyword)

        ||

        item.sap.toLowerCase().includes(keyword)

        ||

        item.shelf.toLowerCase().includes(keyword)

        ||

        item.level.toLowerCase().includes(keyword)

        ||

        item.bin.toLowerCase().includes(keyword)

        ||

        item.storageCode.toLowerCase().includes(keyword)

        ||

        item.location.toLowerCase().includes(keyword)

        ||

        item.status.toLowerCase().includes(keyword)

    );

    renderTable(result);

}// ===========================
// CLEAR FORM
// ===========================

function clearForm() {

    document.getElementById("photo").value = "";

    document.getElementById("name").value = "";

    document.getElementById("sap").value = "";

    document.getElementById("qty").value = "";

    document.getElementById("shelf").selectedIndex = 0;

    document.getElementById("level").selectedIndex = 0;

    document.getElementById("bin").selectedIndex = 0;

    document.getElementById("location").selectedIndex = 0;

    updateStorageCode();

}

// ===========================
// STORAGE CODE
// ===========================

function updateStorageCode() {

    const shelf = document.getElementById("shelf").value;

    const level = document.getElementById("level").value;

    const bin = document.getElementById("bin").value;

    document.getElementById("storageCode").value =
        `${shelf}-${level}-${bin}`;

}

// ===========================
// EVENT
// ===========================

document.getElementById("shelf")
    .addEventListener("change", updateStorageCode);

document.getElementById("level")
    .addEventListener("change", updateStorageCode);

document.getElementById("bin")
    .addEventListener("change", updateStorageCode);

// ===========================
// RESET DATABASE (OPTIONAL)
// ===========================

function resetDatabase() {

    if (!confirm("Delete ALL Material Data ?")) return;

    localStorage.removeItem("materials");

    materials = [];

    renderTable(materials);

    clearForm();

    alert("Database Reset Complete");

}

// ===========================
// INITIALIZE
// ===========================

updateStorageCode();

renderTable(materials);