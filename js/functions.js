
$(function(){

	var arr = new Array();
	var prev_arr = new Array();
	for(var i = 0; i < 4; i++) {
		arr[i] = new Array();
		prev_arr[i] = new Array();
		for(var j = 0; j < 4; j++) {
			arr[i][j] = 0;
			prev_arr[i][j] = 0;
		}
	}

	function moveRight() {
		var changed = false;
		for(var i = 0; i < 4; i++) {
			var end = 3;
			for(var j = 3; j >= 0; j--) {
				if(arr[i][j] != 0) {
					arr[i][end] = arr[i][j];
					if(end != j)
						changed = true;
					end--;
				}
			}
			for(; end >= 0; end--)
				arr[i][end] = 0;
			for(var j = 3; j > 0; j--) {
				if(arr[i][j] != 0 && arr[i][j] == arr[i][j - 1]) {
					arr[i][j] *= 2;
					arr[i][j - 1] = 0;
					changed = true;
				}
			}
			var end = 3;
			for(var j = 3; j >= 0; j--) {
				if(arr[i][j] != 0) {
					arr[i][end] = arr[i][j];
					end--;
				}
			}
			for(; end >= 0; end--)
				arr[i][end] = 0;
		}
		return changed;
	}

	function moveLeft() {
		var changed = false;
		for(var i = 0; i < 4; i++) {
			var end = 0;
			for(var j = 0; j < 4; j++) {
				if(arr[i][j] != 0) {
					arr[i][end] = arr[i][j];
					if(end != j)
						changed = true;
					end++;
				}
			}
			for(; end < 4; end++)
				arr[i][end] = 0;
			for(var j = 0; j < 3; j++) {
				if(arr[i][j] != 0 && arr[i][j] == arr[i][j + 1]) {
					arr[i][j] *= 2;
					arr[i][j + 1] = 0;
					changed = true;
				}
			}
			var end = 0;
			for(var j = 0; j < 4; j++) {
				if(arr[i][j] != 0) {
					arr[i][end] = arr[i][j];
					end++;
				}
			}
			for(; end < 4; end++)
				arr[i][end] = 0;
		}
		return changed;
	}

	function moveUp() {
		var changed = false;
		for(var i = 0; i < 4; i++) {
			var end = 0;
			for(var j = 0; j < 4; j++) {
				if(arr[j][i] != 0) {
					arr[end][i] = arr[j][i];
					if(end != j)
						changed = true;
					end++;
				}
			}
			for(; end < 4; end++)
				arr[end][i] = 0;
			for(var j = 0; j < 3; j++) {
				if(arr[j][i] != 0 && arr[j][i] == arr[j + 1][i]) {
					arr[j][i] *= 2;
					arr[j + 1][i] = 0;
					changed = true;
				}
			}
			var end = 0;
			for(var j = 0; j < 4; j++) {
				if(arr[j][i] != 0) {
					arr[end][i] = arr[j][i];
					end++;
				}
			}
			for(; end < 4; end++)
				arr[end][i] = 0;
		}
		return changed;
	}

	function moveDown() {
		var changed = false;
		for(var i = 0; i < 4; i++) {
			var end = 3;
			for(var j = 3; j >= 0; j--) {
				if(arr[j][i] != 0) {
					arr[end][i] = arr[j][i];
					if(end != j)
						changed = true;
					end--;
				}
			}
			for(; end >= 0; end--)
				arr[end][i] = 0;
			for(var j = 3; j > 0; j--) {
				if(arr[j][i] != 0 && arr[j][i] == arr[j - 1][i]) {
					arr[j][i] *= 2;
					arr[j - 1][i] = 0;
					changed = true;
				}
			}
			var end = 3;
			for(var j = 3; j >= 0; j--) {
				if(arr[j][i] != 0) {
					arr[end][i] = arr[j][i];
					end--;
				}
			}
			for(; end >= 0; end--)
				arr[end][i] = 0;
		}
		return changed;
	}

	function init() {
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				var divname = "#" + i + j;
				var h1 = $(divname).find("h1");
				h1.html(arr[i][j]);
				h1.addClass("number" + arr[i][j]);
			}
		}
	}

	function draw(obj) {
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				if(prev_arr[i][j] != arr[i][j]) {
					var divname = "#" + i + j;
					var h1 = $(divname).find("h1");
					var clsname = h1.attr("class");
					h1.removeClass(clsname);
					h1.html(arr[i][j]);
					h1.addClass("number" + arr[i][j]);
					if(arr[i][j] > 0) {
					// 	h1.show("slide", {direction : obj}, 200);
						h1.show();
					}
				}
			}
		}
	}

	function random() {
		var num = Math.floor(Math.random() * 15);
		var dis = 0;
		while(dis < 16) {
			var i = parseInt((num - dis) / 4), j = parseInt((num - dis) % 4);
			if(num - dis >= 0 && arr[i][j] == 0) {
				arr[i][j] = 2;
				break;
			}
			i = parseInt((num + dis) / 4), j = parseInt((num + dis) % 4);
			if(num + dis < 16 && arr[i][j] == 0) {
				arr[i][j] = 2;
				break;
			}
			dis++;
		}
	}

	function gameover() {
		for(var i = 0; i <= 3; i++) {
			for(var j = 0; j <= 3; j++) {
				if(arr[i][j] == 0)
					return false;
				if(i > 0 && arr[i][j] == arr[i - 1][j])
					return false;
				if(i < 3 && arr[i][j] == arr[i + 1][j])
					return false;
				if(j > 0 && arr[i][j - 1] == arr[i][j])
					return false;
				if(j < 3 && arr[i][j + 1] == arr[i][j])
					return false;
			}
		}
		return true;
	}

	random();
	init();

	$("body").keydown(function(event) {
		var arrow = event.keyCode || event.which;
		var changed = false;
		var obj = null;
		if(arrow >= 37 && arrow <= 40) {
			for(var i = 0; i < 4; i++) {
				for(var j = 0; j < 4; j++) {
					prev_arr[i][j] = arr[i][j];
				}
			}
			switch (arrow) {
				case 37 :
					changed = moveLeft();
					obj = "left";
					break;
				case 38 :
					changed = moveUp();
					obj = "up";
					break;
				case 39 :
					changed = moveRight();
					obj = "right";
					break;
				case 40 :
					changed = moveDown();
					obj = "down";
					break;
			}
			if(changed) {
				random();
				draw(obj);
			}
			else if(gameover() == true) {
				alert("game over!");
			}
		}
	});
})
