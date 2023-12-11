var result = '';

function addParameter() {
	console.log('addParameter');
	$('<div class="parameter"><input type="text" placeholder="Parameter name"><input type="text" placeholder="Parameter value"><input type="button" class="remove" value="x"></div>').insertBefore('#addbutton');
	$('.parameter input').prev().prev().focus();
};


$('#first').on('click', '.remove', function() {
	console.log('removeParameter');
	$(this).parent().remove();
	$('input').trigger('input');
});


$('#first').on('click', '#addDate', function() {
	$('<div class="parameter"><input type="text" value="currentdate"><input type="text"  class="val" placeholder="Parameter value"><input type="button" class="remove" value="x"></div>').insertBefore('#addbutton');
	$('.parameter input');
	$('#parameters .val').last().datepicker({
		dateFormat : 'mmddyy',
		onSelect: function() {
			$('input').trigger('input');
		}
	});
});


$('#first').on('input', 'input', function() {
	console.log('UpdateLabel');
	result = $('#url').val();
	
	var parameters = $('#parameters').find('.parameter');
	
	parameters.each(function(index){
		//console.log($(this));
		var valone = $(this).find('input:nth-child(1)').val();
		var valtwo = $(this).find('input:nth-child(2)').val();
		if(valone !== '' && valtwo !== '') {
			if(index==0) result += '?' + valone + '=' + valtwo;
			else result += '&' + valone + '=' + valtwo;
		}
	});
	
	$('#result').text(result);
	$('.resulttext').fadeIn();
	$('#result').fadeIn();
});

function BreakURL() {
	console.log('BreakURL');
	var url = $('#url').val();
	var parms = getUrlVars(url);
	if(url !== '' && parms[0] != url) {
		$('.parameter').remove();
		for(var i = 0 ; i < parms.length ; i=i+2) {
			$('<div class="parameter"><input type="text" value="' + parms[i] + '"><input class="val" type="text" value="' + parms[i+1] + '"><input type="button" class="remove" value="x"></div>').insertBefore('#addbutton');
			if(parms[i].toLowerCase()=='currentdate') {
				console.log('currentdate');
				$('#parameters .val').last().datepicker({
					dateFormat : 'mmddyy',
					onSelect: function() {
						$('input').trigger('input');
					}
				});
			}
			if(parms[i].toLowerCase()=='currenttime') {
				console.log('currenttime');
				$('#parameters .val').last().timepicker({
					controlType: 'select',
					oneLine: true,
					timeFormat: 'HHmmss',
					stepMinute: 5,
					stepSecond: 10,
					onSelect: function() {
						$('input').trigger('input');
					}
				});
			}
		}
	}
	$('#url').val(url.split('?')[0]);
	
};


function getUrlVars(url)
{
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars.push(hash[1]);
        //vars[hash[0]] = hash[1];
    }
    return vars;
}

/************* Copy to clipboard ****************/
document.getElementById("result").addEventListener("click", function() {
    copyToClipboard(document.getElementById("result"));
});

function copyToClipboard(elem) {
	  // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
    	  succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}