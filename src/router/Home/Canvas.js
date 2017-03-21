export default function Canvas (isWebGL = false, options = {}) {
	if (!(this instanceof Canvas)) return new Canvas(isWebGL, options);
	if (isWebGL instanceof Object) options = isWebGL, isWebGL = options.isWebGL || false;

	this.canvas = document.createElement('canvas');
	if (!isWebGL) this.context = this.canvas.getContext('2d');
	else this.context = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
};
Canvas.prototype.resize = function(event) {
	const { width, height } = this.canvas;
	const { clientWidth, clientHeight } = this.container;
	if (width === clientWidth && height === clientWidth) return;
	this.setSize(clientWidth, clientHeight);
};
Canvas.prototype.setWidth = function (width) {
	width = width += '';
	width = Number.parseFloat(width);

	if(typeof width !== 'number' || Number.isNaN(width)) return console.log('请输入数字');
	width = Math.abs(width);
	this.canvas.width = width;
};
Canvas.prototype.setHeight = function (height) {
	height = Number.parseFloat(height + '');
	if (typeof height !== 'number' || Number.isNaN(height)) return console.log('请输入数字');
	height = Math.abs(height);
	this.canvas.height = height;
};
Canvas.prototype.setSize = function (width, height) {
	this.setWidth(width);
	this.setHeight(height);
};
Canvas.prototype.syncContainerSize = function () {
	const { clientWidth, clientHeight } = this.container;
	this.setSize(clientWidth, clientHeight);
};
Canvas.prototype.getContainerData = function (value) {

};
Canvas.prototype.insertInto = function (container) {
	if (typeof container in ['string', 'number']) container = document.querySelector(container);
	if (!container) return console.log('insertInto error, 请输入父节点选择器或节点');

	this.container = container;
	this.syncContainerSize();
	this.container.appendChild(this.canvas);
	window.addEventListener('resize', this.resize.bind(this));
};
