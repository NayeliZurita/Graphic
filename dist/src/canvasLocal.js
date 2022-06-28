export class CanvasLocal {
    constructor(g, canvas) {
        this.graphics = g;
        this.rWidth = 20;
        this.rHeight = 13;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = this.maxX / 20;
        this.centerY = this.maxY / 8 * 5.4;
    }
    iX(x) { return Math.round(this.centerX + x / this.pixelSize); }
    iY(y) { return Math.round(this.centerY - y / this.pixelSize); }
    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    }
    drawRmboide(x1, y1, x2, y2, x3, y3, x4, y4, color) {
        // Color de relleno
        this.graphics.fillStyle = color;
        // Comenzamos la ruta de dibujo, o path
        this.graphics.beginPath();
        // Mover a la esquina superior izquierda
        this.graphics.moveTo(x1, y1);
        // Dibujar la línea hacia la derecha
        this.graphics.lineTo(x2, y2);
        // Ahora la que va hacia abajo
        this.graphics.lineTo(x3, y3); // A 80 porque esa es la altura
        // La que va hacia la izquierda
        this.graphics.lineTo(x4, y4);
        // Y dejamos que la última línea la dibuje JS
        this.graphics.closePath();
        // Hacemos que se dibuje
        this.graphics.stroke();
        // Lo rellenamos
        this.graphics.fill();
    }
    fx(x) {
        return Math.sin(x * 2.5);
    }
    maxH(h) {
        let max = h[0];
        for (let i = 1; i < h.length; i++) {
            if (max < h[i])
                max = h[i];
        }
        //
        let res;
        let pot = 10;
        //se calcula la potencia de 10 mayor al max para redondear el maximo de la grafica.
        while (pot < max) {
            pot *= 10;
        }
        pot /= 10;
        res = Math.ceil(max / pot) * pot;
        return res;
    }
    paint() {
        //let h: number[] = [420, 100, 160, 20];
        //let h: number[] = [1150, 1780, 860, 1260];
        let h = [27, 10, 16, 2, 5, 20, 8, 13, 9, 18];
        let maxEsc;
        let colors = ['magenta', 'red', 'green', 'yellow', 'magenta', 'red', 'green', 'yellow', 'magenta', 'red'];
        maxEsc = this.maxH(h);
        this.graphics.strokeStyle = 'black';
        this.drawLine(this.iX(0), this.iY(0), this.iX(16), this.iY(0));
        this.drawLine(this.iX(0), this.iY(0), this.iX(0), this.iY(6));
        //las 6 unidades se dividen entre 4 periodos de lineas cada una 
        //representara una escala de 1/4 del total maximo
        let i = 0;
        for (let y = 0.6; y <= 6; y += 1.35) {
            this.drawLine(this.iX(0.6), this.iY(y), this.iX(16), this.iY(y));
            this.drawLine(this.iX(0), this.iY(y - 0.6), this.iX(0.6), this.iY(y));
            this.graphics.strokeText((maxEsc * i / 4) + "", this.iX(-0.7), this.iY(y - 0.5));
            i++;
        }
        //this.graphics.strokeStyle = 'black';
        let ind = 0;
        let incremento = 15 / h.length;
        for (let i = 0.5; i <= 15; i += incremento) {
            //this.graphics.strokeStyle = colors[ind];
            this.graphics.fillStyle = colors[ind];
            //console.log(this.rHeight*h[ind]/maxEsc)
            this.drawLine(this.iX(i), this.iY(6 * h[ind] / maxEsc - 0.1), this.iX(i), this.iY(0));
            this.graphics.fillRect(this.iX(i), this.iY(6 * h[ind] / maxEsc - 0.1), this.iX(2) - this.iX(1), this.iY(0.2) - this.iY(6 * h[ind] / maxEsc));
            this.drawRmboide(this.iX(i + 0.3), this.iY(6 * h[ind] / maxEsc + 0.2), this.iX(i + 1.3), this.iY(6 * h[ind] / maxEsc + 0.2), this.iX(i + 1), this.iY(6 * h[ind] / maxEsc - 0.1), this.iX(i), this.iY(6 * h[ind] / maxEsc - 0.1), colors[ind]);
            this.drawRmboide(this.iX(i + 1), this.iY(6 * h[ind] / maxEsc - 0.1), this.iX(i + 1.3), this.iY(6 * h[ind] / maxEsc + 0.2), this.iX(i + 1.3), this.iY(0.4), this.iX(i + 1), this.iY(0.1), colors[ind]);
            ind++;
        }
        ind = 0;
        for (let x = 0; x < 15; x += 1.6) {
            this.graphics.strokeText(colors[ind++], this.iX(x + 0.3), this.iY(-0.5));
        }
        for (let y = 0; y < h.length; y++) {
            this.graphics.strokeText(colors[y], this.iX(17), this.iY(6.5 - y));
            this.graphics.fillStyle = colors[y];
            this.graphics.fillRect(this.iX(16.5), this.iY(7 - y), 10, 10);
        }
    }
}
