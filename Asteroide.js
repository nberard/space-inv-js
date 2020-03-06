

function Asteroide(positionX,positionY,type) {

    this.positionX = positionX;
    this.positionY = positionY;
    this.type = type;
    this.vitesse = 4;
    this.bitmapImage = new createjs.Bitmap(IMAGES_ASTEROID[this.type]);
    this.cptExplosion = 0;
    this.explosion = false;
    this.health = FORCE_ASTEROID[this.type];
    this.affiche = function(context) {
        context.drawImage(this.bitmapImage.image,this.positionX,this.positionY);
    }
    this.avancer = function() {
        //console.debug(this.vitesse);
        return this.deplacer(-1 * this.vitesse,0);
    }
    this.deplacer = function(dx,dy) {
        // console.debug('objet avant ('+this.positionX+','+this.positionY+')');
        if(this.positionOK(this.positionX + dx,this.positionY + dy)) {
            this.positionX+=dx;
            this.positionY+=dy;
            // console.debug('objet apres ('+this.positionX+','+this.positionY+')');
            return true;
        }
        else return false;
    }

    this.getShot = function() {
        this.health--;
        return this.health == 0;
    }
    this.explose = function() {
        console.debug('asteroide explose');
        this.cptExplosion = TEMPS_EXPLOSION;
        this.bitmapImage.image.src = IMAGES_ASTEROID_DETRUITE[this.type];
        this.explosion = true;
        return POINTS_ASTEROID[this.type];
    }

    this.positionOK = function(x1,y1,debug) {
        ok = x1>=CADRE_X && y1>=CADRE_Y;
        if(debug) console.debug('position ('+x1+','+y1+') = '+ok);
        return ok;
    }

}