function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};
function randomColor () {
    return 'rgb(' + randomInt(0, 255) + ', ' + randomInt(0, 255) + ', ' + randomInt(0, 255) + ')';
};
export default function Point (width, height) {
    this.r = Math.random() * 4 + 2;
    this.color = '#e0e0e0';

    this.width = width;
    this.height = height;

    this.x = randomInt(this.r, width - this.r);
    this.y = randomInt(this.r, height - this.r);

    this.vX = randomInt(1, 3) * (randomInt(0, 2) === 1? 1 : -1);
    this.vY = randomInt(1, 3) * (randomInt(0, 2) === 1? 1 : -1);
};
Point.prototype.move = function () {
    this.x += this.vX * 0.2;
    this.y += this.vY * 0.2;

    if (this.x <= this.r) {
        this.x = this.r;
        this.vX *= -1;
    }
    if (this.x >= this.width - this.r) {
        this.x = this.width - this.r;
        this.vX *= -1;
    }
    if (this.y <= this.r) {
        this.y = this.r;
        this.vY *= -1;
    }
    if (this.y >= this.height - this.r) {
        this.y = this.height - this.r;
        this.vY *= -1;
    }
};
Point.prototype.draw = function (ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
};
export function distance (x1, y1, x2, y2) {
    return Math.sqrt( (x1 - x2) * (x1 - x2) + (y1 - y2) * ( y1 - y2));
};
