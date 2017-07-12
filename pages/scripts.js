var cas = ['7440-59-7', '7440-01-9', '7440-37-1', '7439-90-9', '7440-63-3', '1333-74-0', '14452-59-6', '25681-79-2',
 '39297-86-4', '39297-88-6', '25681-80-5', '25681-81-6', '7727-37-9', '12185-09-0', '23878-46-8', '7782-41-4',
 '7782-50-5', '7726-95-6', '7553-56-2', '74-82-8', '74-84-0', '74-98-6', '106-97-8', '74-85-1', '74-86-2', '12184-80-4',
 '75-19-4', '71-43-2', '629-20-9', '542-92-7', '75-02-5', '75-01-4', '593-60-2', '593-66-8', '75-73-0', '56-23-5',
 '558-13-4', '507-25-5', '7803-62-5', '7782-65-2', '1590-87-0', '14868-53-2', '7580-67-8', '7693-26-7', '13283-31-3',
 '19287-45-7', '7664-41-7', '7782-79-8', '7803-51-2', '7784-42-1', '7783-06-4', '7664-39-3', '7647-01-0', '7789-24-4',
 '7783-40-6', '7783-63-3', '7784-18-1', '13768-60-0', '7783-60-0', '7758-02-3', '17108-85-9', '7647-14-5', '7786-30-3',
 '7784-23-8', '10043-11-5', '74-90-8', '17739-47-8', '302-01-2', '50-00-0', '67-56-1', '64-17-5', '75-07-0', '60-29-7',
 '64-18-6', '7722-84-1', '7732-18-5', '124-38-9', '75-15-0', '463-58-1', '1603-84-5', '630-08-0', '10028-15-6', '7446-09-5',
 '1304-56-9', '1309-48-4', '108-88-3', '100-41-4', '392-56-3', '108-95-2', '62-53-3', '110-86-1', '73-40-5', '73-24-5',
 '71-30-7', '65-71-4', '66-22-8', '57-13-6', '12187-06-3', '12190-70-4', '544-92-3'];

var meta_keys = ['orbital','calc_type','basis','basis_name','basis_size','code','code_version','remark','DOI']

function set_key_tables(){
   $.getJSON('../data/formulas.json',function(data){
       for (x in cas){
           var row = document.getElementById('data_table').insertRow(-1);
           var cell = row.insertCell(0);
           cell.innerHTML=data[cas[x]];
           cell.classList.add('text_cell');
       }
   });
   info_table = document.getElementById('info_table');
   for (x in meta_keys){
       var row = info_table.insertRow(-1);
       var cell = row.insertCell(0);
       cell.innerHTML=meta_keys[x].replace("_", " ");
       cell.classList.add('text_cell');
       cell.classList.add('description');
   }
}


function reset_tables(n){
   document.getElementById('info_table'+n).innerHTML = "";
   document.getElementById('data_table'+n).innerHTML = "";
}

function fill_select_2(){
    document.getElementById('set2').innerHTML = document.getElementById('set1').innerHTML;
    document.getElementById('set2').selectedIndex = 1;
}

function load_set(n){
    $.getJSON( "../data/" + document.getElementById('set'+n).value + ".json", function( data ) {
        var items = [];
        for (key in meta_keys) {
            var row = document.getElementById("info_table"+n).insertRow(-1);
            var cell = row.insertCell(0);
            cell.innerHTML = data[meta_keys[key]].replace('_', ' ');
            cell.classList.add('text_cell');
        }
        for (x in cas){
            var row = document.getElementById("data_table"+n).insertRow(-1);
            var cell = row.insertCell(0);
            cell.innerHTML = parseFloat(data['data'][cas[x]]).toFixed(2) * 1;
            cell.classList.add('number_cell');
        };
    calc_diff()
    });
}

function calc_diff(){
    console.log('calculating diff')
    var table1 = document.getElementById("data_table1");
    var table2 = document.getElementById("data_table2");
    var diff_table = document.getElementById("diff_table");
    diff_table.innerHTML = '';
    var diffs = [];
    for (var i = 0, row1; row1 = table1.rows[i]; i++) {
        row2 = table2.rows[i];
        var x = row2.cells[0].innerHTML;
        var y = row1.cells[0].innerHTML;
        if (x != 0 && y != 0){
            var diff = x - y;
            if (diff < 1000){
                diffs.push(diff);
            }
        } else {
            var diff = 0;
        }
        var row = diff_table.insertRow(-1);
        var cell = row.insertCell(0);
        cell.innerHTML = diff.toFixed(2);
        cell.classList.add('number_cell');
    }
    var stats_table = document.getElementById("stats");
    stats_table.innerHTML = "";
    keys = ['Mean difference', 'Median difference', 'RMS difference', 'Standard deviation'];
    values = [];
    values.push(ss.mean(diffs).toFixed(2) * 1);
    values.push(ss.median(diffs).toFixed(2) * 1);
    values.push(ss.rootMeanSquare(diffs).toFixed(2) * 1);
    values.push(ss.standardDeviation(diffs).toFixed(2) * 1);
    for (i in keys){
        var row = stats_table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = keys[i];
        cell1.classList.add('text_cell');
        cell2.innerHTML = values[i];
        cell2.classList.add('number_cell');
    }
    var hist = {
        x: diffs,
        type: 'histogram',
        opacity: 0.75,
    };
    var data = [hist];
    var layout = {
        bargap: 0.05,
        yaxis: {title: "Count"},
        xaxis: {title: "Value"},
        autosize: false,
        width: 540,
        height: 200,
        margin: {
            l: 40,
            r: 00,
            b: 35,
            t: 0,
            pad: 0
        },
    };
    Plotly.newPlot('diff_hist', data, layout);
    var box = {
        x: diffs,
        name: ' ',
        type: 'box',
    };
    var layout = {
        bargap: 0.05,
        autosize: false,
        width: 350,
        height: 100,
        margin: {
            l: 0,
            r: 0,
            b: 20,
            t: 20,
            pad: 0
        },
    };
    var data = [box];
    Plotly.newPlot('diff_box', data, layout);

}