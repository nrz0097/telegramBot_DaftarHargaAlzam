//fungsi tambah data
function tambahData(chtId, cmd) {
    var sheet = SpreadsheetApp.openById(sheetId).getSheetByName('harga');
    var lRow = sheet.getLastRow() + 1;
    var hrgJual = `=ROUND(C${lRow}*1,1;-3)`;
    var txt = '';
    var item = cmd.match(/tambahdata@(.+)\nNAMA BARANG : (.+)\nHARGA BELI : (.+)\nKETERANGAN : (.+)/mi);

    if (item[1] != '' && item[2] != '' && item[3] != '' && item[4] != '') {
        var cekNo = cek(item[1]);
        if (cekNo == '') {
            sheet.appendRow([item[1], item[2], item[3], item[4], hrgJual]);
            txt = '☑️ Data dengan kode barang : ' + item[1] + '\nberhasil ditambahkan.';
            sendText(chtId, txt);
        } else {
            txt = '❌ Gagal! Data dengan kode barang : ' + item[1] + '\nsudah ada, masukan kode barang lain';
            sendText(chtId, txt);
        }
    }
}

//fungsi edit data
function ubahData(chtId, cmd) {
    var sheet = SpreadsheetApp.openById(sheetId).getSheetByName('harga');
    var lRow = sheet.getLastRow();
    var hrgJual = `=ROUND(C${lRow}*1,1;-3)`;
    var txt = '';
    var item = cmd.match(/ubahdata@(.+)\nNAMA BARANG : (.+)\nHARGA BELI : (.+)\nKETERANGAN : (.+)/mi);
    if (item[1] != '' && item[2] != '' && item[3] != '' && item[4] != '') {
        var cekNo = cek(item[1]);
        if (cekNo != '') {
            var rs = bacaData();
            for (var i = 0; i < rs.length; i++) {
                if (rs[i][0] == item[1]) {
                    var j = i + 2;
                    sheet.deleteRow(j);
                }
            }
            sheet.appendRow([item[1], item[2], item[3], item[4], hrgJual]);
            txt = '☑️ Data dengan kode barang : ' + item[1] + '\nberhasil diubah.';
            sendText(chtId, txt);
        } else {
            txt = '❌ Gagal! Data dengan kode barang : ' + item[1] + '\ngagal diubah.';
            sendText(chtId, txt);
        }
    }
}

//fungsi hapus data
function hapusData(chtId, cmd) {
    var sheet = SpreadsheetApp.openById(sheetId).getSheetByName('harga');
    var txt = '';
    var item = cmd.match(/hapusdata@(.+)/i);
    var cekNo = cek(item[1]);
    if (cekNo != '') {
        var rs = bacaData();
        for (var i = 0; i < rs.length; i++) {
            if (rs[i][0] == item[1]) {
                var j = i + 2;
                sheet.deleteRow(j);
                txt = '☑️ Data dengan kode barang : ' + item[1] + '\nberhasil dihapus.';
                sendText(chtId, txt);
            }
        }
    } else {
        txt = '❌ Gagal, tidak ada data ';
        sendText(chtId, txt);
    }
}

//fungsi cari data cetak
function cariHarga(chtId, cmd) {
    var txt = '';
    var item = cmd.match(/cariharga@(.+)/i);
    var cekData = false;
    var rs = bacaData();
    for (var i = 0; i < rs.length; i++) {
        if (rs[i][0] == item[1]) {
            cekData = true;
        }
    }
    if (cekData == true) {
        for (var x = 0; x < rs.length; x++) {
            if (rs[x][0] == item[1]) {
                txt = '<b>Menampilkan Data : ' + '[' + rs[x][0] + ']' + '</b>\n' +
                    '------------------------------------' + '\n\n' +
                    '• Nama Barang : ' + rs[x][1] + '\n' +
                    '• Harga Beli : ' + rs[x][2] + '\n' +
                    '• Keterangan : ' + rs[x][3] + '\n\n' +
                    '🏷️ <b>HARGA JUAL :</b> ' + '<b>' + 'Rp ' + rs[x][4] + '</b>';

                sendText(chtId, txt);
            }
        }
    } else {
        txt = 'Tidak ada data!';
        sendText(chtId, txt);
    }
}

//fungsi cari semua data
function tampilData(chtId, cmd) {
    var txt = '';
    var rs = bacaData();
    var txt1 = '<b>Menampilkan Data</b>' + '\n' +
        'kode_barang (nama_barang)';
    sendText(chtId, txt1);
    for (var x = 0; x < rs.length; x++) {
        txt += '• ' + '<code>' + rs[x][0] + '</code>' + ' <b>(' + rs[x][1] + ')</b>' + '\n\n';
    }
    sendText(chtId, txt);
}

//fungsi cek nomor 
function cek(kunci) {
    var txt = '';
    if (kunci != '') {
        var rs = bacaData();
        for (var i = 0; i < rs.length; i++) {
            if (rs[i][0] == kunci) {
                txt = rs[i][0];
            }
        }
    }
    return txt;
}

//fungsi ambil data sheet
function bacaData() {
    var ws = SpreadsheetApp.openById(sheetId);
    var ss = ws.getSheetByName('harga');
    var lr = ws.getActiveSheet().getLastRow();
    //    var lc = ws.getActiveSheet().getLastColumn();
    var rg = 'harga!A2:E' + lr;
    var rs = ws.getActiveSheet().getRange(rg).getValues();
    return rs;
}
