function Vaisseau(positionX,positionY) {

    this.positionX = positionX;
    this.positionY = positionY;
    this.delaiTir = DELAI_TIR;
    this.modeFire = FIRE_MODE_NORMAL;
    // this.modeFire = FIRE_MODE_TRIPLE;
    this.lives = BEGIN_LIVES;
    this.vitesse = 7;
    this.dernierTir = 0;
    this.cptExplosion = 0;
    this.explosion = false;
    this.bitmapImage = new createjs.Bitmap('vaisseau2_resize2.png');
    this.bitmapIcone = new createjs.Bitmap('vaisseau2_resize2_live.png');
    this.canFire = true;
    this.projectiles = [];

    this.init = function() {
        this.positionX = CADRE_X + POSITION_VAISSEAU_INIT_X;
        this.positionY = CADRE_Y + POSITION_VAISSEAU_INIT_Y;
        this.bitmapImage.image.src = 'vaisseau2_resize2.png';
    }

    this.affiche = function(context) {
        //console.debug('vaisseau affiche');
        context.drawImage(this.bitmapImage.image,this.positionX,this.positionY);
        // console.debug(context.getImageData(this.positionX, this.positionY, this.image.width, this.image.height));
        for(var i=0;i<this.projectiles.length;i++) {
            //console.debug('proj '+i);
            if(this.projectiles[i].avancer()) {
                // console.debug('proj '+i+' affiche');
                this.projectiles[i].affiche(context);
            }
            else this.projectiles.splice(i,1);
        }
    }
    this.performMove = function(keyPressed,cptRefresh) {
        for(var i=0;i<keyListened.length;i++) {
            if(keyPressed[keyListened[i]])
                switch(keyListened[i]) {
                    case KEY_RIGHT://droite
                        this.deplacer(1*this.vitesse,0);
                        break;
                    case KEY_LEFT://gauche
                        this.deplacer(-1*this.vitesse,0);
                        break;
                    case KEY_UP://haut
                        this.deplacer(0,-1*this.vitesse);
                        break;
                    case KEY_DOWN://bas
                        this.deplacer(0,1*this.vitesse);
                        break;
                    case KEY_SPACE://espace
                        this.tirer(cptRefresh);
                        break;
                }
        }

    }
    this.deplacer = function(dx,dy) {
        if(positionOK(
            this.positionX + dx,this.positionY + dy,
            this.positionX + this.bitmapImage.image.width + dx, this.positionY + this.bitmapImage.image.height + dy
        )) {
            this.positionX+=dx;
            this.positionY+=dy;
        }
    }
    this.tirer = function(cptRefresh) {
        if(this.canFire && cptRefresh - this.dernierTir>=this.delaiTir) {
            this.dernierTir = cptRefresh;
            var posCanonX = this.positionX+this.bitmapImage.image.width;
            var posCanonY = this.positionY+this.bitmapImage.image.height/2;
            this.projectiles.push(new Projectile(posCanonX,posCanonY, "MID"));
            if(this.modeFire == FIRE_MODE_TRIPLE) {
                this.projectiles.push(new Projectile(posCanonX,posCanonY, "HAUT"));
                this.projectiles.push(new Projectile(posCanonX,posCanonY, "BAS"));
            }
        }
    }
    this.missileCollision = function(asteroide) {
        // console.debug('missileCollision');
        if(!asteroide.explosion) {
            // console.debug('!asteroide.explosion');
            for(var i=0;i<this.projectiles.length;i++) {
                if(this.projectiles[i].toucheAsteroid(asteroide)) {
                    // console.debug('missileCollision ok');
                    this.projectiles.splice(i,1);
                    return true;
                }
            }
        }
        return false;
    }

    this.collision = function(objet) {
        return pixelCollision(this.bitmapImage, objet.bitmapImage);
        if(rectangleToucheRectangle(
            objet.positionX, objet.positionY,
            objet.positionX + objet.bitmapImage.image.width, objet.positionY + objet.bitmapImage.image.height,
            this.positionX, this.positionY,
            this.positionX + this.bitmapImage.image.width,
            this.positionY + this.bitmapImage.image.height
        )) {
            //console.debug('Collision ('+this.positionX+','+this.positionY+')');
            //console.debug('Collision ('+objet.positionX+','+objet.positionY+')');
            return true;
        }
        else return false;
    }

    this.explose = function() {
        console.debug('vaisseau explose');
        this.cptExplosion = TEMPS_EXPLOSION_VAISSEAU;
        this.bitmapImage.image.src = 'explosion_resize.png';
        this.explosion = true;
    }
}