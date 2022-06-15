//teks command /start
function start(chtId, cmd) {
    var txt = '<b>🤖 SELAMAT DATANG DI BOT INI!</b>' + '\n' +
        'Silahkan klik command /help untuk bantuan.';
    sendText(chtId, txt);
}

//teks command /help
function help(chtId, cmd) {
    var txt = '<b>ℹ️ DAFTAR COMMAND BOT</b>' + '\n' +
        '--------------------------' + '\n' +
        '1. /tambah - Tambah data' + '\n' +
        '2. /ubah - Ubah data' + '\n' +
        '3. /hapus - Hapus data' + '\n' +
        '4. /tampilharga - Tampil harga' + '\n' +
        '5. /tampildata - Tampil data' + '\n' +
        '6. /help - Bantuan';
    sendText(chtId, txt);
}

//teks command tambah
function tambah(chtId, cmd) {
    var txtInfo = 'ℹ️ Gunakan format seperti ini untuk menginput data' + '\n\n' +
        '<b>Tambah@</b>(kode_barang)' + '\n' +
        '<b>NAMA BARANG :</b> (nama_barang)' + '\n' +
        '<b>HARGA BELI :</b> (harga_beli)' + '\n' +
        '<b>KETERANGAN :</b> (keterangan)' + '\n\n' +
        '⚠️ Pastikan tidak menginput kode barang yang sama, lihat data yang sudah diinput /tampildata .' + '\n' +
        '- Copas command dibawah lalu masukan data.';
    sendText(chtId, txtInfo);
    var txtTbh = 'Tambahdata@' + '\n' +
        'NAMA BARANG : ' + '\n' +
        'HARGA BELI : ' + '\n' +
        'KETERANGAN : ';
    var txtCode = '<code>' + txtTbh + '</code>';
    sendText(chtId, txtCode);
}

//teks command ubah
function ubah(chtId, cmd) {
    var txtInfo = 'ℹ️ Ketik command <b>edit@(kode_barang)</b> lalu gunakan format seperti ini untuk mengubah data' + '\n\n' +
        '<b>Ubah@</b>(kode_barang)' + '\n' +
        '<b>NAMA BARANG :</b> (nama_barang)' + '\n' +
        '<b>HARGA BELI :</b> (harga_beli)' + '\n' +
        '<b>KETERANGAN :</b> (keterangan)' + '\n\n' +
        '- Copas command dibawah lalu masukan nomor data yang mau diedit.' + '\n' +
        '- Ketik command <b>/tampildata</b> untuk menampilkan kode barang.' ;
    sendText(chtId, txtInfo);
    var txtEdit = '<code>edit@</code>';
    sendText(chtId, txtEdit);
}

//teks command ubah data
function edit(chtId, cmd) {
    var sheet = SpreadsheetApp.openById(sheetId).getSheetByName('harga');
    var txt = '';
    var item = cmd.match(/edit@(.+)/i);
    var cekNo = cek(item[1]);
    if (cekNo != '') {
        var rs = bacaData();
        for (var i = 0; i < rs.length; i++) {
            if (rs[i][0] == item[1]) {
                txt = 'Ubahdata@' + rs[i][0] + '\n' +
                    'NAMA BARANG : ' + rs[i][1] + '\n' +
                    'HARGA BELI : ' + rs[i][2] + '\n' +
                    'KETERANGAN : ' + rs[i][3];
                var txtCode = '<code>' + txt + '</code>';
                sendText(chtId, txtCode);
            }
        }
    } else {
        txt = '❌ Gagal, tidak ada data' + '\n' +
            'tambahkan data /tambah';
        sendText(chtId, txt);
    }
}

//teks command hapus
function hapus(chtId, cmd) {
    var txtInfo = 'ℹ️ Ketik command <b>Hapus@(kode_barang)</b>' + '\n\n' +
        '- Copas command dibawah lalu masukan kode barang yang mau dihapus.' + '\n' +
        '- Ketik command <b>/tampildata</b> untuk menampilkan kode barang.';
    sendText(chtId, txtInfo);
    var txtHps = '<code>Hapusdata@</code>';
    sendText(chtId, txtHps);
}

//teks command tampil
function tampilHarga(chtId, cmd) {
    var txtInfo = 'ℹ️ Ketik command <b>Cariharga@(kode_barang)</b> untuk menampilkan kode barang' + '\n\n' +
        '- Copas command dibawah lalu masukan kode barang yang mau dicari.' + '\n' +
        '- Ketik command <b>/tampildata</b> untuk menampilkan kode barang.';
    sendText(chtId, txtInfo);
    var txtHps = '<code>Cariharga@</code>';
    sendText(chtId, txtHps);
}
