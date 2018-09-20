var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

autoSetCanvasSize(canvas)

listenToMouse(canvas)

var eraserEnabled = false
eraser.onclick = function () {
	eraserEnabled = true
	actions.className = 'actions x'
}
brush.onclick = function () {
	eraserEnabled = false
	actions.className = 'actions'
}

function autoSetCanvasSize(canvas) {
	function setCanvasSize() {
		var pageWidth = document.documentElement.clientWidth;
		var pageHeight = document.documentElement.clientHeight;
		canvas.width = pageWidth
		canvas.height = pageHeight
	}
	setCanvasSize()
	window.onresize = function () {
		setCanvasSize()
	}
}


function drawLine(x1, y1, x2, y2) {
	ctx.beginPath()
	ctx.lineWidth = 5
	ctx.moveTo(x1, y1)
	ctx.lineTo(x2, y2)
	ctx.stroke()
	ctx.closePath()
}

function listenToMouse(canvas) {
	var using = false
	var lastPoint = { 'x': undefined, 'y': undefined }

	canvas.onmousedown = function (e) {
		using = true
		var x = e.clientX
		var y = e.clientY
		if (eraserEnabled) {
			ctx.clearRect(x - 5, y - 5, 10, 10)
		} else {
			lastPoint = { 'x': x, 'y': y }
		}
	}

	canvas.onmousemove = function (e) {
		var x = e.clientX
		var y = e.clientY
		var newPoint = { 'x': x, 'y': y }
		if (!using) { return }
		if (eraserEnabled) {
			ctx.clearRect(x - 5, y - 5, 10, 10)
		} else {
			drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
			lastPoint = newPoint
		}
	}

	canvas.onmouseup = function () {
		using = false
	}
}
