if(window.openDatabase){
  var mydb = openDatabase("noteapp", '1.0', "WebSQL Database", 2 * 1024 * 1024);
  mydb.transaction(function(tx){
		tx.executeSql("create table if not exists user(username varchar(25) primary key, password varchar(25))");
    tx.executeSql("insert into user values ('fasya', 'noteapp')");
    tx.executeSql("create table if not exists note (judul varchar(25) primary key, kategori varchar(25), catatan varchar(255), tangal date, is_bookmark varchar(10))");
		tx.executeSql("insert into note values ('hakim', 'noteapp','catatan tentang','2008-11-11','true')");
    
  });
}else{
  alert("Browser tidak mendukung WebSQL");
}
ons.ready(function() {
  var pullHook = document.getElementById('pull-hook');
  
  pullHook.addEventListener('changestate', function(event) {
    var message = '';

    switch (event.state) {
      case 'initial':
        message = 'Pull to refresh';
        break;
      case 'preaction':
        message = 'Release';
        break;
      case 'action':
        message = 'Loading...';
        break;
    }

    pullHook.innerHTML = message;
  });

  pullHook.onAction = function(done) {
    setTimeout(done, 1000);
  };
});

function tambah_data() {
  var judul = document.getElementById('judul').value;
  var catatan = document.getElementById('catatan').value;
  var kategori = document.getElementById('kategori').value;
  var tanggal = "tanggal"
  var is_bookmark = "true"
  mydb.transaction(function (tx) {
    tx.executeSql("insert into note values (?,?,?,?,?)", [judul,kategori,catatan,tanggal,is_bookmark]);    
  });
	alert("data telah tersimpan");
  window.location.reload();
  fn.load('home.html');
  
  
 
}

window.fn = {};
sessionStorage.setItem("login", "Hakim");
let user = sessionStorage.getItem("login")
console.log(user);
document.getElementById("user").innerHTML = user;


window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};
