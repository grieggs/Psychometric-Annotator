// initialize 
var unicodeBlockSet = new BlockSet();
var label;
var button_label;
var block;
var block_name;

var extraChars= [["unknown/other", "&lt;UNK&gt;"]]

unicodeDict = {}
unicodeNameCSV.forEach(int_name => {
    unicodeDict[int_name[0]] = int_name[1]
    
});

//-----------------------------------------------------------
//-----------------------------------------------------------
//-----------------------------------------------------------
// Dialogue
//-----------------------------------------------------------
//-----------------------------------------------------------
//-----------------------------------------------------------
$( "#dialog" ).dialog({
	autoOpen: false,
	width: '75%',
    height: 600,
    overflow: 'scroll',
	buttons: [
        /*
		{
			text: "Ok",
			click: function() {
				$( this ).dialog( "close" );
			}
		},
        */
		{
			text: "Close",
			click: function() {
				$( this ).dialog( "close" );
			}
		}
	]
});
// Hover states on the static widgets
$( "#dialog-link, #icons li" ).hover(
	function() {
		$( this ).addClass( "ui-state-hover" );
	},
	function() {
		$( this ).removeClass( "ui-state-hover" );
	}
);
// Link to open the dialog
$( "#dialog-link" ).click(function( event ) {
	$( "#dialog" ).dialog( "open" );
	event.preventDefault();
});

function labelandbuttonHtmlCharButton(label, button_label){
    var labelHtml = "<label>"+label+"</label>";
    var buttonHtml = "<button id='otherChar_"+label+"'>"+button_label+"</button>"

    var html= labelHtml+buttonHtml
    return html
}
var n_e_cols = 8
function makeSuperTable() {
    $('#extra_char_buttons').empty();
    content = "<table id='extra_char_table' border='1px solid black'>";
    content+='<tr><th colspan="'+n_e_cols+'">Additional Character Input Buttons</th></tr>'

    var cur_col = 0;
    var cur_row=0;
    var i = 0;

    extraChars.forEach(extraChar => {
        var label = extraChar[0]
        var char = extraChar[1]

        if(cur_col==0){content+='<tr id="dialog_table_row_'+cur_row+'">';}

        content+= '<td><label>'+label+'</label><button id="extraChar_'+i+'">'+char+'</button></td>';

        cur_col +=1;
        i +=1
        if (cur_col == n_e_cols) {
            cur_col = 0;
            cur_row+=1;
            content += '</tr>'
        }

    });
    content += '</table>'
    $('#extra_char_buttons').append(content);
}


//-----------------------------------------------------------
// Dialogue Table
//-----------------------------------------------------------

var n_d_cols = 5;
// Make the actual table
function makeTable(block_name){
    // initialize table
    var content = '<table id="dialog_table" border="1px solid black">';

    var chars = unicodeBlockSet.getBlock(block_name);
    var n_chars = chars.length;
    console.log('number of chars in blockset: '+n_chars);
    
    var cur_col = 0;
    var cur_row=0;
    var i = 0;
    chars.forEach(char => {
        // Start a row if needed
        if(cur_col==0){content+='<tr id="dialog_table_row_'+cur_row+'">';}

        intCode = char.charCodeAt(0).toString(10)
        console.log('here')
        console.log('ጐ'.charCodeAt(0).toString(10))
        console.log(unicodeDict[1424])
        content+='<td>'+unicodeDict[intCode] +'<button id="dialogCharButton_'+i+'" value='+intCode+'>'+String.fromCharCode(intCode)+'</td>';
        // increase col check, end a row if needed
        // increase char number
        cur_col +=1;
        i +=1
        if (cur_col == n_d_cols) {
            cur_col = 0;
            cur_row+=1;
            content += '</tr>'
        }
    });

    // close table and append it to div
    content+= '</table>';
    $('#dialog_table_div').empty()
    $('#dialog_table_div').append(content);
    
}
makeTable('Basic Latin')


//-----------------------------------------------------------
//-----------------------------------------------------------
//-----------------------------------------------------------
// select menus
//-----------------------------------------------------------
//-----------------------------------------------------------
//-----------------------------------------------------------

$( "#selectmenu" ).selectmenu({
    width:  '100%',
    size: 15,
});
function addSelectMenuOption(name){
    html = "<option id='selectMenuOption_"+name+"'>"+name+"</option>"
    return html
}

// Populate select menu with each blockset
function populateSelectMenu(blockset){
    unicodeBlocks = blockset.getBlockKeys();
    unicodeBlocks.forEach(b => {
        $('#selectmenu').append(addSelectMenuOption(b));
    });
}
populateSelectMenu(unicodeBlockSet);

$("#dialog_table_div table tr td button").click(function() {
    var intCode = this.value;
    extraChars.push([unicodeDict[intCode], String.fromCodePoint(parseInt(intCode,10))]);
    makeSuperTable();
});

$('#selectmenu').on('selectmenuchange', function(event, ui) {
    makeTable($( "#selectmenu option:selected" ).text()); 
});


makeSuperTable();

