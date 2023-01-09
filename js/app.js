if(window.openDatabase){
  var mydb = openDatabase("noteapp", '1.0', "WebSQL Database", 2 * 1024 * 1024);
  mydb.transaction(function(tx){
		tx.executeSql("create table if not exists user(username varchar(25) primary key, password varchar(25))");
    tx.executeSql("insert into user values ('note', 'noteapp')");
    tx.executeSql("create table if not exists note (judul varchar(25) primary key, kategori varchar(25), catatan varchar(255), tanggal date, is_bookmark varchar(10))");
		tx.executeSql("insert into note values ('hakim', 'noteapp','catatan tentang','2008-11-11','true')");
    
  });
}else{
  alert("Browser tidak mendukung WebSQL");
}

tampil_data();

function tampil_data(){
  mydb.transaction(function(tx){
    tx.executeSql("select * from note",[], ambil_data);
  });    
}

function ambil_data(transaction, results){
  var list_holder=document.getElementById("list-data");
  list_holder.innerHTML="";

  var i;
  for(i=0; i<results.rows.length;i++){
    var nomor=i+1;
    var row=results.rows.item(i);
		list_holder.innerHTML+="<ons-list-item><div class='left'  >"+ nomor +"</div><div class='center' style='font-weight:bold'onclick='detail(\""+row.judul+"\",\""+row.kategori+"\",\""+row.catatan+"\",\""+row.tanggal+"\",\""+row.is_bookmark+"\")'>"+ row.judul +"</div><div class='right'><a onclick='edit_data(\""+row.judul+"\",\""+row.kategori+"\",\""+row.catatan+"\",\""+row.tanggal+"\",\""+row.is_bookmark+"\");'><ons-icon icon='fa-edit'></ons-icon></a>&emsp;<a onclick='hapus_data(\""+row.judul+"\");'><ons-icon icon='fa-trash'></ons-icon></a></div></ons-list-item>";    
  }
}
// tampil data untuk kategori personal
function tampil_data_personal(){
  mydb.transaction(function(tx){
    tx.executeSql("select * from note where kategori = 'personal'",[], ambil_data_personal);
  });    
}

function ambil_data_personal(transaction, results){
  var list_holder=document.getElementById("list-data-personal");
  list_holder.innerHTML="";

  var i;
  for(i=0; i<results.rows.length;i++){
    var nomor=i+1;
    var row=results.rows.item(i);
		list_holder.innerHTML+="<ons-list-item><div class='left'  >"+ nomor +"</div><div class='center' style='font-weight:bold'onclick='detail(\""+row.judul+"\",\""+row.kategori+"\",\""+row.catatan+"\",\""+row.tanggal+"\",\""+row.is_bookmark+"\")'>"+ row.judul +"</div><div class='right'><a onclick='edit_data(\""+row.judul+"\",\""+row.kategori+"\",\""+row.catatan+"\",\""+row.tanggal+"\",\""+row.is_bookmark+"\");'><ons-icon icon='fa-edit'></ons-icon></a>&emsp;<a onclick='hapus_data(\""+row.judul+"\");'><ons-icon icon='fa-trash'></ons-icon></a></div></ons-list-item>";    
  }
}

function ambil_detail(transaction, results){
  // var list_holder=document.getElementById("list-detail");
  // list_holder.innerHTML="";
  var judul=document.getElementById("detail_judul");
  judul.innerHTML="";
  var tanggal=document.getElementById("detail_tanggal");
  tanggal.innerHTML="";
  var kategori=document.getElementById("detail_kategori");
  kategori.innerHTML="";
  var catatan=document.getElementById("detail_catatan");
  // catatan.innerHTML="";
  var i;
  for(i=0; i<results.rows.length;i++){
    var nomor=i+1;
    var row=results.rows.item(i);
    judul.innerHTML=row.judul;
    tanggal.innerHTML=row.tanggal;
    kategori.innerHTML=row.kategori;
    catatan.innerHTML=row.catatan;
    // list_holder.innerHTML="  <ons-list-item>"+row.judul+"</ons-list-item>";
		// list_holder.innerHTML+="<ons-list-item><div class='left'  >"+ nomor +"</div><div class='center' style='font-weight:bold'onclick='detail(\""+row.judul+"\",\""+row.kategori+"\",\""+row.catatan+"\",\""+row.tanggal+"\",\""+row.is_bookmark+"\")'>"+ row.judul +"</div><div class='right'><a onclick='edit_data(\""+row.judul+"\",\""+row.kategori+"\",\""+row.catatan+"\",\""+row.tanggal+"\",\""+row.is_bookmark+"\");'><ons-icon icon='fa-edit'></ons-icon></a>&emsp;<a onclick='hapus_data(\""+row.judul+"\");'><ons-icon icon='fa-trash'></ons-icon></a></div></ons-list-item>";    
  }
}
function cek() {
  
}
function tambah_data() {
  var judul = document.getElementById('judul').value;
  var catatan = document.getElementById('catatan').value;
  var kategori = document.getElementById('kategori').value;
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let tanggal = `${day}-${month}-${year}`;
  var is_bookmark = "false"
  mydb.transaction(function (tx) {
    tx.executeSql("insert into note values (?,?,?,?,?)", [judul,kategori,catatan,tanggal,is_bookmark]);    
  });
	alert("data telah tersimpan");
  window.location.reload();
  fn.load('home.html');
  
  
 
}
function detail(judul,kategori,catatan,tanggal,is_bookmark){
  // console.log(judul);
  let data_judul=judul;
  mydb.transaction(function(tx){
    tx.executeSql("select * from note where judul=?",[judul], ambil_detail);
  });    
fn.load('detail.html')
  // document.getElementById("judul").value=judul;
  // content.load('detail.html')
  // .then(menu.close.bind(menu));
  // fn.load('detail.html');
  // console.log(kategori);
  // console.log(catatan);
  // console.log(tanggal);
  // console.log(is_bookmark);
  // document.getElementById("judul").value=judul;
  // fn.load('detail.html');
  // document.getElementById("nim").value=nim;
  // document.getElementById("nama").value=nama;
  // if(prodi == "Teknik Informatika"){
  //   document.getElementById("ti").checked = true;
  // }else if(prodi == "Sistem Informasi"){
  //   document.getElementById("si").checked = true;
  // }else if(prodi == "Manajemen Informatika"){
  //   document.getElementById("mi").checked = true;
  // }else if(prodi == "Komputerisasi Akuntansi"){
  //   document.getElementById("ka").checked = true;
  // }

  // if(angsuran == "angsuran_1"){
  //   document.getElementById("angsuran").selectedIndex = 1;
  // }else if(angsuran == "angsuran_2"){
  //   document.getElementById("angsuran").selectedIndex = 2;
  // }else if(angsuran == "angsuran_3"){
  //   document.getElementById("angsuran").selectedIndex = 3;
  // }else if(angsuran == "angsuran_4"){
  //   document.getElementById("angsuran").selectedIndex = 4;
  // }
  // document.getElementById("jumlah").value=jumlah;
  // document.getElementById("simpan").innerHTML="<ons-button style=\"background-color: orange\" onclick='ubah_data();'>Update</a>";
}

window.fn = {};
sessionStorage.setItem("login", "fasya");
let user = sessionStorage.getItem("login")

document.getElementById("user").innerHTML = user;


window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  tampil_data_personal();
  tampil_data();
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};
