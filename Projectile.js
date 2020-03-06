

function Projectile(positionX,positionY,type) {

    this.type = type;
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = 4;
    this.height = 4;
    this.vitesse = 5;
    // console.debug('proj '+positionX+' '+positionY);
    this.affiche = function(context) {
        context.fillStyle = "green";
        context.fillRect(this.positionX, this.positionY - this.height/2, this.width, this.height);
    }
    this.avancer = function() {
        if(this.type=="HAUT")
            return this.deplacer(1 * this.vitesse,-1 * this.vitesse);
        else if(this.type=="BAS")
            return this.deplacer(1 * this.vitesse, 1 * this.vitesse);
        else if(this.type=="MID")
            return this.deplacer(1 * this.vitesse,0);
        else  return false;
    }
    this.deplacer = function(dx,dy) {
        if(positionOK(this.positionX + dx,this.positionY + dy, this.positionX + this.width + dx, this.positionY + this.height + dy)) {
            this.positionX+=dx;
            this.positionY+=dy;
            return true;
        }
        else return false;
    }
    this.toucheAsteroid = function(asteroide) {
        return rectangleToucheRectangle(
            this.positionX, this.positionY,
            this.positionX + this.width, this.positionY + this.height,
            asteroide.positionX, asteroide.positionY,
            asteroide.positionX + asteroide.bitmapImage.image.width, asteroide.positionY + asteroide.bitmapImage.image.height
        );
    }
}