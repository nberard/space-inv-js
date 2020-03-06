function Bonus(positionX,positionY,type) {

    this.positionX = positionX;
    this.positionY = positionY;
    this.type = type;
    this.vitesse = 3;
    this.bitmapImage = new createjs.Bitmap(IMAGES_BONUS[this.type]);

    this.affiche = function(context) {
        context.drawImage(this.bitmapImage.image,this.positionX,this.positionY);
    }
    this.avancer = function() {
        //console.debug('bonus avancer');
        return this.deplacer(-1 * this.vitesse,0);
    }

    this.deplacer = function(dx,dy) {
        console.log(window.spaceInvaderHelper);
        if(positionOK(this.positionX + dx,this.positionY + dy, this.positionX + this.bitmapImage.image.width + dx, this.positionY + this.bitmapImage.image.height + dy)) {
            //console.debug('positionX = '+positionX);
            //console.debug('this.positionX = '+this.positionX);
            this.positionX+=dx;
            this.positionY+=dy;
            return true;
        }
        else return false;
    }

    this.activate = function(vaisseau, game) {
        switch(this.type) {
            case 'LIFE':
                vaisseau.lives++;
                break;
            case 'MISSILE_TRIPLE':
                vaisseau.modeFire = FIRE_MODE_TRIPLE;
                break;
            case 'MISSILE_RAPIDE':
                if(vaisseau.delaiTir > 0)
                    vaisseau.delaiTir-=1;
                break;
            case 'GOLD':
                game.score+=50;
                break;
        }
    }
}